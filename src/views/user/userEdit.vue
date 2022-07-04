<template>
  <!-- <div class="app flex-row align-items-center"> -->
    <div class="animated fadeIn">
      <Loading v-if="loadingShow === false" />
      <b-row class="justify-content-center" v-if="loadingShow === true">
        <b-card no-body style="width:auto">
          <b-card-body class="p-4">
            <div>
               <h1>โปรไฟล์</h1>
               <img :src="this.avatar || this.avatarDefault" alt="avatar" height="100" class="d-block ml-auto mr-auto mb-3 mt-3 rounded-circle">
               <p>อีเมล : {{this.emailProfile}}</p> 
               <p>ชื่อ : {{this.titleProfile}} {{this.firstnameProfile}}</p>
               <p>เพศ : {{this.genderProfile}}</p>
            </div>
          </b-card-body>
        </b-card>

        <b-col md="6" sm="8">
          <b-card no-body>
            <b-card-body class="p-4">
              <b-form @submit.prevent="update()">
                <h1>แก้ไขโปรไฟล์</h1>
                <b-form-file v-model="file" name="myFile" id="file" ref="file" accept=".jpg, .png, .gif"  @change="handleFileUpload()" placeholder="เลือกรูปโปรไฟล์ของคุณ" ></b-form-file>
                <b-form-group label="คำนำหน้า">
                  <b-form-radio-group
                    v-model="title"
                    :options="titles"
                    name="radio-title"
                    @change.native="ChangeType()"
                  ></b-form-radio-group>
                </b-form-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" v-model.trim="$v.firstname.$model" v-model="firstname" 
                    :class="{ 'is-invalid': $v.firstname.$error}" class="form-control" placeholder="ชื่อ" autocomplete="firstname" />
                   <b-form-invalid-feedback>
                    <span v-if="!$v.firstname.maxLength">ชื่อต้องมีตัวอักษรไม่เกิน {{$v.firstname.$params.maxLength.max}} ตัว</span>
                  </b-form-invalid-feedback>
                </b-input-group>

                <!-- <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" v-model.trim="$v.lastname.$model" v-model="lastname" 
                    :class="{ 'is-invalid': $v.lastname.$error}" class="form-control" placeholder="นามสกุล" autocomplete="lastname" />
                   <b-form-invalid-feedback>
                    <span v-if="!$v.lastname.maxLength">นามสกุลต้องมีตัวอักษรไม่เกิน {{$v.lastname.$params.maxLength.max}} ตัว</span>
                  </b-form-invalid-feedback>
                </b-input-group> -->
                
                <b-form-group label="Gender">
                  <b-form-radio-group
                    v-model="gender"
                    :options="genders"
                    name="radio-gender"
                    @change.native="ChangeSex()"
                  ></b-form-radio-group>
                </b-form-group>

                <b-input-group class="mb-3" >
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model.trim="$v.passwordOld.$model" v-model='passwordOld' 
                    :class="{ 'is-invalid': $v.passwordOld.$error}" class="form-control" 
                    placeholder="รหัสผ่านเก่า" autocomplete="new-password" />
                    <b-form-invalid-feedback>
                      <span v-if="!$v.passwordOld.minLength">ระบุขั้นต่ำ {{ $v.passwordOld.$params.minLength.min }} ตัว</span>
                    </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3" >
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model.trim="$v.passwordNew.$model" v-model='passwordNew' 
                    :class="{ 'is-invalid': $v.passwordNew.$error}" class="form-control" 
                    placeholder="รหัสผ่านใหม่" autocomplete="new-password" />
                    <b-form-invalid-feedback>
                      <span v-if="!$v.passwordNew.minLength">ระบุขั้นต่ำ {{ $v.passwordNew.$params.minLength.min }} ตัว</span>
                    </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model.trim="$v.repeatpassword.$model" v-model="repeatpassword"  
                    :class="{ 'is-invalid': $v.repeatpassword.$error, 'is-valid': (passwordNew != '') ? !$v.repeatpassword.$invalid : '' }" 
                    class="form-control" placeholder="ระบุรหัสผ่านใหม่อีกครั้ง" autocomplete="new-password" />
                  <b-form-valid-feedback>รหัสผ่านตรงกัน</b-form-valid-feedback>
                  <b-form-invalid-feedback>
                    <span v-if="!$v.repeatpassword.sameAsPassword">รหัสผ่านไม่ตรงกัน</span>
                  </b-form-invalid-feedback>
                </b-input-group>
                <b-button type="submit" variant="success" block>อัพเดท</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  <!-- </div> -->
