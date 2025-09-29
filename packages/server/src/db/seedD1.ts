import { QdrantClient } from "@qdrant/js-client-rest";
import { GoogleGenAI, Type } from "@google/genai/node";

const qdrantClient = new QdrantClient({
	url: "http://localhost:6333",
});

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

const themes = [
	"javascript object reference",
	"javascript class",
	"javascript arrow function",
	"css",
];

async function main() {
	const theme = themes[Math.floor(Math.random() * themes.length)];
	const aiResponse = await ai.models.embedContent({
		model: "gemini-embedding-001",
		contents: theme,
		config: {
			outputDimensionality: 768,
		},
	});
	if (!aiResponse.embeddings) {
		throw new Error("Failed to embed the theme");
		return;
	}
	const embedding = aiResponse.embeddings[0].values;
	if (!embedding) {
		throw new Error("Failed to get vector");
		return;
	}
	const qdrantRes = await qdrantClient.search("utcode_learn", {
		vector: embedding,
		limit: 3,
	});
	const chunks = qdrantRes.map((res) => res.payload?.chunk);
	let prompt = "Create Quiz and answer based on the following fact.\n";
	for (let i = 0; i < chunks.length; i++) {
		prompt += `Fact ${i}: ${chunks[i]}\n`;
	}
	const quiz = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: prompt,
		config: {
			responseMimeType: "application/json",
			responseSchema: {
				type: Type.OBJECT,
				properties: {
					quiz: {
						type: Type.STRING,
					},
					answer: {
						type: Type.STRING,
					},
				},
			},
		},
	});
	console.log(quiz.text);
}

main();
