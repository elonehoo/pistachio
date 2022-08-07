<template>
  <div ref="elref" id="elref">
    Mouse
    <p>x: {{ state.x }}</p>
    <p>y: {{ state.y }}</p>

    <button @click="remove">remove</button>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from "vue";
import { useEvent } from "@elonehoo/vue-hooks"

const elref = ref<any>(null);
const state = reactive({
  x: 0,
  y: 0
});
const remove = useEvent(elref, "mousemove", (e) => {
  state.x = e.x;
  state.y = e.y;
});
</script>

<style></style>
