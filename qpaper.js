/* qpaper.js — প্রশ্নব্যাংক + এমসিকিউ প্রশ্নপত্র (৪ সেট, এসএসসি ফরম্যাট). index.html-এর </body>-এর আগে যুক্ত করুন */
(()=>{
const KS=['ক','খ','গ','ঘ'],RM=['i','ii','iii'],AUTO=['i ও ii','ii ও iii','i ও iii','i, ii ও iii'];
const CODE={bn:101,bn1:101,bn2:102,en:107,en1:107,en2:108,ma:109,ict:154,che:137,hm:126,phy:136,bio:138,bgs:150,sci:127,econ:141,civ:140,his:153,geo:110,acc:146,ent:143,fin:152,agri:134,home:151},RC={'ইসলাম':111,'হিন্দু':112,'বৌদ্ধ':113,'খ্রিষ্টান':114};
const Z={cls:'9',sub:'',k:'g',Q:[],pk:{},o:'',cf:{e:'নির্বাচনী পরীক্ষা-২০২৬',s:'২০২৭ শিক্ষাবর্ষের সিলেবাস অনুযায়ী',t:'৩০ মিনিট',m:'',c:'',l:'পানিপুর জেলা স্কুল'}};
const sl=c=>{const r=[];subs(c,null).forEach(({s})=>s.id=='rel'?Object.keys(RN).forEach(k=>r.push(['rel_'+k,RN[k]])):r.push([s.id,s.n]));return r},cd=id=>id.startsWith('rel_')?RC[id.slice(4)]:(CODE[id]||'');
const draw=()=>{if(V.tab==5)$('#app').innerHTML=view()},qn=()=>Z.Q.filter(x=>Z.pk[x.id]).reduce((a,x)=>a+x.qs.length,0);
async function ld(){try{const q=await DB.collection('qbank').where('cls','==',Z.cls).where('sub','==',Z.sub).get();Z.Q=q.docs.map(d=>d.data()).sort((a,b)=>a.ts-b.ts)}catch(e){alert('প্রশ্ন আনা যায়নি: '+e.message)}Z.pk={};draw()}
/* ফর্ম */
const slot=(n,st)=>`<div class="sb"><label>প্রশ্ন ${bn(n)}</label><textarea id="f${n}q" rows="2"></textarea>${st?[1,2,3].map(i=>`<input id="f${n}s${i}" placeholder="${RM[i-1]}. বিবৃতি">`).join(''):''}<div class="g2">${[0,1,2,3].map(i=>`<input id="f${n}o${i}" placeholder="${KS[i]}. অপশন">`).join('')}</div><label>সঠিক উত্তর</label><select id="f${n}a"><option value="-1">—</option>${KS.map((x,i)=>`<option value="${i}">${x}</option>`).join('')}</select></div>`;
const fm=()=>{const k=Z.k;return(k=='u'?'<label>উদ্দীপক</label><textarea id="fst" rows="3"></textarea>':'')+(k=='p'?'<small>অপশন ফাঁকা রাখলে "i ও ii…" নিজে বসবে</small>':'')+slot(1,k!='g')+(k=='u'?slot(2,1):'')+'<label>উৎস (যেমন ঢাকা বোর্ড ২০২৫)</label><input id="src"><p><button class="btn" onclick="QP.add()">+ ব্যাংকে যোগ করুন</button></p>'};
const rd=n=>{const v=k=>($('#f'+n+k)||{value:''}).value.trim();return{q:v('q'),st:[1,2,3].map(i=>v('s'+i)).filter(Boolean),o:[0,1,2,3].map(i=>v('o'+i)),a:+($('#f'+n+'a')||{value:-1}).value}};
const fx=q=>{if(q.st.length&&!q.o.some(Boolean))q.o=AUTO.slice();return q};
async function add(){const k=Z.k,qs=[rd(1)].concat(k=='u'?[rd(2)]:[]).filter(x=>x.q).map(fx);
 if(!qs.length||qs.some(q=>q.o.some(o=>!o)))return alert('প্রশ্ন ও চারটি অপশন লিখুন');
 if(k=='p'&&!qs[0].st.length)return alert('i, ii, iii বিবৃতি লিখুন');
 const stim=k=='u'?$('#fst').value.trim():'';if(k=='u'&&!stim)return alert('উদ্দীপক লিখুন');
 const it={id:'q'+Date.now(),cls:Z.cls,sub:Z.sub,kind:k,stim,qs,src:$('#src').value.trim(),ts:Date.now()};
 try{await DB.collection('qbank').doc(it.id).set(it);Z.Q.push(it);draw()}catch(e){alert('সংরক্ষণ হয়নি: '+e.message)}}
const an=async(id,j,v)=>{const it=Z.Q.find(x=>x.id==id);it.qs[j].a=+v;try{await DB.collection('qbank').doc(id).update({qs:it.qs})}catch(e){alert(e.message)}};
const del=async id=>{if(!confirm('এই প্রশ্ন মুছবেন?'))return;await DB.collection('qbank').doc(id).delete();Z.Q=Z.Q.filter(x=>x.id!=id);draw()};
const pk=(id,v)=>{Z.pk[id]=v;$('#pc').textContent=bn(qn())};
/* টেক্সট ইম্পোর্ট */
function parse(t){const L=t.split(/\r?\n/).map(x=>x.trim()).filter(Boolean),R=[];let G=null,need=0,exp=0,q=null,m;
 for(const l of L){
  if(/উদ্দীপক/.test(l)&&/উত্তর দাও\s*[:：]?$/.test(l)){need=(l.match(/[০-৯]+/g)||[]).length>1?2:1;exp=1;continue}
  if(exp){G={kind:'u',stim:l,qs:[]};R.push(G);exp=0;continue}
  if(m=l.match(/^[০-৯0-9]+\s*[।.]\s*(.+)/)){q={q:m[1],st:[],o:[],a:-1};if(G){G.qs.push(q);if(G.qs.length>=need)G=null}else R.push({kind:'g',stim:'',qs:[q]});continue}
  if(!q)continue;
  if(/^i{1,3}\.\s/.test(l))q.st.push(...l.split(/\s+(?=i{1,3}\.\s)/).map(x=>x.replace(/^i{1,3}\.\s*/,'')));
  else if(/^ক[.)]\s/.test(l))q.o=l.split(/\s+(?=[কখগঘ]\.\s)/).map(x=>x.replace(/^[কখগঘ][.)]\s*/,''));
  else if(!/^নিচের কোনটি সঠিক/.test(l))q.q+=' '+l}
 return R.filter(x=>x.qs.length&&x.qs.every(q=>{if(q.st.length&&!q.o.length)q.o=AUTO.slice();return q.o.length==4})).map(x=>{if(x.kind=='g'&&x.qs[0].st.length)x.kind='p';return x})}
