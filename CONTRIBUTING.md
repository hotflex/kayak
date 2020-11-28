# Contributing to Kayak

## Code

Code contributions are welcome for features and bugs that have been created as issues on the repo.

To help make sure nobody wastes their time, be sure to create an issue for any features or bugs
before starting work; this way everyone can discuss their thoughts on a feature, or make sure there
is an accurate repro for a bug.

## Bug Reports and Feature Requests

We try to be clear when an issue is a bug. Even if it isn't, sometimes things don't work quite
right.

Sometimes there's something that Kayak doesn't do that it probably should.

Please file issues and we'll try to help figure out what the best way forward is.

## Publishing a release

1. Bump version in [`package.json`](/package.json)
2. Update [`CHANGELOG.md`](/CHANGELOG.md)
3. Commit!
   - `git add . && git commit -m "Release vX.Y.Z"
4. Tag the commit with the version from `package.json` prepended with a v, like `v0.4.13`
5. Publish the CLI
   - `npm publish . --visibility public`
6. Publish commits and tags
   - `git push && git push --tags`
7. Copy GitHub release content from previous release
   - Update the leading text with a summary about the release
   - Paste the changelog notes (as is) from [`CHANGELOG.md`](/CHANGELOG.md)
   - Write a small summary of each major feature

---

> This document is partly inspired by the
> [Rojo contribution guidelines](https://github.com/rojo-rbx/rojo/blob/master/CONTRIBUTING.md)
