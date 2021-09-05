import fs from "fs";
import { Client, Collection, Intents } from "discord.js";
import AWS from "aws-sdk";
require("dotenv").config();

const region = "us-east-1";
const secretName = "stockx-bot-token";
const isDev = process.env.NODE_ENV !== "production";
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// @ts-ignore
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // @ts-ignore
  client.commands.set(command.data.name, command);
}

const aws = new AWS.SecretsManager({
  region: region,
});

client.once("ready", async () => {
  await client.user.setActivity(
    `Serving ${client.guilds.cache.size} hypebeasts`
  );
  console.log(`${client.user.tag} started running on ${new Date()}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  // @ts-ignore
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

if (process.env.NODE_ENV === "production") {
  aws.getSecretValue({ SecretId: secretName }, function (error, data) {
    if (error) throw error;
    let token = JSON.parse(data.SecretString);
    client.login(token.BOT_TOKEN);
  });
}

client.login(isDev ? process.env.BOT_TOKEN_DEV : process.env.BOT_TOKEN);