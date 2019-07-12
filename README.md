Blockcites API
==============

* Serverless environment

* Setup local and prod envs with the correct open sea API key
    ```
    firebase functions:config:set webflow.api.key="<webflow API key>"
    firebase functions:config:set opensea.api.key="<blockcities opensea API key>"
    firebase functions:config:set eventstream.api.key="<internal eventstream API key>"
    ```
* To run locally you need to 
    * `cd functions`
    * `firebase functions:config:get > .runtimeconfig.json` - Ensure this is **NOT** committed into the repo!

#### Deployment 

You will need the latest version of `npm install -g firebase-tools` in order to deploy scheduler functions
