import { exec } from 'child_process'

export function check() {
  return new Promise((resolve, reject) => {
    exec('git version', (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        const valid = (stdout.indexOf('git version') === 0)
        resolve(valid)
      }
    })
  })
}
