// plugins/pocketbase.js
import PocketBase from 'pocketbase';

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const userStore = useUserStore();
  // const pb = new PocketBase('https://tickets.gana-loterias.online');
  const pb = new PocketBase('http://localhost:8090');

  pb.authStore.onChange((_token, model) => {
    userStore.login(model);
  },true)

  return {
    provide: { pb }
  }
});