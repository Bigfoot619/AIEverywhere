async function improveEnglish(text, isCreative = false) {
    const temperature = isCreative ? 0.9 : 0.5; // High temperature for creative, standard for normal
    const promptText = isCreative ? "You are an English teacher. Creatively improve the following text:" :
        "You are an English teacher. Improve the following text to professional English standards:";
    return fetchFromOpenAI(text, promptText, temperature, 200);
}

// apiHelper.js
async function fetchFromOpenAI(text, promptText, temperature, num_tokens) {
    const userTokens = text.split(/\s+/).length;  // A rough estimate based on spaces
    const systemTokens = promptText.split(/\s+/).length;

    if (userTokens + systemTokens > num_tokens) {
        return `Text is too long to process (estimated ${userTokens + systemTokens} tokens). Please reduce the text length and try again.`;
    }

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system",
            content: promptText
        }, {
            role: "user",
            content: text
        }],
        max_tokens: num_tokens,
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
        console.error("Error in API request: ", error);
        return "Failed to process the request due to an error.";
    }
}