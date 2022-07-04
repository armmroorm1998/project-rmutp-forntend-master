<template>
  <loading v-if="LoadingSubmit === false" />
</template>

<script>
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
import { mapActions, mapGetters } from 'vuex';
export default {
  name:'UserFood',
  data() {
    return {
      Details: Object,
      LoadingSubmit : false
    }
  },
  mounted(){
    this.getBoard();
  },
  computed:{
     ...mapGetters({userId:'user/userId',adminId:'user/adminId'})
  },
  methods: {
    ...mapActions({getDetailFood: 'food/getDetailFood',}),
    getBoard() {
      const boardID =  '1'
      foodService.fetchGetCategoryMenu({categoryId : boardID,  userId: this.userId, adminId:'0'}).then(resp => {
        this.Details = resp.data
        this.getDetailFood(this.Details)
        this.LoadingSubmit = true
        this.$router.push('/community/menu')
      })
    }
  }
}
</script>