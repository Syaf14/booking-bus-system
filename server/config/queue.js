const Queue = require('bull');
const logger = require('./logger');

// Create the push notification queue
const pushNotificationQueue = new Queue('push-notifications', {
    redis: {
        host: 'localhost',
        port: 6379,
    }
});

// Listen for queue events
pushNotificationQueue.on('completed', (job) => {
    logger.info(`✅ Push notification sent successfully for job ${job.id}`, {
        userId: job.data.userId,
        title: job.data.title
    });
});

pushNotificationQueue.on('failed', (job, err) => {
    logger.error(`❌ Push notification failed for job ${job.id}`, {
        userId: job.data.userId,
        title: job.data.title,
        error: err.message,
        attempts: job.attemptsMade,
        maxAttempts: job.opts.attempts
    });
});

pushNotificationQueue.on('error', (err) => {
    logger.error('Queue error:', { error: err.message });
});

module.exports = pushNotificationQueue;
