import { NextResponse } from 'next/server';

// Define the system prompt message
const systemPrompt: Message = {
  role: 'system',
  content:
    'You are a journaling assistant. You help the user write a journal by asking questions, asking follow up questions, and guiding the conversation. You will help the user explore their thoughts deeper and from other viewpoints by asking questions. Be concise in your responses.',
};

// Define the message and request body interfaces
interface Message {
  role: string;
  content: string;
}
interface RequestBody {
  messages: Message[];
}

// Define the POST function
export async function POST(req: Request) {
  // Check if the OpenAI API key exists in the .env
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('The OpenAI API key is missing.');
  }

  const request: RequestBody = await req.json();

  // Check if messages exist in the request
  if (!request.messages || request.messages.length === 0) {
    return NextResponse.json({ error: 'Message param is required' });
  }

  const messagesLog = request.messages;
  const prompt = [systemPrompt, ...messagesLog];
  console.log(prompt);
  try {
    // Fetch the response from the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: prompt,
      }),
    });

    const data = await response.json();

    // Check if the response is successful
    if (response.ok) {
      console.log(data)
      return NextResponse.json({ message: data.choices[0].message });
    } else {
      console.error(`OpenAI Error: `);
      console.error(data.error);
      return NextResponse.json({ error: 'There was an OpenAI error.' });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return NextResponse.json({ error: 'An error occurred' });
  }
}
