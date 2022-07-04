<template>
  <div class="animated fadeIn row">
     <loading v-if="LoadingSubmit === false" />
    <div v-for="(item, index) in items" :key="index" class="col-sm-3 text-center"  v-if="LoadingSubmit === true">
        <b-img :src="item.img"  alt="Responsive image" style="cursor: pointer;" class="typeBlock" @click="getBoard(items,index)"> </b-img>
        <h3>
            <b-card-text style="margin : 20px;">{{item.message}}</b-card-text>
        </h3>
    </div>
  </div>
</template>

<script>
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
import { mapActions, mapGetters } from 'vuex';
export default {
  name:'type',
  data() {
    return {
      LoadingSubmit : true,
      items: [
      { message: 'อาหารเรียกน้ำย่อย', title: '1',img: 'img/typeFood/Appetizers.png'},
      { message: 'สลัด/ยำ', title: '2',img: 'img/typeFood/salad.png'},
      { message: 'อาหารทอด/ผัด', title: '3',img: 'img/typeFood/FriedFood.png'},
      { message: 'อาหารประเภทเส้น', title:'4',img: 'img/typeFood/Noodle.png'},
      { message: 'อาหารนึ่ง/ต้ม', title: '5',img: 'img/typeFood/Boiled.png'},
      { message: 'อาหารจานด่วน/เดียว', title: '6',img: 'img/typeFood/onedishmeal.png'},
      { message: 'ซุป', title: '7',img: 'img/typeFood/soup.png'},
      { message: 'อาหารประเภทแกง', title: '8',img: 'img/typeFood/Curry.png'},
      // { message: 'ของหวาน', title: '9',img: 'img/typeFood/desserts.png'},
      // { message: 'เครื่องดื่ม', title: '10',img: 'img/typeFood/beverage.png'},
      // { message: 'ซอส/เครื่องจิ้ม', title: '11',img: 'img/typeFood/Sauce.png'}
      ],
      Details: Object
    }
  },
  computed:{
    ...mapGetters({userId:'user/userId',adminId:'user/adminId'})
  },
  methods: {
    ...mapActions({ getDetailFood: 'food/getDetailFood' }),
    getBoard(items,index) {
      const boardID =  items[index].title;
      this.LoadingSubmit = false;
      foodService.fetchGetCategoryMenu({categoryId : boardID, userId: '0', adminId:'1' }).then(resp => {
        this.Details = resp.data
        this.getDetailFood(this.Details)
        this.LoadingSubmit = true;
        this.$router.push('/menu')
      })
    }
  }
}
</script>
  
<style lang="scss">
.typeBlock:hover .animate-text {
  transform: translateX(0);
  opacity: 1;
}
.typeBlock:hover {
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