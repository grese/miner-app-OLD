#!/bin/bash

# Cgminer logs file...
miner_log="./logs/cgminer.log"

# Read the config file first...
config_file="./config.txt"
miner_config=""
read -r $miner_config<$config_file

if [ -n "$miner_config" ]; then
    # If the miner config is not empty... Use it instead of default.

    # Start the miner...
    eval `nohup $miner_config &> $miner_log`
else
    # The miner_config file is empty so we will use the default config...

    # Read the pools config file...
    pools_file="./pools.txt"
    pool_args=""
    while read -r pool
    do
        $pool_args="$pool_args $pool"
    done < $pools_file

    # Add the api arguments...
    api_args="--api-listen --api-allow W:127.0.0.1"

    # Start the miner...
    nohup cgminer $pool_args $api_args &> $miner_log
fi