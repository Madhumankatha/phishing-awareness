import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/supabase-server';

// Use only for an authorized, disclosed awareness simulation. Do not collect credentials.
export async function GET(_request: NextRequest, {params}:{params:Promise<{name:string}>}) {
  const { name } = await params;
  const participant = decodeURIComponent(name).trim().slice(0,100);
  if (!participant || !/^[a-zA-Z0-9._-]+$/.test(participant)) return NextResponse.redirect('https://outlook.com');
  try {
    const db = adminDb();
    await db.from('click_events').insert({ participant_name: participant, occurred_at: new Date().toISOString() });
  } catch (e) { console.error('Tracking event write failed', e); }
  return NextResponse.redirect('https://outlook.com', {status:302});
}
