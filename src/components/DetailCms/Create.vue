<template>
  <!-- <div class="app flex-row align-items-center"> -->
    <div class="animated fadeIn">
      <Loading v-if="loadingShow === false" />
      <b-row class="justify-content-center" v-if="loadingShow === true">

        <b-col md="6" sm="8">
          <b-card no-body>
            <b-card-body class="p-4">
              <b-form>
                <h1>Create Menu</h1>
                  <b-form-file v-model="files"  name="myFile" id="files" ref="files" multiple  v-on:change="handleFileUpload()" placeholder="Choose a file or drop it here..." ></b-form-file>
                  <div class="m-3 mx-auto">Selected file: {{ files ? files.name : '' }}</div>
                <b-button  @click="onUpload()" variant="success" block>Update</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  <!-- </div> -->
</template>

<script>
import { BoardService } from "@/services/BoardService";
const boardService = new BoardService();
import Loading from '@/components/loading.vue';
export default {
  name:'create',
  data() {
    return {
      loadingShow:true,
      files: '',
    }
  },
   components:{
    Loading
  },
  methods:{
    handleFileUpload(){
      this.files = this.$refs.files.files;
    },
    onUpload(){
      let formData = new FormData();
      for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('myFile', file);
        }
      boardService.fetchPostApiUpdate(formData).then(()=> {
        return
      }).catch(err => {
        alert(err)
      })
    }
  }
}
</script>