import { callPerplexityAPI } from './perplexity';

export const ai = {
  definePrompt: ({ prompt, input, output }: any) => ({
    generate: async (inputData: any) => {
      const fullPrompt = prompt.replace(/\{\{(\w+)\}\}/g, (match, key) => inputData[key] || match);
      const messages = [{ role: 'user', content: fullPrompt }];
      const response = await callPerplexityAPI(messages);
      return { output: response };
    },
  }),
  defineFlow: ({ name, inputSchema, outputSchema }: any, handler: any) => handler,
};
