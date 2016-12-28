'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var inquirer = require('inquirer');

exports.default = function () {
  inquirer.prompt([{
    type: 'list',
    name: 'cmd',
    message: 'What do you want to do?',
    choices: ['Test cmd 1', 'Test cmd 2', 'Test cmd 3']
  }]).then(function (answers) {
    console.log(answers);
  });
};
//# sourceMappingURL=gan.js.map