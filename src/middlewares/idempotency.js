
const mockRedisStore = new Map();

const checkIdempotency = async (req, res, next) => {
    // get unique request identification
    const idempotencyKey = req.body.id;

    if (!idempotencyKey) {
        return res.status(400).json({error: 'Missing Idempotency Key in body'});
    }

    // Intercept: if the event has been solved, return success and stop execution
    if (mockRedisStore.has(idempotencyKey)) {
        console.log(`[Idempotency] Duplicate intercept! Key: ${idempotencyKey}`);
        return res.status(200).json({message: 'Event already processed'});
    }

    // pass: Record Key and execute next
    mockRedisStore.set(idempotencyKey, 'PROCESSED');
    console.log(`[Idempotency] New request granted. Key: ${idempotencyKey}`);

    next();
}

module.exports = { checkIdempotency };

