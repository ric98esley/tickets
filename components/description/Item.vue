<script setup lang="ts">

const props = defineProps({
  icon: {
    type: String,
    default: 'i-heroicons-information-circle-20-solid'
  },
  title: {
    type: String,
    default: 'Title'
  },
  data: {
    type: String,
    default: 'Data'
  }
})
</script>
<template>
  <div class="flex">
    <div v-if="props.icon" class="basis-1/8 m-2">
      <UIcon :name="props.icon" />
    </div>
    <div class="basis-1/2 font-bold m-2">
      {{ props.title }}
    </div>
    <div class="basis-1/16 font-bold m-2">
      :
    </div>
    <div class="basis-9/12 m-2">
      {{ props.data }}
    </div>
  </div>
</template>