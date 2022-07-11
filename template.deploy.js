const path = require("path")
const node_ssh = require("node-ssh")

const ssh = new node_ssh()

//const local_dir = ''
const remote_dir = '/home/wwwroot/default'

ssh.connect({
  host: '47.56.243.56',
  username: 'root',
  password: 'uo2F^84&#&xONguW',
}).then(async function() {
  // Command - Delete the old one
  await ssh.execCommand(`rm -r ${remote_dir}`).then(function(result) {
    console.log('STDOUT: ' + result.stdout)
    console.log('STDERR: ' + result.stderr)
  }).catch(function(reason) {
    console.log(reason)
  })
  // Putting entire directories
  var failed = []
  var successful = []
  await ssh.putDirectory(local_dir, remote_dir, {
    recursive: true,
    concurrency: 10,
    validate: function(itemPath) {
      const baseName = path.basename(itemPath)
      return baseName.substr(0, 1) !== '.' && // do not allow dot files
             baseName !== 'node_modules' // do not allow node_modules
    },
    tick: function(localPath, remotePath, error) {
      if (error) {
        failed.push(localPath)
      } else {
        successful.push(localPath)
      }
    }
  }).then(function(status) {
    console.log('the directory transfer was', status ? 'successful' : 'unsuccessful')
    console.log('failed transfers', failed.join(', '))
    console.log('successful transfers', successful.join(', '))
  }).catch(function(reason) {
    console.log(reason)
  })
  ssh.dispose()
})
