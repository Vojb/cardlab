import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
export async function sendMessageToAssistant(message: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Utan att nämna spelarnamnet eller div 5. Skriv en kort, rolig och träffsäkert spelarbeskrivning på max 40 ord, skriv som Erik Niva ofta beskriver spelare. Texten ska ha glimten i ögat och mycket självdistans, utan överdrifter eller klyschor. Inga djurliknelser.",
        },
        { role: "user", content: message },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error.status === 429) {
      alert(
        "Du skickar för många förfrågningar eller har överskridit din OpenAI-kvot. Vänta gärna en stund och försök igen."
      );
    } else {
      alert(
        "Ett fel uppstod när meddelandet skulle skickas till assistenten. Försök igen senare."
      );
    }
    console.error("Error sending message to assistant:", error);
  }
}
