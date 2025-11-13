export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export async function uploadToImgbb(file) {
  const key = import.meta.env.VITE_IMGBB_API_KEY;
  if (!key) throw new Error('Missing IMGBB API key');

  const base64 = await fileToBase64(file);
  const form = new FormData();
  form.append('key', key);
  
  // Remove data URL prefix if present
  const payload = typeof base64 === 'string' ? base64.replace(/^data:[^;]+;base64,/, '') : base64;
  form.append('image', payload);

  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: form,
  });

  const json = await res.json();
  if (!res.ok || !json?.success) {
    const msg = json?.error?.message || 'Image upload failed';
    throw new Error(msg);
  }
  return json.data?.url || json.data?.display_url || '';
}
