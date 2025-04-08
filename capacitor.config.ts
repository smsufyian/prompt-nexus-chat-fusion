
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.719d92cc41184d7eabbeb8dbe1b8b508',
  appName: 'Prompt Nexus',
  webDir: 'dist',
  server: {
    url: 'https://719d92cc-4118-4d7e-abbe-b8dbe1b8b508.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
