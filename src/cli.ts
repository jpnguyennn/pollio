import axios, { AxiosError } from "axios";
import readline from "readline";
import { CreatePollObj, Option } from "./objects/CreatePoll.obj";

const API_BASE_URL = "http://localhost:3000";

/**
 * cliGetPolls
 * 
 * Retrieves all polls to display
 */
const cliGetPolls = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/polls/`);
		const polls = response.data;

		if (polls.length === 0) {
			console.log("No polls have been created yet...");
			return;
		}

		console.log("----- ALL CREATED POLLS -----");
		polls.forEach((poll: CreatePollObj) => {
			console.log(` - ID: ${poll.id}`);
			console.log(`   - Question: ${poll.question}`);
		});
	} catch (error) {
		if (error instanceof AxiosError)
			console.error(
				"Error fetching polls: ",
				error.response?.data?.message || error.message
			);
		else console.error("Internal Server Error");
	}
};

/**
 * cliGetPollByID
 * 
 * Retrieves a specific poll based on its ID
 * 
 * Inputs:
 * - pollID - ID of the poll requested
 */
const cliGetPollByID = async (pollID: string) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/polls/${pollID}`);
		const poll: CreatePollObj = response.data;

		console.log(`----- RESULTS FOR POLL ID ${pollID} -----`);
		console.log(
			`Poll Created At: ${(new Date(poll.createdAt)).toUTCString()}`
		);
		console.log(`Question: ${poll.question}`);

		if (poll.options.length === 0) {
			console.log("There are no options available for this poll");
			return;
		}

		poll.options.forEach((option: Option) => {
			console.log(` - ${option.option}: ${option.voteCount} votes`);
		});

		console.log("\nMost Recent Voters:");
		poll.votes.length == 0 ? console.log("No one has voted yet!") : poll.votes.reverse().forEach((voter) => {
			const userDate: Date = new Date(voter.userVoteDate);
			console.log(
				` - ${voter.userName} (${userDate.toUTCString()}) voted for ${
					voter.userVote.option
				}!`
			);
		});
	} catch (error) {
		if (error instanceof AxiosError)
			console.error(
				`Error fetching poll with ID ${pollID}: `,
				error.response?.data?.message || error.message
			);
		else console.error("Internal Server Error", error);
	}
};

/**
 * cliCreatePoll
 * 
 * Creates a new poll with a question and options
 * 
 * Inputs:
 * - question - Poll question
 * - vote_options - An array of options
 */
const cliCreatePoll = async (question: string, vote_options: string[]) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/polls/`, {
			question,
			vote_options,
		});
		const newPoll: CreatePollObj = response.data;

		console.log(
			`----- POLL (ID: ${newPoll.id}) CREATED SUCCESSFULLY -----`
		);
		console.log(` - Question: ${newPoll.question}`);
		console.log(" - Options:");
		newPoll.options.forEach((option: Option) => {
			console.log(`   - ${option.option}`);
		});
	} catch (error) {
		if (error instanceof AxiosError)
			console.error(
				`Error creating poll: `,
				error.response?.data?.message || error.message
			);
		else console.error("Internal Server Error");
	}
};

/**
 * cliVotePoll
 * 
 * Vote for an option for a poll
 * 
 * Inputs:
 * - pollID - Specific poll to vote in
 * - username - Name of the user voting
 * - vote_option - The vote answered
 */
const cliVotePoll = async (
	pollID: string,
	username: string,
	vote_option: string
) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/polls/${pollID}/vote`,
			{
				pollID,
				username,
				vote_option,
			}
		);

		console.log(
			`Successfully voted in poll (ID: ${pollID}) with option ${vote_option}`
		);
		console.log(`Use command "view ${pollID}" to see new poll results`);
	} catch (error) {
		if (error instanceof AxiosError)
			console.error(
				`Error voting in poll with ID ${pollID}: `,
				error.response?.data?.message || error.message
			);
		else console.error("Internal Server Error");
	}
};

/**
 * cliShowHelp
 * 
 * Shows the help prompt
 */
const cliShowHelp = () => {
	console.log(`
		----- AVAILABLE COMMANDS -----
		polls		Displays all created polls
		view		View a specific poll from its ID
		create		Create a new poll with a question and its options
		--> args: <questions> <option1> <option2> ...
		vote		Vote on a poll
		--> args: <pollID> <vote_option>
		help		Displays this help message
		exit		Exit the CLI
		`);
};

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "pollio> ",
});

console.log("Welcome to the interactive CLI for Pollio");
console.log("Type 'help' to show commands or 'exit' to quit the CLI");
rl.prompt();

rl.on("line", async (line) => {
	const matchArgs = line.match(/(?:[^\s"]+|"[^"]*")+/g) || [""];
	const [command, ...args] = matchArgs.map((arg) =>
		arg.replace(/^"(.+(?="$))"$/, "$1")
	);

	switch (command.toLowerCase() || "") {
		case "":
			break;
		case "help":
			cliShowHelp();
			break;
		case "polls":
			await cliGetPolls();
			break;
		case "view":
			if (args.length == 1) await cliGetPollByID(args[0]);
			else console.log("Usage: view <pollID>");
			break;
		case "create":
			if (args.length > 2)
				await cliCreatePoll(args[0], args.splice(1, args.length));
			else
				console.log("Usage: create <question> <option1> <option2> ...");
			break;
		case "vote":
			if (args.length == 2) {
				let username: string = "";

				const getName = async () => {
					return new Promise(function (resolve, reject) {
						rl.question("What is your name?: ", (ans) => {
							username = ans;
							resolve(ans);
						});
					});
				};
				await getName();

				await cliVotePoll(args[0], username, args[1]);
			} else console.log("Usage: vote <pollID> <vote_option>");
			break;
		case "exit":
			rl.close();
			break;
		default:
			console.log(
				`Unknown command: '${command}'. Type 'help' for a list of commands.`
			);
			break;
	}

	rl.prompt();
}).on("close", () => {
	console.log("Exiting Pollio CLI...");
	process.exit(0);
});
