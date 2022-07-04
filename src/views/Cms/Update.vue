<template lang="html">
  <div>
    <div class="content" v-if="model">
      <api-form :model="model"/>
    </div>
  </div>
</template>

<script>
  import ApiForm from './Form'
  import { mapGetters} from 'vuex';
  export default {
    components: {
      ApiForm
    },
    computed:{
    ...mapGetters({getDataUpdate:'food/getDataUpdate'})
    },
    data() {
      return {
        model: null,
      }
    },
    mounted() {
      this.load()
    },
    methods: {
      load() {
        this.model = this.getDataUpdate
      }
    }
  }
</script>

<style lang="css">
</style>
