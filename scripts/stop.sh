#!/bin/env bash
set -euo pipefail

cd /home/ec2-user/app

pm2 stop --silent stockx