#!/bin/env bash

cd /home/ec2-user/app

pm2 describe appname > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start npm --name stockx -- run start
else
  pm2 stop stockx
fi;