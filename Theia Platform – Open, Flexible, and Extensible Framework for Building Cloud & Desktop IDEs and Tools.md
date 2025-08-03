---
title: "Theia Platform – Open, Flexible, and Extensible Framework for Building Cloud & Desktop IDEs and Tools"
source: "https://theia-ide.org/docs/composing_applications/"
author:
  - "[[Authoring Theia Extensions]]"
  - "[[Authoring VS Code Extensions]]"
  - "[[documentation on how to create custom Theia extensions]]"
  - "[[our guide on how to add VS Code extensions to your custom Theia application]]"
  - "[[this guide]]"
  - "[[here]]"
  - "[[Theia extensions]]"
  - "[[VS Code Extensions]]"
published:
created: 2025-08-02
description: "Discover the Theia Platform, an open-source framework for building custom and tailored cloud and desktop IDEs and tools using modern web technologies without forking. Fully extensible and vendor-neutral, Theia enables the development of tailored, white-labeled, and domain-specific tools, supporting Language Server Protocol (LSP), VS Code extensions, and AI integration."
tags:
  - "clippings"
---
## Build your own IDE/Tool

This guide will teach you how to create your own Theia-based application. The guide will demonstrate how to configure your own application composed of existing or new Theia extensions, and any VS Code extensions you want bundled in your application by default. Please get familiar with the [extension mechanisms of Theia](https://theia-ide.org/docs/extensions/) in case you are not already. We provide two entry points for creating your own Theia-based application.

- [Theia Yeoman generator](https://github.com/eclipse-theia/generator-theia-extension): Generates Theia-based applications along with example extensions.
- [Theia IDE](https://theia-ide.org/#theiaide): A tool based on the Theia Platform that can be used as a template for creating installable desktop applications based on Theia with additional features such as automatic updates, branding, etc.. [Learn how to extend and adapt the Theia IDE](https://theia-ide.org/docs/blueprint_documentation/).

If you are new to Theia, we recommend starting with the first option, as it is quicker and simpler to get started with. If you want to create a full product based on Theia, you can later on switch to using the Theia IDE without loosing your existing work by integrating your extensions into your custom version of the Theia IDE. In this guide, we will demonstrate how to get started with the [Yeoman Generator](https://github.com/eclipse-theia/generator-theia-extension).

## Requirements

The detailed list of prerequisites is located at the main Theia repository:

- [Prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites)

## Theia’s Architecture

A Theia app is composed of so-called Theia extensions. Each extension resides in its own npm package. An extension provides a set of features, e.g. widgets, commands, handlers, etc. for a specific functionality. The Theia project itself ships a number of extensions for common features, e.g. for editors, terminals, the project view etc. You can resue these existing extensions by just adding them to you custom Theia application. Additionally, you can add arbitrary VS Code extensions to your application, again for reusing existing features already available, such as Git support. Finally, you can then extend and customize your Theia application with your own features, which you can implement as [Theia extensions or VS Code extensions](https://theia-ide.org/docs/extensions).

While Theia incorporates certain components from Visual Studio Code, such as the Monaco editor, it is independently developed with a modular architecture and is **not a [fork of VS Code](https://eclipsesource.com/blogs/2024/12/17/is-it-a-good-idea-to-fork-vs-code/)**. This distinction allows adopters to innovate and fully tailor their tools without limitations. For a deeper comparison, see [Theia IDE vs VS Code](https://eclipsesource.com/blogs/2024/07/12/vs-code-vs-theia-ide/) and [Eclipse Theia vs VS Code OSS](https://eclipsesource.com/blogs/2023/09/08/eclipse-theia-vs-code-oss/).

In this guide, we will create a Theia application with a number of existing Theia extensions and one (generated) custom Theia extension. Please also refer to our to learn more on how to create your own Theia extensions. Finally, also see .

## Project Layout

We are going to create a monorepo (a repository containing multiple npm packages) named `my-theia-app` containing three packages: `browser-app`, `electron-app` and `hello-world-extension`. The first two contain the custom Theia applications to run in browser and electron mode. The 'hello-world' package contains a generated example extension, that adds a feature to our custom Theia application. This extension can serve as a starting point for you to add your own custom features via Theia extensions.

We are going to use `yarn` instead of `npm` (Theia default). We are also going to use `lerna` to run scripts across workspaces.

To ease the setup of such a repository we have created a [Yeoman generator](https://github.com/eclipse-theia/generator-theia-extension) to scaffold the project. It will also generate the `hello-world` example extension. Run it using

```bash
npm install -g yo generator-theia-extension
mkdir my-theia-app
cd my-theia-app
yo theia-extension # select the 'Hello World' option and complete the prompts
```

After creating the project structure, the Yeoman generator will also install the required dependencies, so it might take a minute to complete. Let's have look at the generated code now. The root `package.json` defines the workspaces, the dependency to `lerna` and some scripts to build, start and watch the project for browser or electron. Please note that the excerpt on this page might be outdated, please use the Yeoman generator to generate the files listed below to get the latest version.

```json
{
  "private": true,
  "engines": {
    "yarn": ">=1.7.0 <2",
    "node": ">=18"
  },
  "scripts": {
    "build:browser": "yarn --cwd browser-app bundle",
    "build:electron": "yarn --cwd electron-app bundle",
    "prepare": "lerna run prepare",
    "postinstall": "theia check:theia-version",
    "start:browser": "yarn --cwd browser-app start",
    "start:electron": "yarn --cwd electron-app start",
    "watch:browser": "lerna run --parallel watch --ignore electron-app",
    "watch:electron": "lerna run --parallel watch --ignore browser-app"
  },
  "devDependencies": {
    "lerna": "2.4.0"
  },
  "workspaces": [
    "hello-world", "browser-app", "electron-app"
  ]
}
```

Besides the root level artifacts, you will have three directories in your project:

- browser-app: The definitions of your custom Theia application running in the browser
- electron-app: The definitions of your custom Theia application running on the desktop (via Electron)
- hello-world: The generated example extensions, see for more details

## Executing the Browser Application

Now we want to see our Theia application in action. For this purpose, the generator has created a `package.json` in the folder `browser-app`, which defines your Theia app. It defines a Theia browser application with a couple of statically included extensions, including our `hello-world`. These extensions are the features, that will be part of our Theia application. The generated project contains a minimalistic set-up, **you can add additional features by adding more existing (or custom) extensions to this list**. The example also does not contain any VS Code extensions, see on how to add them.

Now we have all pieces together to build and run the application. To run the browser app, enter:

```bash
yarn build:browser
yarn start:browser
```

Point your browser to [http://localhost:3000](http://localhost:3000/), you will see a minimalistic custom Theia App. As this Theia app contains the generated 'hello world' extension, you can try out the custom feature. Open the quick access bar by pressing 'F1' and enter 'say hello' and 'ENTER': A message "Hello World!" should pop up. This command is contributed by the 'hello-world' extension, see to learn more.

## Executing the Extension In Electron

The `package.json` for the Electron app looks almost the same, except for the name and the target property.

```json
{
  "name": "electron-app",
  ...
  "theia": {
    "target": "electron"
  }
}
```

Before running the electron app, you have to rebuild some native modules:

```bash
yarn build:electron
yarn start:electron
```

## Conclusion

In this guide, we have demonstrated how to set-up your own custom Theia application. The next typical steps are:

- Extend your application with additional (existing ones or developed by yourself)
- Extend your application with (existing ones or developed by yourself)
- Create a deployable product for desktop, browser or both (see the [Theia IDE](https://theia-ide.org/docs/blueprint_documentation/) as an example)

## Troubleshooting

### Building native dependencies behind a proxy

If you run the `yarn` command behind a proxy you may encounter issues in building native dependencies (like `oniguruma`), in the last part of the build, with the following error stack:

This happens because node-gyp does not rely on system/NPM proxy settings. In that case, download the `node-headers` file using the link provided in the error stack (in the example above `https://nodejs.org/download/release/v8.15.0/node-v8.15.0-headers.tar.gz`) and run the build with the following command:

[![Go to previous Page : Download](https://theia-ide.org/docs/composing_applications/)](https://theia-ide.org/docs/blueprint_download/ "Go to previous Page : Download") [![Go to next page : Extending the Theia IDE](https://theia-ide.org/docs/composing_applications/)](https://theia-ide.org/docs/blueprint_documentation/ "Go to next page : Extending the Theia IDE")