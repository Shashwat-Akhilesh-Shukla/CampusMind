'use server';

import { aiGuardianChatbotSupport, ChatbotInput, ChatbotOutput } from '@/ai/flows/ai-guardian-chatbot-support';
import { summarizeConversation, SummarizeConversationInput, SummarizeConversationOutput } from '@/ai/flows/ai-guardian-chatbot-summarization';

export async function handleChatSubmit(userInput: string): Promise<ChatbotOutput> {
  const input: ChatbotInput = { userInput };
  try {
    const response = await aiGuardianChatbotSupport(input);
    return response;
  } catch (error) {
    console.error("Error in AI chatbot support flow:", error);
    throw new Error("Failed to get response from AI");
  }
}

export async function handleChatSummary(conversationHistory: string): Promise<SummarizeConversationOutput> {
  const input: SummarizeConversationInput = { conversationHistory };
  try {
    const response = await summarizeConversation(input);
    return response;
  } catch (error) {
    console.error("Error in conversation summarization flow:", error);
    throw new Error("Failed to get summary from AI");
  }
}
