# Correlation-One Terminal Live Uploader

Are you too lazy to wait for your algo to upload to [c1games.com](https://terminal.c1games.com/)? Do you wish there was a clunky unreliable automated web browser to do it for you?

Then you're in luck!


## setup

```sh
git clone https://github.com/davidmcnamee/terminal-uploader
yarn
cp .env.example .env
```

Fill in `.env` with your Github login credentials.

Then go to your `.bashrc` or `.zshrc` and add the following snippet:
```sh
function upload {
  currentDir=$(pwd)
  filePath="$(cd "$(dirname "$1")"; pwd -P)/$(basename "$1")"
  cd path/to/terminal-uploader && # make sure to fill in this line!!!
  yarn start $filePath
  cd $currentDir
}
export upload
```

Reload your shell
```sh
source ~/.bashrc
# or
source ~/.zshrc
```

Now, you can run `upload relative/path/to/folder` from anywhere in your shell.


🎉🎉🎉

