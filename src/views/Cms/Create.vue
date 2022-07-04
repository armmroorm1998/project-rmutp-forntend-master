<template>
  <div class="animated fadeIn">
    <div class="content">
      <api-form :model="model"  />
    </div>
  </div>
</template>

<script>
  import ApiForm from './Form'
  export default {
    components: {
      ApiForm
    },
    data() {
      return {
        model: {
          id:'001',
          menuId: '',
          ingredients: [],
          menuName: '',
          methods:'',
          name: 'วัตถุดิบ',
          point: 0,
          userId: '',
          adminId: '',
          categoryId:'',
          databases: [{id: "001",name: "วัตถุดิบ"}]
        }
      }
    }
  }
</script>

<style lang="css">
</style>
