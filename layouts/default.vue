<template>
  <div class="flex flex-col">
    <Header />
      <UContainer as="main" class="overflow-y-auto p-4">
        <slot />
      </UContainer>
  </div >
</template>