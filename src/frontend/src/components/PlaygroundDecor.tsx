interface PlaygroundDecorProps {
  type: 'stars' | 'butterflies';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlaygroundDecor({ type, className = '', size = 'md' }: PlaygroundDecorProps) {
  const imageSrc = type === 'stars' 
    ? '/assets/generated/stickers-stars-set.dim_1024x1024.png'
    : '/assets/generated/stickers-butterflies-set.dim_1024x1024.png';

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <img
      src={imageSrc}
      alt=""
      className={`sticker-decor ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
