// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const generateDescription = async (productName) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash", // ✅ IMPORTANT
//       contents: `Write a professional e-commerce product description for: ${productName}`,
//     });

//     return response.text;
//   } catch (error) {
//     console.error("GEMINI ERROR:", error);
//     return null;
//   }
// };

// module.exports = generateDescription;