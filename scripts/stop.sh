#!/bin/env bash

cd /home/ec2-user/app

npm install -g pm2
pm2 delete all