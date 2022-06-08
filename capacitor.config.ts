import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'air.testing',
  appName: 'brotherskeptsecret',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 4000
    }
  }
};

export default config;
