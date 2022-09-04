<script setup lang="ts">
import { useCssVariables } from '@elonehoo/pistachio'
import { ref, defineComponent } from 'vue'

const textDiv = ref(null);

const { supported, stop, resume, observing, foreground } = useCssVariables(
  {
    foreground: {
      name: "color-foreground",
      value: "red"
    }
  },
  textDiv
);
</script>

<template>
  <div>
    <div>
      <label for="foreground-value">
        Override the value for
        <code>--color-foreground</code>:
      </label>
      <input type="text" id="foreground-value" v-model="foreground" />
    </div>

    <div ref="textDiv" class="text" style="color: var(--color-foreground)">
      <span v-if="observing">I am a text with the following color:</span>
      <span v-else>My color will be updated but not my label:</span>
      {{ foreground }}
    </div>

    <div>
      <button type="button" @click="stop" :disabled="!observing">
        Stop observing
      </button>
      <button type="button" @click="resume" :disabled="observing">
        Resume observing
      </button>
    </div>
  </div>
</template>

<style scoped>
div > div {
  margin-top: 15px;
}

.text {
  margin: 15px 0;
}
</style>