async function imp(){const its=parse($('#imt').value),src=$('#imsrc').value.trim()||'ইম্পোর্ট';if(!its.length)return alert('কোনো প্রশ্ন পড়া যায়নি। ফরম্যাট দেখুন।');if(its.length>400)return alert('একবারে সর্বোচ্চ ৪০০টি');
 const b=DB.batch(),T=Date.now();its.forEach((x,i)=>{Object.assign(x,{id:'q'+T+i,cls:Z.cls,sub:Z.sub,src,ts:T+i});b.set(DB.collection('qbank').doc(x.id),x);Z.Q.push(x)});
 try{await b.commit();alert(bn(its.length)+'টি প্রশ্ন যোগ হয়েছে। এবার তালিকা থেকে সঠিক উত্তর বেছে নিন।');draw()}catch(e){alert('ইম্পোর্ট হয়নি: '+e.message)}}
/* সেট তৈরি */
const rng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296},sh=(a,r)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const mk4=(si,it)=>{const r=rng(9001+si*7919);return(si?sh(it,r):it).map(x=>({...x,qs:x.qs.map(q=>{if(!si||q.st.length||/সবগুলো|উপরের|কোনোটিই/.test(q.o.join()))return q;const ix=sh([0,1,2,3],r);return{...q,o:ix.map(i=>q.o[i]),a:q.a<0?-1:ix.indexOf(q.a)}})}))};
function sheet(si,L,x,ky){let n=0,b='';
 L.forEach(it=>{if(it.kind=='u'){const a=n+1,e=n+it.qs.length;b+=`<div class="q"><b>নিচের উদ্দীপকটি পড়ে ${it.qs.length>1?bn(a)+' ও '+bn(e):bn(a)} নং প্রশ্নের উত্তর দাও:</b><div>${esc(it.stim)}</div></div>`}
  it.qs.forEach(q=>{n++;ky.push(q.a<0?'—':KS[q.a]);const w=q.o.some(o=>o.length>16);
   b+=`<div class="q"><b>${bn(n)}।</b> ${esc(q.q)}${q.st.map((s,i)=>`<div class="si">${RM[i]}. ${esc(s)}</div>`).join('')}${q.st.length?'<div>নিচের কোনটি সঠিক?</div>':''}<div class="op${w?' op1':''}">${q.o.map((t,i)=>`<div>(${KS[i]}) ${esc(t)}</div>`).join('')}</div></div>`})});
 return `<div class="qs pb"><div class="qh"><div class="ql">${esc(x.l)}</div><div class="qm"><b>বহুনির্বাচনি অভীক্ষা</b><br><b>${esc(x.sub)}</b><br><b>${esc(x.e)}</b><br><b>[${esc(x.s)}]</b><br>সময়—${esc(x.t)}<br>পূর্ণমান—${bn(x.m)}</div><div class="qb"><div>বিষয় কোড : ${[...bn(x.c)].map(d=>`<span class="bx">${d}</span>`).join('')}</div><div>সেট : <span class="bx">${KS[si]}</span></div></div></div><hr><p class="qn">[বি: দ্র: সরবরাহকৃত বহুনির্বাচনি অভীক্ষার উত্তরপত্রে প্রশ্নের ক্রমিক নম্বরের বিপরীতে প্রদত্ত বর্ণসম্বলিত বৃত্তসমূহ হতে সঠিক/ সর্বোৎকৃষ্ট উত্তরের বৃত্তটি বল পয়েন্ট কলম দ্বারা সম্পূর্ণ ভরাট কর। প্রতিটি প্রশ্নের মান ১। সকল প্রশ্নের উত্তর দিতে হবে।]</p><p class="qw"><b>প্রশ্নপত্রে কোনো প্রকার দাগ/চিহ্ন দেয়া যাবে না।</b></p><div class="cl">${b}</div></div>`}
