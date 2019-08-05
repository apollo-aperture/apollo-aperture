## Getting Started
Apollo Aperture runs as an Electron based desktop application. To use it, clone our repo, install the required node packages, and build the desktop application. Or you can download the executable from our website (pending launch of website).  

<<<<<<< HEAD
Currently Apollo Aperture is a desktop application that analyzes Apollo and React code and displays the relationships between React components and Apollo queries and/or subscriptions. This tool will give developers critical insight into their frontend architecture so that they can minimize unnecessary component re-rendering and optimize their application. In a coming update, it will also enable a developer to invoke mutations and see how queries are affected. 

![Image of screenshot](https://imgur.com/Ej1rp5u.png)

<img src="https://imgur.com/yLt9r5c.png"  width="450" height="550">
=======
Install Apollo Aperture
1. Clone this repo
1. Install Apollo Aperture: `npm install apollo-aperture`
2. Build the executable files: `npm run electron-pack`
3. Install the appropriate executable file on your computer.
4. Once the application opens, select a sample application or upload your own code.

## About
Apollo Aperture is a desktop application that analyzes Apollo and React code and displays the relationships among React components and Apollo queries and/or subscriptions. This tool provides developers with critical insight into their frontend architecture so that they can minimize unnecessary component re-rendering and optimize their application. In a coming update, it will also enable a developer to invoke mutations and see how queries are affected. 

## Background
Apollo Client is designed so that a developer can insert GraphQL mutations, queries, and subscriptions almost anywhere in their code and connect them to React components. In a large codebase, however, this can become problematic because developers can find themselves in connected component hell where queries and mutations are strewn across their codebase and React components are connected with multiple queries and mutations. Not only is this an issue for developers, it can also cause issues for users. When Apollo’s client store or cache is updated, React child components which rely on queries or subscriptions are re-rendered, causing React’s DOM diffing algorithm to do more work which increases loading time on the client.

## Contributing
Please feel free to fork our repo and submit a PR. 
>>>>>>> afe228a35e9ee4340b4598077a8154f4084b2f19
