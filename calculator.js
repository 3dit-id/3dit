(function(){
  const $=id=>document.getElementById(id);
  const num=id=>{const v=parseFloat($(id)?.value);return Number.isFinite(v)?v:0};
  const rup=v=>'Rp '+Math.round(v).toLocaleString('id-ID');
  const set=(id,v)=>{if($(id)) $(id).textContent=v};
  const RAB_KEY='3dit_rab_v2';

  function readRab(){
    try { const x=JSON.parse(localStorage.getItem(RAB_KEY)||'[]'); return Array.isArray(x)?x:[]; }
    catch(e){ return []; }
  }
  function saveRab(items){ localStorage.setItem(RAB_KEY,JSON.stringify(items)); }

  function concrete(){
    const base=num('c-l')*num('c-w')*num('c-d'), waste=num('c-waste')/100, total=base*(1+waste);
    set('c-vol',base.toFixed(3)+' m³'); set('c-total',total.toFixed(3)+' m³');
    set('c-cement-out',(total*num('c-cement')).toFixed(1)+' kg');
    set('c-sand-out',(total*num('c-sand')).toFixed(3)+' m³'); set('c-stone-out',(total*num('c-stone')).toFixed(3)+' m³'); set('c-cost',rup(total*num('c-price')));
  }
  function wall(){
    const gross=num('w-l')*num('w-h'), net=Math.max(0,gross-num('w-open')), total=net*(1+num('w-waste')/100), qty=Math.ceil(total*num('w-brick'));
    set('w-area',net.toFixed(2)+' m²'); set('w-qty',qty.toLocaleString('id-ID')+' pcs'); set('w-cost',rup(qty*num('w-price')));
  }
  function floor(){
    const area=num('f-l')*num('f-w'), total=area*(1+num('f-waste')/100), boxes=Math.ceil(total/Math.max(num('f-box'),.000001));
    set('f-area',area.toFixed(2)+' m²'); set('f-total',total.toFixed(2)+' m²'); set('f-boxes',boxes+' dus'); set('f-cost',rup(total*num('f-unit')));
  }
  function roof(){
    const angle=Math.min(89.9,Math.max(0,num('r-angle')))*Math.PI/180, area=num('r-l')*num('r-w')/Math.cos(angle), total=area*(1+num('r-overlap')/100)*(1+num('r-waste')/100);
    set('r-area',area.toFixed(2)+' m²'); set('r-total',total.toFixed(2)+' m²'); set('r-cost',rup(total*num('r-price')));
  }
  function paint(){
    const perimeter=2*(num('p-l')+num('p-w')), wall=Math.max(0,perimeter*num('p-h')-num('p-open')), area=wall+num('p-l')*num('p-w'), liters=area*num('p-coats')/Math.max(num('p-coverage'),.000001);
    set('p-area',area.toFixed(2)+' m²'); set('p-liters',liters.toFixed(1)+' L'); set('p-cost',rup(liters*num('p-price')));
  }

  const calculators={
    concrete:()=>({name:'Beton',source:'Kalkulator Beton',qty:num('c-l')*num('c-w')*num('c-d')*(1+num('c-waste')/100),unit:'m³',price:num('c-price')}),
    wall:()=>{const gross=num('w-l')*num('w-h'),net=Math.max(0,gross-num('w-open'));return {name:'Bata / Dinding',source:'Kalkulator Dinding',qty:Math.ceil(net*(1+num('w-waste')/100)*num('w-brick')),unit:'pcs',price:num('w-price')}},
    floor:()=>({name:'Keramik / Lantai',source:'Kalkulator Lantai',qty:num('f-l')*num('f-w')*(1+num('f-waste')/100),unit:'m²',price:num('f-unit')}),
    roof:()=>{const a=Math.min(89.9,Math.max(0,num('r-angle')))*Math.PI/180;return {name:'Material Atap',source:'Kalkulator Atap',qty:num('r-l')*num('r-w')/Math.cos(a)*(1+num('r-overlap')/100)*(1+num('r-waste')/100),unit:'m²',price:num('r-price')}},
    paint:()=>{const perimeter=2*(num('p-l')+num('p-w')),area=Math.max(0,perimeter*num('p-h')-num('p-open'))+num('p-l')*num('p-w');return {name:'Cat',source:'Kalkulator Cat',qty:area*num('p-coats')/Math.max(num('p-coverage'),.000001),unit:'L',price:num('p-price')}}
  };

  function renderRab(){
    const items=readRab(), body=$('rabBody'), empty=$('rabEmpty');
    if(!body)return;
    body.innerHTML='';
    items.forEach((item,index)=>{
      const tr=document.createElement('tr'); tr.className='rab-row';
      tr.innerHTML=`<td><input class="rab-name" type="text" value="${escapeHtml(item.name||'Item RAB')}" aria-label="Nama pekerjaan"><small class="rab-source">${escapeHtml(item.source||'Manual')}</small></td>
        <td><input class="rab-q" type="number" min="0" step="0.01" value="${Number(item.qty)||0}" aria-label="Volume"></td>
        <td><input class="rab-unit" type="text" value="${escapeHtml(item.unit||'ls')}" aria-label="Satuan"></td>
        <td><input class="rab-p" type="number" min="0" step="1000" value="${Number(item.price)||0}" aria-label="Harga satuan"></td>
        <td class="rab-sub">Rp 0</td><td><button type="button" class="btn btn-ghost rab-del">Hapus</button></td>`;
      body.appendChild(tr);
      tr.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',()=>updateRabItem(index,tr)));
      tr.querySelector('.rab-del').addEventListener('click',()=>{const a=readRab();a.splice(index,1);saveRab(a);renderRab();});
    });
    if(empty)empty.style.display=items.length?'none':'block';
    set('rab-count',items.length+' item'); set('rab-count-mini',items.length.toLocaleString('id-ID'));
    rabTotals();
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
  function updateRabItem(index,tr){
    const a=readRab(), item=a[index]; if(!item)return;
    item.name=tr.querySelector('.rab-name').value; item.qty=parseFloat(tr.querySelector('.rab-q').value)||0; item.unit=tr.querySelector('.rab-unit').value; item.price=parseFloat(tr.querySelector('.rab-p').value)||0;
    saveRab(a); renderRab();
  }
  function rabTotals(){
    let subtotal=0;
    document.querySelectorAll('#rabBody tr').forEach(tr=>{
      const q=parseFloat(tr.querySelector('.rab-q')?.value)||0,p=parseFloat(tr.querySelector('.rab-p')?.value)||0,s=q*p;
      subtotal+=s; const out=tr.querySelector('.rab-sub');if(out)out.textContent=rup(s);
    });
    const oh=subtotal*num('rab-oh')/100, profit=(subtotal+oh)*num('rab-profit')/100;
    set('rab-total',rup(subtotal));set('rab-oh-out',rup(oh));set('rab-profit-out',rup(profit));set('rab-grand',rup(subtotal+oh+profit));
  }
  function addManual(){
    const a=readRab(); a.push({id:Date.now()+Math.random(),name:'Item pekerjaan',source:'Manual',qty:1,unit:'ls',price:0});saveRab(a);renderRab();
  }
  function addToRab(source){
    const make=calculators[source]; if(!make)return;
    const item=make(); item.id=Date.now()+Math.random();
    if(!item.qty || !item.price){ alert('Lengkapi nilai volume dan harga satuan terlebih dahulu.'); return; }
    const a=readRab(); a.push(item); saveRab(a); renderRab();
    activate('calc-rab');
    const rb=$('rabBody'); if(rb) rb.closest('.calc-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function activate(id){
    document.querySelectorAll('.calc-panel').forEach(p=>p.classList.toggle('active',p.id===id));
    document.querySelectorAll('[data-calc-tab]').forEach(b=>b.classList.toggle('active',b.dataset.calcTab===id));
    if(id==='calc-rab') renderRab();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const map={concrete,wall,floor,roof,paint};
    document.querySelectorAll('[data-calc-tab]').forEach(b=>b.addEventListener('click',()=>activate(b.dataset.calcTab)));
    document.querySelectorAll('form[data-calc]').forEach(f=>{const fn=map[f.dataset.calc];f.addEventListener('submit',e=>e.preventDefault());f.querySelectorAll('input').forEach(i=>i.addEventListener('input',fn));fn();});
    document.querySelectorAll('.add-to-rab').forEach(b=>b.addEventListener('click',()=>addToRab(b.dataset.rabSource)));
    $('rabAdd')?.addEventListener('click',addManual);
    $('rabPrint')?.addEventListener('click',()=>window.print());
    $('rabReset')?.addEventListener('click',()=>{if(confirm('Hapus semua item RAB?')){localStorage.removeItem(RAB_KEY);renderRab();}});
    document.querySelectorAll('#rab-oh,#rab-profit').forEach(i=>i.addEventListener('input',rabTotals));
    renderRab();
  });
})();