/**
 * index.js
 * Entry point for the N8N LLM streaming application.
 * This server handles real-time streaming of LLM responses to the client.      
 *
 * @author Agent Voice Response <info@agentvoiceresponse.com>
 * @see https://www.agentvoiceresponse.com
 */
const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.use(express.json());

/**
 * Handles a prompt stream from the client and uses the N8N API to generate
 * a response. The response is sent back to the client as a JSON object.
 *
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 */
const handlePromptStream = async (req, res) => {
    const { uuid, message } = req.body;

    if (!uuid) {
        return res.status(400).json({ message: 'UUID is required' });
    }

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        const publicChatUrl = process.env.PUBLIC_CHAT_URL;
        const requestConfig = {
            method: 'post',
            url: publicChatUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                sessionId: uuid,
                chatInput: message,
            },
            responseType: 'stream',
        };

        console.log("N8N Configuration", requestConfig)
        console.log("Message", message);

        const response = await axios(requestConfig);
        const responseData = response.data;
        let streamBuffer = '';

        const handleParsedEvent = (parsed) => {
            switch (parsed.type) {
                case 'begin':
                    console.log("Start streaming");
                    break;
                case 'item':
                    console.log(parsed.content);
                    res.write(JSON.stringify({ type: 'text', content: parsed.content }));
                    break;
                case 'end':
                    console.log("End streaming");
                    res.end();
                    break;
                default:
                    console.log("Unknown type", parsed.type);
                    break;
            }
        };

        responseData.on('data', (chunk) => {
            const data = chunk.toString();
            streamBuffer += data;

            // N8N may send newline-delimited JSON, sometimes split across chunks.
            const lines = streamBuffer.replace(/\r\n/g, '\n').split('\n');
            streamBuffer = lines.pop() || '';

            lines
                .map((line) => line.trim())
                .filter(Boolean)
                .forEach((line) => {
                    try {
                        const parsed = JSON.parse(line);
                        handleParsedEvent(parsed);
                    } catch (error) {
                        console.error("Error parsing JSON line", error, line);
                    }
                });
        });

        responseData.on('end', () => {
            const finalLine = streamBuffer.trim();
            if (finalLine) {
                try {
                    const parsed = JSON.parse(finalLine);
                    handleParsedEvent(parsed);
                } catch (error) {
                    console.error("Error parsing final JSON line", error, finalLine);
                }
            }
            console.log("Response end");
            res.end();
        });
    } catch (error) {
        console.error('Error calling N8N API:', error.message);
        res.status(500).json({ message: 'Error communicating with N8N' });
    }
}

app.post('/prompt-stream', handlePromptStream);

const port = process.env.PORT || 6016;
app.listen(port, () => {
    console.log(`N8N LLM streaming listening on port ${port}`);
});
