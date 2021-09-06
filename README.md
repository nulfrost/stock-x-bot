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

You'll need a token and the bot client id for the bot if you want it to run, this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) will walk you through getting a token and inviting the bot to your server. You should also be able to find out where the bot client is while following this guide.

#### Environment Variables

Next, you'll need to add environment variables to the `.env.sample` and then rename it to just `.env`.

If you plan on extending this bots functionality then you'll need to add two environment variables to the `.env` file.

```bash
BOT_TOKEN=token for bot that runs in production
BOT_TOKEN_DEV=token for bot used for development
BOT_CLIENT_ID=the client id for the bot
```

Currently it's set up to where you have a bot running live and out in the world and then a second one that you would use for development.

You can change it as you please if you want to, this is just the way I've set it up.

If you only care about just running this bot in your server then just add a token to BOT_TOKEN, otherwise fill out the environment variables with different bot tokens.

## Run Locally

#### Personal Use

Currently it is set up to fetch environment variables from AWS when running in production mode, if you just want to run the bot then make sure your BOT_TOKEN environment variable is set and change these lines of code. (Red means remove, green means add.)

```diff
// index.ts
- const region = "us-east-1";
- const secretName = "stockx-bot-token";
```

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

#### Development

If you're interested in developing this bot further then you still wouldn't need to change much, just remove any AWS related code similar to the previous step. If you decide to also stick to the two token method of developing then your log in function would look something like this.

```diff
- client.login(isDev && process.env.BOT_TOKEN_DEV);
+ client.login(isDev ? process.env.BOT_TOKEN_DEV : process.env.BOT_TOKEN);
```

This bot uses discords new slash commands, to find out how to add and register new commands refer back to the same guide where you found out how to get a token [here](https://discordjs.guide/creating-your-bot/creating-commands.html#registering-commands).

## Docker

You'll still need to make the changes above but if you wanted your bot to be more portable you could dockerize it.

```bash
// build the image
docker build -t <your docker username>/stock-x-bot:latest .
// run the image
docker run --name stockxbot --env-file=.env -d <your docker username>/stock-x-bot:latest
```

## License

[MIT](https://github.com/nulfrost/stock-x-bot/blob/main/LICENSE)

## Authors

- [@nulfrost](https://www.github.com/nulfrost)
