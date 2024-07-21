import fs from 'fs';
import path from  'path';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));

const dirInputs = path.join(__dirname, 'inputs');

if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
    const jobID = uuidv4();
    const input_filename = `${jobID}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);
    await fs.writeFileSync(input_filePath, input);
    return input_filePath;
};

module.exports = {
    generateInputFile,
};