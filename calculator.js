
document.addEventListener("DOMContentLoaded",()=>{
  const panelBtns=[...document.querySelectorAll("[data-calc-tab]")];
  const panels=[...document.querySelectorAll(".calc-panel")];
  if(!panelBtns.length)return;
  panelBtns.forEach(btn=>btn.addEventListener("click",()=>{
    panelBtns.forEach(b=>b.classList.remove("active")); panels.forEach(p=>p.classList.remove("active"));
    btn.classList.add("active"); document.querySelector(`#${btn.dataset.calcTab}`)?.classList.add("active");
  }));

  const n=id=>parseFloat(document.getElementById(id)?.value)||0;
  const rupiah=x=>"Rp "+Math.max(0,x||0).toLocaleString("id-ID",{maximumFractionDigits:0});
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};

  function concrete(){
    const l=n("c-l"),w=n("c-w"),d=n("c-d"),price=n("c-price");
    const vol=l*w*d;
    const waste=n("c-waste")/100;
    const total=vol*(1+waste);
    set("c-vol",`${vol.toFixed(3)} m³`);
    set("c-total",`${total.toFixed(3)} m³`);
    set("c-cost",rupiah(total*price));
    // Approximate material coefficients per m3, editable in UI
    const cement=total*n("c-cement"),sand=total*n("c-sand"),stone=total*n("c-stone");
    set("c-cement-out",`${cement.toFixed(1)} kg`);
    set("c-sand-out",`${sand.toFixed(3)} m³`);
    set("c-stone-out",`${stone.toFixed(3)} m³`);
  }
  function wall(){
    const l=n("w-l"),h=n("w-h"),open=n("w-open"),brick=n("w-brick"),price=n("w-price");
    const area=Math.max(0,l*h-open), qty=Math.ceil(area*brick), waste=n("w-waste")/100, final=Math.ceil(qty*(1+waste));
    set("w-area",`${area.toFixed(2)} m²`);set("w-qty",`${final.toLocaleString("id-ID")} pcs`);
    set("w-cost",rupiah(final*price));
  }
  function floor(){
    const l=n("f-l"),w=n("f-w"),waste=n("f-waste")/100,unit=n("f-unit");
    const area=l*w,total=area*(1+waste), boxes=n("f-box")>0?Math.ceil(total/n("f-box")):0;
    set("f-area",`${area.toFixed(2)} m²`);set("f-total",`${total.toFixed(2)} m²`);set("f-boxes",`${boxes} dus`);set("f-cost",rupiah(total*unit));
  }
  function roof(){
    const l=n("r-l"),w=n("r-w"),overlap=n("r-overlap"),waste=n("r-waste")/100,price=n("r-price");
    const slopeFactor=Math.sqrt(1+Math.pow(Math.tan((n("r-angle")*Math.PI/180)),2)); 
    const base=l*w*slopeFactor*(1+overlap/100);
    const total=base*(1+waste);
    set("r-area",`${base.toFixed(2)} m²`);set("r-total",`${total.toFixed(2)} m²`);set("r-cost",rupiah(total*price));
  }
  function paint(){
    const l=n("p-l"),w=n("p-w"),h=n("p-h"),open=n("p-open"),coats=n("p-coats"),coverage=n("p-coverage"),price=n("p-price");
    const wallArea=Math.max(0,2*(l+w)*h-open), ceiling=l*w, total=(wallArea+ceiling)*coats, liters=coverage>0?total/coverage:0;
    set("p-area",`${(wallArea+ceiling).toFixed(2)} m²`);set("p-liters",`${liters.toFixed(1)} L`);set("p-cost",rupiah(liters*price));
  }
  function rab(){
    const rows=[...document.querySelectorAll(".rab-row")];
    let total=0;
    rows.forEach(row=>{
      const q=parseFloat(row.querySelector(".rab-q").value)||0,p=parseFloat(row.querySelector(".rab-p").value)||0;
      const sub=q*p; row.querySelector(".rab-sub").textContent=rupiah(sub); total+=sub;
    });
    const overhead=n("rab-oh")/100, profit=n("rab-profit")/100;
    const oh=total*overhead, profitVal=(total+oh)*profit, grand=total+oh+profitVal;
    set("rab-total",rupiah(total));set("rab-oh-out",rupiah(oh));set("rab-profit-out",rupiah(profitVal));set("rab-grand",rupiah(grand));
  }
  document.querySelectorAll("[data-calc]").forEach(form=>{
    const fn={concrete,wall,floor,roof,paint,rab}[form.dataset.calc];
    form.addEventListener("input",fn); fn();
  });
  document.querySelectorAll(".rab-del").forEach(btn=>btn.addEventListener("click",()=>{btn.closest(".rab-row")?.remove();rab()}));
  document.querySelectorAll(".rab-row input").forEach(x=>x.addEventListener("input",rab));
  document.querySelector("#rabAdd")?.addEventListener("click",()=>{
    const tbody=document.querySelector("#rabBody");
    const tr=document.createElement("tr");tr.className="rab-row";
    tr.innerHTML=`<td><input class="rab-q" type="number" min="0" value="1"></td><td><input class="rab-p" type="number" min="0" value="0"></td><td class="rab-sub">Rp 0</td><td><button type="button" class="btn btn-ghost rab-del" aria-label="Hapus baris">Hapus</button></td>`;
    tbody.appendChild(tr); tr.querySelector(".rab-del").addEventListener("click",()=>{tr.remove();rab()}); tr.querySelectorAll("input").forEach(x=>x.addEventListener("input",rab));rab();
  });
});
