<template>
  <div class='col-12'>
    <databaseSelect
    :databases='databases'
    :models='model.databases'
    :model='model'
    ref="db"
    />
  </div>
</template>

<script>
  import databaseSelect from '@/components/database/databaseSelect'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        databases: 'food/getData'
      })
    },
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    components: {
      databaseSelect
    },
    methods: {
      formValidate() {
        return this.$refs.db.formValidate()
      }
    }
  }
</script>

<style lang='css'>
</style>
