# StockX Bot

[![Build docker image](https://github.com/nulfrost/stock-x-bot/actions/workflows/docker.yml/badge.svg)](https://github.com/nulfrost/stock-x-bot/actions/workflows/docker.yml)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

StockX Bot is an idea for a discord bot I came up with in my spare time, it doesn't do much besides fetching data for an item on stockx but I plan to add more functionality at some point.

## Setup

There are a few things needed to get the bot up and running if you would like to use this for your own server or use this bot as a base to create something more complex.

#### Clone the project and install the dependencies

```bash
git clone https://github.com/nulfrost/stock-x-bot.git

cd stock-x-bot

npm install
```

#### Bot token

You'll need a token for the bot if you want it to run, this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) will walk you through getting a token and inviting the bot to your server.

#### Environment Variables

Next, you'll need to add environment variables to the `.env.sample` and then rename it to just `.env`.

If you plan on extending this bots functionality then you'll need to add two environment variables to the `.env` file.

```bash
BOT_TOKEN=token for bot that runs in production
BOT_TOKEN_DEV=token for bot used for development
```

Currently it's set up to where you have a bot running live and out in the world and then a second one that you would use for development.

You can change it as you please if you want to, this is just the way I've set it up.

If you only care about just running this bot in your server then just add a token to BOT_TOKEN, otherwise fill out the environment variables with different bot tokens.

## Run Locally

Currently it is set up to fetch environment variables from AWS when running in production mode, to change it so it just reads from you local `.env` file you would need to change these lines.

```diff
// index.ts
- if (process.env.NODE_ENV === "production") {
-  aws.getSecretValue({ SecretId: secretName }, function (error, data) {
-    if (error) throw error;
-    let token = JSON.parse(data.SecretString);
-    client.login(token.BOT_TOKEN);
-  });
- }

- client.login(isDev && process.env.BOT_TOKEN_DEV);
+ client.login(process.env.BOT_TOKEN);
```
