import * as fs from "fs";
import * as path from "path";

const PROJECTS_IMAGES_DIR = path.join(process.cwd(), "public", "assets", "Projects Images");
const OUTPUT_DIR = path.join(process.cwd(), "src", "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "services-thumbnails.json");

// Helper to slugify folder names
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, "") // remove & to match common conventions
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric spaces with hyphens
    .replace(/^-+|-+$/g, ""); // trim hyphens
}

function generateManifest() {
  console.log("Generating services thumbnails manifest...");

  if (!fs.existsSync(PROJECTS_IMAGES_DIR)) {
    console.error(`Error: Source directory "${PROJECTS_IMAGES_DIR}" does not exist.`);
    process.exit(1);
  }

  // Read all items inside the Projects Images folder
  const items = fs.readdirSync(PROJECTS_IMAGES_DIR);
  const manifest: Array<{ project: string; src: string; id: string }> = [];

  for (const item of items) {
    const itemPath = path.join(PROJECTS_IMAGES_DIR, item);
    const stat = fs.statSync(itemPath);

    // Skip OS files (like .DS_Store) and process only directories
    if (stat.isDirectory() && !item.startsWith(".")) {
      const files = fs.readdirSync(itemPath);
      
      // Filter for valid image formats
      const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];
      const imageFiles = files
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return imageExtensions.includes(ext) && !file.startsWith(".");
        })
        .sort((a, b) => a.localeCompare(b)); // Sort alphabetically

      if (imageFiles.length > 0) {
        const firstImage = imageFiles[0];
        
        // Construct the raw and encoded paths
        const rawPath = `/assets/Projects Images/${item}/${firstImage}`;
        const src = encodeURI(rawPath);
        const id = slugify(item);

        manifest.push({
          project: item.trim(),
          src,
          id,
        });
      } else {
        console.warn(`Warning: No images found in folder "${item}"`);
      }
    }
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Sort manifest items alphabetically by project name for deterministic consistency
  manifest.sort((a, b) => a.project.localeCompare(b.project));

  // Write JSON output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`Successfully generated manifest with ${manifest.length} items at "${OUTPUT_FILE}"`);
}

generateManifest();
