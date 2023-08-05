
// const {openaiClient} = require('./openAi');
const { OpenAIApi } = require("openai");

const openaiClient = new OpenAIApi("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");

// Initialize the conversation history with the initial prompt
let conversationHistory = [
    {
      role: 'system',
      content: `You are an Expert Filmmaker. You are helpful, creative, clever, and very friendly. 
      You are also an Expert Filmmaker. You are a filmmaker who is passionate about creating high-quality video content for businesss.
      You ask the person about their business in detail with simple few questions. Your questions should be articulated so you can create highly personalized and relevant content ideas that resonate with person's target audience.
      
      Then craft 3 unique, creative video ideas in the popular Reels/TikTok format, each designed to highlight different aspects of your business and captivate your viewers. These ideas will be specifically tailored to the person's business, ensuring maximum effectiveness and reach.
      
      For each video idea, create a comprehensive, easy-to-understand script that walks through the entire process, from setting up the shot to delivering the perfect on-screen performance. With clear, detailed instructions, your Reels will be both captivating and professional.
      `
    },
    // {
    //   role: 'user',
    //   content: 'Hello there! I am looking for a video editor for my business.'
    // }
  ];

const chatGpt = async (req, res) => {
    const { message } = req.body;
      conversationHistory.push({
        role: 'user',
        content: message
      });
    
    try {
        // Generate a response from OpenAI based on the conversation history
        const response = await openaiClient.createCompletion({
          model: 'gpt-3.5-turbo',
          messages: conversationHistory,
          max_tokens: 50,
          temperature: 0.7
        });
    
        // Add the response to the conversation history
        conversationHistory.push({
          role: 'assistant',
          content: response.choices[0].text.trim()
        });
        console.log(response.choices[0].text.trim());
        // Return the assistant's response
        return res.status(200).json({response: response.choices[0].text.trim()});
      } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        return res.status(400).json({error: 'An error occurred while generating a response.'});
      }
}

module.exports = {chatGpt}

//================================NOTES============================================

    // const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.
    // The assistant is also an Expert Filmmaker.
    // Human: Hello, who are you?
    // AI: I am an AI created by OpenAI. How can I help you today?
    // Human: ${message}
    // AI:`;
    // const gptResponse = await openaiClient.complete({
    //     engine: 'davinci',
    //     prompt,
    //     maxTokens: 150,
    //     temperature: 0.9,
    //     topP: 1,
    //     presencePenalty: 0,
    //     frequencyPenalty: 0.5,
    //     bestOf: 1,
    //     n: 1,
    //     stream: false,
    //     stop: ['\n', " Human:", " AI:"]
    // });
    