// A function to call OpenAI's GPT model to generate comments for code
async function addComments(code) {
    if (!isCode(code)) {
        return '<br>Error!<br>This is not a code!';
    }
    const promptText = "You are an expert programmer. Show me the full code no explainations!. Add detailed comments to this code:";
    const commentedCode = await fetchFromOpenAI(promptText, code, 0.5, 800); // Adjusted token count for detailed comments
    return formatCodeFromAI(commentedCode); // Format the code from AI for display}
}
// Post-process code from OpenAI to ensure correct formatting for display
function formatCodeFromAI(code) {
    let cleanedCode = code.replace(/```[\w+]*\n?/g, ''); // Removes Markdown code block syntax
    cleanedCode = cleanedCode.replace(/\n/g, '<br>'); // Converts new lines to <br> for HTML display
    return cleanedCode;
}

function isCode(text) {
    // Initialize an array of regular expressions for different programming languages
    const patterns = [
        // JavaScript patterns include keywords and syntax commonly used in JavaScript
        /\b(function|var|let|const|if|else|return|class|import|export|console\.log|=>)\b/,
        /[{;}]/, // Matches common JavaScript syntax characters like curly braces and semicolons

        // Java patterns include keywords and syntax commonly used in Java
        /\b(public|private|protected|class|import|package|new|return|void)\b/,
        /[{;}]/, // Matches common Java syntax characters like curly braces and semicolons

        // Python patterns include keywords and syntax commonly used in Python
        /\b(def|import|as|from|return|class|if|elif|else|print)\b/,
        /[:]/, // Matches colons used in Python syntax for defining blocks

        // C patterns include keywords and syntax commonly used in C
        /\b(int|char|float|double|struct|return|if|else|#include)\b/,
        /[{};]/, // Matches common C syntax characters like curly braces and semicolons
    ];

    // Apply each pattern to the text to see if it matches
    const matches = patterns.filter(pattern => pattern.test(text));

    // Return true if three or more patterns match indicating the text is likely code
    return matches.length >= 3;
}

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