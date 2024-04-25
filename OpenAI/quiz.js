async function generate_quiz(text) {
    const promptText = "generate a quiz with 10 multiple-choice questions, each having four options, from a given text and display the correct answer in green and bold. make it attractive and good looking";
    const num_tokens = 750; // Adjust based on your needs and token limits
    const temperature = 0.5; // Lower temperature for more consistent outputs

    try {
        const quizContent = await fetchFromOpenAI(text, promptText, temperature, num_tokens);
        return formatQuizForDisplay(quizContent);
    } catch (error) {
        console.error("Error generating quiz: ", error);
        return "Failed to generate the quiz due to an error.";
    }
}

function formatQuizForDisplay(quizContent) {
    // Assuming the API returns the quiz content with correct answers marked in a specific way, e.g., **correct answer**
    // You would need to parse and replace the correct answer formatting from the API's output to HTML.
    const quizHtml = quizContent.replace(/\*\*(.*?)\*\*/g, '<strong style="color:green;">$1</strong>');
    return `<div>${quizHtml}</div>`;
}

async function fetchFromOpenAI(text, promptText, temperature, num_tokens) {
    const userTokens = text.split(/\s+/).length;  // A rough estimate based on spaces
    const systemTokens = promptText.split(/\s+/).length;

    if (userTokens + systemTokens > num_tokens) {
        return `Text is too long to process (estimated ~${userTokens + systemTokens} tokens). Please reduce the text length and try again.`;
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