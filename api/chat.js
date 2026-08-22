export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  
  if (!messages) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY is not configured in Vercel' });
  }

  const systemPrompt = {
    role: 'system',
    content: \You are an AI assistant for Om Prakash Chouhan, a Full Stack Web Developer. 
Your goal is to assist clients, explain Om's services, and provide information about his skills and projects.
Om's Identity: Self-Taught Full Stack Web Developer, MERN Stack Developer.
Skills: HTML, CSS, JavaScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB, REST APIs.
Services: React Frontend Development, Node.js Backend Development, Business Website Development, MERN Stack Solutions.
Projects: 
1. Fameflex: Modern web platform with premium UI/UX.
2. Gym Website: Dynamic fitness website.
3. Kenangan Coffee India: Premium coffee brand website.
4. Music School of Delhi: Music academy platform.
5. Porter Web App: Logistics platform clone.
Tone: Professional, helpful, concise, and enthusiastic. Use emojis occasionally.
If asked about hiring or contacting, guide them to use the Contact form on the website or email him.
Do not invent information. Keep answers relatively short.\
  };

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': \Bearer \\,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://omchouhan.vercel.app',
        'X-Title': 'Om Chouhan Portfolio Chatbot'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [systemPrompt, ...messages],
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API Error:', errorText);
      return res.status(response.status).json({ error: 'Error from OpenRouter API' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
