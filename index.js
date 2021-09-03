const Discord = require("discord.js");
const client = new Discord.Client();
const StockXAPI = require("stockx-api");
require("dotenv").config();
const AWS = require("aws-sdk");

const prefix = "!";
const region = "us-east-1";
const secretName = "stockx-bot-token";
const stockx = new StockXAPI();

const aws = new AWS.SecretsManager({
  region: region,
});

client.once("ready", async () => {
  await client.user.setActivity(
    `Serving ${client.guilds.cache.size} hypebeasts`
  );
  console.log(`${client.user.tag} started running on ${new Date()}`);
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  let embed = new Discord.MessageEmbed().setColor("#FF8C61").setTimestamp();

  if (command === "item") {
    try {
      let response = await stockx.newSearchProducts(args.join(" "), {
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
      message.channel.send(embed);
    } catch (error) {
      if (error.message === "No products found") {
        return message.channel.send(
          "Could not find item, please check spelling."
        );
      }
      message.channel.send(
        "There was an error fetching the item data, try again in a few minutes."
      );
    }
  } else if (command === "help") {
    embed
      .setAuthor("Commands")
      .addFields(
        { name: "prefix", value: prefix },
        { name: "item <item name>", value: "Search for an item by name" },
        { name: "help", value: "Show a list of the current commands" }
      );
    message.channel.send(embed);
  }
});

if (process.env.NODE_ENV === "production") {
  aws.getSecretValue({ SecretId: secretName }, function (error, data) {
    if (error) throw error;
    let token = JSON.parse(data.SecretString);
    client.login(token.BOT_TOKEN);
  });
}

client.login(process.env.BOT_TOKEN);
