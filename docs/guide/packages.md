---
title: Package Basics
description: Basics of Kayak packages
---

Packages are crucial to Kayak. They define data about what a package is, and most importantly,
what other packages it depends on.

## Creating a Package file

!!! note
    In this tutorial, we go over the basics of packages and dependencies.
		We talk about using Kayak in a game later on.

In our project root, we'll create a file called `rotriever.toml`. TOML is a language for storing
configuration in an easy to read way. You can learn more about it [here](https://github.com/toml-lang/toml).

We'll put the following in our package. Don't worry if it's confusing, we'll explain how it all
works:

```toml
[package]
name = "my-awesome-package"
author = "me"
license = ""
version = "1.0.0"
```

So let's break this down!

- **name**: This is the name of our package. While you _can_ put anything in here, special
characters will be crushed to underscores when being loaded in the file system.
**This is required**
- **author**: The creator of the package! This currently isn't required, and has no purpose in
Kayak, but it's good to include.
- **license**: The [license](https://choosealicense.com) the package is released under. Again, this
is optional; but it'd be good to include (even if it's just `See LICENSE.md`!)
- **version**: The [SemVer](https://semver.org) of this package. This is required, and you need to
follow the semver format!

## Creating some code

Now we've defined our package, it's time to write some code.

While you normally can put all of your lua code in the root (aka workspace), it's not ideal
but more importantly, you can't do this with Kayak! A folder with your source (called a content
root) is required for Kayak to be able to understand your package and make sure that the lua code
used in games is *the actual code*, not various stuff you may need in development, testing, etc.

We'll add to our package the following line:

```toml
content_root = "./src"
```

Our package file will now look like this:

```toml
[package]
name = "my-awesome-package"
author = "me"
license = ""
version = "1.0.0"
content_root = "./src"
```

We're telling Kayak that all our code can be found in the `src` folder, so let's create it!

### Writing our code

We'll add an `init.lua` file, this means that `my-awesome-package` will be made into a Roblox
ModuleScript via Rojo.

Here's what we'll put in our module:

```lua
local module = {}

function module:GetAwesomeness()
	return "Very awesome!"
end

return module
```

## Publishing our package

Kayak, at it's heart, uses [Git](https://guides.github.com/introduction/git-handbook/) as a package
index/registry. While [proxies](/advanced/proxies) are a feature, they're beyond the scope of this
introduction guide.

We're not going to go over how to create and setup a Git repository; but we'll be using GitHub as
our 'remote' for this tutorial.

## Using our package

Once our package has been published, it can now be used!

We go over [using packages in games](/guide/games) and [package dependencies](/guide/dependencies)
later on in the guide.