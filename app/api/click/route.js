export async function POST(req){
 try {
  const {id}=await req.json();
  const participants=JSON.parse(process.env.PARTICIPANTS_JSON||'{}');
  if(typeof id!=='string'||!Object.hasOwn(participants,id)) return Response.json({error:'invalid id'},{status:400});
  if(!process.env.SHEETS_WEBHOOK_URL||!process.env.SHEETS_SHARED_SECRET) return Response.json({error:'not configured'},{status:503});
  const upstream=await fetch(process.env.SHEETS_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,participant:participants[id],secret:process.env.SHEETS_SHARED_SECRET}),cache:'no-store'});
  if(!upstream.ok) return Response.json({error:'logging failed'},{status:502});
  return Response.json({ok:true});
 } catch {return Response.json({error:'request failed'},{status:400});}
}
