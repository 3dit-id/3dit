
document.addEventListener("DOMContentLoaded",()=>{
  const form=document.querySelector("#chatForm"),input=document.querySelector("#chatInput"),windowEl=document.querySelector("#chatWindow"),status=document.querySelector("#aiStatus");
  if(!form)return;
  const cfg=window.SITE_CONFIG||{};
  const add=(text,who)=>{const d=document.createElement("div");d.className=`msg ${who}`;d.textContent=text;windowEl.appendChild(d);windowEl.scrollTop=windowEl.scrollHeight};
  form.addEventListener("submit",async e=>{
    e.preventDefault();const text=input.value.trim();if(!text)return;
    add(text,"user");input.value="";status.textContent="Memproses…";
    try{
      if(!cfg.aiEndpoint) throw new Error("demo");
      const r=await fetch(cfg.aiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text})});
      if(!r.ok)throw new Error("network");
      const data=await r.json();add(data.reply||"Tidak ada jawaban dari server.","ai");
      status.textContent="Online";
    }catch(err){
      add("Mode demo aktif. Untuk menghubungkan Chat AI ke GPT, isi SITE_CONFIG.aiEndpoint dengan URL backend Anda. Jangan menaruh OpenAI API key langsung di JavaScript/browser karena dapat terlihat publik.","ai");
      status.textContent="Mode demo";
    }
  });
});
