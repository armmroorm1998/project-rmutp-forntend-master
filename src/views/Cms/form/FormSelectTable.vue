<template lang='html'>
  <div class='col-12'>
    <table-selector
      :databases='databases'
      :selected='model.databases'
      :models='model.ingredients'
      ref="tables"
    />
  </div>
</template>

<script>
  import TableSelector from '@/components/database/TableSelector'
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
      },
    },
    components: {
      TableSelector
    },
    methods: {
      formValidate() {
        return this.$refs.tables.formValidate()
      }
    }
  }

</script>

<style lang='css'>
</style>
