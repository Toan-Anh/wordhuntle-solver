import yargs from 'yargs'
import { solve } from './solve'

yargs
  .usage('$0 <command>')
  .command(
    'solve',
    'solves the puzzle and list out the words along with their sequences',
    function (yargs) {
      return yargs
        .usage('$0 [--board <characters>] [--cutOff <wordLength>]')
        .option('board', {
          describe: 'The puzzle board as a string of characters read from left to right, top to bottom.',
          type: 'string',
          demandOption: true,
          requiresArg: true,
        })
        .option('dict', {
          describe: 'Path to the dictionary',
          type: 'string',
          demandOption: true,
          requiresArg: true,
        })
        .option('cutOff', {
          describe: 'The word length cut off point. Words longer than this will not be included.',
          default: 8,
          type: 'number',
          requiresArg: true,
        })
        .option('includeDiagonals', {
          describe:
            ' Whether to include diagonal letters when looking up, or only strictly adjacent letters (up, down, left, right).',
          default: true,
          type: 'boolean',
        })
    },
    argv => {
      solve(argv)
    }
  )
  .demand(1, 'Please specify a command. Use --help to see a list of commands.')
  .strict()
  .help('h')
  .alias('h', 'help')
  .wrap(null).argv
