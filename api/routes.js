var User = require('./db/models/user'),
    Pool = require('./db/models/pool'),
    Setting = require('./db/models/setting'),
    Alert = require('./db/models/alert'),
    Miner = require('./db/models/miner'),
    Trend = require('./db/models/trend'),
    mongooseDB = require('./db/db'),
    jwt = require('jsonwebtoken'),
    auth = require('./utils/auth'),
    shellCmds = require('./utils/shell'),
    secret = auth.secret,
    MinerAPI = require('./utils/miner-client'),
    rpc = require('miner-rpc'),
    analytics = require('./analytics/batch');

mongooseDB.SetupDB();
analytics.collectMinerData();


module.exports = function(server, proxyPath) {



    server.namespace('/minertest', function(){
        server.all('/*', function(req, res){
            var func = req.params[0];
            var client = rpc.client();
            return client.get(func, function(err, item){
                if(!err){ return res.send(item); }
                else{
                    return console.log(err);
                    res.send(err);
                }
            });
        });
    });

    server.get('/analytics/collect', analytics.triggerTrendCollection);

    // Create an API namespace, so that the root does not
    // have to be repeated for each end point.
    server.namespace(proxyPath,  function() {

       server.get('/', function(req, res){ return res.send('PiMiner API Running...'); });

        server.get('/trends', Trend.find);
        server.get('/users', User.find);
        server.get('/users/:id', User.findById);
        server.post('/users', User.createUser);
        server.put('/users/:id', User.updateUser);
        server.delete('/users/:id', User.deleteUser);

        server.get('/miners',  Miner.find);
        server.get('/summary/*', MinerAPI.summary);

        server.get('/alerts', Alert.find);
        server.get('/alerts/:id', Alert.findById);
        server.post('/alerts', Alert.createAlert);
        server.put('/alerts/:id', Alert.updateAlert);
        server.delete('/alerts/:id', Alert.deleteAlert);

        server.get('/settings', Setting.find);
        server.get('/settings/:id', Setting.findById);
        server.post('/settings', Setting.createSetting);
        server.put('/settings/:id', Setting.updateSetting);
        server.delete('/settings/:id', Setting.deleteSetting);

        server.get('/pools', Pool.find);
        server.get('/pools/:id', Pool.findById);
        server.post('/pools', Pool.createPool);
        server.put('/pools/:id', Pool.updatePool);
        server.delete('/pools/:id', Pool.deletePool);

        server.get('/restart', shellCmds.restart);
        server.get('/reboot', shellCmds.reboot);
    });

};