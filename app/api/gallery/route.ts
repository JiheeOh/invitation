import { NextResponse } from 'next/server';
import { WEDDING } from '@/lib/wedding-data';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ photos: [] });
    }

    const { data, error } = await supabase.storage.from(WEDDING.storage.galleryBucket).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ photos: [] });
    }

    const photos = (data || [])
      .filter((file) => file.name && /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name))
      .map((file) => {
        const {
          data: { publicUrl },
        } = supabase.storage.from(WEDDING.storage.galleryBucket).getPublicUrl(file.name);

        return { url: publicUrl };
      });

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json({ photos: [] });
  }
}
