import React from 'react';

export default function CustomImage({src, alt}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        border: '2px solid var(--ifm-color-emphasis-300)', // Dùng biến màu của Docusaurus
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}
    />
  );
}