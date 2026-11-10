# Let's write the complete updated qpaper.js code based on all the requirements and write it to qpaper.js file.
# Requirements summary:
# 1. Class 6-8:
#    - Bangla 1st Paper (100 Marks: Creative 50 [8 questions, answer 5], Descriptive 20 [Anandapath 4 questions, answer 2, (a)=3, (b)=7], MCQ 30 [Story 15, Poem 15]).
#    - Bangla 2nd Paper (50 Marks: Written 35, MCQ Grammar 15).
#    - English 1st Paper (100 Marks: Part A Reading 70, Part B Writing 30).
#    - English 2nd Paper (50 Marks: Part A Grammar 30, Part B Writing 20 - for Class 6, 7, 8 specific grammar topics & composition word limits).
#    - General Math (100 Marks: Creative 50 [4 sections x 2 = 8 questions, answer 5, min 1 from each], Short Answer 20 [15 questions, answer 10, 2 marks each], MCQ 30).
#    - ICT Class 6-8: 7 short questions (answer 5, 2x5=10 marks) + 15 MCQ marks.
# 2. Class 9-10 (SSC 2027):
#    - Bangla 1st Paper (100 Marks: Creative 50, Descriptive 20 [Novel 2, Drama 2, answer 1 from each, (a)=3, (b)=7], MCQ 30).
#    - Bangla 2nd Paper (100 Marks: Written 70 [Paragraph 10, Letter 10, Summary 10, Amplification 10, News Report 10, Essay 20], Grammar MCQ 30).
#    - English 1st Paper (100 Marks: Reading 70, Writing 30).
#    - English 2nd Paper (100 Marks: Grammar 60, Writing 40).
#    - General Math (100 Marks: Creative 50, Short Answer 20, MCQ 30).
#    - Accounting (100 Marks: Creative 40 [7 answer 4, 10 each], Financial Statement 20 [1 answer 1], Short Answer 10 [7 answer 5, 2 each], MCQ 30).
#    - Shared QBank for Class 9 and 10! (नवम-दशम श्रेणी प्रश्न ব্যাংক একটাই/শেয়ার্ড).
# 3. Primary Section (Class 3-5):
#    - Improved Header format, clear Class 3/4/5 labels.
#    - Matching (বামডান মিলকরণ) column formatting enhanced.
#    - Primary MCQ: Integrated into main question paper like High School MCQ (no complex stimulus or multiple response, simple MCQ only). When Bengali or subject MCQ option selected, open MCQ boxes.
#    - Primary draft/footer notes ("দ্রষ্টব্য") formatted strictly according to given format.
# 4. Interactive Question Bank & Editing:
#    - Question editing functionality in qpaper.js bank list.
#    - Text Import feature for S/C (Creative/Short) and Class 9-10 / Primary questions fully functional.
#    - Image upload / stimulus image support for questions (উদ্দীপকের ছবি / Image upload/display).
#    - Math question creation: 2 separate textboxes for 2 questions with a small centered "অথবা" in between. Support for multi-line horizontal/vertical addition/subtraction.
#    - Dropdown choice for items where multiple options exist + 4 or 5 separate text boxes for questions.
# 5. Print Layout:
#    - A4 Landscape orientation for creative/exam question printing (`@page { size: A4 landscape; margin: 10mm; }` or `@page { size: legal landscape; }`).

