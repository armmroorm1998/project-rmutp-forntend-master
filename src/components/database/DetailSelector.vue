<template>
  <div class="col-sm-10 col-md-8 container">
    <!--[START Name input]-->
      <div class="form-group row">
        <label for="api-name" class="col-sm-2 col-form-label"> ชื่อเมนูอาหาร :<span class="text-danger">*</span></label>
        <div class="col-sm-9 mb-2">
          <input type="text"
                id="api-name"
                name="api-name"
                class="form-control"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('api-name')}"
                @change="onNameMenuInput()"
                v-model="nameMunu"
                placeholder="โปรดกรอกชื่อเมนูอาหาร">
          <b-form-invalid-feedback>
            <span v-if="errors.has('api-name')">
                โปรดกรอกชื่อเมนูอาหาร
            </span>
          </b-form-invalid-feedback>
        </div>
      </div>
    <!--[END Name input]-->

    <!--[START quantity input]-->
      <h5 class="mt-2">ปริมาณวัตถุดิบ</h5>
      <span class="text-danger">*ปริมาณ ½ ช้อนโต๊ะ/ชา เท่ากับ 0.5, ¼ ช้อนโต๊ะ/ชา เท่ากับ 0.25, 1 ½ ช้อนโต๊ะ/ชา เท่ากับ 1.5</span> <br>
      <span class="text-danger">*ปริมาณ 1 ช้อนโต๊ะ เท่ากับ 3 ช้อนชา, 1 ถ้วย เท่ากับ 16 ช้อนโต๊ะ, ½ ถ้วย เท่ากับ 8 ช้อนโต๊ะ</span> <br>
      <span class="text-danger">*ปริมาณ 100 กรัม เท่ากับ 1 ขีด, 1000 กรัม เท่ากับ 1 กิโลกรัม</span>
      <b-row class="my-1"  v-for="(select,i) in models" :key="i">
        <b-col sm="2">
          <label for="type-number" class="col-form-label"> {{select.ingredientsName}} :<span class="text-danger"> * </span></label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="selected[i]" @change.native="ChangeInt(i)"
                        v-validate="'required'"
                        :class="{ 'is-invalid': errors.has('input-quantity')}"
                        name="input-quantity"
                        placeholder="โปรดกรอกปริมาณวัตถุดิบ">
          </b-form-input>
          <b-form-invalid-feedback>
            <span v-if="errors.has('input-quantity')">
                โปรดกรอกปริมาณวัตถุดิบ
            </span>
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <label for="type-food" class="col-form-label"> {{select.type}}</label>
        </b-col>
      </b-row>
      
      <h5 class="mt-2">เลือกรูปภาพประกอบอาหาร<span class="text-danger">*</span></h5>
      <span class="text-danger">*เลือกรูปภาพประกอบอาหาร 2-3 รูปภาพเป็นอย่างน้อยหรือมากกว่านั้น</span>
      <b-form @submit.prevent="addFiles()">
        <b-form-file  class="mb-3"  v-model="files" name="myFile" id="files" ref="files" multiple  v-on:change="handleFileUpload()" accept=".jpg, .png">                
      </b-form-file>
        <div v-for="(img,key) in files" :key="key">
          <span><b>รูปภาพที่ {{key + 1}} : {{img.name}}</b></span> <span class="remove-file" @click="removeFile(key)"> ลบ </span>
        </div>
        <!-- <b-form-invalid-feedback>
            <span v-if="errors.has('myFile')">
                โปรดเลือกรูปภาพประกอบอาหาร
            </span>
          </b-form-invalid-feedback> -->
      </b-form>

      <b-form-group label="ประเภทอาหาร">
        <b-form-radio-group
          v-for="(option, a) in options" :key="`A-${a}`"
          id="radio-group-2"
          v-model="typeFoods"
          v-validate="'required'"
          name="radio-Type"
          @change="onChacgTypeFood(a+1)">
            <b-form-radio :value="option.value">{{option.text}}</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    <!--[END quantity input]--> 
      <h3 style="margin-top: 40px ; margin-bottom: 20px">วิธีทำอาหาร<span class="text-danger">*</span></h3>
      <ckeditor id="editor" :editor="editor" v-model="editorData" @input="onEditorInput()" :config="editorConfig" 
                name="content" v-validate="'required'"
                :class="{ 'is-invalid': errors.has('content')}">
      </ckeditor>
      <b-form-invalid-feedback>
        <span v-if="errors.has('content')">
            โปรดกรอกวิธีทำอาหาร
        </span>
      </b-form-invalid-feedback>
  </div>  
