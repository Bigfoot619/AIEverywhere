async function improveEnglish(text, isCreative = false) {
    const temperature = isCreative ? 0.9 : 0.5; // High temperature for creative, standard for normal
    const promptText = isCreative ? "You are an English teacher. Creatively improve the following text:" :
        "You are an English teacher. Improve the following text to professional English standards:";

    const userTokens = text.split(/\s+/).length;  // A rough estimate based on spaces
    const systemTokens = promptText.split(/\s+/).length;

    if (userTokens + systemTokens > 150) {
        return `Text is too long to process (estimated ${userTokens + systemTokens} tokens). Please reduce the text length and try again.`;
    }

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system",
            content: promptText
        },
        {
            role: "user",
            content: text
        }],
        max_tokens: 150,
        temperature: temperature
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer sk-proj-SlZJ0i6IXWElnmPXIPQ1T3BlbkFJmJAyu1kgWBgswiX5COeY`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.choices[0].message.content.trim();
    } catch (error) {
        console.error("Failed to improve English with OpenAI: ", error);
        return "Failed to improve text due to an error.";
    }
}
