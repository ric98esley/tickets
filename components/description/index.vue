<script setup lang="ts">

const props = defineProps({
  data: {
    type: Array as PropType<DescriptionItem[]>,
    default: () => [
      {
        icon: 'i-heroicons-information-circle-20-solid',
        title: 'Title',
        data: 'Data'
      },
      {
        title: 'very large Title',
        data: 'Data'
      },
      {
        icon: 'i-heroicons-information-circle-20-solid',
        title: 'Title',
        data: 'Data'
      }
    ]
  },
})
</script>

<template>
  <div class="columns-1 md:columns-2">
    <DescriptionItem v-for="item, index in props.data" :key="`${index}-${item.title}`" :icon="item.icon" :title="item.title" :data="item.data" />
  </div>
</template>