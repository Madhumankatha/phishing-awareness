'use client';
import {useState} from 'react';
export default function ConfirmParticipation({id,name}){
 const [status,setStatus]=useState(''); const [busy,setBusy]=useState(false);
 async function confirm(){setBusy(true);setStatus('Recording…');try{const r=await fetch('/api/click',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})});setStatus(r.ok?'Your participation has been recorded. This is an awareness simulation.':'Unable to record this test event.');}catch{setStatus('Unable to record this test event.')}finally{setBusy(false)}}
 return <main className="card"><h1>Security Awareness Simulation</h1><p>Hello {name}, this is an authorized awareness exercise.</p><p>Press the button below to record your participation in this test. No credentials or sensitive data are collected.</p><button disabled={busy} onClick={confirm}>{busy?'Recording…':'Confirm participation'}</button>{status&&<p role="status">{status}</p>}<p>In real messages, check the sender and link destination before following unexpected links.</p></main>
}
