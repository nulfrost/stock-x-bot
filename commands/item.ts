import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { BaseCommandInteraction } from "discord.js";
import StockXAPI from "stockx-api";
const stockx = new StockXAPI();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("item")
    .setDescription("Get info about a product on Stock X"),
  async execute(interaction: BaseCommandInteraction) {
    try {
      const embed = new MessageEmbed().setColor("#FF8C61").setTimestamp();
      let response = await stockx.newSearchProducts("grim reaper", {
        limit: 1,
      });

      let item = response[0];

      embed
        .setThumbnail(item.thumbnail_url)
        .setAuthor(
          item.name,
          item.thumbnail_url,
          `https://stockx.com/${item.url}`
        )
        .addFields(
          { name: "Company", value: item.brand, inline: true },
          {
            name: "Release date",
            value: new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
            }).format(new Date(item.release_date)),
            inline: true,
          },
          {
            name: "Category",
            value: item._highlightResult?.product_category?.value,
            inline: true,
          },
          { name: "Retail price", value: `${item.price} USD`, inline: true },
          {
            name: "Highest bid",
            value: `${item.highest_bid} USD`,
            inline: true,
          },
          {
            name: "Lowest ask",
            value: `${item.lowest_ask} USD`,
            inline: true,
          },
          {
            name: "Description",
            value: item.description
              .split(".")
              .splice(0, 3)
              .map((sentence) => `${sentence}.`)
              .join(""),
          }
        );

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      if (error.message === "No products found") {
        await interaction.reply("Could not find item, please check spelling.");
        return;
      }

      await interaction.reply(
        "There was an error fetching the item data, try again in a few minutes."
      );
    }
  },
};
