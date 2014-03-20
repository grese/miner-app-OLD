module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
	server.namespace('/api', function() {

        server.get('/users', function(req, res){
            var users = [
                    {
                        "id": 1,
                        "username": "grese",
                        "password": "schmiles",
                        "email": "johngrese@me.com"
                    },
                    {
                        "id": 2,
                        "username": "schroeder",
                        "password": "schmiles",
                        "email": "schroeder@johngrese.com"
                    },
                    {
                        "id": 3,
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
                    "id": 1,
                    "name": "Jalapeno Pi",
                    "miners": [1, 2],
                    "numExpectedMiners": 2,
                    "totalExpectedSpeed": 15000
                },
                "miners": [
                    {
                        "id": 1,
                        "name": "Jalapeno 1",
                        "description": "Butterfly Labs 5GH Jalapeno",
                        "expectedSpeed": 5000
                    },
                    {
                        "id": 2,
                        "name": "Jalapeno 2",
                        "description": "Butterfly Labs 10GH Jalapeno",
                        "expectedSpeed": 10000
                    }
                ]
            };
            res.send(machine);
        });

        server.get('/machines', function(req, res){
            var machines = [
                    {
                        "id": 1,
                        "name": "Jalapeno Pi",
                        "miners": [],
                        "numExpectedMiners": 3,
                        "totalExpectedSpeed": 15000
                    },
                    {
                        "id": 2,
                        "name": "Sapphire Pi",
                        "miners": [],
                        "numExpectedMiners": 2,
                        "totalExpectedSpeed": 660
                    },
                    {
                        "id": 3,
                        "name": "Sapphire Pi Two",
                        "miners": [],
                        "numExpectedMiners": 3,
                        "totalExpectedSpeed": 990
                    }
                ];
            res.send(machines);
        });

        server.get('/miners', function(req, res){
            var miners = [
                {
                    "id": 1,
                    "name": "Jalapeno 1",
                    "description": "Butterfly Labs 5GH Jalapeno",
                    "expectedSpeed": 5000
                },
                {
                    "id": 2,
                    "name": "Jalapeno 2",
                    "description": "Butterfly Labs 10GH Jalapeno",
                    "expectedSpeed": 10000
                }
            ];
            res.send(miners);
        });

        server.get('/miners/:id', function(req, res){
            var miner = {
                "id": 2,
                "name": "Jalapeno 2",
                "description": "Butterfly Labs 10GH Jalapeno",
                "expectedSpeed": 10000
            };
            res.send(miner);
        });

		// Return fixture data for '/api/posts/:id'
		server.get('/posts/:id', function(req, res) {
			var post = {
					  "post": {
					    "id": 1,
					    "title": "Rails is omakase",
					    "comments": ["1", "2"],
					    "user" : "dhh"
					  },

					  "comments": [{
					    "id": "1",
					    "body": "Rails is unagi"
					  }, {
					    "id": "2",
					    "body": "Omakase O_o"
					  }]
					};

			res.send(post);
		});

	});

};