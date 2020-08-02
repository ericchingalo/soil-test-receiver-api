const shell = require('shelljs');

startServer();

async function startServer() {
  command = `npm run start:prod`;
  shell.exec(command);
}
