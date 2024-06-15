//If the user does not have a token, we send it to login

export default defineNuxtRouteMiddleware((to) => {
const { $pb } = useNuxtApp()

  if (to.meta.layout == 'auth') {
    if ($pb.authStore.isValid) {
      return navigateTo("/");
    }
  }
  else{
    if (!$pb.authStore.isValid) {
      return navigateTo("/login");
    }
  }
})