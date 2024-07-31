<script setup lang="ts">
  const route = useRoute()

</script>

<template>
  <UContainer>
    {{ route.params.id }}
  </UContainer>
</template>