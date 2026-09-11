
document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG || {};
  document.querySelectorAll("[data-site-name]").forEach(el => el.textContent = cfg.name || "3DIT Design & Technology");
  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    el.href = `https://wa.me/${cfg.whatsapp || ""}`;
    if (el.dataset.whatsapp === "label") el.textContent = cfg.whatsappDisplay || "";
  });
  document.querySelectorAll("[data-address]").forEach(el => el.textContent = cfg.address || "");
  document.querySelectorAll("[data-email]").forEach(el => {
    el.textContent = cfg.email || "";
    el.href = `mailto:${cfg.email || ""}`;
  });
  [["instagram","instagram"],["facebook","facebook"],["tiktok","tiktok"],["youtube","youtube"]].forEach(([key,attr])=>{
    document.querySelectorAll(`[data-social="${attr}"]`).forEach(el=>el.href=cfg[key]||"#");
  });

  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-menu");
  if(toggle && nav){
    toggle.addEventListener("click",()=>{nav.classList.toggle("open");document.body.classList.toggle("nav-open");});
    document.querySelectorAll(".nav-item.has-dropdown > .nav-link").forEach(link=>{
      link.addEventListener("click",(e)=>{
        if(window.innerWidth <= 820){
          e.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });
    document.addEventListener("click",(e)=>{
      if(window.innerWidth<=820 && nav.classList.contains("open") && !nav.contains(e.target) && !toggle.contains(e.target)){
        nav.classList.remove("open"); document.body.classList.remove("nav-open");
      }
    });
  }

  // Current page active link
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link[data-page]").forEach(a=>{
    if(a.dataset.page===page) a.classList.add("active");
  });

  // Scroll reveal
  const reveal = document.querySelectorAll("[data-reveal]");
  if("IntersectionObserver" in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:"translateY(14px)"},{opacity:1,transform:"translateY(0)"}],{duration:500,easing:"ease-out",fill:"forwards"});io.unobserve(entry.target)}
      })
    },{threshold:.08});
    reveal.forEach(el=>{el.style.opacity="0";io.observe(el)});
  }

  // Slider
  const slider = document.querySelector("[data-slider]");
  if(slider){
    const track=slider.querySelector(".slides"), slides=[...slider.querySelectorAll(".slide")];
    const dots=[...slider.querySelectorAll(".slider-dot")];
    let idx=0, timer;
    const go=(n)=>{idx=(n+slides.length)%slides.length;track.style.transform=`translateX(-${idx*100}%)`;dots.forEach((d,i)=>d.classList.toggle("active",i===idx))};
    slider.querySelector(".slider-prev")?.addEventListener("click",()=>{go(idx-1);reset()});
    slider.querySelector(".slider-next")?.addEventListener("click",()=>{go(idx+1);reset()});
    dots.forEach((d,i)=>d.addEventListener("click",()=>{go(i);reset()}));
    const reset=()=>{clearInterval(timer);timer=setInterval(()=>go(idx+1),5000)};
    reset();
  }

  // Contact form
  const contactForm=document.querySelector("#contactForm");
  if(contactForm){
    contactForm.addEventListener("submit",e=>{
      e.preventDefault();
      const data=new FormData(contactForm);
      const name=data.get("name")||"";
      const msg=data.get("message")||"";
      const service=data.get("service")||"";
      const text=`Halo 3DIT, saya ${name}.%0A%0ALayanan: ${service}%0A%0A${msg}`;
      window.open(`https://wa.me/${cfg.whatsapp}?text=${text}`,"_blank");
    });
  }

  // Generic converter
  const converterForm=document.querySelector("#converterForm");
  if(converterForm){
    const from=converterForm.querySelector("[name=from]"), to=converterForm.querySelector("[name=to]"), val=converterForm.querySelector("[name=value]"), out=document.querySelector("#converterResult");
    const units={
      length:{mm:1,cm:10,m:1000,km:1000000,in:25.4,ft:304.8},
      area:{mm2:1,cm2:100,m2:1000000,ha:10000000000,ft2:92903.04},
      volume:{l:1,ml:.001,m3:1000,ft3:28.316846592},
      weight:{g:1,kg:1000,ton:1000000,lb:453.59237}
    };
    const selectUnits=()=>{
      const group=converterForm.querySelector("[name=group]").value, set=units[group]||units.length;
      from.innerHTML=to.innerHTML=Object.keys(set).map(k=>`<option value="${k}">${k}</option>`).join("");
      if(group==="length"){from.value="m";to.value="ft"}
      if(group==="area"){from.value="m2";to.value="ft2"}
      if(group==="volume"){from.value="m3";to.value="l"}
      if(group==="weight"){from.value="kg";to.value="g"}
      calculate();
    };
    const calculate=()=>{
      const group=converterForm.querySelector("[name=group]").value,set=units[group],v=parseFloat(val.value)||0;
      const result=v*(set[from.value]/set[to.value]);
      out.textContent=result.toLocaleString("id-ID",{maximumFractionDigits:8});
    };
    converterForm.querySelector("[name=group]").addEventListener("change",selectUnits);
    [from,to,val].forEach(x=>x.addEventListener("input",calculate));
    selectUnits();
  }
});
