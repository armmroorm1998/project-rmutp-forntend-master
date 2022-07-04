<template>
 <div class="animated fadeIn row">
    <div class="input-group input-group-lg my-3">
      <div class="input-group-prepend"> <span class="input-group-text"> <i class="icon-magnifier"></i> </span></div>
      <input type="text" id="search" class="form-control" v-model="search" placeholder="ค้นหาเมนูอาหาร" aria-label="Search" autocomplete="on" />
    </div>
    <div v-for="(detailFood, index) in filteredCardFood" :key="index" class="col-sm-4">
      <!-- <img :src="this.avatarDefault"  border-radius  height="40" class="mr-2 rounded-circle" alt="admin@bootstrapmaster.com" /> -->
      <img v-if="detailFood.userdata[0].avatar !== ''" :src="detailFood.userdata[0].avatar" border-radius height="40" class="mr-2 rounded-circle" alt="admin@bootstrapmaster.com" />
      <img v-else src="img/avatars/user.png" border-radius height="40" class="mr-2 rounded-circle" alt="admin@bootstrapmaster.com" />
      <span class="text-black"> <i class="fa fa-user" /> Name : {{detailFood.userdata[0].firstname}}</span>
      <a @click="getID(detailFood)"> <h2 style="line-height:1.2em;color: #000000;cursor: pointer;">{{detailFood.menuName}}</h2></a>
      <span style=" font-size:15px;">วันที่สร้างเมนู : {{detailFood.createdDate}}</span>
        <b-card
          v-if="detailFood.imgPath !== null"
          overlay
          :title="detailFood.menuName"
          img-alt="Card Image"
          :img-src="detailFood.imgPath[0].href"
          text-variant="white"
          style="max-width: 30rem;"
          @click="getID(detailFood)"
          align="center"
          class="imgbg shadow-lg blockMenu"
        >
          <h3 class="animate-text text-animate">
            <b-card-text>ดูรายละเอียดเมนูอาหาร</b-card-text>
          </h3>
        </b-card>
        <b-card
          v-else
          overlay
          :title="detailFood.menuName"
          img-alt="Card Image"
          text-variant="white"
          style="max-width: 30rem;"
          @click="getID(detailFood)"
          align="center"
          class="imgbg shadow-lg blockMenu"
        >
          <h3 class="animate-text text-animate">
            <b-card-text>ดูรายละเอียดเมนูอาหาร</b-card-text>
          </h3>
        </b-card>
        
        <div  v-if="detailFood !== null">
          <div>
            <star-rating :increment="0.1" inactive-color="#17202A" :read-only="true" :star-size="35"  active-color="#ffff66" :border-width="1" :rating="detailFood.point "></star-rating>
          </div>
        </div>
        <div v-if="detailFood == null">
          <star-rating :increment="0.1" inactive-color="#17202A" :read-only="true" :star-size="35"  active-color="#ffff66" :border-width="1" :rating="rating"></star-rating>
        </div>

        <buttons :model="detailFood" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
import StarRating from 'vue-star-rating'
import buttons from '@/components/componentsFood/button'
export default {
  name: 'Menu',
  data() {
    return {
      rating: 0,
      search: '',
      avatarDefault:'img/avatars/user.png'
    }
  },
  computed: {
    ...mapGetters({ detailFood: 'food/detailFood' , urlAvatar: "user/urlAvatar"}),
    filteredCardFood() {
      let text = this.search.trim().toLowerCase()
      return this.detailFood.filter(index => {
        return index.menuName.toLowerCase().includes(text)
      });
    },
  },
   methods:{
    ...mapActions({setDetailFood: 'food/setDetailFood',}),
    getID(detailFood){
      let foodID = detailFood.id
      let categoryIdFood = detailFood.categoryId
      foodService.fetchGetDetailFood({ id:foodID, categoryId:categoryIdFood }).then( resp => {
        let DataFood = resp.data
        this.setDetailFood(DataFood)
        this.$router.push('/details')
      })
    }
  },
  components:{
    buttons,
    StarRating
  }
}
</script>

<style lang="scss">
.imgbg {
  border: none;
  width: 100%;
  height: 180px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  color: white;
  text-shadow: 2px 2px 4px #000000;
  background: linear-gradient(40deg, #ff9966, #ff6666, #cc66cc) !important;
}
.card-img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
.text-animate {
  font-weight: 100;
  font-style: italic;
  transform: translateX(200px);
}
.animate-text {
  opacity: 0;
  transition: all 0.6s ease-in-out;
}
.blockMenu:hover .animate-text {
  transform: translateX(0);
  opacity: 1;
}
.blockMenu:hover {
  z-index: 100;
  -webkit-animation: scale 0.3s linear;
  -moz-animation: scale 0.3s linear;
  animation: scale 0.3s linear;
  transform-origin: 50% 50%;
  animation-fill-mode: forwards;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
    -webkit-box-shadow: 10px 10px 60px 10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 10px 10px 60px 10px rgba(0, 0, 0, 0.1);
    box-shadow: 10px 10px 60px 10px rgba(0, 0, 0, 0.1);
  }
}

@keyframes scaledown {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>