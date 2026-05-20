import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.balshiksha.app',
  appName: 'BalShiksha',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
