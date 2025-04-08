
import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border p-4 bg-background">
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        <Textarea
          placeholder="Send a message..."
          className="min-h-[60px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <Button 
          size="icon" 
          onClick={handleSubmit} 
          disabled={!message.trim() || isLoading}
        >
          <SendHorizonal size={18} />
        </Button>
      </div>
      <div className="text-xs text-center mt-2 text-muted-foreground">
        Results will be compared across OpenAI, Anthropic, and Google Gemini.
      </div>
    </div>
  );
};

export default MessageInput;
