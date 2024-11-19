// notification-system.js

const nodemailer = require('nodemailer');

// Email configuration with hardcoded credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'infinitytravel46@gmail.com',
        pass: 'qjhg arud smfx jrjs'
    }
});

// Function to send notification
async function sendNotification(message) {
    const emailOptions = {
        from: 'infinitytravel46@gmail.com',
        to: 'infinitytravel46@gmail.com',
        subject: 'INFINITY TRAVEL NOTIFICATION',
        text: message
    };

    try {
        await transporter.sendMail(emailOptions);
        console.log('Notification sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending notification:', error);
        return false;
    }
}

// Function to handle purchase notifications
async function handlePurchaseNotification(purchaseData) {
    const message = `New purchase completed:
Amount: $${purchaseData.amount}
Customer: ${purchaseData.customerName}
Order ID: ${purchaseData.orderId}
Date: ${new Date().toLocaleString()}`;

    return await sendNotification(message);
}

// Function to handle general notifications
async function handleGeneralNotification(subject, details) {
    const message = `Subject: ${subject}
Details: ${details}
Date: ${new Date().toLocaleString()}`;

    return await sendNotification(message);
}

module.exports = {
    sendNotification,
    handlePurchaseNotification,
    handleGeneralNotification
};

// Example usage (uncomment to test):
/*
async function test() {
    // Test purchase notification
    const purchaseData = {
        amount: 99.99,
        customerName: 'John Doe',
        orderId: '12345'
    };
    await handlePurchaseNotification(purchaseData);

    // Test general notification
    await handleGeneralNotification('Purchase notification', 'Database backup completed');
}

// Run test if this file is run directly
if (require.main === module) {
    test().catch(console.error);
}
*/
