'use client';
import {useEffect,useState} from 'react';
export default function ClickPage(){const [status,setStatus]=useState('Recording simulation click…');
 useEffect(()=>{const id=new URLSearchParams(location.search).get('id'); if(!id){setStatus('Invalid simulation link.');return;}
 fetch('/api/click',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})})
 .then(r=>r.ok?setStatus('This was a security-awareness simulation. In a real attack, a suspicious link could lead to harm. Check the sender and destination before clicking.'):setStatus('This simulation link is invalid or not configured.'))
 .catch(()=>setStatus('Unable to record this simulation click.'));},[]);
 return <main className="card"><h1>Security Awareness Exercise</h1><p>{status}</p><p>Never enter credentials into a page reached from an unexpected message. Verify the sender and URL independently.</p></main>}
