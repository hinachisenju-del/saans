// Saans Client Analytics & Host Normalization
if (window.location.hostname.startsWith('www.')) {
  window.location.replace(window.location.href.replace('www.', ''));
}
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SAANSHEALTH', { anonymize_ip: true });
