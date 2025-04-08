
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  openaiApiKey: string;
  anthropicApiKey: string;
  geminiApiKey: string;
}

interface SettingsContextType {
  settings: Settings | null;
  saveSettings: (settings: Settings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    // Load settings from localStorage on component mount
    const savedSettings = localStorage.getItem('prompt-nexus-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to parse settings:', error);
      }
    }
  }, []);

  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('prompt-nexus-settings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
