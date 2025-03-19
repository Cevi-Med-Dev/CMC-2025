import Airtable from 'airtable';

console.log("DEBUG: Loaded API Key:", process.env.AIRTABLE_API_KEY); // Check if env var is loaded

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export default base;