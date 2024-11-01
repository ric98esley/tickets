<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { Route, RouteCreate } from '~/types';

const props = defineProps({
  form: {
    type: Object as PropType<RouteCreate>,
    default: () => ({ name: '', assignedTo: '', started: '', zone: '' })
  }
})

const validate = (data: RouteCreate) => {
  const errors = []
  if (!data.assignedTo) {
    errors.push({ path: 'assignedTo', message: 'El nombre del conductor es requerido' })
  }
  if (!data.started) {
    errors.push({ path: 'started', message: 'La fecha de inicio es requerida' })
  }
  if (!data.zone) {
    errors.push({ path: 'zone', message: 'La zona es requerida' })
  }
  return errors
}

const form = ref<RouteCreate>({
  zone: props.form.zone ?? '',
  assignedTo: props.form.assignedTo ?? '',
  started: props.form.started,
  tickets: []
})

const emit = defineEmits({
  submit: (data: RouteCreate) => true
})

const onSubmit = (event: FormSubmitEvent<RouteCreate>) => {
  if (validate(event.data).length) return;
  emit('submit', event.data)
}
</script>

<template>
  <UForm :state="form" class="space-y-4" :validate="validate" @submit="onSubmit">
    <UFormGroup label="Asignar a" name="assignedTo">
      <UserSelect v-model="form.assignedTo" />
    </UFormGroup>
    <UFormGroup label="Zona" name="zone">
      <ZoneSelect v-model="form.zone" />
    </UFormGroup>
    <UFormGroup label="Fecha inicio" name="started">
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid" color="gray" :label="dateFormatted(form?.started)"
          variant="ghost" />
        <template #panel="{ close }">
          <DatePicker v-model="form.started" is-required @close="close" />
        </template>
      </UPopover>
    </UFormGroup>
    <UButton type="submit">
      Guardar
    </UButton>
  </UForm>
</template>