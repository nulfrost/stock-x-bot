import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "Replies with a list of commands that are currently available"
    ),
  async execute(interaction: CommandInteraction) {
    const embed = new MessageEmbed().setColor("#FF8C61").setTimestamp();
    embed
      .setAuthor("Commands")
      .addFields(
        { name: "item <item name>", value: "Search for an item by name" },
        { name: "help", value: "Show a list of the current commands" }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
