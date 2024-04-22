async function improveEnglish(text) {
    const data = {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system",
            content: "You are an English teacher. Improve the following text to professional English standards:"
        },
        {
            role: "user",
            content: text
        }]
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer sk-proj-mWBBoF3HUtt5VRTa3qW6T3BlbkFJETOliAbuy7jjHPkKmGHy`,  // Make sure to secure your API key properly
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
