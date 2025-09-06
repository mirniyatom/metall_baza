(function(){
  const dims = document.getElementById('dims');
  const shape = document.getElementById('shape');
  const density = document.getElementById('density');
  const price = document.getElementById('price');
  const qty = document.getElementById('qty');
  const weightEl = document.getElementById('weight');
  const totalWeightEl = document.getElementById('totalWeight');
  const totalPriceEl = document.getElementById('totalPrice');
  const btn = document.getElementById('calc-btn');

  const mmInput = (id,label,def)=>`<label class='block'><span class='text-sm'>${label} (mm)</span><input id='${id}' type='number' step='0.1' value='${def||0}' class='mt-1 w-full px-3 py-2 rounded-xl border border-slate-200/60 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80'/></label>`;
  const mInput  = (id,label,def)=>`<label class='block'><span class='text-sm'>${label} (m)</span><input id='${id}' type='number' step='0.01' value='${def||0}' class='mt-1 w-full px-3 py-2 rounded-xl border border-slate-200/60 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80'/></label>`;

  function renderDims(){
    const s = shape.value;
    if(s==='sheet'){
      dims.innerHTML = mmInput('thk','Qalinlik',2) + mmInput('w','Kenglik',1000) + mmInput('lmm','Uzunlik (mm)',2000);
    }else if(s==='round'){
      dims.innerHTML = mmInput('d','Diametr',20) + mInput('l','Uzunlik',6);
    }else if(s==='pipe'){
      dims.innerHTML = mmInput('D','Tashqi diametr',60) + mmInput('t','Devor qalinligi',3) + mInput('l','Uzunlik',6);
    }else if(s==='angle'){
      dims.innerHTML = mmInput('a','Raf (A)',50) + mmInput('b','Raf (B)',50) + mmInput('t','Qalinlik',5) + mInput('l','Uzunlik',6);
    }
  }

  function mmToM(v){ return Number(v)/1000; }
  function kgFmt(v){ return (Math.round(v*100)/100).toLocaleString('uz-UZ') + ' kg'; }
  function sumFmt(v){ return Math.round(v).toLocaleString('uz-UZ') + " so'm"; }

  function compute(){
    const rho = Number(density.value||7850);
    const p = Number(price.value||0);
    const q = Number(qty.value||1);
    let vol = 0; // m^3

    switch(shape.value){
      case 'sheet': {
        const thk = mmToM(document.getElementById('thk').value||0);
        const w   = mmToM(document.getElementById('w').value||0);
        const l   = mmToM(document.getElementById('lmm').value||0);
        vol = thk*w*l; break;
      }
      case 'round': {
        const d = mmToM(document.getElementById('d').value||0);
        const l = Number(document.getElementById('l').value||0);
        vol = Math.PI*Math.pow(d/2,2)*l; break;
      }
      case 'pipe': {
        const D = mmToM(document.getElementById('D').value||0);
        const t = mmToM(document.getElementById('t').value||0);
        const d = Math.max(D-2*t, 0);
        const l = Number(document.getElementById('l').value||0);
        vol = Math.PI*(Math.pow(D/2,2)-Math.pow(d/2,2))*l; break;
      }
      case 'angle': {
        const a = mmToM(document.getElementById('a').value||0);
        const b = mmToM(document.getElementById('b').value||0);
        const t = mmToM(document.getElementById('t').value||0);
        const l = Number(document.getElementById('l').value||0);
        const area = t*(a + b - t);
        vol = area*l; break;
      }
    }

    const mOne = vol*rho; // kg
    const mTotal = mOne*q;
    const priceTotal = mTotal * p;

    weightEl.textContent = kgFmt(mOne);
    totalWeightEl.textContent = kgFmt(mTotal);
    totalPriceEl.textContent = sumFmt(priceTotal);
  }

  document.querySelectorAll('[data-prefill]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const type = btn.getAttribute('data-prefill');
      shape.value = type; renderDims();
      if(type==='sheet'){ density.value=7850; price.value=12000; qty.value=1; document.getElementById('thk').value=2; document.getElementById('w').value=1000; document.getElementById('lmm').value=2000; }
      if(type==='round'){ density.value=7850; price.value=11500; qty.value=1; document.getElementById('d').value=20; document.getElementById('l').value=6; }
      if(type==='pipe'){ density.value=7850; price.value=11800; qty.value=1; document.getElementById('D').value=60; document.getElementById('t').value=3; document.getElementById('l').value=6; }
      if(type==='angle'){ density.value=7850; price.value=12500; qty.value=1; document.getElementById('a').value=50; document.getElementById('b').value=50; document.getElementById('t').value=5; document.getElementById('l').value=6; }
      compute();
    });
  });

  if(shape){
    renderDims();
    btn && btn.addEventListener('click', compute);
  }
})();