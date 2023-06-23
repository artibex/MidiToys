// Import the `dotenv` package
import dotenv from 'dotenv';

// Load the environment variables from the `.env` file
const envResult = dotenv.config();

// Check if the `.env` file was loaded successfully
if (envResult.error) {
  throw envResult.error;
}

// Create an object to store the environment variables
const envVariables = {
    VARIABLE: process.env.VARIABLE,
};

export function GetVariables() {
    return envVariables;
}

// Export the environment variables object
export default envVariables;