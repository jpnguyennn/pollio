import axios, { AxiosError } from "axios";
import readline from "readline";
import { CreatePollObj, Option } from "./objects/CreatePoll.obj";

const API_BASE_URL = "http://localhost:3000";

// const program = new Command();

// // metadata for the CLI for the API
// program
// 	.name("Pollio CLI")
// 	.description("A CLI to interact with the Pollio API")
// 	.version("1.0.0");

// program
// 	.command("polls")
// 	.description("Display all created polls")
// 	.action(async () => {
// 		try {
// 			const response = await axios.get(`${API_BASE_URL}/polls/`);
// 			const polls = response.data;

// 			if (polls.length === 0) {
// 				console.log("No polls have been created yet...");
// 				return;
// 			}

// 			console.log("----- ALL CREATED POLLS -----");
// 			polls.forEach((poll: CreatePollObj) => {
// 				console.log(` - ID: ${poll.id}`);
// 				console.log(`   - Question: ${poll.question}`);
// 			});
// 		} catch (error) {
// 			if (error instanceof AxiosError)
// 				console.error(
// 					"Error fetching polls: ",
// 					error.response?.data?.message || error.message
// 				);
// 			else console.error("Internal Server Error");
// 		}
// 	});

// program
// 	.command("view")
// 	.description("Show the specified poll with its options and votes")
// 	.argument("<pollID>", "The ID of the poll to display")
// 	.action(async (pollID: string) => {
// 		try {
// 			const response = await axios.get(`${API_BASE_URL}/polls/${pollID}`);
// 			const poll: CreatePollObj = response.data;

// 			console.log(`----- RESULTS FOR POLL ID ${pollID} -----`);
// 			console.log(`Question: ${poll.question}`);

// 			if (poll.options.length === 0) {
// 				console.log("There are no options available for this poll");
// 				return;
// 			}

// 			poll.options.forEach((option: Option) => {
// 				console.log(` - ${option.option}: ${option.voteCount} votes`);
// 			});
// 		} catch (error) {
// 			if (error instanceof AxiosError)
// 				console.error(
// 					`Error fetching poll with ID ${pollID}: `,
// 					error.response?.data?.message || error.message
// 				);
// 			else console.error("Internal Server Error");
// 		}
// 	});

// program
// 	.command("create")
// 	.description("Create a new poll")
// 	.argument("<question>", "The question of the poll")
// 	.argument("<vote_options...>", "The voting options of the poll")
// 	.action(async (question: string, vote_options: string[]) => {
// 		try {
// 			const response = await axios.post(`${API_BASE_URL}/polls/`, {
// 				question,
// 				vote_options,
// 			});
// 			const newPoll: CreatePollObj = response.data;

// 			console.log(
// 				`----- POLL (ID: ${newPoll.id}) CREATED SUCCESSFULLY -----`
// 			);
// 			console.log(` - Question: ${newPoll.question}`);
// 			console.log(" - Options:");
// 			newPoll.options.forEach((option: Option) => {
// 				console.log(`   - ${option.option}`);
// 			});
// 		} catch (error) {
// 			if (error instanceof AxiosError)
// 				console.error(
// 					`Error creating poll: `,
// 					error.response?.data?.message || error.message
// 				);
// 			else console.error("Internal Server Error");
// 		}
// 	});

// program
// 	.command("vote")
// 	.description("Vote in the specified poll")
// 	.argument("<pollID>", "The ID of the poll to vote in")
// 	.argument("<vote_option>", "The option you want to vote for the poll")
// 	.action(async (pollID: string, vote_option: string) => {
// 		try {
// 			const response = await axios.post(`${API_BASE_URL}/polls/${pollID}/vote`, {
// 				pollID,
// 				vote_option,
// 			});
// 			console.log(
// 				`Successfully voted in poll (ID: ${pollID}) with option ${vote_option}`
// 			);
// 			console.log('Use command "view" to see new poll results');
// 		} catch (error) {
// 			if (error instanceof AxiosError)
// 				console.error(
// 					`Error voting in poll with ID ${pollID}: `,
// 					error.response?.data?.message || error.message
// 				);
// 			else console.error("Internal Server Error");
// 		}
// 	});

// program.parse(process.argv)

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

const cliGetPollByID = async (pollID: string) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/polls/${pollID}`);
		const poll: CreatePollObj = response.data;

		console.log(`----- RESULTS FOR POLL ID ${pollID} -----`);
		console.log(`Question: ${poll.question}`);

		if (poll.options.length === 0) {
			console.log("There are no options available for this poll");
			return;
		}

		poll.options.forEach((option: Option) => {
			console.log(` - ${option.option}: ${option.voteCount} votes`);
		});
	} catch (error) {
		if (error instanceof AxiosError)
			console.error(
				`Error fetching poll with ID ${pollID}: `,
				error.response?.data?.message || error.message
			);
		else console.error("Internal Server Error");
	}
};

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

const cliVotePoll = async (pollID: string, vote_option: string) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/polls/${pollID}/vote`,
			{
				pollID,
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

const cliShowHelp = () => {
	console.log(`
		----- AVAILABLE COMMANDS -----
		polls		Displays all created polls
		view		View a specific poll from its ID
		create <questions> <option1> <option2> ...	Create a new poll with a question and its options
		vote <pollID> <vote_option>		Vote on a poll
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
	const [command, ...args] = line.trim().split(/\s+/);

	switch (command.toLowerCase()) {
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
			if (args.length == 2) await cliVotePoll(args[0], args[1]);
			else console.log("Usage: vote <pollID> <vote_option>");
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

	rl.prompt()
}).on("close", () => {
	console.log("Exiting Pollio CLI...");
	process.exit(0);
});
