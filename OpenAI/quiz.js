async function generate_quiz(text) {
    const promptText = "generate a quiz with 10 multiple-choice questions, each having four options, from a given text and display the correct answers. no need headlines. every answer choice is maximum 20 letters long (including spaces). display the answers at the end after all questions. make it attractive and good looking";
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
    // Parsing the quiz content where each question block is separated by two newlines.
    // We assume that each answer choice is also separated by a newline within each question block.
    const questionBlocks = quizContent.split(/\n\n/); // Split questions by double newline
    let formattedQuiz = '';

    questionBlocks.forEach(block => {
        const lines = block.trim().split('\n'); // Split each block into lines
        let formattedQuestion = `<div class='quiz-question'><h3>${lines[0]}</h3><ul style='list-style-type: none;'>`; // Style as you see fit

        lines.slice(1).forEach((line, index) => {
            // Highlight the correct answer in green and bold, assuming '**' marks the correct answer
            if (line.includes('**')) {
                line = line.replace(/\*\*(.*?)\*\*/, `<strong style="color:green;">$1</strong>`);
            }
            // Display each choice on a new line
            formattedQuestion += `<li>${line}</li>`;
        });

        formattedQuestion += '</ul></div>';
        formattedQuiz += formattedQuestion;
    });

    return `<div class="quiz-container" style="white-space: pre-line;">${formattedQuiz}</div>`; // Ensure each question is on a new line
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