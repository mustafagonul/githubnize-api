#!/bin/bash

sleep 15
mongo githubnize-travis-ci --eval 'db.createCollection("GithubnizeUsers");'
mongo githubnize-travis-ci --eval 'db.createCollection("GithubnizeGroups");'
mongo githubnize-travis-ci --eval 'db.createUser({user:"githubnize-travis-ci",pwd:"123456", roles:[{role:"readWrite",db:"githubnize-travis-ci"}]});'