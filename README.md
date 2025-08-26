# Agent Voice Response - N8N Integration

[![Discord](https://img.shields.io/discord/1347239846632226998?label=Discord&logo=discord)](https://discord.gg/DFTU69Hg74)
[![GitHub Repo stars](https://img.shields.io/github/stars/agentvoiceresponse/avr-llm-n8n?style=social)](https://github.com/agentvoiceresponse/avr-llm-n8n)
[![Docker Pulls](https://img.shields.io/docker/pulls/agentvoiceresponse/avr-llm-n8n?label=Docker%20Pulls&logo=docker)](https://hub.docker.com/r/agentvoiceresponse/avr-llm-n8n)
[![Ko-fi](https://img.shields.io/badge/Support%20us%20on-Ko--fi-ff5e5b.svg)](https://ko-fi.com/agentvoiceresponse)


This repository showcases the integration between **Agent Voice Response** and **N8N**. The application leverages N8N's powerful workflow automation platform to process text input from users, providing intelligent, context-aware responses that enhance the virtual agent's capabilities through customizable workflows.

## Prerequisites

To set up and run this project, you will need:

1. **Node.js** and **npm** installed.
2. A running **N8N instance** with a configured chat workflow.
3. Access to the N8N public chat endpoint.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/agentvoiceresponse/avr-llm-n8n.git
cd avr-llm-n8n
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project to store your configuration. You will need to add the following variables:

```bash
PUBLIC_CHAT_URL=your_n8n_public_chat_endpoint
PORT=6016
```

Replace `your_n8n_public_chat_endpoint` with your actual N8N public chat workflow URL (e.g., `https://your-n8n-instance.com/webhook/chat`).

### 4. Running the Application

Start the application by running the following command:

```bash
node index.js
```

The server will start on the port defined in the environment variable (default: 6016).

## How It Works

The **Agent Voice Response** system integrates with N8N to provide intelligent text-based responses to user queries through customizable workflows. The server receives text input from users, forwards it to N8N's public chat endpoint, and then returns the workflow's response to the user in real time. This allows the virtual agent to leverage N8N's powerful automation capabilities for enhanced conversational experiences.

### Key Components

- **Express.js Server**: The server handles incoming requests from clients and sends them to N8N's public chat endpoint for processing.
- **N8N API Integration**: The application sends text queries to N8N workflows and receives generated responses, which are relayed back to the user.
- **Session Management**: The system maintains conversation context through session IDs for more interactive and dynamic exchanges.
- **Streaming Response**: Responses are streamed back to the client in real-time using Server-Sent Events (SSE).

### Example Code Overview

1. **N8N API Request**: The application sends user input and session ID to N8N's public chat endpoint for workflow processing.
2. **Response Streaming**: The server streams the response back to the client, allowing real-time interaction.
3. **Session Context**: Conversation context is maintained through session IDs passed to N8N workflows.

## API Endpoints

### POST `/prompt-stream`

This endpoint accepts a JSON payload containing the user's message and session UUID, then forwards the request to N8N and returns the workflow response.

**Request Body:**
```json
{
  "uuid": "session-identifier",
  "message": "User's message content"
}
```

**Response:**
- Content-Type: `text/event-stream`
- Returns a JSON object with the N8N workflow response

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PUBLIC_CHAT_URL` | The N8N public chat workflow endpoint URL | Yes | - |
| `PORT` | The port on which the server will listen | No | 6016 |

## N8N Workflow Configuration

To use this application, you need to set up an N8N workflow that can handle chat requests. The workflow should:

1. Accept POST requests with `sessionId` and `chatInput` parameters
2. Process the input through your desired logic (LLM integration, business rules, etc.)
3. Return a response with an `output` field containing the generated response

### Example N8N Webhook Configuration

Your N8N workflow should include a webhook node configured to:
- Accept POST requests
- Expect JSON payload with `sessionId` and `chatInput` fields
- Return JSON response with `output` field

## Error Handling

The application includes comprehensive error handling:
- Validates required fields (UUID and message)
- Handles N8N API communication errors
- Returns appropriate HTTP status codes and error messages
- Logs detailed error information for debugging

## Docker Support

This application can be containerized using Docker. A Dockerfile is included for easy deployment and scaling.

```bash
# Build the image
docker build -t avr-llm-n8n .

# Run with environment file
docker run --env-file .env -p 6016:6016 avr-llm-n8n
```

## More Details & Documentation:

For comprehensive guides on using AVR with N8N, including:
- **Setup Tutorials**: Step-by-step configuration guides
- **Workflow Examples**: Pre-built conversation flows

Visit our detailed documentation: **[AVR + N8N Integration Guide](https://wiki.agentvoiceresponse.com/e/en/using-avr-with-n8n)**


## Support & Community

*   **GitHub:** [https://github.com/agentvoiceresponse](https://github.com/agentvoiceresponse) - Report issues, contribute code.
*   **Discord:** [https://discord.gg/DFTU69Hg74](https://discord.gg/DFTU69Hg74) - Join the community discussion.
*   **Docker Hub:** [https://hub.docker.com/u/agentvoiceresponse](https://hub.docker.com/u/agentvoiceresponse) - Find Docker images.
*   **Wiki:** [https://wiki.agentvoiceresponse.com/en/home](https://wiki.agentvoiceresponse.com/en/home) - Project documentation and guides.

## Support AVR

AVR is free and open-source. If you find it valuable, consider supporting its development:

<a href="https://ko-fi.com/agentvoiceresponse" target="_blank"><img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support us on Ko-fi"></a>

## License

MIT License - see the [LICENSE](LICENSE.md) file for details.
