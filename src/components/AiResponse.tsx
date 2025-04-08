
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IconOpenAI } from './icons/IconOpenAI';
import { IconAnthropic } from './icons/IconAnthropic';
import { IconGemini } from './icons/IconGemini';
import { Skeleton } from '@/components/ui/skeleton';

type AiProvider = 'openai' | 'anthropic' | 'gemini';

interface AiResponseProps {
  provider: AiProvider;
  response: string | null;
  isLoading: boolean;
  error?: string;
}

const ProviderIcons: Record<AiProvider, React.ReactNode> = {
  openai: <IconOpenAI className="h-5 w-5" />,
  anthropic: <IconAnthropic className="h-5 w-5" />,
  gemini: <IconGemini className="h-5 w-5" />
};

const ProviderNames: Record<AiProvider, string> = {
  openai: 'OpenAI GPT',
  anthropic: 'Anthropic Claude',
  gemini: 'Google Gemini'
};

const ProviderColors: Record<AiProvider, string> = {
  openai: 'text-[#10a37f] border-[#10a37f]',
  anthropic: 'text-[#b300ff] border-[#b300ff]',
  gemini: 'text-[#1a73e8] border-[#1a73e8]'
};

const AiResponse: React.FC<AiResponseProps> = ({ provider, response, isLoading, error }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className={`flex flex-row gap-2 items-center border-b pb-3 ${ProviderColors[provider]} border-opacity-20`}>
        {ProviderIcons[provider]}
        <span className="font-medium">{ProviderNames[provider]}</span>
      </CardHeader>
      <CardContent className="py-4 flex-1 overflow-auto">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        ) : error ? (
          <div className="text-destructive text-sm">{error}</div>
        ) : response ? (
          <div className="whitespace-pre-wrap text-sm">{response}</div>
        ) : (
          <div className="text-muted-foreground text-sm italic">No response yet</div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiResponse;
