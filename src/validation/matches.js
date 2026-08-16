import z, { coerce } from "zod";

export const MATCH_STATUS = {
	SCHEDULED: 'scheduled',
	LIVE: 'live',
	FINISHED: 'finished',
};

export const listMatchesQuerySchema = z.object({
	limit: z.coerce().number().int().positive().max(100).optional(),
});

export const matchIdParamSchema = z.object({
	id: z.coerce().number().int().positive(),
});

export const createMatchSchema = z.object({
	sport: z.string().min(1),
	homeTeam: z.string().min(1),
	awayTeam: z.string().min(1),
	startTime: z.iso.date(),
	endTime: z.iso.date(),
	homeScore: z.number().int().nonnegative().optional(),
	awayScore: z.number().int().nonnegative().optional(),
}).superRefine((data, ctx) => {
	const start = new Date(data.startTime);
	const end = new Date(data.endTime);
	if (end <= start) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "End time should be chronologically after start time",
			path: ["endTime"],
		});
	}
});

