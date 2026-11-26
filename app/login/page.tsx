import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { makeSession, SESSION_COOKIE } from '@/lib/auth';

async function login(formData: FormData) {
  'use server';
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');
  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) redirect('/login?error=1');
  (await cookies()).set(SESSION_COOKIE, makeSession(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 60 * 60 * 8 });
  redirect('/dashboard');
}
export default async function Login({searchParams}: {searchParams: Promise<{error?:string}>}) {
 const params=await searchParams;
 return <main className="shell" style={{maxWidth:480}}><div className="panel"><h1>Awareness Dashboard</h1><p className="muted">Admin sign-in</p><form action={login}><label>Username</label><input className="input" name="username" autoComplete="username" required/><label>Password</label><input className="input" type="password" name="password" autoComplete="current-password" required/><button className="btn">Sign in</button></form>{params.error&&<p style={{color:'#b42318'}}>Invalid credentials or server configuration.</p>}<p className="muted" style={{fontSize:12,marginTop:20}}>Authorized awareness simulations only. This records link activations, not email reads.</p></div></main>;
}
