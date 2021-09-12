import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import AWS from "aws-sdk";
require("dotenv").config();

const aws = new AWS.SecretsManager({
  region: "us-east-1",
});

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

if (process.env.NODE_ENV !== "production") {
  const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN_DEV);
  (async () => {
    try {
      await rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), {
        body: commands,
      });

      console.log("Successfully registered application commands.");
    } catch (error) {
      console.error(error);
    }
  })();
}

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
