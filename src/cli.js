import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { envset } from './envset.js';

//function main() {
  yargs(hideBin(process.argv))
    .command(
      '$0 <targetKey> <command>',
      'Execute a command and save its output to an environment variable in an env file',
      (yargs) => {
        yargs
          .positional('targetKey', {
            describe: 'The target environment variable key',
            type: 'string',
          })
          .positional('command', {
            describe: 'The command to execute',
            type: 'string',
          })
          .option('envFile', {
            alias: 'e',
            type: 'string',
            default: '.env',
            describe: 'The env file to save the environment variable',
          });
      },
      ({ targetKey, command, envFile }) => {
        envset(targetKey, command, envFile);
      }
    )
    .help().argv;
//}

// // Call the main function only when the module is executed directly
// if (import.meta.url === `file://${process.argv[1]}`) {
//   main();
// }
