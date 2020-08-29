# Usage
This process assumes you have nodejs installed and npm
1. clone the repo
2. `npm install`
3. to run the server `npm run dev`

This node js app is still under development. Open a PR to fix any issues
## Curl/postman
For testing purposes
you need a json from the body 
``` const { shortBaseUrl, originalUrl } = req.body; ```
short base url - the base url eg `example.com`. this is done automaically if the app is served under a domain 
original url - the url you want to shorten.

