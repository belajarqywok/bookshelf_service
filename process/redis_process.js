const { exec } = require('child_process');

const exeFilePath = 'F:\\command\\redis\\redis-server.exe';

exec(exeFilePath, (error, stdout, _stderr) => {
  if (error) {
    console.error(`Error executing the .exe file: ${error.message}`);
    return;
  }
  console.log(`.exe file output: ${stdout}`);
});
