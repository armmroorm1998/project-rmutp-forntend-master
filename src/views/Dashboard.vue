<template>
  <div class="animated fadeIn">
  <loading v-if="LoadingSubmit === false" />
  <div v-if="LoadingSubmit === true">
    <Gallery :images="images"></Gallery>
    <card :detailFood="detailFood" />
  </div>
  </div>
</template>
<script>
import Gallery from "vue-cover-gallery"
import { mapActions } from 'vuex';
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
import card from '@/components/componentsFood/card'
export default {
  name: "dashboard",
  data() {
    return {
      detailFood: Object,
      images: [],
      DataDashboard:[],
      rating: 0,
      LoadingSubmit : false
    };
  },
  components:{
    Gallery,
    card
  },
  mounted: function() {
    this.getFetchGetTopMenu();
    // if (this.detailFood) {
    //   for(var i = 0;i < this.detailFood.length; i++){
    //     if (i === 9) { break; }
    //     this.DataDashboard.push(this.detailFood[i])
    //   }
    // }
  },
  computed: {
    // ...mapGetters({ detailFood: 'food/detailFood'}),
    // filteredCardFood() {
    //   let text = this.search.trim().toLowerCase()
    //   return this.detailFood.filter(index => {
    //     return index.menuName.toLowerCase().includes(text)
    //   });
    // },
  },
  methods: {
    ...mapActions({setDetailFood: 'food/setDetailFood',getDetailFood: 'food/getDetailFood',}),
    getID(detailFood) {
      let foodID = detailFood.id
      let categoryIdFood = detailFood.categoryId
      foodService.fetchGetDetailFood({ id:foodID, categoryId:categoryIdFood }).then( resp => {
        let DataFood = resp.data
        this.setDetailFood(DataFood)
        this.$router.push('/details')
      }).catch(err => {
          alert(err)
        })
    },
    filterTopMenu(){
      if (this.detailFood) {
      for(var i = 0;i < this.detailFood.length; i++){
        if (i === 9) { break; }
        this.DataDashboard.push(this.detailFood[i])
      }
       this.detailFood = this.DataDashboard
    }
    },
    add(){
      for (var i = 0; i < this.detailFood.length; i++) {
        if (i === 9) { break; }
        if(this.detailFood[i].imgPath !== null){
          this.images.push({href: this.detailFood[i].imgPath[0].href})
        }
        else {
          break;
        } 
      } 
      this.LoadingSubmit = true
    },
    getFetchGetTopMenu(){
      foodService.fetchGetTopMenu({token : 'token'}).then(res => {
        this.detailFood = res.data
        this.filterTopMenu();
        this.add();
      }).catch(err => {
          alert(err)
        })
    }
  }
};
</script>
<style lang="scss">
.img-fluid {
  height: 610px;
}
.divfixed {
  width: 900px;
  text-align: center;
  margin: auto;
}
@media only screen and (max-width: 768px) {
  .img-fluid {
    height: auto;
  }
  .divfixed{
    width: 100% !important;
  }
}
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

