<script setup lang="ts">
import { useLanguage } from '@elonehoo/pistachio'

const { language, languages } = useLanguage()
</script>

<template>
  <div>
    <h3>
      Language: <b>{{ language }}</b>
    </h3>
    <div>
      <h4>Preferred Languages</h4>
      <ul>
        <li v-for="l in languages" :key="l">
          {{ l }}
        </li>
      </ul>
    </div>
  </div>
</template>
