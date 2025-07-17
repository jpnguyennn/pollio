# pollio

A simple RESTful API using ExpressJS to create and vote on polls

## Features

-   Create new polls with custom options
-   List all polls
-   View a specific poll and its results
-   Vote on a poll (one vote per user, based on IP)

## Requirements

-   Node.js (v14+ recommended)
-   npm

## Installation

To use the interactive CLI for the application:

-   Clone this repository
-   Install dependencies:

```sh
npm install
```

## Running the CLI

Start the Pollio API server with:

```sh
npm run start
```

Then, run the following in a separate terminal to start the interactive CLI:

```sh
npx ts-node ./src/cli.ts
```

## API Endpoints

### Get All Polls

-   GET `/polls`
-   Returns a list of all created polls

### Get Poll by ID

-   GET `/polls/:id`
-   Returns a single poll by its ID

### Create a Poll

-   POST `/polls/create`
-   Example Body:

```json
{
	"question": "Where do you want to eat?",
	"vote_options": ["Chipotle", "Crumbl Cookies", "Wawa"]
}
```

-   Returns the created poll object

### Vote on a Poll

-   POST `/polls/:id/vote`
-   Example Body:

```json
{
	"pollID": "1",
	"username": "JP",
	"vote_option": "Option 1"
}
```

-   Will only allow one vote per user, based on IP
-   Returns the updated poll object

## Project Structure

```text
backend/
   src/
      cli.ts           # CLI tool to interact with the API
      createApp.ts     # Express app setup
      handlers/
         polls.ts       # Poll route handlers
      objects/
         CreatePoll.obj.ts # TypeScript interfaces for Poll, Option, Vote
      routes/
         polls.ts       # Express routes for polls
   package.json
   tsconfig.json
```

## Notes

-   All poll and vote data is stored in-memory. Restarting the server will clear all polls and votes.

## Author

JohnPaul Nguyen [johnpaul.nguyen@rutgers.edu](mailto:johnpaul.nguyen@rutgers.edu)
