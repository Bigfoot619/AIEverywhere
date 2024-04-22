async function improveEnglish(text) {
    const data = {
        prompt: "Rewrite the following text with better English:\n" + text,
        max_tokens: 60,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    };
    console.log("gilad");
    // try {
    //     const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     });

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const result = await response.json();
    //     return result.choices[0].text.trim();
    // } catch (error) {
    //     console.error("Failed to improve English with OpenAI: ", error);
    //     return "Failed to improve text due to an error.";
    // }
}
