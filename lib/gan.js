const inquirer = require('inquirer')

export default () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'cmd',
      message: 'What do you want to do?',
      choices: [
        'Test cmd 1',
        'Test cmd 2',
        'Test cmd 3',
      ],
    },
  ]).then((answers) => {
    console.log(answers)
  })
}
