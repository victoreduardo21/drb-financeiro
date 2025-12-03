import { GoogleGenAI } from "@google/genai";

// Ensure API key is available
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates a job description based on the title and department.
 */
export const generateJobDescription = async (title: string, department: string): Promise<string> => {
  if (!ai) {
    console.warn("API Key not found for Gemini.");
    return "Erro: Chave de API não configurada. Por favor, preencha manualmente.";
  }

  try {
    const model = ai.models;
    
    const prompt = `
      Escreva uma descrição de cargo profissional e responsabilidades resumidas (em tópicos) 
      para a posição de "${title}" no departamento de "${department}" 
      de uma empresa de Logística e Transportes de grande porte.
      
      Foque em competências técnicas financeiras e logísticas.
      Mantenha o tom formal e corporativo.
      Limite a resposta a 3 parágrafos curtos ou lista de bullets.
      Retorne apenas o texto da descrição.
    `;

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar a descrição.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "Erro ao conectar com a IA. Por favor, tente novamente ou preencha manualmente.";
  }
};