js_content = """/* qpaper.js — প্রশ্নব্যাংক + প্রশ্নপত্র প্রস্তুতকারক (নতুন কারিকুলাম ও এসএসসি ২০২৭) */
(()=>{
const KS=['ক','খ','গ','ঘ'],RM=['i','ii','iii'],AUTO=['i ও ii','ii ও iii','i ও iii','i, ii ও iii'];
const CODE={bn:101,bn1:101,bn2:102,en:107,en1:107,en2:108,ma:109,ict:154,che:137,hm:126,phy:136,bio:138,bgs:150,sci:127,econ:141,civ:140,his:153,geo:110,acc:146,ent:143,fin:152,agri:134,home:151},RC={'ইসলাম':111,'হিন্দু':112,'বৌদ্ধ':113,'খ্রিষ্টান':114};
const Z={cls:'9',sub:'',k:'g',mode:'m',P:{},tm:'1',Q:[],pk:{},o:'',cf:{e:'নির্বাচনী পরীক্ষা-২০২৬',s:'২০২৭ শিক্ষাবর্ষের সিলেবাস অনুযায়ী',t:'',m:'',c:'',l:'বিদ্যালয়ের নাম',g:18,na:'',nc:'',n:''},last:null};

// Share QBank for Class 9 and 10
const getEffectiveCls = (cls) => (cls === '10' ? '9' : cls);

const sl=c=>{
  const r=[];
  if(Z.mode==='p'){
    return psl();
  }
  const K=Z.mode=='c'?'c':'m';
  if(c=='6'||c=='7'||c=='8'){
    return [
      ['bn1','বাংলা প্রথম পত্র',100],
      ['bn2','বাংলা দ্বিতীয় পত্র',50],
      ['en1','English First Paper',100],
      ['en2','English Second Paper',50],
      ['ma','সাধারণ গণিত',100],
      ['ict','তথ্য ও যোগাযোগ প্রযুক্তি',25]
    ];
  }
  if(c=='9'||c=='10'){
    return [
      ['bn1','বাংলা প্রথম পত্র',100],
      ['bn2','বাংলা দ্বিতীয় পত্র',100],
      ['en1','English First Paper',100],
      ['en2','English Second Paper',100],
      ['ma','সাধারণ গণিত',100],
      ['acc','হিসাববিজ্ঞান',100],
      ['ict','তথ্য ও যোগাযোগ প্রযুক্তি',50],
      ['phy','পদার্থবিজ্ঞান',75],
      ['che','রসায়ন',75],
      ['bio','জীববিজ্ঞান',75],
      ['hm','উচ্চতর গণিত',75],
      ['bgs','বাংলাদেশ ও বিশ্বপরিচয়',100],
      ['sci','সাধারণ বিজ্ঞান',100]
    ];
  }
  return [['bn1','বাংলা প্রথম পত্র',100],['ma','সাধারণ গণিত',100]];
};

const cd=id=>id.startsWith('rel_')?RC[id.slice(4)]:(CODE[id]||'');

const F=(s,a=/^(che|sci|bio|phy|agri|home)$/.test(Z.sub))=>{
  if(!s) return '';
  let r=esc(s)
    .replace(/\\^\\{([^}]*)\\}_\\{([^}]*)\\}/g,'<span class="iso"><sup>$1</sup><sub>$2</sub></span>')
    .replace(/\\^\\{([^}]*)\\}|\\^(\\S)/g,(m,x,y)=>'<sup>'+(x!=null?x:y).replace(/-/g,'−')+'</sup>')
    .replace(/_\\{([^}]*)\\}|_([A-Za-z0-9])/g,(m,x,y)=>'<sub>'+(x!=null?x:y)+'</sub>');
  return a?r.replace(/([A-Za-z)\\]])(\\d+)/g,'$1<sub>$2</sub>'):r;
};

const draw=()=>{if(typeof V!=='undefined' && V.tab==5)$('#app').innerHTML=view()};
const ML=()=>Z.Q.filter(x=>(Z.mode=='c')==(x.kind=='c'||x.kind=='s'));
const qn=()=>ML().filter(x=>Z.pk[x.id]).reduce((a,x)=>a+(x.qs?x.qs.length:1),0);
const CO=()=>Object.fromEntries(Object.entries(typeof CL!=='undefined'?CL:{'3':'তৃতীয় শ্রেণি','4':'চতুর্থ শ্রেণি','5':'পঞ্চম শ্রেণি','6':'ষষ্ঠ শ্রেণি','7':'সপ্তম শ্রেণি','8':'অষ্টম শ্রেণি','9':'নবম শ্রেণি','10':'দশম শ্রেণি'}).filter(([k])=>Z.mode=='p'?+k>=3&&+k<=5:+k>=6));
const LET=[...'কখগঘঙচছজঝঞটঠডঢণ'];

async function ld(){
  try{
    const effCls = getEffectiveCls(Z.cls);
    const q=await DB.collection('qbank').where('cls','==',effCls).where('sub','==',Z.sub).get();
    Z.Q=q.docs.map(d=>d.data()).sort((a,b)=>a.ts-b.ts);
  }catch(e){
    console.warn('কোয়েরি সমস্যা বা অফলাইন মোড:', e.message);
  }
  Z.pk={};
  draw();
}

/* উদ্দীপক ছবি হ্যান্ডলার */
function handleImgUpload(e, targetId){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(evt){
    $(`#${targetId}`).value = evt.target.result;
    const pvw = $(`#${targetId}_img_pvw`);
    if(pvw) pvw.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

/* ইনপুট স্লট */
const slot=(n,st)=>`<div class="sb"><label>প্রশ্ন ${bn(n)}</label><textarea id="f${n}q" rows="2"></textarea>${st?[1,2,3].map(i=>`<input id="f${n}s${i}" placeholder="${RM[i-1]}. বিবৃতি">`).join(''):''}<div class="g2">${[0,1,2,3].map(i=>`<input id="f${n}o${i}" placeholder="${KS[i]}. অপশন">`).join('')}</div><label>সঠিক উত্তর</label><select id="f${n}a"><option value="-1">—</option>${KS.map((x,i)=>`<option value="${i}">${x}</option>`).join('')}</select></div>`;
const SRC='<label>উৎস (যেমন: ঢাকা বোর্ড ২০২৫)</label><input id="src"><label>উদ্দীপক ছবি (ঐচ্ছিক)</label><input type="file" accept="image/*" onchange="QP.imgUp(event,\'img_data\')"><input type="hidden" id="img_data"><img id="img_data_img_pvw" style="max-height:80px;display:block;margin:4px 0;">';
const BTN='<p><button class="btn" onclick="QP.add()">+ ব্যাংকে যোগ করুন</button></p>';

const fm=()=>{
  const k=Z.k;
  if(k=='c')return'<label>উদ্দীপক</label><textarea id="cst" rows="4"></textarea>'+KS.map((x,i)=>`<label>(${x}) — ${bn(i+1)} নম্বর</label><textarea id="cp${i}" rows="2"></textarea>`).join('')+SRC+BTN;
  if(k=='s')return'<label>প্রশ্ন (সংক্ষিপ্ত - ২ নম্বর)</label><textarea id="sq" rows="2"></textarea>'+SRC+BTN;
  return (k=='u'?'<label>উদ্দীপক</label><textarea id="fst" rows="3"></textarea>':'')+(k=='p'?'<small>অপশন ফাঁকা রাখলে "i ও ii…" নিজে বসবে</small>':'')+slot(1,k!='g')+(k=='u'?slot(2,1):'')+SRC+BTN;
};

const rd=n=>{const v=k=>($('#f'+n+k)||{value:''}).value.trim();return{q:v('q'),st:[1,2,3].map(i=>v('s'+i)).filter(Boolean),o:[0,1,2,3].map(i=>v('o'+i)),a:+($('#f'+n+'a')||{value:-1}).value}};
const fx=q=>{if(q.st.length&&!q.o.some(Boolean))q.o=AUTO.slice();return q};

async function addc(){
  const k=Z.k,v=i=>($('#'+i)||{value:''}).value.trim();
  const effCls = getEffectiveCls(Z.cls);
  const it={id:'q'+Date.now(),cls:effCls,sub:Z.sub,kind:k,src:v('src'),img:v('img_data'),ts:Date.now()};
  if(k=='c'){
    it.stim=v('cst');
    it.parts=[0,1,2,3].map(i=>v('cp'+i));
    if(!it.stim||it.parts.some(x=>!x))return alert('উদ্দীপক ও চারটি অংশ লিখুন');
  }else{
    it.q=v('sq');
    if(!it.q)return alert('প্রশ্ন লিখুন');
  }
  try{await DB.collection('qbank').doc(it.id).set(it);}catch(e){}
  Z.Q.push(it);
  draw();
}

async function add(){
  if(Z.k=='c'||Z.k=='s')return addc();
  const k=Z.k,qs=[rd(1)].concat(k=='u'?[rd(2)]:[]).filter(x=>x.q).map(fx);
  if(!qs.length||qs.some(q=>q.o.some(o=>!o)))return alert('প্রশ্ন ও চারটি অপশন লিখুন');
  if(k=='p'&&!qs[0].st.length)return alert('i, ii, iii বিবৃতি লিখুন');
  const stim=k=='u'?$('#fst').value.trim():'';
  if(k=='u'&&!stim)return alert('উদ্দীপক লিখুন');
  const effCls = getEffectiveCls(Z.cls);
  const it={id:'q'+Date.now(),cls:effCls,sub:Z.sub,kind:k,stim,qs,src:($('#src')||{value:''}).value.trim(),img:($('#img_data')||{value:''}).value.trim(),ts:Date.now()};
  try{await DB.collection('qbank').doc(it.id).set(it);}catch(e){}
  Z.Q.push(it);
  draw();
}

/* প্রশ্ন এডিট ও আপডেট */
function editQ(id){
  const it = Z.Q.find(x=>x.id==id);
  if(!it) return;
  const newText = prompt("প্রশ্ন / উদ্দীপক সম্পাদনা করুন:", it.stim || it.q || (it.qs && it.qs[0] ? it.qs[0].q : ''));
  if(newText !== null){
    if(it.stim) it.stim = newText;
    else if(it.q) it.q = newText;
    else if(it.qs && it.qs[0]) it.qs[0].q = newText;
    try{ DB.collection('qbank').doc(id).update(it); }catch(e){}
    draw();
  }
}

const an=async(id,j,v)=>{
  const it=Z.Q.find(x=>x.id==id);
  if(it && it.qs && it.qs[j]){
    it.qs[j].a=+v;
    try{await DB.collection('qbank').doc(id).update({qs:it.qs})}catch(e){}
  }
};

const del=async id=>{
  if(!confirm('এই প্রশ্ন মুছবেন?'))return;
  try{await DB.collection('qbank').doc(id).delete();}catch(e){}
  Z.Q=Z.Q.filter(x=>x.id!=id);
  draw();
};

const pk=(id,v)=>{Z.pk[id]=v;if($('#pc')) $('#pc').textContent=bn(qn())};

/* টেক্সট ইম্পোর্ট (সহজ ফরম্যাট) */
function parse(t){
  const L=t.split(/\\r?\\n/).map(x=>x.trim()).filter(Boolean),R=[];
  let G=null,need=0,exp=0,q=null,m;
  for(const l of L){
    if(/উদ্দীপক/.test(l)&&/উত্তর দাও\\s*[:：]?$/.test(l)){need=(l.match(/[০-৯]+/g)||[]).length>1?2:1;exp=1;continue}
    if(exp){G={kind:'u',stim:l,qs:[]};R.push(G);exp=0;continue}
    if(m=l.match(/^[০-৯0-9]+\\s*[।.]\\s*(.+)/)){q={q:m[1],st:[],o:[],a:-1};if(G){G.qs.push(q);if(G.qs.length>=need)G=null}else R.push({kind:'g',stim:'',qs:[q]});continue}
    if(!q)continue;
    if(/^i{1,3}\\.\\s/.test(l))q.st.push(...l.split(/\\s+(?=i{1,3}\\.\\s)/).map(x=>x.replace(/^i{1,3}\\.\\s*/,'')));
    else if(/^ক[.)]\\s/.test(l))q.o=l.split(/\\s+(?=[কখগঘ]\\.\\s)/).map(x=>x.replace(/^[কখগঘ][.)]\\s*/,''));
    else if(!/^নিচের কোনটি সঠিক/.test(l))q.q+=' '+l;
  }
  return R.filter(x=>x.qs.length&&x.qs.every(q=>{if(q.st.length&&!q.o.length)q.o=AUTO.slice();return q.o.length==4})).map(x=>{if(x.kind=='g'&&x.qs[0].st.length)x.kind='p';return x});
}

async function imp(){
  const its=parse($('#imt').value),src=$('#imsrc').value.trim()||'ইম্পোর্ট';
  if(!its.length)return alert('কোনো প্রশ্ন পড়া যায়নি। সঠিক ফরম্যাটে লিখুন।');
  const effCls = getEffectiveCls(Z.cls);
  const T=Date.now();
  its.forEach((x,i)=>{
    Object.assign(x,{id:'q'+T+i,cls:effCls,sub:Z.sub,src,ts:T+i});
    try{ DB.collection('qbank').doc(x.id).set(x); }catch(e){}
    Z.Q.push(x);
  });
  alert(bn(its.length)+'টি প্রশ্ন যোগ হয়েছে!');
  draw();
}

/* ৪ সেট এমসিকিউ জেনারেটর */
const rng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296},sh=(a,r)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const mk4=(si,it)=>{const r=rng(9001+si*7919);return(si?sh(it,r):it).map(x=>({...x,qs:x.qs.map(q=>{if(!si||q.st.length||/সবগুলো|উপরের|কোনোটিই/.test(q.o.join()))return q;const ix=sh([0,1,2,3],r);return{...q,o:ix.map(i=>q.o[i]),a:q.a<0?-1:ix.indexOf(q.a)}})}))};

function sheet(si,L,x,ky){
  let n=0,b='';
  L.forEach(it=>{
    if(it.kind=='u'){
      const a=n+1,e=n+it.qs.length;
      b+=`<div class="q"><b>নিচের উদ্দীপকটি পড়ে ${it.qs.length>1?bn(a)+' ও '+bn(e):bn(a)} নং প্রশ্নের উত্তর দাও:</b>${it.img?`<br><img src="${it.img}" style="max-height:140px;margin:5px 0;">`:''}<div>${F(it.stim)}</div></div>`;
    }
    it.qs.forEach(q=>{
      n++;ky.push(q.a<0?'—':KS[q.a]);const w=q.o.some(o=>o.length>16);
      b+=`<div class="q"><b>${bn(n)}।</b> ${F(q.q)}${q.st.map((s,i)=>`<div class="si">${RM[i]}. ${F(s)}</div>`).join('')}${q.st.length?'<div>নিচের কোনটি সঠিক?</div>':''}<div class="op${w?' op1':''}">${q.o.map((t,i)=>`<div>(${KS[i]}) ${F(t)}</div>`).join('')}</div></div>`;
    });
  });
  return `<div class="qs pb" style="--g:${+x.g||18}px">${hd(x,'বহুনির্বাচনি অভীক্ষা',si)}<hr><p class="qn">[বি: দ্র: সরবরাহকৃত বহুনির্বাচনি অভীক্ষার উত্তরপত্রে প্রশ্নের ক্রমিক নম্বরের বিপরীতে প্রদত্ত বর্ণসম্বলিত বৃত্তসমূহ হতে সঠিক/ সর্বোৎকৃষ্ট উত্তরের বৃত্তটি বল পয়েন্ট কলম দ্বারা সম্পূর্ণ ভরাট কর। প্রতিটি প্রশ্নের মান ১। সকল প্রশ্নের উত্তর দিতে হবে।]</p><p class="qw"><b>প্রশ্নপত্রে কোনো প্রকার দাগ/চিহ্ন দেয়া যাবে না।</b></p><div class="cl">${b}</div></div>`;
}

const keyh=K=>`<div class="qs qk pb"><h3 style="text-align:center">উত্তরমালা (শিক্ষকের জন্য)</h3><table><tr><th>প্রশ্ন</th>${KS.map(k=>`<th>সেট ${k}</th>`).join('')}</tr>${K[0].map((_,i)=>`<tr><td>${bn(i+1)}</td>${K.map(k=>`<td>${k[i]}</td>`).join('')}</tr>`).join('')}</table></div>`;

function gen(){
  if(Z.mode=='p')return genp();
  if(Z.mode=='c')return genc();
  const it=Z.Q.filter(x=>Z.pk[x.id]);
  if(!it.length)return alert('প্রশ্ন বাছাই করুন');
  const c=Z.cf,MK=(sl(Z.cls).find(a=>a[0]==Z.sub)||[0,0,qn()])[2],x={...c,m:c.m||MK,t:c.t||bn(MK)+' মিনিট',c:c.c||cd(Z.sub),sub:(sl(Z.cls).find(a=>a[0]==Z.sub)||['',''])[1]},K=[];let h='';
  [0,1,2,3].forEach(si=>{const ky=[];h+=sheet(si,mk4(si,it),x,ky);K.push(ky)});
  Z.o=h+keyh(K);$('#qo').innerHTML=Z.o;
}

/* সূত্রের বোতাম */
const TB=[['নিচে ₂','_{}'],['উপরে ²','^{}'],['⁵⁶₂₆','^{}_{}'],['⁺','^{+}'],['⁻','^{-}'],['²⁺','^{2+}'],['²⁻','^{2-}'],['³⁺','^{3+}'],['³⁻','^{3-}'],['→','→'],['⇌','⇌'],['Δ','Δ'],['°','°'],['↑','↑'],['↓','↓'],['×','×'],['−','−']].map(([l,t])=>`<button type="button" class="btn s" style="margin:2px" onmousedown="event.preventDefault()" onclick="QP.ins('${t}')">${l}</button>`).join('');

const ins=t=>{
  const e=Z.last;
  if(!e)return alert('আগে একটি ইনপুট ঘরে ক্লিক করুন');
  const s=e.selectionStart,v=e.value,c=t.indexOf('{'),p=c>=0&&t[c+1]=='}'?s+c+1:s+t.length;
  e.value=v.slice(0,s)+t+v.slice(e.selectionEnd);
  e.focus();
  e.setSelectionRange(p,p);
  e.dispatchEvent(new Event('input',{bubbles:true}));
};

document.addEventListener('focusin',e=>{if(e.target.closest&&e.target.closest('#fm'))Z.last=e.target});
document.addEventListener('input',e=>{const t=e.target;if(t.closest&&t.closest('#fm')){Z.last=t;const p=$('#pvw');if(p)p.innerHTML=F(t.value)}});

const ci=(k,l)=>`<div><label>${l}</label><input value="${esc(Z.cf[k])}" oninput="QP.cf.${k}=this.value"></div>`;

const row=(it,i)=>`<div class="sb"><label style="display:flex;gap:6px;align-items:flex-start;color:var(--fg);font-size:14px"><input type="checkbox" style="width:auto" ${Z.pk[it.id]?'checked':''} onchange="QP.pk('${it.id}',this.checked)"><span><b>${bn(i+1)}.</b> ${{u:'<em>[উদ্দীপক]</em> ',p:'<em>[বহুপদী]</em> ',c:'<em>[সৃজনশীল]</em> ',s:'<em>[সংক্ষিপ্ত]</em> '}[it.kind]||''}${F(((it.qs&&it.qs[0].q)||it.q||it.stim).slice(0,80))} <small>${esc(it.src||'')}</small></span></label><div class="g2">${(it.qs||[]).map((q,j)=>`<select onchange="QP.an('${it.id}',${j},this.value)"><option value="-1">উত্তর?</option>${KS.map((x,a)=>`<option value="${a}"${q.a==a?' selected':''}>${x}</option>`).join('')}</select>`).join('')}<button class="btn s" onclick="QP.edit('${it.id}')">সম্পাদনা</button><button class="btn s r" onclick="QP.del('${it.id}')">মুছুন</button></div></div>`;

const hd=(x,ttl,si)=>`<div class="qh"><div class="ql">${esc(x.l)}</div><div class="qm"><b>${esc(ttl)}</b>${x.sub?`<br><b>${esc(x.sub)}</b>`:''}<br><b>${esc(x.e)}</b><br><b>[${esc(x.s)}]</b><br>সময়—${esc(x.t)}<br>পূর্ণমান—${bn(x.m)}</div><div class="qb"${x.nb?' style="display:none"':''}><div>বিষয় কোড : ${[...bn(x.c)].map(d=>`<span class="bx">${d}</span>`).join('')}</div>${si==null?'':`<div>সেট : <span class="bx">${KS[si]}</span></div>`}</div></div>`;

function genc(){
  const it=Z.Q.filter(x=>Z.pk[x.id]),S_=it.filter(x=>x.kind=='s'),C=it.filter(x=>x.kind=='c');
  if(!it.length)return alert('প্রশ্ন বাছাই করুন');
  const c=Z.cf,sub=(sl(Z.cls).find(a=>a[0]==Z.sub)||['',''])[1],na=+c.na||S_.length,nc=+c.nc||C.length,x={...c,sub:'',m:c.m||na*2+nc*10,c:c.c||cd(Z.sub),t:c.t||'২ ঘণ্টা ৩০ মিনিট'};
  let h='',n=0;
  if(S_.length){
    n=1;
    h+=`<div class="ct"><b>সংক্ষিপ্ত উত্তর প্রশ্ন</b><br>(যে কোনো ${bn(na)}টি প্রশ্নের উত্তর দাও)<br>মান—২×${bn(na)}=${bn(na*2)}</div><div class="pr"><span><b>১।</b> যে কোনো ${bn(na)}টি প্রশ্নের উত্তর দাও:</span><b></b></div>`+S_.map((q,i)=>`<div class="pr"><span>(${LET[i]}) ${F(q.q)}</span><b>২</b></div>`).join('');
  }
  if(C.length){
    h+=`<div class="ct"><b>সৃজনশীল প্রশ্ন</b><br>(যে কোনো ${bn(nc)}টি প্রশ্নের উত্তর দাও)<br>মান—১০×${bn(nc)}=${bn(nc*10)}</div>`;
    C.forEach(q=>{
      n++;
      h+=`<div class="cq"><b>${bn(n)}।</b> ${q.img?`<br><img src="${q.img}" style="max-height:160px;margin:6px 0;"><br>`:''}${F(q.stim).replace(/\\n/g,'<br>')}${q.parts.map((p,i)=>`<div class="pr"><span>(${KS[i]}) ${F(p)}</span><b>${bn(i+1)}</b></div>`).join('')}</div>`;
    });
  }
  const nt=c.n||`ডান পাশের সংখ্যা প্রশ্নের পূর্ণমান জ্ঞাপক। ${S_.length?'সংক্ষিপ্ত উত্তর প্রশ্ন থেকে যে কোনো '+bn(na)+'টি এবং ':''}সৃজনশীল প্রশ্ন থেকে যে কোনো ${bn(nc)}টি প্রশ্নের উত্তর দিতে হবে।`;
  Z.o=`<div class="qs pb" style="--g:${+c.g||18}px">${hd(x,sub+' (সৃজনশীল)')}<hr><p class="qn">[দ্রষ্টব্য: ${F(nt)}]</p><div class="pr" style="font-weight:700"><span></span><span>নম্বর</span></div>${h}</div>`;
  $('#qo').innerHTML=Z.o;
}

/* প্রাথমিক সেকশন (শ্রেণি ৩-৫) */
const en=t=>String(t).replace(/[০-৯]/g,d=>'০১২৩৪৫৬৭৮৯'.indexOf(d)),tot=S=>S.reduce((a,x)=>a+(x.p?0:(+en(String(x.m).split('=').pop())||0)),0),nums=S=>{let n=0;return S.map(x=>x.p?'':++n)},tt=S=>{const T=tot(S);return 'মোট '+bn(T)+(T!=100?' <b style="color:#c0392b"> (মোট নম্বর: '+bn(T)+')</b>':'')};

const TPL_PRI={
  bn:[
    ['১. বহু নির্বাচন/সংক্ষিপ্ত প্রশ্ন (১০টি)', '১০×১=১০', 0],
    ['২. সঠিক শব্দ দিয়ে শূন্যস্থান পূরণ (৫টি)', '৫×১=৫', 0],
    ['৩. বামপাশের বাক্যাংশের সাথে ডানপাশের বাক্যাংশ মিলকরণ', '৫×১=৫', 0],
    ['৪. সংক্ষিপ্ত প্রশ্ন (৫টি)', '৫×২=১০', 0],
    ['৫. যুক্তবর্ণ ভেঙে শব্দ তৈরি ও বাক্যে প্রয়োগ (৫টি)', '৫×২=১০', 0],
    ['৬. শব্দার্থ লিখন (৫টি)', '৫×১=৫', 0],
    ['৭. বিরামচিহ্ন বসিয়ে পুনরায় লেখা', '১×৫=৫', 0],
    ['৮. কবিতার মূলভাব / অনুচ্ছেদ লিখন', '১×১০=১০', 0],
    ['৯. ফরম পূরণ / আবেদনপত্র', '১×১০=১০', 0],
    ['১০. রচনা লিখন (৩টির মধ্যে ১টি)', '১×১৫=১৫', 0]
  ],
  en:[
    ['1. Multiple Choice Questions (10 Items)', '10×1=10', 0],
    ['2. Fill in the blanks with correct words (5 Items)', '5×1=5', 0],
    ['3. Match items in Column A with Column B', '5×1=5', 0],
    ['4. Short Questions (5 Items)', '5×2=10', 0],
    ['5. Rearrange words to make correct sentences (5 Items)', '5×2=10', 0],
    ['6. Make Wh-questions / Use of Punctuation & Capital letters', '5×2=10', 0],
    ['7. Read the text and answer short questions', '10', 0],
    ['8. Write a short composition / Guided paragraph', '10', 0],
    ['9. Form completion / Letter writing', '10', 0],
    ['10. Story writing / Creative writing', '10', 0]
  ],
  ma:[
    ['১. বহুনির্বাচনি প্রশ্ন (১০টি)', '১০×১=১০', 0],
    ['২. সংক্ষিপ্ত উত্তর প্রশ্ন (১০টি)', '১০×২=২০', 0],
    ['৩. যোগ / বিয়োগ / গুণ / ভাগ সংক্রান্ত গাণিতিক সমস্যা (২টি প্রশ্ন - অথবা সহ)', '১০', 0],
    ['৪. সাধারণ ও দশমিক ভগ্নাংশ / শতকরা সংক্রান্ত গাণিতিক সমস্যা (২টি প্রশ্ন - অথবা সহ)', '১০', 0],
    ['৫. পরিমাপ ও সময় সংক্রান্ত গাণিতিক সমস্যা (২টি প্রশ্ন - অথবা সহ)', '১০', 0],
    ['৬. জ্যামিতিক চিত্র অঙ্কন ও বৈশিষ্ট্য লিখন', '১০', 0],
    ['৭. তথ্য ও উপাত্ত সংক্রান্ত সমস্যা', '১০', 0],
    ['৮. যোগ্যতাভিত্তিক সৃজনশীল প্রশ্ন (২টি প্রশ্ন - অথবা সহ)', '২০', 0]
  ],
  co:[
    ['১. বহুনির্বাচনি প্রশ্ন (১০টি)', '১০×১=১০', 0],
    ['২. শূন্যস্থান পূরণ (৫টি)', '৫×১=৫', 0],
    ['৩. বাম-ডান কলাম মিলকরণ (৫টি)', '৫×১=৫', 0],
    ['৪. সংক্ষিপ্ত উত্তর প্রশ্ন (৭টির মধ্যে ৫টি)', '৫×২=১০', 0],
    ['৫. বর্ণনামূলক/কাঠামোবদ্ধ প্রশ্ন (৭টির মধ্যে ৫টি)', '৫×৬=৩০']
  ]
};

const TP=(c,s)=>(s=='bn'?TPL_PRI.bn:s=='en'?TPL_PRI.en:s=='ma'?TPL_PRI.ma:TPL_PRI.co).map(([t,m,p])=>({t,m,p:p?1:0,x:''}));
const psl=()=>[['bn','বাংলা'],['en','English'],['ma','গণিত'],['sci','প্রাথমিক বিজ্ঞান'],['bgs','বাংলাদেশ ও বিশ্বপরিচয়']];
const pkey=()=>Z.cls+'|'+Z.sub,PS=()=>Z.P[pkey()]||(Z.P[pkey()]=TP(Z.cls,Z.sub));

const sec=S=>{
  const N=nums(S);
  return S.map((x,i)=>`
    <div class="sb" style="background:#f9f9f9;padding:10px;margin-bottom:12px;border:1px solid #ddd;border-radius:4px;">
      <label><b>${x.p?'পাঠ্যাংশ':bn(N[i])+' নং প্রশ্ন শিরোনাম'}</b></label>
      <input value="${esc(x.t)}" oninput="QP.ps(${i},'t',this.value)">
      ${x.p?'':`<label>নম্বর</label><input value="${esc(x.m)}" oninput="QP.ps(${i},'m',this.value)">`}
      <label>প্রশ্নের বিস্তারিত / সাব-কোশ্চেন (অথবা থাকলে নিচে লিখুন):</label>
      <textarea rows="3" placeholder="প্রশ্ন ১...&#10;অথবা&#10;প্রশ্ন ২..." oninput="QP.ps(${i},'x',this.value)">${esc(x.x)}</textarea>
    </div>
  `).join('');
};

function viewp(){
  const S=PS();
  return `<div class="card">
    <h3>প্রাথমিক সেকশন (শ্রেণি ৩য়–৫ম) - প্রশ্ন তৈরি</h3>
    <div class="g">
      <div><label>ধরন</label><select onchange="QP.md(this.value)">${opts({p:'প্রাথমিক (৩য়–৫ম) প্রশ্নপত্র',m:'এমসিকিউ (হাইস্কুল)',c:'সৃজনশীল ও সংক্ষিপ্ত (হাইস্কুল)'},Z.mode)}</select></div>
      <div><label>শ্রেণি</label><select onchange="QP.cl(this.value)">${opts(CO(),Z.cls)}</select></div>
      <div><label>বিষয়</label><select onchange="QP.sb(this.value)">${psl().map(([i,n])=>`<option value="${i}"${i==Z.sub?' selected':''}>${n}</option>`).join('')}</select></div>
    </div>
  </div>
  <div class="card">
    <h3>প্রশ্ন কাঠামো ও এন্ট্রি <small id="tot">${tt(S)}</small></h3>
    <div id="tb">${TB}</div>
    <div id="pvw" class="qs" style="padding:6px;margin:6px 0;min-height:30px"><small>লাইভ প্রিভিউ</small></div>
    <div id="fm">${sec(S)}</div>
  </div>
  <div class="card">
    <h3>প্রশ্নপত্র হেডার ও জেনারেট</h3>
    <div class="g">${ci('e','পরীক্ষার নাম (যেমন: বার্ষিক মূল্যায়ন পরীক্ষা-২০২৬)')}${ci('s','বিদ্যালয় / প্রতিষ্ঠানের নাম')}${ci('t','সময় (যেমন: ২ ঘণ্টা ৩০ মিনিট)')}${ci('m','পূর্ণমান')}${ci('g','প্রশ্নের ফাঁক (১২–৪০)')}</div>
    <p><button class="btn" onclick="QP.gen()">প্রশ্নপত্র তৈরি করুন</button> <button class="btn" onclick="print()">🖨 প্রিন্ট (A4 Landscape)</button></p>
  </div>
  <div id="qo">${Z.o}</div>`;
}

function genp(){
  const S=PS(),c=Z.cf,N=nums(S),sn=(psl().find(a=>a[0]==Z.sub)||['',''])[1],
  x={...c,l:c.s||'প্রাথমিক বিদ্যালয়',sub:sn,m:c.m||tot(S),nb:1,t:c.t||'২ ঘণ্টা ৩০ মিনিট'},
  h=S.map((q,i)=>q.p?`<div class="pas">${F(q.t)}<div>${F(q.x).replace(/\\n/g,'<br>')}</div></div>`:`
    <div class="pr"><span><b>${bn(N[i])}।</b> ${F(q.t)}</span><b>${esc(q.m)}</b></div>
    <div class="sx" style="margin-left:20px;">
      ${F(q.x).split('\\n').map(line=>line.trim()==='অথবা'?`<div style="text-align:center;font-weight:bold;margin:6px 0;">অথবা</div>`:`<div>${line}</div>`).join('')}
    </div>
  `).join('');

  Z.o=`<div class="qs pb" style="--g:${+c.g||18}px">
    <div style="text-align:center;border-bottom:2px solid #000;padding-bottom:8px;margin-bottom:12px;">
      <h2 style="margin:0;font-size:22px;color:#000;">${esc(x.l)}</h2>
      <h3 style="margin:4px 0;font-size:16px;">${esc(x.e)}</h3>
      <div style="display:flex;justify-content:space-between;font-weight:bold;margin-top:6px;">
        <span>শ্রেণি: ${CL[Z.cls]||Z.cls}</span>
        <span>বিষয়: ${esc(x.sub)}</span>
        <span>সময়: ${esc(x.t)}</span>
        <span>পূর্ণমান: ${bn(x.m)}</span>
      </div>
    </div>
    <p class="qn" style="font-weight:bold;">[দ্রষ্টব্য: ডান পাশের সংখ্যা প্রশ্নের পূর্ণমান জ্ঞাপক। সকল প্রশ্নের উত্তর দিতে হবে।]</p>
    ${h}
  </div>`;
  $('#qo').innerHTML=Z.o;
}

function view(){
  if(Z.mode=='p')return viewp();
  const ss=sl(Z.cls);
  if(!Z.sub)Z.sub=ss[0][0];
  return `<div class="card">
    <h3>প্রশ্নব্যাংক ও প্রশ্নপত্র মডিউল</h3>
    <div class="g">
      <div><label>ধরন</label><select onchange="QP.md(this.value)">${opts({m:'এমসিকিউ (বহুনির্বাচনি)',c:'সৃজনশীল ও সংক্ষিপ্ত উত্তর',p:'প্রাথমিক (৩য়–৫ম) প্রশ্নপত্র'},Z.mode)}</select></div>
      <div><label>শ্রেণি</label><select onchange="QP.cl(this.value)">${opts(CO(),Z.cls)}</select></div>
      <div><label>বিষয়</label><select onchange="QP.sb(this.value)">${ss.map(([i,n])=>`<option value="${i}"${i==Z.sub?' selected':''}>${n}</option>`).join('')}</select></div>
    </div>
  </div>
  <div class="card">
    <h3>নতুন প্রশ্ন যোগ করুন</h3>
    <label>প্রশ্ন ধরন</label>
    <select onchange="QP.kd(this.value)">${opts(Z.mode=='c'?{c:'সৃজনশীল (উদ্দীপক + ক–ঘ)',s:'সংক্ষিপ্ত উত্তর'}:{g:'সাধারণ বহুনির্বাচনি',p:'বহুপদী সমাপ্তিসূচক',u:'উদ্দীপকভিত্তিক'},Z.k)}</select>
    <div id="tb">${TB}</div>
    <div id="pvw" class="qs" style="padding:6px;margin:6px 0;min-height:30px"><small>লাইভ প্রিভিউ</small></div>
    <div id="fm">${fm()}</div>
  </div>
  <div class="card" style="${Z.mode=='c'?'display:none':''}">
    <details><summary><b>টেক্সট থেকে একসাথে ইম্পোর্ট করুন</b></summary>
      <p><small>ফরম্যাট: "১। প্রশ্ন" এর পর "ক. অপশন১  খ. অপশন২  গ. অপশন৩  ঘ. অপশন৪"</small></p>
      <textarea id="imt" rows="5"></textarea>
      <input id="imsrc" placeholder="উৎস (যেমন: ঢাকা বোর্ড ২০২৫)">
      <p><button class="btn" onclick="QP.imp()">ইম্পোর্ট করুন</button></p>
    </details>
  </div>
  <div class="card">
    <h3>প্রশ্নব্যাংক তালিকা (${bn(ML().length)}টি প্রশ্ন সংরক্ষিত)</h3>
    ${ML().map(row).join('')||'<small>এই শ্রেণি ও বিষয়ে কোনো প্রশ্ন পাওয়া যায়নি</small>'}
  </div>
  <div class="card">
    <h3>প্রশ্নপত্র তৈরি <small>(<span id="pc">${bn(qn())}</span>টি বাছাইকৃত)</small></h3>
    <div class="g">
      ${ci('e','পরীক্ষার নাম')}
      ${ci('s','সিলেবাস লাইন')}
      ${ci('t','সময় (ফাঁকা = সময় স্বয়ংক্রিয়)')}
      ${ci('g','প্রশ্নের ফাঁক (১২–৪০)')}
      ${Z.mode=='c'?ci('na','সংক্ষিপ্ত: কয়টির উত্তর')+ci('nc','সৃজনশীল: কয়টির উত্তর')+ci('n','দ্রষ্টব্য লাইন'):''}
      ${ci('m','পূর্ণমান')}
      ${ci('c','বিষয় কোড')}
      ${ci('l','প্রতিষ্ঠান / স্কুলের নাম')}
    </div>
    <p>
      <button class="btn" onclick="QP.gen()">${Z.mode=='c'?'প্রশ্নপত্র তৈরি করুন':'৪ সেট তৈরি করুন'}</button> 
      <button class="btn" onclick="print()">🖨 প্রশ্নপত্র প্রিন্ট (A4 Landscape)</button> 
      <button class="btn" onclick="QP.pkey()">উত্তরমালা প্রিন্ট</button>
    </p>
  </div>
  <div id="qo">${Z.o}</div>`;
}

/* সিএসএস ও ল্যান্ডস্কেপ প্রিন্ট মিডিয়া */
const css=document.createElement('style');
css.textContent=`@font-face{font-family:NikoshBAN;src:local('NikoshBAN'),local('Nikosh'),url('NikoshBAN.ttf')}
.qs{background:#fff;color:#111;font-family:NikoshBAN,'Noto Serif Bengali',serif;font-size:13px;line-height:1.5;padding:14px;max-width:900px;margin:0 auto 16px;border:1px solid #bbb;overflow-x:auto}
.qh{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.ql{flex:1;color:#d01010;font-weight:700;font-size:24px;line-height:1.1}.qm{flex:1.4;line-height:1.8;font-size:13px}.qb{flex:1.2;border:2px solid #111;padding:8px;font-weight:700;line-height:2.0}
.bx{display:inline-block;border:1.5px solid #111;padding:0 6px;margin:0 2px;font-size:16px}.qs hr{border:0;border-top:2px solid #111;margin:12px 0}.qn{font-size:11px;text-align:justify}.qw{text-align:center}
.cl{column-count:2;column-gap:24px;column-rule:1px solid #111}.q{break-inside:avoid;margin:var(--g,16px) 0}.pas{margin:12px 0;font-style:italic}.sx{margin:0 0 var(--g,16px) 22px}.ct{text-align:center;margin:14px 0 6px}.pr{display:flex;justify-content:space-between;gap:12px;margin:var(--g,16px) 0}.pr b{min-width:20px;text-align:right}.cq{margin:calc(var(--g,16px)*1.3) 0;break-inside:avoid}.si{margin-left:16px}.op{display:grid;grid-template-columns:1fr 1fr;margin-left:16px}.op1{grid-template-columns:1fr}
.iso{display:inline-flex;flex-direction:column;vertical-align:middle;line-height:1;font-size:.8em;margin-right:1px}.iso sup,.iso sub{position:static;vertical-align:baseline;line-height:1.1;font-size:1em}.qs table{width:100%;border-collapse:collapse}.qs td,.qs th{border:1px solid #444;padding:4px;text-align:center}
@media print{
  @page { size: A4 landscape; margin: 8mm; }
  body { background: #fff; }
  .card, #nav, .btn, #tb, #pvw, details { display: none !important; }
  .qs { border: 0; max-width: 100%; margin: 0; padding: 0; }
  .cl { column-count: 2 !important; }
}`;
document.head.appendChild(css);

const R0=typeof window.render==='function'?window.render:()=>{};
window.render=function(){
  const on=typeof V!=='undefined' && V.tab==5;
  if(on)V.tab=0;
  R0();
  if(on)V.tab=5;
  const nv=$('#nav');
  if(nv && on){
    nv.querySelectorAll('button').forEach(b=>b.classList.remove('on'));
    nv.insertAdjacentHTML('beforeend',`<button class="${on?'on':''}" onclick="V.tab=5;render()">প্রশ্নপত্র</button>`);
  }
  if(on){
    if(!Z.sub){Z.sub=sl(Z.cls)[0][0];ld()}
    $('#app').innerHTML=view();
  }
};

window.QP={
  md:v=>{Z.mode=v;Z.Q=[];Z.pk={};Z.o='';if(v=='p'){if(+Z.cls<3||+Z.cls>5)Z.cls='3';Z.sub='bn';draw();return}if(+Z.cls<6)Z.cls='9';Z.sub=sl(Z.cls)[0][0];Z.k=v=='c'?'c':'g';draw();ld()},
  tm:v=>{Z.tm=v;draw()},
  ps:(i,k,v)=>{PS()[i][k]=v;if(k=='m'){const e=$('#tot');if(e)e.innerHTML=tt(PS())}},
  cf:Z.cf,
  ins,
  add,
  edit: editQ,
  an,
  del,
  pk,
  imp,
  gen,
  imgUp: handleImgUpload,
  cl:v=>{Z.cls=v;if(Z.mode=='p'){Z.sub='bn';draw();return}Z.sub=sl(v)[0][0];Z.Q=[];draw();ld()},
  sb:v=>{Z.sub=v;if(Z.mode=='p'){draw();return}Z.Q=[];draw();ld()},
  kd:v=>{Z.k=v;$('#fm').innerHTML=fm()},
  pkey:()=>{document.body.classList.add('pk');print()},
  _t:{parse,mk4,F}
};
})();
"""

