import { Request, Response } from "express";
import { CreatePollObj, Option, Vote } from "../objects/CreatePoll.obj";

// in-memory storage
const polls: CreatePollObj[] = [];

// GET /polls - returns all polls
export function getPolls(req: Request, res: Response) {
	res.status(200).send(JSON.stringify(polls));
}

// GET /polls/:id - returns a poll by id
export function getPollByID(req: Request, res: Response) {
	const pollID = req.params.id;
	const poll = polls.find((poll) => poll.id === pollID);

	if (!poll) {
		res.status(404).json("Poll not found");
		return;
	}

	res.status(200).send(JSON.stringify(poll));
}

// POST /polls/create - creates a new poll
export function createPoll(req: Request, res: Response) {
	const newPollID = "" + (polls.length + 1);
	const newPollOptions = req.body.vote_options.map((opt: string) => ({
		option: opt,
		voteCount: 0,
	}));

	const createdPoll: CreatePollObj = {
		id: newPollID,
		question: req.body.question,
		options: newPollOptions,
		votes: []
	};

	polls.push(createdPoll);

	res.status(201).send(JSON.stringify(createdPoll));
}

// POST /polls/:id/vote - votes on a poll
export function voteOnPoll(req: Request, res: Response) {
	const pollID = req.body.pollID;
	const poll = polls.find((poll) => poll.id === pollID);
	const currentUserIP = req.ip || "";

	if (!poll) {
		res.status(404).json("Poll not found");
		return;
	}

	const optionIndex = poll.options.findIndex(
		(option) => option.option === req.body.vote_option
	);

	if (optionIndex === -1) {
		res.status(404).send(
			"Option not found\nHere are the available options: " +
				JSON.stringify(poll.options)
		);
		return;
	}

	const hasVoted = poll.votes.findIndex(
		(vote: Vote) => vote.userIP === currentUserIP
	);
	if (hasVoted !== -1) {
		return res
			.status(403)
			.json({ message: "You have already voted in this poll." });
	}

	poll.votes.push({ userIP: currentUserIP });
	poll.options[optionIndex].voteCount++;

	res.status(200).send(JSON.stringify(poll));
}
