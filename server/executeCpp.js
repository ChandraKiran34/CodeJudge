import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { exec } from "child_process"; 

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath) => {
  const jobId = path.basename(filePath).split('.')[0]; 
  const fileName = `${jobId}.exe`;
  const outPath  = path.join(outputPath, fileName);

  return new Promise((resolve, reject) => {
    exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${fileName}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);

      // Clean up the executable file after execution
      fs.unlink(outPath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Failed to delete file: ${outPath}`, unlinkErr);
        } else {
          console.log(`Successfully deleted file: ${outPath}`);
        }
      });

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Failed to delete file: ${filePath}`, unlinkErr);
        } else {
          console.log(`Successfully deleted file: ${filePath}`);
        }
      });
    });
  });
};

export default executeCpp;
