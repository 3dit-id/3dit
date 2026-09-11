(function(){
  const units={
    length:{mm:0.001,cm:0.01,m:1,km:1000,in:0.0254,ft:0.3048},
    area:{'mm²':1e-6,'cm²':1e-4,'m²':1,'km²':1e6,'ft²':0.09290304,'yd²':0.83612736,ha:10000},
    volume:{mL:0.000001,L:0.001,'m³':1,'cm³':0.000001,'ft³':0.028316846592,'yd³':0.764554857984},
    weight:{g:0.001,kg:1,ton:1000,lb:0.45359237}
  };
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  function populate(group){const from=$('[name="from"]'),to=$('[name="to"]');from.innerHTML='';to.innerHTML='';Object.keys(units[group]).forEach(u=>{from.add(new Option(u,u));to.add(new Option(u,u))}); if(Object.keys(units[group]).length>1)to.selectedIndex=1;convert()}
  function convert(){const form=$('#converterForm');if(!form)return;const group=form.group.value,value=parseFloat(form.value.value)||0,from=form.from.value,to=form.to.value;if(!from||!to)return;const result=value*units[group][from]/units[group][to];$('#converterResult').textContent=result.toLocaleString('id-ID',{maximumFractionDigits:8})+' '+to;}
  document.addEventListener('DOMContentLoaded',()=>{const f=$('#converterForm');if(!f)return;f.group.addEventListener('change',()=>populate(f.group.value));['value','from','to'].forEach(n=>f[n].addEventListener('input',convert));populate(f.group.value);});
})();
