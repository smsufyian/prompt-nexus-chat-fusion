
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import ChatSidebar from './ChatSidebar';
import { Toaster } from '@/components/ui/sonner';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-zinc-50 dark:bg-zinc-900">
        <ChatSidebar />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
        <Toaster position="top-right" />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
