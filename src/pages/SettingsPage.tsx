
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IconOpenAI } from '@/components/icons/IconOpenAI';
import { IconAnthropic } from '@/components/icons/IconAnthropic';
import { IconGemini } from '@/components/icons/IconGemini';
import { useSettings } from '@/hooks/useSettings';
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const { settings, saveSettings } = useSettings();
  const [formState, setFormState] = React.useState({
    openaiApiKey: settings?.openaiApiKey || '',
    anthropicApiKey: settings?.anthropicApiKey || '',
    geminiApiKey: settings?.geminiApiKey || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    saveSettings(formState);
    toast.success('Settings saved successfully');
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Enter your API keys for each provider to enable AI responses.
            These keys are stored locally on your device and are never sent to our servers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IconOpenAI className="h-5 w-5 text-[#10a37f]" />
              <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
            </div>
            <Input
              id="openaiApiKey"
              name="openaiApiKey"
              type="password"
              placeholder="sk-..."
              value={formState.openaiApiKey}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">
              Get your OpenAI API key from{" "}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary underline"
              >
                platform.openai.com/api-keys
              </a>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IconAnthropic className="h-5 w-5 text-[#b300ff]" />
              <Label htmlFor="anthropicApiKey">Anthropic API Key</Label>
            </div>
            <Input
              id="anthropicApiKey"
              name="anthropicApiKey"
              type="password"
              placeholder="sk-ant-..."
              value={formState.anthropicApiKey}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">
              Get your Anthropic API key from{" "}
              <a 
                href="https://console.anthropic.com/keys" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary underline"
              >
                console.anthropic.com/keys
              </a>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IconGemini className="h-5 w-5 text-[#1a73e8]" />
              <Label htmlFor="geminiApiKey">Google Gemini API Key</Label>
            </div>
            <Input
              id="geminiApiKey"
              name="geminiApiKey"
              type="password"
              placeholder="AIza..."
              value={formState.geminiApiKey}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">
              Get your Google AI Gemini API key from{" "}
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary underline"
              >
                makersuite.google.com/app/apikey
              </a>
            </p>
          </div>

          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Prompt Nexus</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Prompt Nexus is a desktop application that allows you to compare responses from different AI providers. 
            This application is for educational purposes, and all API requests are made directly from your device to the respective providers.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Version 1.0.0
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
