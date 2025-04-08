
import React from 'react';
import { PlusCircle, Settings, MessageSquare } from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarTrigger, 
  SidebarFooter 
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatSidebar = () => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState<{id: string, title: string}[]>([
    { id: '1', title: 'New chat' },
  ]);

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    setChatHistory([...chatHistory, { id: newChatId, title: 'New chat' }]);
    navigate(`/chat/${newChatId}`);
  };

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="p-4 flex flex-row items-center justify-between">
        <div className="font-semibold text-lg bg-clip-text text-transparent bg-ai-gradient">
          Prompt Nexus
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <Separator />
      
      <SidebarContent className="p-0">
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={createNewChat}
          >
            <PlusCircle size={16} />
            New Chat
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-12rem)] px-4">
          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start gap-2 text-sm"
                onClick={() => navigate(`/chat/${chat.id}`)}
              >
                <MessageSquare size={16} />
                {chat.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2"
          onClick={() => navigate('/settings')}
        >
          <Settings size={16} />
          Settings
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatSidebar;
