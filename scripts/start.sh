#!/bin/env bash

cd /home/ec2-user/app

pm2 start index.js --name stockx -- run start