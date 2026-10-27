import nodemailer from 'nodemailer';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).json({success:false}); }
  if (req.headers.origin && req.headers.origin !== `https://${req.headers.host}` && !req.headers.origin.startsWith('http://localhost:')) return res.status(403).json({success:false});
  let data;
  try { data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return res.status(400).json({success:false}); }
  if (!data || typeof data !== 'object') return res.status(400).json({success:false});
  if (data.website_check) return res.status(200).json({success:true});
  const required = ['firstname','lastname','company','email','website'];
  if (required.some(k => typeof data[k] !== 'string' || !data[k].trim() || data[k].length > 250) || data.privacy !== true || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.email)) return res.status(400).json({success:false});
  if (['phone','message'].some(k => data[k] != null && (typeof data[k] !== 'string' || data[k].length > 4000))) return res.status(400).json({success:false});
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.SMTP_FROM) return res.status(503).json({success:false});
  const port = Number(process.env.SMTP_PORT || 587);
  try {
    const transport = nodemailer.createTransport({host:process.env.SMTP_HOST,port,secure:port===465,requireTLS:port!==465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD},connectionTimeout:10000,socketTimeout:15000});
    await transport.sendMail({from:process.env.SMTP_FROM,to:'sales@voixero.com',replyTo:data.email,subject:'Convert extrem – neue Erstkundenanfrage',text:`Anfrage über becomeextrem.voixero.com\n\nErstkundenangebot: CHF 650/Monat für 3 Monate. Total CHF 1’950 zzgl. MwSt. Keine automatische Verlängerung.\n\nName: ${data.firstname} ${data.lastname}\nUnternehmen: ${data.company}\nE-Mail: ${data.email}\nTelefon: ${data.phone || '–'}\nWebsite: ${data.website}\n\nNachricht: ${data.message || '–'}\n\nEinwilligung zur Kontaktaufnahme: erteilt.\nKeine Bestellung; unverbindliche Anfrage.`});
    return res.status(200).json({success:true});
  } catch { return res.status(502).json({success:false}); }
}
