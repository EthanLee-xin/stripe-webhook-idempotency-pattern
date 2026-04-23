
const express = require('express');
const { checkIdempotency } = require('./middlewares/idempotency');
const { processPaymentWebhook } = require('./controllers/webhookController');

const app = express();

// setup body-parser
app.use(express.json());

app.post('/api/webhooks/stripe', checkIdempotency, processPaymentWebhook);

const PORT = 3000;
app.listen(PORT, () => { 
    console.log(`Webhook Server running on http://localhost:${PORT}`);
    console.log(`Waiting for stripe events...\n`);
 });
