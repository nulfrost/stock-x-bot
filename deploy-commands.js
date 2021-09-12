const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

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
      await rest.put(
        Routes.applicationCommands(process.env.BOT_CLIENT_ID_DEV),
        {
          body: commands,
        }
      );

      console.log("Successfully registered application commands.");
    } catch (error) {
      console.error(error);
    }
  })();
  return;
}

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN_PROD);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID_PROD), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
