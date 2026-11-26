import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';

const cookieName = 'admin_session';
function signature(value: string) { return createHmac('sha256', process.env.ADMIN_SESSION_SECRET!).update(value).digest('hex'); }
export function makeSession() { const value = 'admin'; return `${value}.${signature(value)}`; }
export async function isAdmin() {
  if (!process.env.ADMIN_SESSION_SECRET) return false;
  const value = (await cookies()).get(cookieName)?.value || '';
  const [user, sig] = value.split('.');
  if (user !== 'admin' || !sig) return false;
  const expected = signature(user);
  try { return timingSafeEqual(Buffer.from(sig), Buffer.from(expected)); } catch { return false; }
}
export const SESSION_COOKIE = cookieName;
