#!/bin/bash

# Cgminer logs file...
miner_log="./logs/cgminer.log"

# Read the config file first...
custom_file="./custom.conf"
custom_config=""
read -r $custom_config<$custom_file

if [ -n "$custom_config" ]; then
    # If the miner config is not empty... Use it instead of default.

    # Start the miner...
    eval `nohup $custom_config &> $miner_log`
else
    # The miner_config file is empty so we will use the default config...

    # Read the default config file...
    conf_file="./miner.conf"

    # Start the miner...
    nohup ../../cgminer-4.4.1/cgminer --config ./miner.conf >$miner_log 2>&1&
fi