import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getChatResponse = async (history: { role: string, text: string }[], message: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure your environment.";
  
  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are ArcadeX, a helpful gaming assistant. You help users with tips for games like Sudoku, Racing, and Endless Runners. Keep answers short, fun, and gamer-focused." 
    });

    // Simple history conversion for this stateless demo
    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Network error or API quota exceeded.";
  }
};

export const generateScaryStory = async (context: string, choice: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are the Game Master for a 'Scary Teacher' style horror text adventure. The user is a student trapped in a school at night. Provide short, suspenseful scenarios (max 50 words) based on user choices. End with 'What do you do?'" 
    });

    const prompt = `Context: ${context}. User Action: ${choice}. Next scene:`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return "The shadows are too thick... (Connection Error)";
  }
};
