
import React from 'react';

interface IconGeminiProps {
  className?: string;
}

export const IconGemini: React.FC<IconGeminiProps> = ({ className }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="currentColor" />
      <path d="M12 6.5L7.5 9V14.5L12 17.5L16.5 14.5V9L12 6.5Z" fill="white" />
    </svg>
  );
};
