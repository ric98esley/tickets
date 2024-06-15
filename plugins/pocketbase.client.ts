// plugins/pocketbase.js
import PocketBase from 'pocketbase';

export default defineNuxtPlugin(async () => {
  const pb = new PocketBase('https://pocketbase-production-1cf2.up.railway.app');

  return {
    provide: { pb }
  }
});