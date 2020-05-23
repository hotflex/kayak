<h1 align="center">Kayak</h1>
<div align="center">
	<!-- include some shields -->
</div>

<div align="center">
	A Roblox package manager based on Rotriever.
	Designed to be used with <a href="https://rojo.space">Rojo</a>.

    ⚠ Unstable pre-release! ⚠

</div>

## Installation

### Prerequisites

You'll need [node](https://nodejs.org/en/download/) and
[npm](https://github.com/npm/cli#super-easy-install) installed to use Kayak.

Check the [package.json](/package.json) (under `engines`) for the ideal version for Kayak.

### Method 1: Install package from NPM

> ⚠ Kayak has not yet been published to npm.
> Do not try to follow these instructions.

`npm i -g kayak`

That simple. Kayak has now been installed, and can be used.

### Method 2: Manual install

This method is designed for development.

1. Pull the package from GitHub (`git clone https://github.com/elliottlmz/kayak.git`)
2. Open the command line in the package directory
3. Run `npm link`

`kayak` can now be used on the command line. Note that this may create some issues if you have
kayak installed via npm and installed manually.

## Why

Managing dependencies is very complicated. Roblox developers generally use
[Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules), however, this is not a
perfect solution for a few reasons:

1. Git Submodules does not cleanly handle dependencies; meaning your dependencies will be included
   multiple times.
2. Git Submodules can be really annoying in general.
3. Git Submodules isn't a package manager.

Roblox engineers have created their own package manager called "Rotriever". However, due to
internal obstacles, it has not been released yet. Kayak is designed to mimic the behaviour of
Rotriever until it is released.

## Contributions

Check out the [contributions guide](/CONTRIBUTING.md) for detailed instructions for contributing to
Kayak. Pull requests are welcome!

Be sure to follow the [code of conduct](/CODE_OF_CONDUCT.md) at all times.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
