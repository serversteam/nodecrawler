# nodecrawler
nodecrawler-api

Install node, mongodb and redis latest versions on machine
mongodb and redis must be running in background on your machine
change mongodb and redis connection url in .env file placed on root and change react app url in FRONT_URL variable

run following commands in terminal to run project in development mode

1. Run 'npm install' on root folder where package.json is placed
2. Run 'npm run watch-ts' in one terminal window
3. Run 'npm run watch-node' in another terminal window

run following commands in terminal to run project in production mode on server

1. Run 'npm install' on root folder where package.json is placed
2. Run 'npm run build' and build will be created in dist folder
3. Run 'npm run serve' to run production build
