<template>
  <div class="animated fadeIn">
    <loading v-if="LoadingSubmit === false" />
    <div v-if="LoadingSubmit === true">
      <button type="button" class="btn btn-success" @click="CreateCMS">สร้างเมนูอาหาร</button>
    <!--[START Table]-->
      <div class="block-rounded block-bordered table">
        <Table :data="Data" />
      </div>
      <!--[END Table]-->
    </div>
   
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex';
import Table from '@/components/table/Table'
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
export default {
  data() {
    return {
      Data: Object,
      LoadingSubmit : false
    };
  },
  components: {
      Table
    },
  mounted(){
    if (this.getData == null) {
      this.GetApiIngredients();
    }
    this.GetManegeMenu();
  },
  computed:{
    ...mapGetters({userId:'user/userId',adminId:'user/adminId',getData:'food/getData'})
  },
  methods: {
    ...mapActions({getIngredients : 'food/getIngredients',getTabelData:'food/getTabelData'}),
    CreateCMS(){
      this.$router.push('/cms/create')
    },
    GetManegeMenu(){
      foodService.fetchManegeMenu({userId:this.userId,adminId:this.adminId}).then(resp => {
        this.getTabelData(resp.data)
        this.LoadingSubmit = true
        // this.Data = resp.data
      })
    },
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

<style lang="css">
</style>
