<script setup lang="ts">
  import { useNetworkInformation } from '@elonehoo/pistachio'

  const networkInformation = useNetworkInformation()
</script>

<template>
  <div>
    <h3>Network information</h3>

    <p>
      supported: <b>{{ networkInformation.supported }}</b>
    </p>
    <p>
      downlink: <b>{{ networkInformation.downlink }}</b>
    </p>
    <p>
      downlinkMax: <b>{{ networkInformation.downlinkMax }}</b>
    </p>
    <p>
      effectiveType: <b>{{ networkInformation.effectiveType }}</b>
    </p>
    <p>
      round-trip time: <b>{{ networkInformation.rtt }}</b>
    </p>
    <p>
      saveData: <b>{{ networkInformation.saveData }}</b>
    </p>
    <p>
      type: <b>{{ networkInformation.type }}</b>
    </p>
  </div>
</template>
