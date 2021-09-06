import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
require("dotenv").config();

const isDev = process.env.NODE_ENV !== "production";

const commands = [];
const commandFiles = isDev
  ? fs.readdirSync("./commands").filter((file) => file.endsWith(".ts"))
  : fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

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
