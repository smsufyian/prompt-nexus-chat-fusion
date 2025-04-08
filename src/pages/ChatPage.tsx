
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MessageInput from '@/components/MessageInput';
import AiResponse from '@/components/AiResponse';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/hooks/useSettings';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
  responses: {
    openai: string | null;
    anthropic: string | null;
    gemini: string | null;
  };
}

// Simulate API calls to AI providers
const simulateAiResponse = async (
  provider: 'openai' | 'anthropic' | 'gemini', 
  message: string, 
  apiKey: string | null
): Promise<string> => {
  if (!apiKey) {
    throw new Error(`No API key configured for ${provider}`);
  }
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simulate different responses based on provider
  const responses = {
    openai: `This is a simulated OpenAI response to: "${message}".\n\nIn a real implementation, this would connect to the OpenAI API using your API key.`,
    anthropic: `This is a simulated Anthropic Claude response to: "${message}".\n\nIn a real implementation, this would connect to the Anthropic API using your API key.`,
    gemini: `This is a simulated Google Gemini response to: "${message}".\n\nIn a real implementation, this would connect to the Google Gemini API using your API key.`
  };
  
  // 10% chance of a simulated API error for realism
  if (Math.random() < 0.1) {
    throw new Error(`${provider} API error: Could not process request`);
  }
  
  return responses[provider];
};

const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { settings } = useSettings();
  
  const [responseStatus, setResponseStatus] = useState({
    openai: { loading: false, error: null as string | null },
    anthropic: { loading: false, error: null as string | null },
    gemini: { loading: false, error: null as string | null }
  });

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: Date.now(),
      responses: {
        openai: null,
        anthropic: null,
        gemini: null
      }
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Start all requests in parallel
    const providers: Array<'openai' | 'anthropic' | 'gemini'> = ['openai', 'anthropic', 'gemini'];
    
    setLoading(true);
    providers.forEach(provider => {
      setResponseStatus(prev => ({
        ...prev,
        [provider]: { loading: true, error: null }
      }));
      
      simulateAiResponse(provider, content, settings?.[`${provider}ApiKey`] || null)
        .then(response => {
          setMessages(prev => {
            const updated = [...prev];
            const messageIndex = updated.findIndex(msg => msg.id === newMessage.id);
            if (messageIndex !== -1) {
              updated[messageIndex].responses[provider] = response;
            }
            return updated;
          });
          
          setResponseStatus(prev => ({
            ...prev,
            [provider]: { loading: false, error: null }
          }));
        })
        .catch(error => {
          console.error(`Error from ${provider}:`, error);
          toast.error(`${provider} error: ${error.message}`);
          
          setResponseStatus(prev => ({
            ...prev,
            [provider]: { loading: false, error: error.message }
          }));
        })
        .finally(() => {
          // Check if all responses are complete
          setLoading(prev => {
            const allComplete = providers.every(
              p => !responseStatus[p].loading
            );
            return allComplete ? false : prev;
          });
        });
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md px-4">
              <h1 className="text-2xl font-bold">Prompt Nexus</h1>
              <p className="text-muted-foreground">
                Compare responses from OpenAI, Anthropic, and Google Gemini side by side.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {/* User message */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="font-medium mb-1">You</div>
                      <div>{message.content}</div>
                    </CardContent>
                  </Card>
                  
                  {/* AI responses */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <AiResponse
                      provider="openai"
                      response={message.responses.openai}
                      isLoading={responseStatus.openai.loading}
                      error={responseStatus.openai.error}
                    />
                    <AiResponse
                      provider="anthropic"
                      response={message.responses.anthropic}
                      isLoading={responseStatus.anthropic.loading}
                      error={responseStatus.anthropic.error}
                    />
                    <AiResponse
                      provider="gemini"
                      response={message.responses.gemini}
                      isLoading={responseStatus.gemini.loading}
                      error={responseStatus.gemini.error}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} isLoading={loading} />
    </div>
  );
};

export default ChatPage;
