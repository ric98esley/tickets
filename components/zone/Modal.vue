<script lang="ts" setup>
import type { Zone, ZoneCreate } from '~/types/zones';


const props = defineProps({
  data: {
    type: Object as PropType<Zone>,
    required: true,
  }
});
const emit = defineEmits(['submit']);

const modal = useModal();

const handlerSubmit = (data: ZoneCreate) => {
  emit('submit', data);
  console.log(data);
  modal.close();
};

</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="text-lg font-semibold flex justify-between">
          <h2>Zonas</h2>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <ZoneForm :form="props.data" @submit="handlerSubmit" />
    </UCard>
  </UModal>
</template>