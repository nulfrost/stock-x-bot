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

  if (command === "shoe") {
    try {
      let shoe = await stockx.newSearchProducts(args.join(" "), {
        limit: 1,
      });

      const embed = new Discord.MessageEmbed()
        .setColor("#FF8C61")
        .setThumbnail(shoe[0].thumbnail_url)
        .setAuthor(
          shoe[0].name,
          shoe[0].thumbnail_url,
          `https://stockx.com/${shoe[0].url}`
        )
        .addFields(
          { name: "Company", value: shoe[0].brand, inline: true },
          {
            name: "Released date",
            value: new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
            }).format(new Date(shoe[0].release_date)),
            inline: true,
          },
          {
            name: "Category",
            value: shoe[0]._highlightResult?.product_category?.value,
            inline: true,
          },
          { name: "Retail price", value: `${shoe[0].price} USD`, inline: true },
          {
            name: "Highest bid",
            value: `${shoe[0].highest_bid} USD`,
            inline: true,
          },
          {
            name: "Lowest ask",
            value: `${shoe[0].lowest_ask} USD`,
            inline: true,
          },
          { name: "Description", value: shoe[0].description }
        )
        .setTimestamp();
      message.channel.send(embed);
      console.log(shoe[0]);
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
