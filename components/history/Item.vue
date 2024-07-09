<script setup lang="ts">
import type { Thread } from '~/types';

const userStore = useUserStore();

const props = defineProps<{
  message: Thread;
  followUp?: boolean;
  divider?: boolean;
  selected?: boolean;
}>();

const self = computed(() => props.message?.createdBy?.id === userStore.user?.id);

const hideAvatar = () => {
  if (props.divider && !self) {
    return false;
  } else {
    if (props.followUp) {
      return true;
    }
    if (self) {
      return true;
    }
  }
};
</script>

<template>
  <div class="xs:mb-6 md:mb-5 flex" :class="{ 'justify-end': self }">
    <!--avatar-->
    <div class="mr-4" :class="{ 'ml-[2.25rem]': props.followUp && !divider }">
      <div v-if="!hideAvatar()" :aria-label="props.message.createdBy?.username" class="outline-none">
        <div :style="{ backgroundImage: `url(${props.message.createdBy?.avatar})` }"
          class="w-[2.25rem] h-[2.25rem] bg-cover bg-center rounded-full"></div>
      </div>
    </div>

    <div class="flex flex-col items-end group max-w-[31.25rem] p-5 rounded-md transition duration-500 bg-primary-900">
      <!--content-->
      <div v-if="props.message.content" v-html="props.message.content"
        class="outline-none text-black opacity-60 dark:text-white dark:opacity-70" tabindex="0">
      </div>
      <!--date-->
      <div :class="self ? ['ml-4', 'order-1', 'content-end'] : ['mr-4', 'content-end']">
        <div class="whitespace-pre text-xs">
          <UAvatar :src="props.message.createdBy?.avatar" size="3xs"/>
          {{ props.message.createdBy?.name }} - {{ timeSince(props.message.created) }}
        </div>
      </div>
    </div>
  </div>
</template>