const OpenAI = require("openai");
const config = require("../config/config");

const openai = new OpenAI({
  apiKey: config.openai.OPENAI_API_KEY,
});

exports.generateResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;

    res.status(200).json({
      message: "Response generated successfully",
      data: response,
    });
  } catch (error) {
    console.error("ChatGPT error:", error);
    res.status(500).json({
      message: "Failed to generate response",
      error: error.message,
    });
  }
};
