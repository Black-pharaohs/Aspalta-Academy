import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini client
// Note: API Key is expected to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTutorResponse = async (
  prompt: string, 
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a context-aware prompt based on the persona
    const systemInstruction = `
      أنت "الحكيم أسبالتا"، مرشد تعليمي ذكي في منصة "أكاديمية أسبالتا".
      أنت تتحدث العربية بطلاقة وبأسلوب يجمع بين الحكمة القديمة والتكنولوجيا الحديثة.
      مهمتك مساعدة الطالب في فهم الدروس، الإجابة على الأسئلة، وتحفيزهم للصعود في "سلالم المعرفة" (استعارة للتقدم التعليمي).
      كن مختصراً، مفيداً، ومشجعاً.
    `;

    // Convert simple history to chat format if needed, 
    // but for single turn with context, we'll use generateContent with instruction.
    // For a real chat, we would use ai.chats.create, but here we do single turn for simplicity or use sendMessage.
    
    // Let's use the chat API for better context handling
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
        message: prompt
    });

    return response.text || "عذراً، لم أستطع سماعك جيداً وسط رياح الصحراء. هل يمكنك إعادة السؤال؟";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ في الاتصال بمعبد الحكمة. يرجى المحاولة لاحقاً.";
  }
};