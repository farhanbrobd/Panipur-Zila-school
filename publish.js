/* publish.js — শিক্ষার্থীদের জন্য ফলাফল প্রকাশ (হাব সাইটের "ফলাফল" ট্যাবে দেখা যাবে)
   ফলাফল পোর্টালের index.html-এ qpaper.js এর ঠিক পরে এই এক লাইন যোগ করুন:
   <script src="publish.js"></script>
   এই ফাইলটিও index.html-এর পাশে রাখুন। ফলাফল পোর্টালের কোনো বিদ্যমান ফিচার বদলায় না;
   শুধু "এক নজরে" ট্যাবে দুটি বোতাম যোগ করে।
   [সংযোজন: প্রকাশের সময় publishedMeta/index ডকুমেন্টে পরীক্ষার তালিকা রাখা হয়, যাতে হাব সাইট নিজে জানতে পারে কোন পরীক্ষার ফলাফল প্রকাশিত।] */
(()=>{
const sha=async t=>{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')};
const pcls=()=>V.dcl&&V.dcl!='*'?V.dcl:V.cls;
const okTerm=cls=>{const r=TCL[S.cfg.term];return !r||(+cls>=r[0]&&+cls<=r[1])};
/* আইডি = SHA-256(বছর|টার্ম|শ্রেণি|রোল|জন্মতারিখ) — হাব সাইটের results.ts এর সাথে হুবহু এক */
const pid=st=>sha([String(S.cfg.year),S.cfg.term,String(st.cls),String(st.roll),st.dob].join('|'));
const pool=cls=>S.students.filter(x=>x.on&&x.cls==cls);
/* পরীক্ষার তালিকা (হাব সাইটের জন্য) */
const mkey=()=>(String(S.cfg.year)+'_'+S.cfg.term).replace(/[^\w\u0980-\u09FF-]/g,'_');
async function meta(cls,add){
 const F=firebase.firestore.FieldValue;
 await DB.collection('publishedMeta').doc('index').set({exams:{[mkey()]:{year:String(S.cfg.year),term:S.cfg.term,label:TERMS[S.cfg.term]+' '+bn(S.cfg.year),classes:add?F.arrayUnion(String(cls)):F.arrayRemove(String(cls))}}},{merge:true});
}

async function publishClass(){
 if(!ME)return alert('আগে লগইন করুন');
 const cls=pcls(),term=S.cfg.term;
 if(!okTerm(cls))return alert('এই টার্মে শ্রেণি '+bn(cls)+' প্রযোজ্য নয়। ওপরের বারে সঠিক শ্রেণি বেছে নিন।');
 const L=pool(cls);if(!L.length)return alert('এই শ্রেণিতে শিক্ষার্থী নেই');
 if(!confirm('শ্রেণি '+bn(cls)+' — '+TERMS[term]+' '+bn(S.cfg.year)+'-এর ফলাফল শিক্ষার্থীদের জন্য প্রকাশ করবেন?\n(শিক্ষার্থী নিজের রোল ও জন্ম তারিখ দিয়ে দেখতে পারবে)'))return;
 const A=L.map(x=>({id:x.id,roll:x.roll,c:fin(x)})),ops=[];let skip=0;
 for(const st of L){
  if(!st.dob||!st.roll||!st.marks||!Object.keys(st.marks).length){skip++;continue}
  const c=A.find(a=>a.id==st.id).c,R=rk(st,A),id=await pid(st);
  const rows=c.rows.map(o=>({n:o.n+(o.r=='f'?' (৪র্থ)':''),max:+o.max,f:+(+o.f).toFixed(2),g:String(o.g)}));
  if(c.bonus)rows.push({n:'জাতীয় দিবসে উপস্থিতি',max:25,f:+c.bonus.at,g:'—'},{n:'আচরণ ও পরিচ্ছন্নতা',max:25,f:+c.bonus.be,g:'—'});
  const nt=[],bad=c.rows.filter(o=>!o.ok).map(o=>o.n);
  if(bad.length)nt.push('অকৃতকার্য বিষয়: '+bad.join(', '));
  if(c.fin&&!c.fin.attOk)nt.push('কোনো প্রান্তিকে উপস্থিতি ৮৫%-এর কম');
  if(c.comb&&!c.pri)nt.push('জিপিএ: '+c.comb.map(x=>TERMS[x.t].split(' ')[0]+' '+bn(x.gpa.toFixed(2))).join(' ও ')+'-এর গড়');
  ops.push([id,{owner:ME.uid,year:String(S.cfg.year),term,cls:String(st.cls),roll:+st.roll,name:st.name||'',father:st.father||'',mother:st.mother||'',
   rows,tot:+(+c.tot).toFixed(2),tm:+c.tm,gpa:+(+c.gpa).toFixed(2),grade:c.pri?String(c.grade):(c.pass?gl(c.gpa):'F'),pass:!!c.pass,pri:!!c.pri,
   rank:R.rank,rankOf:R.n,note:nt.join(' | '),publishedAt:Date.now()}]);
 }
 if(!ops.length)return alert('প্রকাশ করার মতো শিক্ষার্থী নেই। জন্ম তারিখ ও নম্বর এন্ট্রি দেওয়া আছে কি না দেখুন।');
 try{
  for(let i=0;i<ops.length;i+=400){const b=DB.batch();ops.slice(i,i+400).forEach(([id,d])=>b.set(DB.collection('publishedResults').doc(id),d));await b.commit()}
  await meta(cls,true);
  alert('✔ '+bn(ops.length)+' জনের ফলাফল প্রকাশিত হয়েছে।'+(skip?'\n'+bn(skip)+' জন বাদ পড়েছে (জন্ম তারিখ বা নম্বর এন্ট্রি নেই)।':''));
 }catch(e){alert('প্রকাশ হয়নি: '+e.message+(e.code=='permission-denied'?'\n(Firestore Rules-এ publishedResults ও publishedMeta অংশ যোগ করা হয়েছে কি?)':''))}
}
async function unpublishClass(){
 if(!ME)return alert('আগে লগইন করুন');
 const cls=pcls(),L=pool(cls).filter(x=>x.dob&&x.roll);
 if(!L.length)return alert('এই শ্রেণিতে বাতিল করার মতো শিক্ষার্থী নেই');
 if(!confirm('শ্রেণি '+bn(cls)+' — '+TERMS[S.cfg.term]+' '+bn(S.cfg.year)+'-এর প্রকাশিত ফলাফল সরিয়ে নেবেন?'))return;
 try{
  const ids=[];for(const st of L)ids.push(await pid(st));
  for(let i=0;i<ids.length;i+=400){const b=DB.batch();ids.slice(i,i+400).forEach(id=>b.delete(DB.collection('publishedResults').doc(id)));await b.commit()}
  await meta(cls,false);
  alert('প্রকাশ বাতিল হয়েছে।');
 }catch(e){alert('বাতিল হয়নি: '+e.message)}
}

/* ===== স্কুলের তথ্য মূল ওয়েবসাইটে স্বয়ংক্রিয় পাঠানো =====
   শ্রেণি শিক্ষকের নাম, প্রধান/সহকারী প্রধান শিক্ষক, EIIN, ঠিকানা ও শ্রেণিভিত্তিক শিক্ষার্থী সংখ্যা।
   পাঠানো হয় না: স্বাক্ষর, মোবাইল নম্বর, শিক্ষার্থীর নাম/ব্যক্তিগত তথ্য, নম্বর। */
let lastSch='';
async function pubSchool(){
 if(!OWN||!DB)return;
 const ys=new Set();S.students.forEach(st=>Object.keys(st.y||{}).forEach(y=>ys.add(y)));
 const mx=[...ys].sort().pop();
 if(mx&&String(S.cfg.year)!=mx)return; /* পুরোনো বছর খোলা থাকলে পাঠাবে না */
 const c=S.cfg,ct={},cnt={};
 for(let i=1;i<=10;i++){const o=(c.ct||{})[i];if(o&&o.name)ct[i]={name:String(o.name)}}
 S.students.forEach(st=>{if(st.on)cnt[st.cls]=(cnt[st.cls]||0)+1});
 const d={school:c.school||'',slogan:c.slogan||'',addr:c.addr||'',eiin:c.eiin||'',upazila:c.upazila||'',district:c.district||'',head:c.head||'',asst:c.asst||'',year:String(c.year||''),classTeachers:ct,counts:cnt};
 const j=JSON.stringify(d);if(j===lastSch)return;
 await DB.collection('publishedMeta').doc('school').set(Object.assign({updatedAt:Date.now()},d));
 lastSch=j;
}
const sync1=window.sync;
window.sync=async function(){const r=await sync1.apply(this,arguments);if(r){try{await pubSchool()}catch(e){}}return r};
const load1=window.load;
window.load=async function(){const r=await load1.apply(this,arguments);try{await pubSchool()}catch(e){}return r};
window.publishClass=publishClass;window.unpublishClass=unpublishClass;

const R1=window.render;
window.render=function(){
 R1.apply(this,arguments);
 if(V.tab!=7)return;
 const h=document.querySelector('#app .card h3');
 if(h&&!document.getElementById('pubbar'))h.insertAdjacentHTML('afterend','<p id="pubbar"><button class="btn" onclick="publishClass()">🌐 শিক্ষার্থীদের জন্য প্রকাশ</button> <button class="btn s r" onclick="unpublishClass()">প্রকাশ বাতিল</button><br><small>শ্রেণি, বছর ও টার্ম যা বেছে আছে তার ফলাফল শিক্ষার্থীরা হাব সাইটের "ফলাফল" পেজে দেখতে পারবে। শিক্ষার্থীর জন্ম তারিখ এন্ট্রি থাকতে হবে।</small></p>');
};
})();
