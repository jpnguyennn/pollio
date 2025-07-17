import { Router } from "express";
import { getPolls, getPollByID, createPoll, voteOnPoll } from "../handlers/polls";

const router = Router();

// GET /api/polls - returns all polls
router.get("/", getPolls);

// GET /api/polls/:id - returns a poll by id
router.get("/:id", getPollByID);

// POST /api/polls/create - creates a new poll
router.post("/", createPoll);

//POST /api/polls/:id/vote - votes on a poll
router.post("/:id/vote", voteOnPoll);

export default router;