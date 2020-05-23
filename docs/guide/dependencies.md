---
title: Dependencies
description: Dependencies with Kayak
---

The main reason you're using a package manager is likely because of dependencies.

Your `rotriever.toml` file will declare what dependencies your package requires, and these
dependencies will be included by Kayak for you!

## Declaring dependencies

Let's go to `my-awesome-package`'s `rotriever.toml` file and make some changes!

Let's add the following to our rotriever.toml:

```lua
[dependencies]
Roact = { git = "https://github.com/roblox/roact.git" }
```

!!! note
    For this guide, we'll be using [Roact](https://github.com/roblox/roact) as an example
		dependency; however, you can use any repository so long as it has a valid `rotriever.toml` file
		in its root.

## Accessing dependencies

In our script, dependencies are included in the 'root' of our package.

Here's an example tree:
```
	my-package
		Roact (this is where our package is outputted using the name we specified)
		my-awesome-package (this is where our `content_root` will be)
```

Now we've added our dependency, we can use it!

```diff
local module = {}

+ local Roact = require(script.Parent.Roact)

function module:GetAwesomeness()
	return "Very awesome!"
end

return module
```

!!! warning
    Dependencies can't use `dependencies_root`, that's only respected if you're running the
		`kayak pull` command *for* your package. In other words, `dependencies_root` is only for the
		top-level package.

## Branches

Sometimes you'll need to pull a specific branch for your package, here's how.

We'll change our dependency definition from a string to an object. We'll use `git` to specify
the repository, and `rev` to specify our branch.

This is what it looks like:
```toml
[dependencies]
Roact = "https://github.com/roblox/roact.git"
My-Branched-Package = { git = "https://github.com/me/branched-package.git", rev = "my-branch" }
```