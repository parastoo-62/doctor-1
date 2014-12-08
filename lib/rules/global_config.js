'use strict';

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var userHome = require('user-home');

exports.description = 'Global configuration file is valid';

exports.verify = function() {
  var configPath = path.join(userHome, '.yo-rc-global.json');

  if (!fs.existsSync(configPath)) return;

  try {
    JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (err) {
    if (err instanceof SyntaxError) {
      var output = [
      'Your global config file is not a valid JSON.',
      'It contains the following syntax error: \n  ' + err.message,
      'Please open ' + chalk.magenta(configPath) + ' and fix it manually.'
      ].join('\n');
      return output;
    } else {
      return err.message;
    }
  }
}