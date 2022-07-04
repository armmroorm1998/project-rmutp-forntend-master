<template>
  <div class="container animated fadeIn">
    <div class="card cardposittion border-0">
      <!-- Meta Info Section -->
      <div class="col-md-12 d-md-flex align-items-md-center justify-content-md-center text-md-center">
        <div class="p-3">
          <p class="display-4 font-w900 text-white-75 mb-3">ยินดีต้อนรับสู่บ้านอาหาร</p>
          <p class="font-size-lg font-w600 text-white-75 mb-0">
            Copyright &copy;
            <span class="js-year-copy">2018</span>
          </p>
        </div>
      </div>
      <!-- END Meta Info Section -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex';
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
export default {
computed:{
  ...mapGetters({getData:'food/getData'})
},
mounted(){
    if (this.getData == null) {
      this.GetApiIngredients();
    }
  },
  methods: {
    ...mapActions({getIngredients : 'food/getIngredients'}),
    GetApiIngredients() {
      foodService.fetchGetApiIngredients().then(resp => {
        if (resp.data.status === false) {
          this.LoadingSubmit = true
        }
        else {
          var dataGetIngredients = [resp.data]
          this.getIngredients(dataGetIngredients)
          // this.LoadingSubmit = true
        }
      }).catch(err => {
          alert(err)
        })
    }
  }
};
</script>

<style lang="scss">
.cardposittion {position: absolute;
    left: 50%; /* relative to nearest positioned ancestor or body element */
    top: 50%; /*  relative to nearest positioned ancestor or body element */
    transform: translate(-50%, -50%); /* relative to element's height & width */
    background-color: rgba(255, 255, 255, 0.0);
  }
</style>
