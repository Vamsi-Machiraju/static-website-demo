const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const crypto = require("crypto"); // Use built-in crypto module

// Set up DynamoDB client with timeout
const client = new DynamoDBClient({ 
    region: "ap-south-1",
    requestTimeout: 2000 // 2 seconds timeout for DynamoDB requests
});

exports.handler = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        
        const { name, email, category, message } = requestBody;

        if (!name || !email || !category || !message) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "All fields are required." })
            };
        }

        // Generate a unique ID using crypto
        const contactEntry = {
            id: { S: crypto.randomUUID() }, // Replaced uuidv4() with crypto.randomUUID()
            name: { S: name },
            email: { S: email },
            category: { S: category },
            message: { S: message },
            submittedAt: { S: new Date().toISOString() }
        };

        // Insert data into DynamoDB
        await client.send(new PutItemCommand({
            TableName: "contact_messages",
            Item: contactEntry
        }));

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Message saved successfully!" })
        };

    } catch (error) {
        console.error("Error saving message:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};
