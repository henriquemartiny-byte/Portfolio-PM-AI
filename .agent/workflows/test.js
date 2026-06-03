const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: 'dummy' });
console.log('generateContent type:', typeof ai.models.generateContent);
console.log('keys of models:', Object.keys(ai.models));
console.log('all properties of models:', Object.getOwnPropertyNames(ai.models));
for (let p = ai.models; p; p = Object.getPrototypeOf(p)) {
  console.log('proto level keys:', Object.getOwnPropertyNames(p).filter(k => k.includes('generate')));
}
