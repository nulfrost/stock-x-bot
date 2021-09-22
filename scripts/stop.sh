#!/bin/env bash

cd /home/ec2-user/app

pm2 stop --silent stockx
pm2 delete --silent stockx