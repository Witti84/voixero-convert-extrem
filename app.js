const form = document.querySelector('#contact-form');
document.querySelector('#year').textContent = new Date().getFullYear();
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector('button');
  const status = form.querySelector('.form-status');
  const data = Object.fromEntries(new FormData(form));
  data.privacy = Boolean(data.privacy);
  button.disabled = true;
  status.textContent = 'Ihre Anfrage wird gesendet …';
  try {
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error();
    status.textContent = 'Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns persönlich bei Ihnen.';
    form.reset();
  } catch {
    status.replaceChildren(document.createTextNode('Die Anfrage konnte nicht übermittelt werden. Bitte schreiben Sie uns direkt: '));
    const link = document.createElement('a');
    link.href = 'mailto:sales@voixero.com?subject=' + encodeURIComponent('Anfrage Convert extrem – ' + data.company) + '&body=' + encodeURIComponent(`${data.firstname} ${data.lastname}\n${data.company}\n${data.email}\n${data.phone}\n${data.website}\n\n${data.message}\n\nErstkundenangebot: CHF 650 pro Monat für 3 Monate.`);
    link.textContent = 'E-Mail mit Ihren Angaben öffnen';
    link.style.textDecoration = 'underline';
    status.append(link);
  } finally { button.disabled = false; }
});
