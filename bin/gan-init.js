const program = require('commander')

program
  .parse(process.argv)

const fs = require('fs')

fs.writeFile('gan.yml', '', (error) => {
  if (error) {
    console.log(error)
  }
  console.log('success')
})
