const Discord = require("discord.js");
const client = new Discord.Client();
var moment = require('moment');
var JsonDB = require('node-json-db');
var db = new JsonDB('harvojidb', true, true);
const prefix = "!"

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? ' <:thonkplant:341003384754798613> ' + ' Heads' : ' <:angerythonk:341003252478771200> ' + ' Tails';
};

function next_wednesday() {
  var todaysdate = moment();
  day_of_week = moment().day();
  if (day_of_week >= 0 && day_of_week <= 3) {
    var wednesday = moment().day(3);
  } else {
    var wednesday = moment().day(10);
  }
    return wednesday.diff(todaysdate, 'days');
};

function removephrase() {
  db.delete("/harvoji/phrases[-1]");
  db.delete('/harvoji/phrase_responses[-1]');
}

function removechat() {
  db.delete("/harvoji/chats[-1]");
  db.delete('/harvoji/chat_responses[-1]');
}

var commands = [
  'coinflip',
  'removephrase',
  'removechat'
];
var command_responses = [
  coinFlip,
  removephrase,
  removechat,
];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame('Dentwood like a fiddle');
});

client.on('message', msg => {
  if (msg.author.bot) return;
    if (msg.content.substring(0,10) === '!addphrase') {
      console.log('Attempting to add phrase');
      var addcommand = '';
      addcommand = msg.content.split(' ');
      if (typeof addcommand[1] === 'string' && typeof addcommand[2] === 'string') {
        console.log('Adding ' + addcommand[1] + '/' + addcommand[2] + ' as a phrase');
        db.push('/harvoji/phrases[]',addcommand[1],true);
        db.push('/harvoji/phrase_responses[]',addcommand[2],true);
      } else {
        console.log('Invalid phrase');
      }
    }
});

client.on('message', msg => {
  if (msg.author.bot) return;
    if (msg.content.substring(0,8) === '!addchat') {
      console.log('Attempting to add chat');
      var addcommand = '';
      addcommand = msg.content.split(' ');
      if (typeof addcommand[1] === 'string' && typeof addcommand[2] === 'string') {
        console.log('Adding ' + addcommand[1] + '/' + addcommand[2] + ' as a chat');
        db.push('/harvoji/chats[]',addcommand[1],true);
        db.push('/harvoji/chat_responses[]',addcommand[2],true);
      } else {
        console.log('Invalid chat');
      }
    }
});

client.on('message', msg => {
  if (msg.author.bot) return;
  var phrases = db.getData('/harvoji/phrases');
  var phrase_responses = db.getData('/harvoji/phrase_responses');
    for (var i = 0; i < phrases.length; i++)
      if (msg.content.includes( phrases[i])) {
        msg.channel.send( phrase_responses[i]);
      }
});

client.on('message', msg => {
  if (msg.author.bot) return;
    for (var i = 0; i < commands.length; i++)
      if (msg.content === prefix + commands[i]) {
        msg.channel.send( command_responses[i]());
      }
});

client.on('message', msg => {
  if (msg.author.bot) return;
  var chats = db.getData('/harvoji/chats');
  var chat_responses = db.getData('/harvoji/chat_responses');
    for (var i = 0; i < chats.length; i++)
      if (msg.content === chats[i]) {
        msg.channel.send( chat_responses[i]);
      }
});

client.on('message', msg => {
  if (msg.content === 'wednesday') {
    if (msg.author.bot) return;
    if (moment().day() === 3) {
      msg.channel.send( 'http://i.imgur.com/RbUMGOM.png');
    } else {
      msg.channel.send( 'https://i.imgur.com/acdqKqi.png');
    }
  }
});

client.on('message', msg => {
  if (msg.content === 'wednesday countdown') {
    if (msg.author.bot) return;
    if (moment().day() === 3) {
      msg.channel.send( 'http://i.imgur.com/RbUMGOM.png');
    } else {
      msg.channel.send( 'Wednesday in ' + next_wednesday() + ' days.');
    }
  }
});

db.reload()

client.login('MzQxMjUxNjEwMTcwNjIxOTUy.DF-lQA.7pxD2fslKE5ixYdYCZRsCKmXdP0');
