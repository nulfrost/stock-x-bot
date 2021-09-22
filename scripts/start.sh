#!/bin/env bash

cd /home/ec2-user/app

NODE_ENV=production pm2 start index.js