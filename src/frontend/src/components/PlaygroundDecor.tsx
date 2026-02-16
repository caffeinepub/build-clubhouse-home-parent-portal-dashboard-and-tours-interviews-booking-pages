import { useState } from 'react';

interface PlaygroundDecorProps {
  type: 'child-heart' | 'butterflies';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlaygroundDecor({ type, className = '', size = 'md' }: PlaygroundDecorProps) {
  const [imageError, setImageError] = useState(false);
  
  const imageSrc = type === 'child-heart' 
    ? '/assets/generated/sticker-child-heart-upload.dim_1024x1024.png'
    : '/assets/generated/stickers-butterflies-set.dim_1024x1024.png';

  const fallbackSrc = type === 'child-heart'
    ? '/assets/generated/sticker-blue-child-heart.dim_1024x1024.png'
    : '/assets/generated/stickers-stars-set.dim_1024x1024.png';

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <img
      src={imageError ? fallbackSrc : imageSrc}
      alt=""
      className={`sticker-decor ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
}
