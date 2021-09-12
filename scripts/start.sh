#!/bin/env bash

cd /home/ec2-user/app

 pm2 start npm --name stockx -- run start