module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
	server.namespace('/api', function() {

        server.get('/users', function(req, res){
            var users = [
                    {
                        "_id": 1,
                        "username": "grese",
                        "password": "schmiles",
                        "email": "johngrese@me.com"
                    },
                    {
                        "_id": 2,
                        "username": "schroeder",
                        "password": "schmiles",
                        "email": "schroeder@johngrese.com"
                    },
                    {
                        "_id": 3,
                        "username": "katie",
                        "password": "schmiles",
                        "email": "katie@johngrese.com"
                    }
                ]
            res.send(users);
        });

        server.get('/machines/:id', function(req, res){
            var machine = {
                "machine": {
                    "_id": 1,
                    "name": "Jalapeno Pi",
                    "miners": [1, 2],
                    "numExpectedMiners": 2,
                    "totalExpectedSpeed": 15000
                },
                "miners": [
                    {
                        "_id": 1,
                        "name": "Jalapeno 1",
                        "description": "Butterfly Labs 5GH Jalapeno",
                        "expectedSpeed": 5000
                    },
                    {
                        "_id": 2,
                        "name": "Jalapeno 2",
                        "description": "Butterfly Labs 10GH Jalapeno",
                        "expectedSpeed": 10000
                    }
                ]
            };
            res.send(machine);
        });

        server.get('/machines', function(req, res){
            var machines = {
                "machines": [
                    {
                        "_id": 1,
                        "name": "Jalapeno Pi",
                        "miners": [],
                        "numExpectedMiners": 3,
                        "totalExpectedSpeed": 15000
                    },
                    {
                        "_id": 2,
                        "name": "Sapphire Pi",
                        "miners": [],
                        "numExpectedMiners": 2,
                        "totalExpectedSpeed": 660
                    },
                    {
                        "_id": 3,
                        "name": "Sapphire Pi Two",
                        "miners": [],
                        "numExpectedMiners": 3,
                        "totalExpectedSpeed": 990
                    }
                ]
            };
            res.send(machines);
        });

        server.get('/miners', function(req, res){
            var miners = {
                "miners": [
                    {
                        "_id": 1,
                        "name": "Jalapeno 1",
                        "description": "Butterfly Labs 5GH Jalapeno",
                        "expectedSpeed": 5000
                    },
                    {
                        "_id": 2,
                        "name": "Jalapeno 2",
                        "description": "Butterfly Labs 10GH Jalapeno",
                        "expectedSpeed": 10000
                    }
                ]
            };
            res.send(miners);
        });

        server.get('/miners/:id', function(req, res){
            var miners = {
                "miners": [
                    {
                        "_id": 1,
                        "name": "Jalapeno 1",
                        "description": "Butterfly Labs 5GH Jalapeno",
                        "expectedSpeed": 5000
                    },
                    {
                        "_id": 2,
                        "name": "Jalapeno 2",
                        "description": "Butterfly Labs 10GH Jalapeno",
                        "expectedSpeed": 10000
                    }
                ]
            };

            var miner = {
                "miner":{
                    "_id": 1,
                    "name": "Jalapeno 1",
                    "description": "Butterfly Labs 5GH Jalapeno",
                    "expectedSpeed": 5000
                }
            }

            res.send(miner);
        });

		// Return fixture data for '/api/posts/:_id'
		server.get('/posts/:id', function(req, res) {
			var post = {
					  "post": {
					    "_id": 1,
					    "title": "Rails is omakase",
					    "comments": ["1", "2"],
					    "user" : "dhh"
					  },

					  "comments": [{
					    "_id": "1",
					    "body": "Rails is unagi"
					  }, {
					    "_id": "2",
					    "body": "Omakase O_o"
					  }]
					};

			res.send(post);
		});

	});

};