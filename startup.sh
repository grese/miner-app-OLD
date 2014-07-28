#!/bin/bash

mongod &> ../logs/mongod.log
npm start &> ../logs/server.log