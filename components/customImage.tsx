import { useState } from 'react';
import Image from 'next/image';

type MyImageProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  [key: string]: any; // 추가적인 props를 위한 타입 (옵셔널)
};

const MyImage: React.FC<MyImageProps> = ({ src, fallbackSrc, alt, width, height, ...props }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      onError={() => !hasError && setHasError(true)}
    />
  );
};

export default MyImage;