const keyh=K=>`<div class="qs qk pb"><h3 style="text-align:center">উত্তরমালা (শিক্ষকের জন্য)</h3><table><tr><th>প্রশ্ন</th>${KS.map(k=>`<th>সেট ${k}</th>`).join('')}</tr>${K[0].map((_,i)=>`<tr><td>${bn(i+1)}</td>${K.map(k=>`<td>${k[i]}</td>`).join('')}</tr>`).join('')}</table></div>`;
function gen(){const it=Z.Q.filter(x=>Z.pk[x.id]);if(!it.length)return alert('প্রশ্ন বাছাই করুন');
 const bad=it.filter(x=>x.qs.some(q=>q.a<0)).length;if(bad&&!confirm(bad+'টি প্রশ্নে সঠিক উত্তর দেওয়া নেই, উত্তরমালা অসম্পূর্ণ হবে। চালিয়ে যাবেন?'))return;
 const c=Z.cf,x={...c,m:c.m||qn(),c:c.c||cd(Z.sub),sub:(sl(Z.cls).find(a=>a[0]==Z.sub)||['',''])[1]},K=[];let h='';
 [0,1,2,3].forEach(si=>{const ky=[];h+=sheet(si,mk4(si,it),x,ky);K.push(ky)});
 Z.o=h+keyh(K);$('#qo').innerHTML=Z.o}
