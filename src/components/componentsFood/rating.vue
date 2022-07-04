<template>
  <div class="d-flex justify-content-center align-items-center m-3">
    <star-rating @rating-selected="setRating" :increment="0.1" inactive-color="#17202A"  active-color="#ffff66" :border-width="1" :rating="rating"></star-rating>
  </div>
</template>

<script>
import { mapGetters  } from 'vuex'
import StarRating from 'vue-star-rating'
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();

export default {
   computed:{
    ...mapGetters({ detailFoods:'food/detailFoods',userId:'user/userId',adminId:'user/adminId'})
  },
  props:{
    model : {
      required : true
    }
  },
  data() {
    return {
      rating: 0
    }
  },
  methods: {
    setRating: function(rating){
      this.rating = rating;
      var r = confirm("คุณต้องการให้คะแนน " + this.rating + " คะแนน สำหรับเมนูอาหารนี่ใช่หรือไม่");
      if (r == true) {
        foodService.fetchSetPoint({ id:this.detailFoods.menuId , userId:this.userId, point: this.rating }).then(() => {
          alert('ขอบคุณสำหรับการให้คะแนนรีวิวเมนูอาหาร')
        })
      } else {
        return;
      }
    }
  },
  components: {
    StarRating
  }
}
</script>