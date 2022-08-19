<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'

const props = defineProps(['value'])

function useModel(props: any, name: any) {
  const instance = getCurrentInstance()
  if (!instance)
    return ref()

  return computed({
    get() {
      return props[name]
    },
    set(v) {
      instance.emit(`update:${name}`, v)
    },
  })
}

const value = useModel(props, 'value')

</script>

<template>
  <div>
    <label>Update value</label>
    <input v-model="value" name="child-input">
  </div>
</template>
