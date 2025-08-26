# A step-by-step guide to creating an AI voicebot with n8n
When it comes to building AI voicebots, n8n offers a powerful yet user-friendly solution that makes the process much easier.

Unlike traditional development approaches that involve writing complex scripts, n8n provides a visual workflow builder that simplifies automation without requiring extensive coding knowledge. This means you can create a voicebot faster and with more flexibility, all while maintaining full control over its functionality.

One of n8n’s standout features is its ability to seamlessly integrate with various APIs, databases, and external tools—allowing your voicebot to pull in real-time data, store conversation history, and execute automated tasks.

Additionally, its modular, no-code approach enables both beginners and experienced developers to experiment, iterate, and scale their voicebots without technical barriers.

By leveraging n8n, you gain a powerful yet accessible way to build an AI voicebot that is both intelligent and highly customizable.

## Example workflow

This workflow leverages OpenAI's language models and SerpAPI to power a dynamic and intelligent conversational agent. With built-in manual chat triggers and a memory buffer, it ensures smooth, context-aware interactions, delivering accurate and responsive conversations.

### Step 1: Start with a Chat Trigger

Begin by adding a chat trigger node to your workflow.

You can decide whether you would like to make the chat publicly available. For avr purposes, switch this option enabled and copy it on variable: PUBLIC_CHAT_URL=http://localhost:5678/webhook/your_n8n_public_chat_id/chat
.

### Step 2: Connect the Chat Trigger to an AI Agent node

Connect the chat trigger to a central AI agent node.

The source for the prompt is our connected chat trigger node. If you want tool use, pick “Tools Agent”, and if you don’t, pick “Conversational Agent”.

### Step 3: Integrate your Chat Model

Add an AI chat model node (such as one powered by OpenAI) immediately after the agent.

Choose your favorite model provider and a suitable model for your purpose. Other than that, you can change parameters such as temperature or maximum number of tokens, but this is more important for optimization than for setup.

### Step 4: Incorporate a Memory node for context

Include a memory storage node, like a window buffer memory node, in your workflow.

You should use the connected chat trigger node as session ID. The context length varies depending on your needs. Context length makes the LLM calls more expensive, so be aware. The usual range for this is between 5-20.

### Step 5: Add SerpAPI for enriched responses

Finally, integrate additional tools—such as SerpAPI for web search.

For SerpAPI you can select target country, language, and device as parameters for your queries.

Now you are ready to go with a fully functioning AI voicebot with n8n integrated with OpenAI AI models and the SerpAPI for live information retrieval.

You can extend it with more tools from the extensive n8n tool library, ranging from simple tools like a calculator to making the AI voicebot update your database with the Postgres tool node.