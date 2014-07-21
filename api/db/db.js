var mongoose = require('mongoose');
var DBHost = 'localhost',
    DBPort = 27017,
    DBName = 'piminer',
    DBUrl = 'mongodb://'+DBHost+':'+DBPort+'/'+DBName,
    collectionNames = ['users', 'miners', 'settings', 'pools', 'alerts'],
    ObjectId = mongoose.Types.ObjectId,
    passwordHash = require('password-hash');

exports.SetupDB = function(){
    mongoose.connection.on('open', function (ref) {
        console.log('Connected to mongo server.');
        // Check if collections exist... if not, populate them with some sample data...
        collectionNames.forEach(function(name){
            mongoose.connection.db.collection(name, {strict: true}, function(err, collection){
                if(err){
                    console.log('Collection '+name+ ' does not yet exist.  It will be created automatically.');
                    populateDB(name);
                }
            });
        });
    });
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + DBUrl);
    });
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    mongoose.connect(DBUrl);

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};
returnHashed = function(hashed){
    console.log('HASHED PASSWORD: '+hashed);
    return hashed;
}

/**
 * mongoizeID: method used by all put, post, and delete methods to change the user's id parameter from "id" to "_id".
 *             Mongo uses "_id", but the ember application uses "id".  We delete the "id" parameter before storing the
 *             object in the DB because we don't want to have the primary key in two different parameters on the
 *             same object.
 *
 * @param obj (the object to be transformed)
 * @returns the object.
 */
var mongoizeObjID = function(obj){
    if(obj.id){
        obj._id = obj.id;
        delete obj.id;
    }
    return obj;
};
/**
 * deMongoizeID: This is the opposite of the mongoizeID method
 *
 * @param obj (the object to be transformed)
 * @returns the object.
 */
var demongoizeObjID = function(obj){

    if(obj && obj._id){
        obj.id = obj._id;
        delete obj._id;
    }
    return obj;
};

var sendAjaxResponse = function(res, result){
    if(result instanceof Array){
        for(var i=0; i<result.length; i++){ result[i] = demongoizeObjID(result[i]); }
        res.send(result);
    }else{
        res.send(demongoizeObjID(result));
    }
}

var sampleData = {
    users: [
        {
            _id: ObjectId(),
            username: 'grese',
            password: passwordHash.generate('schmiles')
        }
    ],
    settings: [
        {
            _id: ObjectId(),
            type: 'DEVICE_INFO',
            value: {
                name: 'Pi Miner'
            }
        },
        {
            _id: ObjectId(),
            type: 'MINER_CONFIG',
            value: {
                miner: 'cgminer',
                command: ''
            }
        },
        {
            _id: ObjectId(),
            type: 'EMAIL_NOTIFICATION',
            value: {
                toAddress: 'johngrese@me.com',
                fromAddress: 'johngrese@me.com',
                smtpServer: 'smtp.mail.me.com',
                smtpAuth: true,
                smtpAuthUsername: 'johngrese@me.com',
                smtpAuthPassword: passwordHash.generate('$chroederRock5'),
                smtpAuthPort: 587
            }
        },
        {
            _id: ObjectId(),
            type: 'ANALYTICS_CONFIG',
            value: {
                dataCollectionEnabled: true,
                dataInterval: 30
            }
        }
    ],
    alerts: [
        {
            _id: ObjectId(),
            type: 'PERFORMANCE_EXPECTATION',
            value: {
                enabled: false,
                numDevices: 1,
                numMhs: 330
            }
        }
    ],
    pools: [
        {
            _id: ObjectId(),
            name: "Slush's Pool",
            url: "http://stratum.bitcoin.cz:3333",
            username: "grese.piminer",
            password: 'schmiles',
            enabled: true
        }
    ]
};


var populateDB = function(collectionName) {
    var samples = sampleData[collectionName];
    if(samples){ console.log('Creating sample records for: '+collectionName) }
    mongoose.connection.db.collection(collectionName, function(err, collection) {
        collection.insert(samples, {safe:true}, function(err, result) {});
    });
};

exports.mongoizeObjID = mongoizeObjID;
exports.demongoizeObjID = demongoizeObjID;
exports.sendAjaxResponse = sendAjaxResponse;