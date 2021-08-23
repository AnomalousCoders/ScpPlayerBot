/**
 *
 * THIS PROJECT IS DISCONTINUED! The Code still here for archivation purposes, though it WON'T WORK ANYMORE. Please refer to the readme.md.
 */

const Discord = require("discord.js");
const client = new Discord.Client();
const md5 = require("crypto-js/md5");
const fetch = require("node-fetch");
const { token, ip, port } = require("./config.json");

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log("Successfully started up!\n\n");
  await client.user.setPresence({
    activity: { name: "Starting...", type: "PLAYING" },
    status: "idle",
  });
  checkOnlinePlayers();
  setInterval(checkOnlinePlayers, 60000);
});

client.login(token);

async function checkOnlinePlayers() {
  const hashedAddress = md5(`${ip}:${port}`);
  const response = await fetch(`https://sls.helight.dev/game/${hashedAddress}`);
  if (response.status === 404) {
    return console.error(
      "Server is offline or the provided IP and/or port is invalid."
    );
  } else if (response.status.toString().match(/5../)) {
    return console.warn(
      "Something is wrong with the Server / Gateway, please try again later."
    );
  }
  const responsejson = await response.json();
  const date = new Date();
  console.log(
    `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${ip} queried. ${
      responsejson.players
    }/${responsejson.maxPlayers} players online.`
  );
  await client.user.setPresence({
    activity: {
      name: `${responsejson.players.toString()}/${responsejson.maxPlayers.toString()}`,
      type: "PLAYING",
    },
    status: "online",
  });
}
