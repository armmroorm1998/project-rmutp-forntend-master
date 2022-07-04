<template>
  <div class="animated fadeIn divfixed">
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      class="mb-4"
      img-width="1024"
      img-height="480"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        v-for="(model,index) in img" :key="index"
        caption="พล่ากุ้ง"
        text="..."
        :img-src="model.path"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
export default {
  name: "carousel",
  mounted(){
    this.add()
  },
  props:{
    ImgFood : {
      required : true
    }
  },
   methods:{
    add(){
      this.img = this.ImgFood
    }
  },
  data() {
    return {
      img: ['img/Foods/1.webp','http://localhost:9000/img/imgfood/menuid1/1-1.png']
    };
  },
};
</script>
<style lang="scss">
.img-fluid {
  height: 700px;
}
.divfixed {
  text-align: center;
  margin: auto;
  width: 100% !important;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
@media only screen and (max-width: 768px) {
  .img-fluid {
    height: auto;
  }
  .divfixed{
    width: 100% !important;
}
}
</style>

