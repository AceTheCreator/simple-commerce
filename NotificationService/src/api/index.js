const Hermes = require('hermesjs');
const app = new Hermes();
const path = require('path');
const { yellow, gray, cyan } = require('chalk');
const buffer2string = require('./middlewares/buffer2string');
const string2json = require('./middlewares/string2json');
const json2string = require('./middlewares/json2string');
const logger = require('./middlewares/logger');
const errorLogger = require('./middlewares/error-logger');
const config = require('../lib/config');
const serverConfig = config.broker.amqp;
const AmqpAdapter = require('hermesjs-amqp');
const notifyWelcome = require('./routes/notify-welcome.js');

app.addAdapter(AmqpAdapter, serverConfig);

app.use(buffer2string);
app.use(string2json);
app.use(logger);

// Channels
console.log(cyan.bold.inverse(' SUB '), gray('Subscribed to'), yellow('notify/welcome'));
app.use(notifyWelcome);

app.use(errorLogger);
app.useOutbound(errorLogger);
app.useOutbound(logger);
app.useOutbound(json2string);

app
  .listen()
  .then((adapters) => {
    console.log(cyan.underline(`${config.app.name} ${config.app.version}`), gray('is ready!'), '\n');
    adapters.forEach(adapter => {
      console.log('🔗 ', adapter.name(), gray('is connected!'));
    });
  })
  .catch(console.error);
