# Authorized Awareness Simulation (Vercel)

This starter logs a participant's **confirmed participation** in a controlled awareness exercise. It does not silently record clicks or collect passwords/cookies.

## Google Sheet
Create `Sheet1` with columns: `ID | Participant | Status | Clicked At`, and rows such as `p001 | Madhu | Not Opened |`.

## Apps Script
1. Extensions > Apps Script; paste `GoogleAppsScript.gs`.
2. Replace `SHARED_SECRET` with a long random secret matching `SHEETS_SHARED_SECRET` in Vercel.
3. Deploy as Web App, execute as you, configure access for your controlled exercise, and copy the URL.

## Vercel configuration
Import into Vercel and set:
- `SHEETS_WEBHOOK_URL`: Apps Script `/exec` URL
- `SHEETS_SHARED_SECRET`: secret shared with Apps Script
- `DASHBOARD_KEY`: separate strong dashboard password
- `PARTICIPANTS_JSON`: JSON mapping IDs to names, e.g. `{"p001":"Madhu","p002":"Ram"}`

Redeploy after setting environment variables.

## Routes
- `/click/Madhu` — participant page; event is recorded only after the visible confirmation button is pressed.
- `/click/Ram` — same for Ram (name slug matching).
- `/dashboard` — admin dashboard.

Use only with participants who are authorized for the exercise. Names with duplicate slug values should be avoided.
