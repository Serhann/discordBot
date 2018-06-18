const io = require('socket.io-client');
const moment = require('moment');
const base = 'http://discordbot.svobot.com';
const socket = io.connect(base);
const request = require('superagent');

class DiscordBot {
    /**
     * @param {string} secret Verdiğimiz secret.
     */
    constructor(secret) {
        this.secret = secret;
      
        socket.emit('join', { token: secret });

        socket.on('info', function (data) {
            log('info', 'info', data.message);
        });

        socket.on('log', function (data) {
            log(data.id, 'info', data.message);
        });

        socket.on('error', function (data) {
            log(data.id, 'error', data.message);
        });
    }

    /**
     * @param {object} config Botunuzun ayarlar bölümü.
     */
    async startBot(config) {
        try {
          request
            .post(base + '/start')
            .send({ secret: this.secret, config })
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
               if (err) throw 'Error: ' + err.message;
               else return console.log(res.body);
            });
        } catch (err) {
            throw 'Error: ' + err.message;
        }
    }
  
    /**
     * @param {object} id Botunuzun idsi.
     */
    async stopBot(id) {
        try {
          request
            .post(base + '/stop')
            .send({ secret: this.secret, id })
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
               if (err) throw 'Error: ' + err.message;
               else {
                    console.log(res.body);
                    process.exit(0);
               }
            });
        } catch (err) {
            throw 'Error: ' + err.message;
        }
    }
}

module.exports = DiscordBot;

async function log(prefix, type, message) {
    //if (!prefix || !type || !message) throw 'MISSING_PARAMS';
    var typeColor;

    switch(type) {
        case 'info':
            typeColor = colors.fg.green;
            break;
        case 'warn':
            typeColor = colors.fg.yellow;
            break;
        case 'error':
            typeColor = colors.fg.red;
            break;
    }

    var prefixedLog = `[${typeColor}${prefix.toUpperCase()}${colors.reset}] [${colors.fg.cyan}${moment().format('YYYY-MM-DD HH:mm:ss')}${colors.reset}] [${typeColor}${type}${colors.reset}] ${typeColor}${message}${colors.reset}`;

    console.log(prefixedLog);
}

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
  },

  bg: {
      black: "\x1b[40m",
      red: "\x1b[41m",
      green: "\x1b[42m",
      yellow: "\x1b[43m",
      blue: "\x1b[44m",
      magenta: "\x1b[45m",
      cyan: "\x1b[46m",
      white: "\x1b[47m",
  }
};
