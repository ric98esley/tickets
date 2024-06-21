export default defineNuxtRouteMiddleware((to) => {
  function isJSONValid(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  console.log('chatwoot-dashboard-app:fetch-info')
  window.parent.postMessage('chatwoot-dashboard-app:fetch-info', '*')

  window.addEventListener("message", function (event) {
    if (!isJSONValid(event.data)) {
      return;
    }

    const eventData = JSON.parse(event.data);

    console.log(eventData);
  })
})