<script setup lang="ts">
const route = useRoute()

const colorMode = useColorMode()

const isOpen = ref(false)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const links = reactive([{
  label: 'Profile',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  badge: 100,
  click: () => isOpen.value = false
}, {
  label: 'Nuevos',
  icon: 'i-heroicons-home',
  to: '/',
  click: () => isOpen.value = false
}, {
  label: 'Horizontal Navigation',
  icon: 'i-heroicons-chart-bar',
  to: `/`,
  click: () => isOpen.value = false
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  to: '/',
  click: () => isOpen.value = false
}])

</script>

<template>
  <header class="flex-col min-h-12">
    <div class="flex justify-between border-b border-gray-200 dark:border-gray-800 min-h-12">
      <UButton icon="i-heroicons-bars-3-16-solid" class="sm:hidden" size="sm" color="primary" square variant="link" @click="isOpen = true"/>
      <UHorizontalNavigation :links="links" class="hidden md:flex" />
      <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
        aria-label="Theme" @click="isDark = !isDark" />
    </div>
    <USlideover v-model="isOpen" side="left">
      <UCard class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between overflow-y-auto">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Menu
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
          </div>
        </template>
        <UVerticalNavigation :links="links" class="w-full md:hidden" :ui="{
          label: 'truncate relative text-gray-900 dark:text-white flex-initial w-32 text-left'
        }" />
      </UCard>
    </USlideover>
  </header>
</template>
