# Wordhuntle Solver

Solver for mtomko87's Wordhuntle game https://github.com/mtomko87/wordhuntle

## Command

```console
yarn solve --board <board-letters> --dict <path-to-dictionary> [--cutOff <number-of-letters>]
```

- `--board`: Board letters are read from left to right, top to bottom, written without space. E.g. `abcdefghijklmnop`
- `--dict`: Path to the dictionary/word list to use. Two word lists are included in the source under `./dictionaries`. Original game uses the Mieliestronk word list.
- `--cutOff`: The maximum word length to look for. This is for bailing early and saving some look up time. Defaults to `8`.
