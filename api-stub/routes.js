module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
	server.namespace('/api', function() {

        server.get('/miners', function(req, res){
            var miners = {
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
            res.send(miners);
        });

        server.get('/miners/:id', function(req, res){
            var miners = {
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

            var miner = {
                "miner":{
                    "id": 1,
                    "name": "Jalapeno 1",
                    "description": "Butterfly Labs 5GH Jalapeno",
                    "expectedSpeed": 5000
                }
            }

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