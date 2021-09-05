const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN_DEV);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        "883853102107725854",
        "857125899605508106"
      ),
      { body: commands }
    );

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
