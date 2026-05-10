import { NextResponse } from 'next/server';
import { WEDDING } from '@/lib/wedding-data';
import { getSupabase, getStorageUrl } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ photos: [] }, {
        headers: { 'Cache-Control': 'public, max-age=30' },
      });
    }

    const { data, error } = await supabase.storage.from(WEDDING.storage.bucket).list('', {
      limit: 100,
      offset: 0,
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ photos: [] }, {
        headers: { 'Cache-Control': 'public, max-age=30' },
      });
    }

    const photos = (data || [])
      .filter((file: { name: string }) => file.name && /^\d+\.(jpg|jpeg|png|webp)$/i.test(file.name))
      .map((file: { name: string }) => ({ name: file.name, order: parseInt(file.name, 10) }))
      .sort((a, b) => a.order - b.order)
      .map(({ name }) => getStorageUrl(WEDDING.storage.bucket, name));

    return NextResponse.json({ photos }, {
      headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json({ photos: [] }, {
      headers: { 'Cache-Control': 'public, max-age=30' },
    });
  }
}
