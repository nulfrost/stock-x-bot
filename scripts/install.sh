#!/bin/env bash

set -e

curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
yum install -y nodejs
npm install -g pm2