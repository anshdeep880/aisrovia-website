import * as fs from "fs";
import * as path from "path";

const FRAMES_DIR = path.join(process.cwd(), "public", "assets", "frames");
const OUTPUT_FILE_JS = path.join(process.cwd(), "public", "assets", "frames-manifest.js");
const OUTPUT_FILE_JSON = path.join(process.cwd(), "src", "data", "frames-manifest.json");

function generateFramesManifest() {
  console.log("Generating frames manifest...");

  if (!fs.existsSync(FRAMES_DIR)) {
    console.error(`Error: Source directory "${FRAMES_DIR}" does not exist.`);
    process.exit(1);
  }

  const dirs = fs.readdirSync(FRAMES_DIR);
  const manifest: Record<string, string[]> = {};

  for (const dir of dirs) {
    const dirPath = path.join(FRAMES_DIR, dir);
    const stat = fs.statSync(dirPath);

    if (stat.isDirectory() && !dir.startsWith(".")) {
      const files = fs.readdirSync(dirPath);
      const jpgFiles = files
        .filter((file) => file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png"))
        .sort((a, b) => a.localeCompare(b)); // Sort to ensure chronological order

      if (jpgFiles.length > 0) {
        manifest[dir] = jpgFiles.map((file) => `assets/frames/${dir}/${file}`);
      } else {
        console.warn(`Warning: No image files found in directory "${dir}"`);
      }
    }
  }

  // Generate JS contents
  const jsContent = `/* Generated from the asset directories during the site build. */
window.FRAME_MANIFEST = ${JSON.stringify(manifest, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE_JS, jsContent, "utf-8");
  console.log(`Successfully generated JS frames manifest at "${OUTPUT_FILE_JS}"`);

  // Generate JSON contents
  fs.writeFileSync(OUTPUT_FILE_JSON, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`Successfully generated JSON frames manifest at "${OUTPUT_FILE_JSON}"`);
}

generateFramesManifest();
