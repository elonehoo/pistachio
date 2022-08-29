<script setup lang="ts">
import { ref } from 'vue'
import { useFormat } from '@elonehoo/pistachio'

const inputFormat = ref('{0} {1}')
const args = ref([ref('hello'), ref('world')])
const format = useFormat(inputFormat, args)
const add = () => args.value.push(ref(`{${args.value.length}}`))
const remove = (index: number) => args.value.splice(index, 1)
const onChange = (ev: any, index: number) => {
  args.value[index].value = ev.target.value
}
</script>

<template>
  <div id="format">
    <div>
      <h4>Format example</h4>
      <div>
        Format:
        <input v-model="inputFormat">
      </div>

      <ul>
        <li v-for="(a, i) in args" :key="i">
          <input v-model="a.value" @input="onChange($event, i)">
          <button title="remove" @click="remove(i)">
            x
          </button>
        </li>

        <li>
          <button @click="add">
            add +
          </button>
        </li>
      </ul>
    </div>

    <p>
      <b>{{ format }}</b>
    </p>
  </div>
</template>
