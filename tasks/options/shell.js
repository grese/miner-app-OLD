module.exports = {
    startDb: {                      // Target
        options: {                      // Options
            stderr: true,
            stdout: true
        },
        command: 'nohup mongod &> ../logs/mongod.log'
    }
};