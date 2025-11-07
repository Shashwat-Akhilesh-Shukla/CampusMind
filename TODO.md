# TODO: Update Codebase to Use Perplexity API Instead of Gemini

## Tasks
- [x] Update package.json to remove Genkit dependencies and add any necessary new ones
- [x] Refactor src/ai/genkit.ts to use Perplexity API directly
- [x] Update src/ai/flows/ai-guardian-chatbot-summarization.ts to use new AI function
- [x] Update src/ai/flows/ai-guardian-chatbot-support.ts to use new AI function
- [x] Update src/ai/dev.ts if necessary
- [x] Ensure PERPLEXITY_API_KEY is used from env
- [ ] Test the updated flows (requires API key)
