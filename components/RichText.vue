<template>
  <div>
    <div v-if="editor">
      <TiptapBubbleMenu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
        <div class="flex">
          <UButton @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }">
            Negrita
          </UButton>
          <UButton @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }">
            Cursiva
          </UButton>
          <UButton @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }">
            codigo
          </UButton>
          <UButton @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            Titulo
          </UButton>
          <UButton @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }">
            Lista
          </UButton>
          <UButton @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }">
            Lista ordenada
          </UButton>
        </div>
      </TiptapBubbleMenu>
    </div>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});
const editor = useEditor({
  content: props.modelValue,
  extensions: [TiptapStarterKit],
  editorProps: {
    attributes: {
      class:
        "placeholder-gray-400 dark:placeholder-gray-500 h-48 relative block disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 rounded-md placeholder-gray-400 dark:placeholder-gray-500 shadow-sm bg-transparent ring-1 ring-inset ring-primary-500 dark:ring-primary-400 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 prose prose-sm neutral sm:prose-base lg:prose-lg xl:pro dark:prose-invert overflow-y-auto p-2"
    }
  },
});



onBeforeUnmount(() => {
  if (editor) {
    const editorRef = unref(editor);
    if (editorRef) {
      editorRef.destroy();
    }
  }
});
</script>
