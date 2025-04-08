
import React from 'react';

interface IconAnthropicProps {
  className?: string;
}

export const IconAnthropic: React.FC<IconAnthropicProps> = ({ className }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" />
      <path d="M15.5 9.5H8.5V14.5H15.5V9.5Z" fill="white" />
    </svg>
  );
};
