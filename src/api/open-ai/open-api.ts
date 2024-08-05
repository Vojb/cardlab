import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "", // import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
export async function sendMessageToAssistant(message: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "skriv en kort beskrivande text på runt 50 ord om en fotbollsspelare som är :",
        },
        { role: "user", content: message },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message to assistant:", error);
  }
}
