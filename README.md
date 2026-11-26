# Awareness Simulation Dashboard (Vercel + Supabase)

This app is intended for an **authorized, disclosed security-awareness simulation**. It records a named link activation and redirects to Outlook. It records no IP address, device fingerprint, credentials, or other personal telemetry. A link activation is not proof that a message was read.

## Features
- `/track/<name>` logs a named link activation and redirects to `https://outlook.com`
- Admin login with Supabase Auth
- Dashboard: SL No, Name, Status, Count, Timestamp
- Hosted on Vercel

## 1. Supabase
1. Create a project at https://supabase.com.
2. In SQL Editor, run `supabase/schema.sql`.
3. In Authentication, create the admin user (or enable only the sign-in method you intend to use).
4. Copy Project URL, anon/public key, and service-role key from Project Settings > API.

## 2. Configure environment variables
Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (keep private; never expose to client)

## 3. Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000/login. Tracking example: http://localhost:3000/track/madhu

## 4. Deploy on Vercel
1. Push the project to a GitHub repository.
2. Import the repo in https://vercel.com/new.
3. Add the same environment variables in Project Settings > Environment Variables.
4. Deploy.
5. Add the production URL to Supabase Auth > URL Configuration (Site URL and redirect URLs as appropriate).

## Link format
`https://YOUR-APP.vercel.app/track/madhu`

## Privacy / safeguards
- Use only for an authorized campaign with an appropriate participant notice and scope.
- Do not use the link to collect passwords, authentication tokens, or sensitive data.
- Keep dashboard access restricted to approved administrators.
- Define retention and delete campaign event data when the campaign ends.

### Static admin login configuration

Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and a long random `ADMIN_SESSION_SECRET` in `.env.local` and Vercel Environment Variables. Credentials are checked server-side and a signed, HttpOnly session cookie is issued. Do not commit secrets.

Supabase environment variables use the new publishable/secret key names: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY`. The publishable key is not used for admin database access; keep the secret key server-only.
