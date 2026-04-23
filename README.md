# Payment Pattern: Webhook Idempotency

A foundational backend pattern when building high-concurrency, fault-tolerant financial pipelines.

## The Problem
When integrating with external payment gateways (like Stripe or PayPal), network timeouts can cause the gateway to retry a `webhook` event. If the backend is not completely idempotent, this can result in:
- Double-charging a customer.
- Duplicate order creation.
- Corrupted inventory ledgers.

## The Solution: Idempotency Middleware
This micro-project showcases an Express.js middleware that intercepts incoming webhooks and validates a unique `Idempotency-Key` (or Event ID) against a fast-access store (simulated here via memory, but normally implemented in **Redis**). 

- **If the key exists:** The system acknowledges the request (HTTP 200) to stop the gateway from retrying, but safely halts downstream execution.
- **If the key is new:** The system registers the key with a TTL and allows the transaction to proceed.

## Tech Stack Focus
- Node.js / Express
- Event-Driven Architecture considerations
- Defensive Programming & Error Boundaries