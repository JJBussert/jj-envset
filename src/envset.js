// index.js

import fs from 'fs';
import dotenv from 'dotenv';
import os from 'os';

function envset(key, value, envFile) {

    // Check if the .env file exists
    const envFileExists = fs.existsSync(envFile);

    let dotenvObj;

    if (envFileExists) {
        // If the .env file exists, load it into process.env and parse its contents
        dotenvObj = dotenv.config({ path: envFile }).parsed;
    } else {
        // If the .env file does not exist, create an empty object
        dotenvObj = {};
    }

    // Update or create the key-value pair in the dotenvObj
    if (dotenvObj.hasOwnProperty(key)) {
        // If the key already exists, update the value
        console.log(`Updating ${key} in .env file`);
    } else {
        // If the key does not exist, add it to the environment
        console.log(`Adding ${key} to .env file`);
    }

    dotenvObj[key] = value;

    // Save the environment variable to the .env file
    const env = Object.entries(dotenvObj)
        .map(([k, v]) => `${k}="${v}"`)
        .join(os.EOL);
    fs.writeFileSync(envFile, env);
}


  const isMainModule = import.meta.url === new URL(import.meta.url).pathname;
  
  if (isMainModule) {
    envset();
  }
  
  export { envset };
  