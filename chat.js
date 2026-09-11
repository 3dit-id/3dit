
// Netlify Function: /.netlify/functions/chat
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: JSON.stringify({error:"Method not allowed"}) };
  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) return { statusCode: 400, body: JSON.stringify({error:"Message is required"}) };
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return { statusCode: 500, body: JSON.stringify({error:"OPENAI_API_KEY is not configured"}) };

    const response = await fetch("https://api.openai.com/v1/responses", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${apiKey}` },
      body:JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        instructions:"You are 3DIT Design & Technology's helpful website assistant. Answer clearly in Indonesian unless the user asks for another language. Do not claim professional structural certification. For construction calculations, explain assumptions and recommend professional verification.",
        input: message
      })
    });
    const data = await response.json();
    if (!response.ok) return { statusCode: response.status, body: JSON.stringify({error:data?.error?.message || "OpenAI API error"}) };
    const reply = data.output?.flatMap(item => item.content || []).map(part => part.text || "").join("\n").trim() || "Tidak ada jawaban.";
    return { statusCode:200, headers:{"Content-Type":"application/json"}, body:JSON.stringify({reply}) };
  } catch (e) {
    return { statusCode:500, body:JSON.stringify({error:"Server error"}) };
  }
};
