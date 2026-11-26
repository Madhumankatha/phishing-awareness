'use client';
import {useState} from 'react';
export default function Dashboard(){const [key,setKey]=useState('');const [rows,setRows]=useState(null);const [err,setErr]=useState('');
 async function load(){setErr('');setRows(null);const r=await fetch('/api/dashboard',{headers:{'x-admin-key':key}});if(!r.ok){setErr('Access denied or report unavailable.');return;}setRows(await r.json());}
 return <main className="card wide"><h1>Simulation Dashboard</h1><label>Admin access key</label><input type="password" value={key} onChange={e=>setKey(e.target.value)} placeholder="Dashboard key"/><button onClick={load}>Load report</button>{err&&<p>{err}</p>}{rows&&<table><thead><tr><th>ID</th><th>Participant</th><th>Status</th><th>Clicked At</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i}><td>{r.id}</td><td>{r.participant}</td><td>{r.status}</td><td>{r.clickedAt||'—'}</td></tr>)}</tbody></table>}</main>}
