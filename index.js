const Discord = require("discord.js");
const client = new Discord.Client();
const StockXAPI = require("stockx-api");
require("dotenv").config();

const prefix = "%";
const stockx = new StockXAPI();

client.once("ready", () => {
  console.log(`${client.user.tag} started running on ${new Date()}`);
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "item") {
    try {
      let response = await stockx.newSearchProducts(args.join(" "), {
        limit: 1,
      });

      let item = response[0];

      let embed = new Discord.MessageEmbed()
        .setColor("#FF8C61")
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
          { name: "Description", value: item.description }
        )
        .setTimestamp();
      message.channel.send(embed);
    } catch (error) {
      if (error.message === "No products found") {
        return message.channel.send(
          "Could not find shoe, please check spelling."
        );
      }
      message.channel.send(
        "There was an error fetching the shoe data, try again in a few minutes."
      );
    }
    i;
  }
});

client.login(process.env.BOT_TOKEN);
