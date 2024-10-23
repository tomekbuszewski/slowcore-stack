import fs from "node:fs";
import path from "node:path";

const filesToCheck = [
  "app/ui/atoms/index.ts",
  "app/ui/molecules/index.ts",
  "app/ui/organisms/index.ts",
];

for (const filePath of filesToCheck) {
  const fullPath = path.resolve(path.dirname(""), filePath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, "");
    console.log(`Created file: ${fullPath}`);
  } else {
    console.log(`File already exists: ${fullPath}`);
  }
}
