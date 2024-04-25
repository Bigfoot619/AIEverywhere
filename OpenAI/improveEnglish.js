async function improveEnglish(text) {
    // Define a function to estimate token count (simplistic approach)
    function estimateTokenCount(text) {
        return text.split(/\s+/).length;  // A rough estimate based on spaces
    }

    // Calculate token count for user's input
    const userTokens = estimateTokenCount(text);
    const systemTokens = estimateTokenCount("You are an English teacher. Improve the following text to professional English standards:");
    const totalTokens = userTokens + systemTokens;

    // Check if the total token count exceeds the model's max_tokens setting
    if (totalTokens > 150) {
        return `Text is too long to process (estimated ${totalTokens} tokens). Please reduce the text length and try again.`;
    }

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system",
            content: "You are an English teacher. Improve the following text to professional English standards:"
        },
        {
            role: "user",
            content: text
        }],
        max_tokens: 150,  // Recommended default for moderate length completions
        temperature: 0.5  // Balanced value between randomness and coherence
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
        return result.choices[0].message.content.trim();  // Note the difference in how the response is parsed
    } catch (error) {
        console.error("Failed to improve English with OpenAI: ", error);
        return "Failed to improve text due to an error.";
    }
}
