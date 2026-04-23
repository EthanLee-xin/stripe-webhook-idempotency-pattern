
const processPaymentWebhook = async (req, res) => {
    const eventId = req.body.id;
    console.log(`[Bussiness logic] Processing payment for event: ${eventId}...`);

    // this code just simulate database latency

    setTimeout(() => {
        console.log(`[Database] Order updated to PAID for event:${eventId}\n`);
        res.status(200).json({ success: true, message: 'Payment processed successfully'});
    }, 1000);
};

module.exports = { processPaymentWebhook };