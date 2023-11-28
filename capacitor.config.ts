import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rapid.sports',
  appName: 'rapid-cap-app',
  webDir: 'dist/rapid-cap-app/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
