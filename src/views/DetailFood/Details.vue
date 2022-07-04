<template>
  <div class="animated fadeIn">
      <Gallery :ImgFood="this.detailFoods.imgPath" />
    <b-container class="bv-example-row">
        <span class="text-danger font-2xl mr-5">*ปริมาณบริโภคต่อ : จาน,ชาม,ถ้วย</span>
        <img src="img/plate1.png" alt="plate">
      <h2>{{Menu}}</h2>
      <span class="text-danger">*ปริมาณ ½ ช้อนโต๊ะ/ชา เท่ากับ 0.5, ¼ ช้อนโต๊ะ/ชา เท่ากับ 0.25, 1 ½ ช้อนโต๊ะ/ชา เท่ากับ 1.5</span> <br>
      <span class="text-danger">*ปริมาณ 1 ช้อนโต๊ะ เท่ากับ 3 ช้อนชา, 1 ถ้วย เท่ากับ 16 ช้อนโต๊ะ, ½ ถ้วย เท่ากับ 8 ช้อนโต๊ะ</span> <br>
      <span class="text-danger">*ปริมาณ 100 กรัม เท่ากับ 1 ขีด, 1000 กรัม เท่ากับ 1 กิโลกรัม</span>
      <b-row>
        <b-col> <h5>{{title}}</h5>  </b-col>
      </b-row>
      <div class="float-right">
        <span class="text-danger font-2xl ml-5">*แคลลอรี่โดยประมาณ</span>
        <Chart :menuCalories="detailFoods.menuCalories" />
      </div>
    <ul id="example-1">
        <li v-for="(item,index) in items" :key="index">
          <b-row>
            <b-col>{{ item.ingredientsName }}</b-col>  
            <b-col>{{ item.quantity }} {{item.type}}</b-col>
          </b-row>
        </li>
    </ul>
    </b-container>
    <b-container class="bv-example-row">
      <h5>วิธีทำ{{Menu}}</h5>
      <div id="app">
        <!-- <show-detail-food /> -->
        <component :is="{template:templateString}"/>
      </div>
      <!-- <ul id="example-2">
        <li v-for="(howTos,index) in howTo" :key="index">
          <b-row>
            <b-col>{{index + 1 + '. '}} {{howTos.messageHowto}}</b-col>  
          </b-row>
        </li>
      </ul> -->
      <span class="text-center"><h4>ให้คะแนนเมนูอาหาร</h4></span>
      <Rating :model="detailFoods" />
    </b-container>
  </div>
</template>

<script>
import { mapGetters  } from 'vuex'
import Rating from '@/components/componentsFood/rating'
import Chart from '@/components/componentsFood/chart'
import Gallery from '@/components/componentsFood/gallery'
import carousel from '@/components/componentsFood/carousel'
export default {
  mounted(){
    this.add()
  },
  methods:{
    add(){
      this.templateString = '<div>' + this.detailFoods.methods + '</div>'
      this.Menu = this.detailFoods.menuName
      this.items = this.detailFoods.ingredients
    }
  },
  computed:{
    ...mapGetters({detailFoods:'food/detailFoods'})
  },
  data() {
    return {
      templateString: '<div>รอเพิ่มวิธีทำอาหาร</div>' ,
      Menu: 'พล่ากุ้ง',
      title:'เครื่องปรุง',
      items: [
      { message: 'น้ำพริกเผา', title: '1 ช้อนโต๊ะ'},
      { message: 'น้ำปลา', title: '1 - 2 ช้อนโต๊ะ'},
      { message: 'น้ำมะนาว', title: '2 ช้อนโต๊ะ'},
      { message: 'พริกขี้หนูบุบ', title: '10 เม็ด'},
      { message: 'ตะไคร้ซอย', title: '1/4 ถ้วยตวง'},
      { message: 'หอมแดงซอย', title: '1/4 ถ้วยตวง'},
      { message: 'กุ้ง', title: '400 กรัม'},
      { message: 'ผักชีฝรั่งซอย', title: '1/4 ถ้วยตวง'},
      { message: 'ใบสะระแหน่', title: '1/4 ถ้วยตวง'},
      { message: 'ผักกาดหอม', title: 'ตามต้องการ'},
      { message: 'ใบมะกรูดซอย', title: '1/4 ถ้วยตวง'}
      ],
      // howTo:[
      //   {messageHowto: 'ในชามผสมใส่น้ำพริกเผา น้ำปลา น้ำมะนาว และพริกขี้หนู ผสมให้เข้ากัน ชิมรสตามชอบในชามผสม'},
      //   {messageHowto: 'ใส่ตะไคร้ หอมแดงซอย กุ้งลวก และเครื่องพล่าทั้งหมดลงไปผสมให้เข้ากัน ชิมรสอีกครั้ง'},
      //   {messageHowto: 'ตักใส่จานเสิร์ฟที่รองก้นจานด้วยผักกาดหอม โรยหน้าด้วยใบมะกรูดซอย จัดใส่จาน ยกเสิร์ฟ สำหรับ 4 ท่าน'}
      // ]
    }
  },
   components:{
    Rating,
    Chart,
    Gallery,
    carousel
  },
}
</script>

<style lang="scss">
  
</style>