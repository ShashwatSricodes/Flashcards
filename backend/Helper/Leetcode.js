import axios from 'axios';

const API_URL = "https://api.cohere.ai/generate";
const API_KEY = "XomxNlUrVkioy7oQprLCCKSWJPOstJce4QPCRI9I";

export async function generateOptimizedSolution(question) {
  try {
    const prompt = `Provide an optimized step-by-step solution to the following Leetcode problem in clear, concise words. Only provide the approach, no explanation beyond the steps, Add one next line after every step only no other special characters, no backticks.:
    Problem: ${question}`;

    const response = await axios.post(
      API_URL,
      {
        model: "command-r-plus-08-2024",
        prompt: prompt,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.text) {
      return response.data.text;
    } else {
      console.error("Unexpected response structure:", response.data);
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error("Error occurred:", error.response?.data || error.message);
    throw new Error('Failed to generate solution');
  }
}
