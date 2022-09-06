<script setup lang="ts">
import { reactive } from 'vue'
import { useShare } from '@elonehoo/pistachio'

const data = reactive({
  url: 'https://pistachio.elonehoo.xyz/',
  text: 'Built with ❤️',
  title: 'You need to use this, just amazing',
})
const { supported, share, canShare, shared, cancelled } = useShare()
</script>

<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td colspan="2">
            <p>
              Supported:
              <b>{{ supported }}</b>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <label for="title">Title</label>
          </td>
          <td>
            <input v-model="data.title" name="title">
          </td>
        </tr>
        <tr>
          <td>
            <label for="text">Text</label>
          </td>
          <td>
            <input v-model="data.text" name="text">
          </td>
        </tr>
        <tr>
          <td>
            <label for="url">URL</label>
          </td>
          <td>
            <input v-model="data.url" name="url">
          </td>
        </tr>
        <tr>
          <td>
            <p v-if="canShare(data)">
              You can share
            </p>
            <p v-else>
              Can't share
            </p>
          </td>
          <td>
            <button @click="share(data)">
              Share
            </button>
          </td>
        </tr>
        <tr>
          <td>Shared</td>
          <td>{{ shared }}</td>
        </tr>

        <tr>
          <td>Cancelled</td>
          <td>{{ cancelled }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