/* ভিউ */
const ci=(k,l)=>`<div><label>${l}</label><input value="${esc(Z.cf[k])}" oninput="QP.cf.${k}=this.value"></div>`;
const row=(it,i)=>`<div class="sb"><label style="display:flex;gap:6px;align-items:flex-start;color:var(--fg);font-size:14px"><input type="checkbox" style="width:auto" ${Z.pk[it.id]?'checked':''} onchange="QP.pk('${it.id}',this.checked)"><span><b>${bn(i+1)}.</b> ${it.kind=='u'?'<em>[উদ্দীপক]</em> ':it.kind=='p'?'<em>[বহুপদী]</em> ':''}${esc(it.qs[0].q.slice(0,80))} <small>${esc(it.src||'')}</small></span></label><div class="g2">${it.qs.map((q,j)=>`<select onchange="QP.an('${it.id}',${j},this.value)"><option value="-1">উত্তর?</option>${KS.map((x,a)=>`<option value="${a}"${q.a==a?' selected':''}>${x}</option>`).join('')}</select>`).join('')}<button class="btn s r" onclick="QP.del('${it.id}')">মুছুন</button></div></div>`;
function view(){const ss=sl(Z.cls);if(!Z.sub)Z.sub=ss[0][0];
 return `<div class="card"><h3>প্রশ্নব্যাংক ও এমসিকিউ প্রশ্নপত্র</h3><div class="g"><div><label>শ্রেণি</label><select onchange="QP.cl(this.value)">${opts(CL,Z.cls)}</select></div><div><label>বিষয়</label><select onchange="QP.sb(this.value)">${ss.map(([i,n])=>`<option value="${i}"${i==Z.sub?' selected':''}>${n}</option>`).join('')}</select></div></div></div>
<div class="card"><h3>নতুন প্রশ্ন</h3><label>ধরন</label><select onchange="QP.kd(this.value)">${opts({g:'সাধারণ বহুনির্বাচনি',p:'বহুপদী সমাপ্তিসূচক',u:'উদ্দীপকভিত্তিক'},Z.k)}</select><div id="fm">${fm()}</div></div>
<div class="card"><details><summary><b>টেক্সট থেকে একসাথে ইম্পোর্ট</b></summary><p><small>প্রতি প্রশ্ন: "১। প্রশ্ন" লাইনের পর "ক. … খ. … গ. … ঘ. …" লাইন। বহুপদীতে "i. …" লাইন যোগ করুন। উদ্দীপকের আগে "নিচের উদ্দীপকটি পড়ে ২৮ ও ২৯ নং প্রশ্নের উত্তর দাও:" লাইন, তার পরের লাইনে উদ্দীপক।</small></p><textarea id="imt" rows="6"></textarea><input id="imsrc" placeholder="উৎস, যেমন ঢাকা বোর্ড ২০২৫"><p><button class="btn" onclick="QP.imp()">ইম্পোর্ট</button></p></details></div>
<div class="card"><h3>ব্যাংকের প্রশ্ন (${bn(Z.Q.length)})</h3>${Z.Q.map(row).join('')||'<small>এই শ্রেণি ও বিষয়ে এখনো প্রশ্ন নেই</small>'}</div>
<div class="card"><h3>প্রশ্নপত্র তৈরি <small>(<span id="pc">${bn(qn())}</span>টি প্রশ্ন বাছাই)</small></h3><div class="g">${ci('e','পরীক্ষার নাম')}${ci('s','সিলেবাস লাইন')}${ci('t','সময়')}${ci('m','পূর্ণমান (ফাঁকা = প্রশ্নসংখ্যা)')}${ci('c','বিষয় কোড (ফাঁকা = নিজে)')}${ci('l','বাঁ পাশের লেখা')}</div><p><button class="btn" onclick="QP.gen()">৪ সেট তৈরি করুন</button> <button class="btn" onclick="print()">🖨 প্রশ্নপত্র প্রিন্ট (লিগ্যাল)</button> <button class="btn" onclick="QP.pkey()">উত্তরমালা প্রিন্ট</button></p></div><div id="qo">${Z.o}</div>`}
/* স্টাইল ও হুক */
const css=document.createElement('style');css.textContent=`@font-face{font-family:NikoshBAN;src:local('NikoshBAN'),local('Nikosh'),url('NikoshBAN.ttf')}
.qs{background:#fff;color:#111;font-family:NikoshBAN,'Noto Serif Bengali',serif;font-size:13px;line-height:1.5;padding:14px;max-width:820px;margin:0 auto 16px;border:1px solid #bbb;overflow-x:auto}
.qh{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.ql{flex:1;color:#d01010;font-weight:700;font-size:26px;line-height:1.1}.qm{flex:1.2}.qb{flex:1.2;border:2px solid #111;padding:8px;font-weight:700}
.bx{display:inline-block;border:1.5px solid #111;padding:0 7px;margin:0 2px;font-size:17px}.qs hr{border:0;border-top:2px solid #111}.qn{font-size:11px;text-align:justify}.qw{text-align:center}
.cl{column-count:2;column-gap:26px;column-rule:1px solid #111}.q{break-inside:avoid;margin:8px 0}.si{margin-left:16px}.op{display:grid;grid-template-columns:1fr 1fr;margin-left:16px}.op1{grid-template-columns:1fr}
.qs table{width:100%;border-collapse:collapse}.qs td,.qs th{border:1px solid #444;padding:3px;text-align:center}
@media(max-width:600px){.cl{column-count:1}}@media print{.qk{display:none}body.pk .qs{display:none}body.pk .qk{display:block}.qs{border:0;max-width:none;margin:0;padding:0}.cl{column-count:2!important}}`;document.head.appendChild(css);
const pg=document.createElement('style');pg.textContent='@media print{@page{size:8.5in 14in;margin:10mm}}';document.head.appendChild(pg);pg.disabled=true;
const R0=render;
window.render=function(){const on=V.tab==5;if(on)V.tab=0;R0();if(on)V.tab=5;const nv=$('#nav');
 if(on)nv.querySelectorAll('button').forEach(b=>b.classList.remove('on'));
 nv.insertAdjacentHTML('beforeend',`<button class="${on?'on':''}" onclick="V.tab=5;render()">প্রশ্নপত্র</button>`);
 if(on){if(!Z.sub){Z.sub=sl(Z.cls)[0][0];ld()}$('#app').innerHTML=view()}pg.disabled=!on};
window.onafterprint=()=>document.body.classList.remove('pk');
window.QP={cf:Z.cf,add,an,del,pk,imp,gen,cl:v=>{Z.cls=v;Z.sub=sl(v)[0][0];Z.Q=[];draw();ld()},sb:v=>{Z.sub=v;Z.Q=[];draw();ld()},kd:v=>{Z.k=v;$('#fm').innerHTML=fm()},pkey:()=>{document.body.classList.add('pk');print()},_t:{parse,mk4}};
})();
