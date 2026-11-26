export async function GET(req){
 const key=req.headers.get('x-admin-key');
 if(!process.env.DASHBOARD_KEY||key!==process.env.DASHBOARD_KEY) return Response.json({error:'unauthorized'},{status:401});
 if(!process.env.SHEETS_WEBHOOK_URL||!process.env.SHEETS_SHARED_SECRET) return Response.json({error:'not configured'},{status:503});
 const url=new URL(process.env.SHEETS_WEBHOOK_URL);url.searchParams.set('action','dashboard');url.searchParams.set('secret',process.env.SHEETS_SHARED_SECRET);
 const upstream=await fetch(url,{cache:'no-store'}); if(!upstream.ok) return Response.json({error:'sheet unavailable'},{status:502});
 return Response.json(await upstream.json());
}
