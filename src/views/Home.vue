<template>
  <div class="home">  
   <race></race>
  </div>
</template>

<script>
// @ is an alias to /src
import race from '@/components/race.vue'

export default {
  name: 'Home',
  components: {
    race
  }
}
</script>
