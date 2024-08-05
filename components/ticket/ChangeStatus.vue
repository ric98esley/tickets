<script lang="ts" setup>
import type { Status } from "~/types";

const modal = useModal()

const user = useUserStore();

const props = defineProps({
  status: {
    type: String,
  },
  ticket: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["submit", "close", "update:modelValue"]);

const state = ref({
  status: props.status || "",
});

const status = ref<Status | undefined>(undefined);

const changeTicketStatus = async (id: string, status: Status) => {
  if (!id) return
  const ticket = await useUpdateTicket(id, { status: status.id })
  const thread = await useCreateThread({
    ticket: id,
    content: `El usuario ${user.user?.username} ha cambiado el estatus del ticket ha a ${status.name}`,
  })
  return ticket
}

const handleSubmit = async () => {
  if (!status.value) return
  await changeTicketStatus(props.ticket, status.value);
  emit("submit", status.value);
  emit("close");
};


</script>
<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h3>Cambiar estatus</h3>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <UForm :state="state" class="space-y-4">
        <UFormGroup name="status" label="Status">
          <StatusSelect v-model="state.status" @handle-select="(value) => status = value" />
        </UFormGroup>
        <UButton @click="handleSubmit">Guardar</UButton>
      </UForm>
    </UCard>
  </UModal>
</template>