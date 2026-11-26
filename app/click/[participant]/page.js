import ConfirmParticipation from './confirm';
function slugify(s){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
export default async function ParticipantPage({params}){
 const {participant}=await params;
 let mapping={}; try{mapping=JSON.parse(process.env.PARTICIPANTS_JSON||'{}')}catch{}
 const entry=Object.entries(mapping).find(([id,name])=>slugify(String(name))===slugify(decodeURIComponent(participant)));
 if(!entry) return <main className="card"><h1>Invalid simulation link</h1><p>This participant link is not configured.</p></main>;
 return <ConfirmParticipation id={entry[0]} name={entry[1]}/>;
}
