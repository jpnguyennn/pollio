export interface Option {
	option: string;
	voteCount: number;
}

export interface Vote {
	userIP: string;
	userName: string;
	userVote: Option;
	userVoteDate: Date;
}

export interface CreatePollObj {
	id: string;
	question: string;
	options: Option[];
	votes: Vote[];
	createdAt: Date;
}
