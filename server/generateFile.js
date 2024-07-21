import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';


const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname)
const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (language, code) => {
    const jobId = uuidv4();
    console.log(jobId);
    const fileName = `${jobId}.${language}`
    const filePath = path.join(dirCodes, fileName);
    fs.writeFileSync(filePath, code); //clear
    

    return filePath;
}

export default generateFile;