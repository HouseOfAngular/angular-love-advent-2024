import * as path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORKER_URL = process.env.API_URL;
const OUTPUT_DIR = path.join(__dirname, 'src/content/advent');

async function fetchAndSaveMarkdown() {
  try {
    const response = await fetch(WORKER_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const files = await response.json();

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const file of files) {
      const filePath = path.join(OUTPUT_DIR, `${file.fileName}.md`);
      fs.writeFileSync(filePath, file.content, 'utf8');
    }
  } catch (error) {
    console.error('Error fetching and saving Markdown files:', error);
  }
}

fetchAndSaveMarkdown();
