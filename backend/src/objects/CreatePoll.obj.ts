export interface Option {
	option: string;
	voteCount: number;
}

export interface Vote {
   userIP: string
}

export interface CreatePollObj {
	id: string;
	question: string;
	options: Option[];
	votes: Vote[]
}