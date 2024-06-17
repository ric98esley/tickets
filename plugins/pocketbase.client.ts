// plugins/pocketbase.js
import PocketBase from 'pocketbase';

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();
  const pb = new PocketBase('https://pocketbase-production-1cf2.up.railway.app');

  pb.authStore.onChange((_token, model) => {
    userStore.login(model);
  },true)

  return {
    provide: { pb }
  }
});