# dev-apollo-aperture
Apollo Aperture mission is to have the ability to be used almost like React Hooks, where developers can insert mutations or queries almost anywhere in their code and connect them to React components. In a large codebase, however, this can become problematic because developers can find themselves in connected component hell where queries and mutations are strewn across their codebase and React components are connected with multiple queries and mutations. Not only is this an issue for developers, it can also cause issues for users. When Apollo’s client store or cache is updated, React child components which rely on queries or subscriptions are re-rendered, causing React’s DOM diffing algorithm to do more work which increases loading time on the client.

Currently Apollo Aperture is a desktop application that analyzes Apollo and React code and displays the relationships between React components and Apollo queries and/or subscriptions. This tool will give developers critical insight into their frontend architecture so that they can minimize unnecessary component re-rendering and optimize their application. In a coming update, it will also enable a developer to invoke mutations and see how queries are affected. 

![Image of screenshot](https://imgur.com/Ej1rp5u.png)

<img src="https://imgur.com/yLt9r5c.png"  width="450" height="550">