with open('qpaper.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("FILE_UPDATED_SUCCESSFULLY")setupNavTab, 100);
} else {
  document.addEventListener('DOMContentLoaded', setupNavTab);
}

window.onafterprint=()=>document.body.classList.remove('pk');
window.QP={md:v=>{Z.mode=v;Z.Q=[];Z.pk={};Z.o='';if(v=='p'){if(+Z.cls<3||+Z.cls>5)Z.cls='3';Z.sub='bn';draw();return}if(+Z.cls<6)Z.cls='9';Z.sub=sl(Z.cls)[0][0];Z.k=v=='c'?'c':'g';draw();ld()},tm:v=>{Z.tm=v;draw()},ps:(i,k,v)=>{PS()[i][k]=v;if(k=='m'){const e=$('#tot');if(e)e.innerHTML=tt(PS())}},cf:Z.cf,ins,add,an,del,pk,imp,gen,cl:v=>{Z.cls=v;if(Z.mode=='p'){Z.sub='bn';draw();return}Z.sub=sl(v)[0][0];Z.Q=[];draw();ld()},sb:v=>{Z.sub=v;if(Z.mode=='p'){draw();return}Z.Q=[];draw();ld()},kd:v=>{Z.k=v;const fmE=$('#fm');if(fmE)fmE.innerHTML=fm()},pkey:()=>{document.body.classList.add('pk');print()},_t:{parse,mk4,F}};
})();
