---
title: Using Kayak in Games
description: Introduction to Kayak in game development
---

You're probably gonna need a *lot* of dependencies in a game; thankfully, Kayak was designed with
Roblox games in mind.

We'll need to add a `dependencies_root` to our `rotriever.toml` file, and remove our `content_root`.
This is because games work slightly differently.

Here's what our `rotriver.toml` will look like:

```toml
[package]
name = "my-awesome-game"
author = "me"
license = ""
version = "0.1.0"
dependencies_root = "./packages"
```

This means that all our dependencies will be outputted in the `packages` folder.

## Adding some dependencies

Let's add a few dependencies. We cover this more in our [dependencies](/guide/dependencies) tutorial.

```diff
[package]
name = "my-awesome-game"
author = "me"
license = ""
version = "0.1.0"
dependencies_root = "./packages"

+ [dependencies]
+ Roact = "https://github.com/roblox/roact.git"
+ Rodux = "https://github.com/roblox/rodux.git"
+ Roact-Rodux = "https://github.com/roblox/roact-rodux.git"
```

## Pulling our dependencies

Assuming you've [installed Kayak](/guide/installation), we can run the `kayak pull` command in our
game's folder. All goes well, it'll pull our packages and put them into our `dependencies_root`.

## Accessing our dependencies

It's up to you to add the `dependencies_root` to your Rojo tree; we suggest adding it to
`ReplicatedStorage.Packages`

We can access our dependencies with this format:

```lua
-- Only our specified dependencies will be in the root of "Packages", we can find them by their
-- specified name.
local Roact = require(ReplicatedStorage.Packages.Roact)
```

### Package Indexes

The `_index` folder inside of our `dependencies_root` will house _all_ of the packages.

The package folder will be named based on what the package itself is named as.

Inside of the folder, we'll find the package's `content_root` and
[links](/guide/advanced/package-links) to any dependencies of the package.