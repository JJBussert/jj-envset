import { expect, test } from 'vitest';
import { envset } from '../src/envset.js';
import fs from 'fs';
import { execSync } from 'child_process';

test('envset: should save the key/value pair to the env file', async () => {
  const key = 'HELLO_WORLD';
  const value = 'Static Value!';
  const envFile = '.env.test';

  // Remove the envFile if it exists
  if (fs.existsSync(envFile)) {
    fs.unlinkSync(envFile);
  }

  // Call the envset function
  envset(key, value, envFile);

  // Read the updated env file
  const envContent = fs.readFileSync(envFile, 'utf-8');
  const expectedOutput = `${key}="${value}"`;

  // Check if the target key and value are present in the env file
  expect(envContent).toContain(expectedOutput);

  // Clean up by removing the envFile
  fs.unlinkSync(envFile);
});

test('envset: should update an existing env file with new value', async () => {
  const key = 'INITIAL_KEY';
  const value = 'Updated Value!';
  const envFile = '.env.test';

  // Create an initial env file with some content
  fs.writeFileSync(envFile, 'INITIAL_KEY="Initial Value"\n');

  // Call the envset function to update the env file with new content
  envset(key, value, envFile);

  // Read the updated env file
  const envContent = fs.readFileSync(envFile, 'utf-8');
  const expectedOutput = `${key}="${value}"`;

  // Check if the target key and value are present in the env file
  expect(envContent).toContain(expectedOutput);

  // Clean up by removing the envFile
  fs.unlinkSync(envFile);
});

test('envset: should update an quote existing values if they were not', async () => {
  const key = 'NEW_KEY';
  const value = 'New Value!';
  const envFile = '.env.test';

  // Create an initial env file with some content with no double quotes
  fs.writeFileSync(envFile, 'INITIAL_KEY=Initial Value\n');

  // Call the envset function to update the env file with new content
  envset(key, value, envFile);

  // Read the updated env file
  const envContent = fs.readFileSync(envFile, 'utf-8');

  // Check if the target key and value are present in the env file
  expect(envContent).toContain('INITIAL_KEY="Initial Value"');

  // Clean up by removing the envFile
  fs.unlinkSync(envFile);
});
