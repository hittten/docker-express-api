const fs = require('fs');
const env = require('./env');

const args = process.argv.splice(2);
env.dbHost = args[0];
env.user = args[1];
env.pass = args[2];

const data = JSON.stringify(env);
const file = `module.exports = ${data};`;

console.log(file);

fs.writeFileSync('env.js', file, 'utf-8');
