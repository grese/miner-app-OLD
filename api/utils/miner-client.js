var rpc = require('miner-rpc'),
    client = rpc.client(),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

var convertID = function(obj){
    obj.id = obj.ID;
    delete obj.ID;
    return obj;
};

var sendAjaxResponse = function(res, result){
    if(result instanceof Array){
        for(var i=0; i<result.length; i++){
            result[i] = convertID(result[i]);
        }
        res.send(result);
    }else{
        console.log(result);
        res.send(convertID(result));
    }
};

exports.summary = function(req, res){
    return client.get('summary', function(err, summary){
        if(!err){
            summary.id = 0;
            return res.send(summary);
        }
        else { return console.log(err); }
    });
};

exports.restart = function(req, res){
    return client.get('restart', function(err, restart){
        if(!err){
            return res.send(restart);
        }else{
            console.log('<ERROR>: restarting miner');
            return res.send(500);
        }
    });
};

/*
    Returns the devices from cgminer's /devs API, and combines them on primary key, ID with the results from
    cgminer's /devdetails API.
 */
exports.miners = function(req, res, next){

    return client.get('devs', function(err1, devices) {
        if(!err1){
            client.get('devdetails', function(err2, details){
                if(!err2){
                    for(var i=0; i<devices.length; i++){
                        for(var j=0; j<details.length; j++){
                            if(details[j].ID === devices[i].ID){
                                var detail = details[j];
                                details.splice(j, 1);
                                devices[i].Driver = detail.Driver;
                                devices[i].Kernel = detail.Kernel;
                                devices[i].Model = detail.Model;
                                devices[i]['Device Path'] = detail['Device Path'];
                            }
                        }
                    }
                    if(!err2){
                        return sendAjaxResponse(res, devices);
                    }else{
                        console.log(err2);
                        return console.log(err2);
                    }
                }
            });
        }else{
            return console.log(err1);
        }
    });
};