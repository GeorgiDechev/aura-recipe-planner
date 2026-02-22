// ==========================================================================
// Gemini API Integration - Recipe Generator
// ==========================================================================

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

function getApiKey() {
    let key = localStorage.getItem('aura_gemini_key');
    if (!key) {
        key = prompt("To generate AI recipes, please enter your free Google Gemini API Key. \n\nGet one securely at: https://aistudio.google.com/app/apikey");
        if (key) {
            localStorage.setItem('aura_gemini_key', key);
        }
    }
    return key;
}

// Function to reset API key if the user entered an invalid one
function clearApiKey() {
    localStorage.removeItem('aura_gemini_key');
}

/**
 * 
 * @param {string} userPrompt - e.g. "healthy dinner for a picky toddler"
 * @returns {Promise<Object>} - Parsed recipe object {title, ingredients[], instructions}
 */
async function generateRecipeFromGemini(userPrompt) {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API Key is required to use this feature.");
    }

    const systemPrompt = `You are an expert, family-friendly chef. Based on the user's prompt, create a delicious recipe. 
CRITICAL: You MUST respond ONLY with a raw, valid JSON object. Do not include markdown formatting like \`\`\`json. 
The JSON must perfectly match this structure:
{
  "title": "String - Fun, appetizing title",
  "ingredients": ["String - 1 cup flour", "String - 2 eggs"],
  "instructions": "String - 1. Preheat oven...\\n2. Mix together... (Use newline characters for steps)"
}`;

    const requestBody = {
        contents: [{
            parts: [{
                text: `${systemPrompt}\n\nUser request: ${userPrompt}`
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        }
    };

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            if (data.error.code === 400 || data.error.message.includes("API key")) {
                clearApiKey();
                throw new Error("Invalid API Key. Please try again.");
            }
            throw new Error(data.error.message || "Failed to generate recipe.");
        }

        const rawText = data.candidates[0].content.parts[0].text;

        // Clean up markdown block if the model accidentally includes it
        const cleanJsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

        const recipeData = JSON.parse(cleanJsonText);
        return recipeData;

    } catch (e) {
        console.error("Recipe Generation Failed", e);
        throw e;
    }
}
