import Image from 'next/image';
import React from 'react'

const LoadingSpinner = ({ size = 32, className }: { size?: number; className?: string }) => (
  <div className={`animate-spin ${className}`}>
    <Image
      src="/logo/logo_32.png"
      alt="Reset360 Logo"
      width={size}
      height={size}
    />
  </div>
);

export default LoadingSpinner;