</template>

<script>

import { sameAs, minLength, maxLength} from 'vuelidate/lib/validators';
import { BoardService } from "@/services/BoardService";
const boardService = new BoardService();
import {mapActions} from 'vuex'
import Loading from '@/components/loading.vue'
export default {
  name: 'userEdit',
  data: function() {
    return {
      loadingShow:false,
      file: '',
      firstnameProfile:'',
      lastnameProfile:'',
      emailProfile:'',
      genderProfile:'',
      titleProfile:'',
      firstname:'',
      // lastname:'',
      gender:'',
      title:'',
      passwordOld:'',
      passwordNew: '',
      repeatpassword: '',
      avatar: null,
      avatarDefault:'img/avatars/user.png',
      changAvatar: false,
      genders: [
          { text: 'ชาย', value: '1' },
          { text: 'หญิง', value: '2' },
          // { text: 'ไม่ระบุเพศ', value: '3' }
        ],
      titles: [
        {text: 'นาย', value: '1'},
        {text: 'นางสาว', value: '2'},
        {text: 'นาง', value: '3'},
      ]
    };
  },
  components:{
    Loading
  },
  validations: {
    firstname:{
      maxLength: maxLength(50)
    },
    // lastname:{
    //   maxLength: maxLength(50)
    // },
    passwordOld: {
      minLength: minLength(8),
      maxLength: maxLength(50)
    },
    passwordNew: {
      minLength: minLength(8),
      maxLength: maxLength(50)
    },
    repeatpassword: {
      sameAsPassword: sameAs('passwordNew')
    }
  },
  mounted: function() {
    this.getProfile();
  },
  methods:{
    ChangeSex(){
       if(this.gender == '1'){
          this.title =  this.gender
      } else if (this.gender == '2'){
        this.title =  this.gender
      }
    },
    ChangeType(){
      if(this.title == '1'){
          this.gender =  this.title
      } else if (this.title == '2'){
        this.gender =  this.title
      } else {
        this.gender =  '2'
      }
    },
    ...mapActions({getUsername : 'user/getUsername', getAvatar: 'user/getAvatar'}),
    getProfile(){
      boardService.fetchProfile().then(res => {
        var username = res.data.firstname
        var avatarProfile = res.data.avatar
        this.getUsername(username)
        if (avatarProfile != "" ) {
          this.getAvatar(avatarProfile)
        }
        this.firstnameProfile = res.data.firstname
        this.lastnameProfile = res.data.lastname
        this.firstname = res.data.firstname
        this.lastname = res.data.lastname
        this.genderProfile = res.data.gender
        this.titleProfile = res.data.titlename
        this.emailProfile = res.data.email
        this.gender = res.data.genderID
        this.title = res.data.titleID
        this.avatar = res.data.avatar
        this.loadingShow = true
      }).catch(err => {
        alert(err)
      })
    },
    handleFileUpload(){
      this.file = this.$refs.file.files;
      this.changAvatar = true
    },
    update(){
       this.$v.$touch()
      if (this.$v.$invalid) {
        return 
      } else {
        this.loadingShow = false
        let formData = new FormData();
        formData.append('myFile', this.file); 
        // formData.append('menuID', '1' );
        boardService.fetchUpdateProfile({Userdata:{ genderID:this.gender, titleID:this.title, firstname:this.firstname, lastname:this.lastname}, 
        changePassword:{oldPassword:this.passwordOld, newPassword:this.passwordNew}})
        .then(res => {
          if (res.data.status === true){
            location.reload();
          } else {
            alert(res.data.message)
          }
          this.loadingShow = true
        }).catch(err => {
          alert(err)
        })
        if (this.changAvatar === true) {
          boardService.fetchUploadAvatar(formData).then(()=>{return}).catch(err =>{alert(err)})
        }
      }
    }
  }
}
</script>

<style lang="scss">
    
</style>

