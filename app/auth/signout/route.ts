import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/auth';
export async function POST(){ (await cookies()).delete(SESSION_COOKIE); return NextResponse.redirect(new URL('/login',process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000')); }
