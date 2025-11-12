export default function Avatar({ src, alt }) {
  return (
    <img
      src={src || `https://i.pravatar.cc/80`}
      alt={alt || 'Avatar'}
      className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-slate-700"
    />
  );
}