</template>

<script>
import { mapGetters  } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
export default {
  computed:{
    ...mapGetters({userId:'user/userId',adminId:'user/adminId'})
  },
  props: {
      selectModel:{ 
        required: true
      },
      // method:{ 
      //   required: true
      // },
      models: {
        type: Array,
        default: () => []
      },
      submitting : {
        required : true
      },
      changImg : {
        required : true
      }
    },
    data() {
      return {
        files: '',
        typeFoods: '1',
        options: [
          { text: 'อาหารประเภทเรียกน้ำย่อย', value: '1'},
          { text: 'ประเภทสลัด/ยำ', value: '2'},
          { text: 'อาหารประเภททอด/ผัด', value: '3'},
          { text: 'อาหารประเภทเส้น', value:'4'},
          { text: 'อาหารประเภทนึ่ง/ต้ม', value: '5'},
          { text: 'อาหารจานด่วน/เดียว', value: '6'},
          { text: 'ซุป', value: '7'},
          { text: 'อาหารประเภทแกง',value: '8'},
          // { text: 'ของหวาน', value: '9'},
          // { text: 'เครื่องดื่ม', value: '10'},
          // { text: 'ซอส/เครื่องจิ้ม', value: '11'}
        ],
        selected: [],
        nameMunu:'',
        editor: ClassicEditor,
        editorData: this.selectModel.methods,
        editorConfig: {
          toolbar: {
            items: [                                  
            'bold',
            'italic',
            'bulletedList',
            'numberedList',
            'link',
            'undo',
            'redo',
            ]
          },
        language: 'en'
        }
      }
    },
    mounted(){
      if (this.selectModel.menuName) {
        this.nameMunu = this.selectModel.menuName
        this.typeFoods = this.selectModel.categoryId
        for (var i = 0; i < this.models.length; i++) {
          this.selected[i] = this.models[i].quantity
        }
      if (this.editorData) {
          this.onEditorInput();
        }
      }
    },
    methods:{
      removeFile( key ){
        this.files.splice( key, 1 );
      },
      handleFileUpload(){
      this.files = this.$refs.files.files;
      this.changImg.loading = true
      },
      ChangeInt(i) {
        this.selected[i] = parseFloat(this.selected[i])
        this.models[i].quantity = this.selected[i]
      },
      addFiles(){
        let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ){
            let file = this.files[i];
            formData.append('myFile', file);
          }
        formData.append('menuID', this.selectModel.menuId );
        this.submitting.loading = false
        foodService.fetchPostApiCMSUpdate(formData).then(()=> {
          return this.submitting.loading = true
        }).catch(err => {
          alert(err)
        })
      },
      onChacgTypeFood(a) {
        var num = a;
        var n = num.toString();
        this.selectModel.categoryId = n
      },
      onEditorInput() {
          this.selectModel.methods = this.editorData
      },
      onNameMenuInput() {
         this.selectModel.menuName = this.nameMunu
         this.selectModel.categoryId = this.typeFoods
         if (this.selectModel.userId == "") {
          this.selectModel.userId = this.userId
          this.selectModel.adminId = this.adminId
         }
      },
      formValidate() {
        // valiadate this form parent components call this
        return this.$validator.validate()
      },
    },
}
</script>

<style lang="scss">
  .ck-editor__editable {
    min-height: 300px;
   }
   span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
  }
</style>