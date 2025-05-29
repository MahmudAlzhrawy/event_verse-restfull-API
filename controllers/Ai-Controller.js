    // controllers/Ai-Controller.js
    require("dotenv").config();
    const OpenAI = require("openai");

    const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    });

    const suggestTasks = async (req, res) => {
    try {
        const { eventTitle, description } = req.body;

        const completion = await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
            {
            role: "system",
            content: "You are an assistant that helps event organizers generate task suggestions.",
            },
            {
            role: "user",
            content: `Suggest tasks for an event titled "${eventTitle}" with this description: "${description}".`,
            },
        ],
        });

        const suggestions = completion.choices[0].message.content;
        res.status(200).json({ suggestions: suggestions.split("\n") });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get task suggestions" });
    }
    };

    module.exports = suggestTasks; 
