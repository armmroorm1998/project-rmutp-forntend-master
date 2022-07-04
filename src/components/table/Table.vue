<template>
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">ภาพประกอบ</th>
      <th scope="col">ชื่อเมนูอาหาร</th>
      <th scope="col">วันที่สร้างเมนู</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody v-for="(trV, index) in getTableData" :key="index">
    <tr class="text-center table-secondary">
      <th scope="row">{{index+1}}</th>
      <td>
        <img v-if="trV.imgPath !== null" :src="trV.imgPath[0].href" class="manegeImg" alt="FoodMenu">
        <img v-else src="img/plate2.png" class="manegeImg" alt="...">
      </td>
      <td>{{trV.menuName}}</td>
      <td>{{trV.createdDate}}</td>
      <td>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="getBoard(trV)"
            style="width: 150px; font-size: .9em;">
            <i class="fa fa-edit"></i> แก้ไขเมนูอาหาร
          </button>
          <br>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="getBoardDelete(trV)"
            style="width: 150px; font-size: .9em;">
            <i class="fa fa-edit"></i> ลบเมนูอาหาร
          </button>
      </td>
    </tr>
  </tbody>
</table>

</template>
<script>
import { mapActions,mapGetters} from 'vuex';
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
  export default {
    props: {
      data:{
        required : true
      }
    },
    data() {
      return {
      }
    },
    computed:{
    ...mapGetters({getTableData:'food/getTableData'})
    },
    methods: {
    ...mapActions({getModelUpdate : 'food/getModelUpdate'}),
    getBoardDelete(trV){
      if (confirm('คุณต้องการลบเมนูอาหารใช่หรือไม่')) {
          // console.log('func submit :', this.model)
          foodService.fetchGetDetailDeleteMenu({menuId:trV.id}).then(() => {
            location.reload();
          }).catch(err => {
                alert(err)
              })
      } else {
          return;
      }
    },
    getBoard(trV){
      // console.log(trV.id);
      if (confirm('คุณต้องการแก้ไขเมนูอาหารใช่หรือไม่')) {
              // console.log('func submit :', this.model)
        foodService.fetchGetDetailUpdateMenu({menuId:trV.id}).then(resp => {
          this.getModelUpdate(resp.data)
          // console.log(resp);
          this.$router.push('/cms/CmsUpdate')
      }).catch(err => {
          alert(err)
        })
      } else {
          return;
      }

    }
  }
  }
</script>

<style lang="css" scoped>
  .manegeImg{
    width: 100px;
  }
  thead > tr > th {
    color: white;
    text-align: center;
  }

  .dropdown-menu {
    position: absolute;
    will-change: transform;
    top: 0px;
    left: 0px;
    transform: translate3d(0px, 38px, 0px) !important;
    min-width: 11.2rem;
    font-size: 0.9em;
  }

  #main-btn {
    width: 150px;
    font-size: 0.9em;
  }

  .table-responsive {
    display: table;
    /* table-layout:auto; */
  }

  table tr td:nth-child(1) {
    width: 30%;
  }

  table tr td:nth-child(5) {
    width: 10%;
  }
</style>
