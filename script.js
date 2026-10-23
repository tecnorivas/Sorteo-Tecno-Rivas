// PEGÁ AQUÍ TU URL DE GOOGLE APPS SCRIPT
const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbyMeyqzDS-D-Hr4FbtTHFBKtiSTrpgEDa1zfCwhxrSD2DgDno_sE4YJgTgHhuS3ailG/exec";

const form = document.getElementById('f');
const btn = document.getElementById('btn');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.className = ''; 
  msg.textContent = '';

  const cedula = document.getElementById('ced').value.trim();
  const telefono = document.getElementById('tel').value.trim();
  const factura = document.getElementById('fac').value.trim();
  const total = parseFloat(document.getElementById('tot').value.trim());

  if (isNaN(total) || total < 1500) {
    msg.className = 'show error';
    msg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> El total debe ser un número igual o mayor a C$ 1,500.00.';
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span>Procesando...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

  try {
    // Enviamos directo a Google Sheets sin trancarse con restricciones de origen
    await fetch(ENDPOINT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({ cedula, telefono, factura, total })
    });

    // Éxito inmediato
    document.getElementById('formWrap').style.display = 'none';
    document.getElementById('done').classList.add('show');
    
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

  } catch (err) {
    msg.className = 'show error';
    msg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Ocurrió un inconveniente. Intentalo de nuevo.';
    btn.disabled = false;
    btn.innerHTML = '<span>Participar Ahora</span> <i class="fa-solid fa-paper-plane"></i>';
  }
});
