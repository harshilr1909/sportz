import { eq } from 'drizzle-orm';
import { db, pool } from './db/db.js';
import { matches } from './db/schema.js';

async function main() {
	try {
		console.log('Performing CRUD operations...');

		// CREATE: Insert a new match
		const [newMatch] = await db
			.insert(matches)
			.values({
				sport: 'cricket',
				homeTeam: 'India',
				awayTeam: 'Australia',
				status: 'scheduled',
			})
			.returning();

		if (!newMatch) {
			throw new Error('Failed to create match');
		}

		console.log('✅ CREATE: New match created:', newMatch);

		// READ: Select the match
		const foundMatch = await db.select().from(matches).where(eq(matches.id, newMatch.id));
		console.log('✅ READ: Found match:', foundMatch[0]);

		// UPDATE: Change the match status and score
		const [updatedMatch] = await db
			.update(matches)
			.set({ status: 'live', homeScore: 1 })
			.where(eq(matches.id, newMatch.id))
			.returning();

		if (!updatedMatch) {
			throw new Error('Failed to update match');
		}

		console.log('✅ UPDATE: Match updated:', updatedMatch);

		// DELETE: Remove the match
		await db.delete(matches).where(eq(matches.id, newMatch.id));
		console.log('✅ DELETE: Match deleted.');

		console.log('\nCRUD operations completed successfully.');
	} catch (error) {
		console.error('❌ Error performing CRUD operations:', error);
		process.exit(1);
	} finally {
		// Close the pool to end the WebSocket connection
		if (pool) {
			await pool.end();
			console.log('Database pool closed.');
		}
	}
}

main();
