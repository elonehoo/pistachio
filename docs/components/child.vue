<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'

const props = defineProps(['value'])

function useModel(props:any, name:any) {
  const instance = getCurrentInstance();
  if (!instance) {
    return ref();
  }
  return computed({
    get() {
      return props[name];
    },
    set(v) {
      instance.emit(`update:${name}`, v);
    }
  });
}

const value = useModel(props,"value")

</script>

<template>
  <div>
    <label>Update value:</label>
    <input name="child-input" v-model="value">
  </div>
</template>
