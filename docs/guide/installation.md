---
title: Installation
description: Instructions on how to install Kayak
---

### Prerequisites

You'll need [node](https://nodejs.org/en/download/) and
[npm](https://github.com/npm/cli#super-easy-install) installed to use Kayak.

Check the [package.json](/package.json) (under `engines`) for the ideal version for Kayak.

### Method 1: Install package from NPM

`npm i -g kayak`

That simple. Kayak has now been installed, and can be used.

### Method 2: Manual install

This method is designed for development.

1. Pull the package from GitHub (`git clone https://github.com/elliottlmz/kayak.git`)
2. Open the command line in the package directory
3. Run `npm link`

`kayak` can now be used on the command line. Note that this may create some issues if you have
kayak installed via npm and installed manually.
