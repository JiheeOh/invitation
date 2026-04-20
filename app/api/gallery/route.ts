import { readdirSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const galleryDir = join(process.cwd(), 'public', 'images', 'gallery');
    const files = readdirSync(galleryDir);

    const imageFiles = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .sort();

    const photos = imageFiles.map((file) => `/images/gallery/${file}`);

    return Response.json({ photos });
  } catch (error) {
    console.error('Error reading gallery:', error);
    return Response.json({ photos: [] });
  }
}
