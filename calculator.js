(function(){
  const $=id=>document.getElementById(id);
  const num=id=>{const v=parseFloat($(id)?.value);return Number.isFinite(v)?v:0};
  const rup=v=>'Rp '+Math.round(v).toLocaleString('id-ID');
  const set=(id,v)=>{if($(id)) $(id).textContent=v};

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
  function rab(){
    let subtotal=0; document.querySelectorAll('#rabBody tr').forEach(tr=>{const q=parseFloat(tr.querySelector('.rab-q')?.value)||0,p=parseFloat(tr.querySelector('.rab-p')?.value)||0,s=q*p;subtotal+=s; const out=tr.querySelector('.rab-sub');if(out)out.textContent=rup(s)});
    const oh=subtotal*num('rab-oh')/100, profit=(subtotal+oh)*num('rab-profit')/100;
    set('rab-total',rup(subtotal));set('rab-oh-out',rup(oh));set('rab-profit-out',rup(profit));set('rab-grand',rup(subtotal+oh+profit));
  }
  function addRab(){const tr=document.createElement('tr');tr.className='rab-row';tr.innerHTML='<td><input class="rab-q" type="number" min="0" step="0.01" value="1"></td><td><input class="rab-p" type="number" min="0" step="1000" value="0"></td><td class="rab-sub">Rp 0</td><td><button type="button" class="btn btn-ghost rab-del">Hapus</button></td>'; $('rabBody').appendChild(tr); tr.querySelectorAll('input').forEach(i=>i.addEventListener('input',rab)); tr.querySelector('.rab-del').addEventListener('click',()=>{tr.remove();rab()});rab()}
  function activate(id){document.querySelectorAll('.calc-panel').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('[data-calc-tab]').forEach(b=>b.classList.toggle('active',b.dataset.calcTab===id));}
  document.addEventListener('DOMContentLoaded',()=>{
    const map={concrete,wall,floor,roof,paint};
    document.querySelectorAll('[data-calc-tab]').forEach(b=>b.addEventListener('click',()=>activate(b.dataset.calcTab)));
    document.querySelectorAll('form[data-calc]').forEach(f=>{const fn=map[f.dataset.calc];f.addEventListener('submit',e=>e.preventDefault());f.querySelectorAll('input').forEach(i=>i.addEventListener('input',fn));fn();});
    $('rabAdd')?.addEventListener('click',addRab); document.querySelectorAll('#rabBody input,#rab-oh,#rab-profit').forEach(i=>i.addEventListener('input',rab)); document.querySelectorAll('.rab-del').forEach(b=>b.addEventListener('click',()=>{b.closest('tr').remove();rab()})); rab();
  });
})();
