const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    // TODO: move these to environment variables

    apiKey: "asd",
});
const openai = new OpenAIApi(configuration);

module.exports = {openaiClient: openai}