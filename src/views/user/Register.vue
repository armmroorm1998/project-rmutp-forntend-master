<template>
  <div class="app flex-row align-items-center animated fadeIn">
    <div class="container">
      <Loading v-if="loadingShow === false" />
      <b-row class="justify-content-center" v-if="loadingShow === true">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form @submit.prevent="signUp()">
                <h1>ลงชื่อสมัคร</h1>
                <p class="text-muted">สร้างบัญชีของคุณ</p>
                <b-form-group label="คำนำหน้าชื่อ">
                  <b-form-radio-group
                    v-model="title"
                    :options="titles"
                    @change.native="ChangeType()"
                    name="radio-title" 
                  ></b-form-radio-group>
                </b-form-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" v-model.trim="$v.firstname.$model" v-model="firstname" 
                    :class="{ 'is-invalid': $v.firstname.$error, 'is-valid': !$v.firstname.$invalid }" class="form-control" placeholder="ชื่อ" autocomplete="firstname" />
                  <b-form-valid-feedback>ชื่อของคุณถูกต้อง!</b-form-valid-feedback>
                   <b-form-invalid-feedback>
                    <span v-if="!$v.firstname.required">กรุณาระบุชื่อของคุณ</span>
                    <span v-if="!$v.firstname.maxLength">ชื่อต้องมีตัวอักษรไม่เกิน {{$v.firstname.$params.maxLength.max}} ตัว</span>
                  </b-form-invalid-feedback>
                </b-input-group>

                <!-- <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" v-model.trim="$v.lastname.$model" v-model="lastname" 
                    :class="{ 'is-invalid': $v.lastname.$error, 'is-valid': !$v.lastname.$invalid }" class="form-control" placeholder="นามสกุล" autocomplete="lastname" />
                  <b-form-valid-feedback>นามสกุลของคุณถูกต้อง!</b-form-valid-feedback>
                   <b-form-invalid-feedback>
                    <span v-if="!$v.lastname.required">กรุณาระบุนามสกุลของคุณ</span>
                    <span v-if="!$v.lastname.maxLength">นามสกุลต้องมีตัวอักษรไม่เกิน {{$v.lastname.$params.maxLength.max}} ตัว</span>
                  </b-form-invalid-feedback>
                </b-input-group> -->
                
                <b-form-group label="เพศ">
                  <b-form-radio-group
                    v-model="gender"
                    :options="genders"
                    name="radio-gender"
                    @change.native="ChangeSex()"
                  ></b-form-radio-group>
                </b-form-group>
                
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="email" v-model.trim="$v.email.$model"
                    :class="{ 'is-invalid': $v.email.$error, 'is-valid': !$v.email.$invalid }" class="form-control" v-model="email" 
                    placeholder="Example@mail.com" autocomplete="email" /> 
                  <b-form-valid-feedback>อีเมลของคุณถูกต้อง!</b-form-valid-feedback>
                  <b-form-invalid-feedback>
                    <span v-if="!$v.email.required">กรุณาระบุอีเมล</span>
                    <span v-if="!$v.email.email">กรุณาระบุอีเมลให้ถูกต้อง</span>
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3" >
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" id='password' v-model.trim="$v.password.$model" v-model='password' 
                    :class="{ 'is-invalid': $v.password.$error, 'is-valid': !$v.password.$invalid }" class="form-control" 
                    placeholder="รหัสผ่าน" autocomplete="new-password" />
                  <!-- <div class="valid-feedback">Your password is valid!</div> -->
                   <b-form-valid-feedback>รหัสผ่านของคุณถูกต้อง!</b-form-valid-feedback>
                    <b-form-invalid-feedback>
                      <span v-if="!$v.password.required">กรุณาระบุรหัสผ่าน</span>
                      <span v-if="!$v.password.minLength">ระบุขั้นต่ำ {{ $v.password.$params.minLength.min }} ตัว</span>
                    </b-form-invalid-feedback>
                  <!-- <div class="invalid-feedback">
                    <span v-if="!$v.password.required">Password is required.</span>
                    <span v-if="!$v.password.minLength">{{ $v.password.$params.minLength.min }} characters minimum.</span>
                  </div> -->
                </b-input-group>
                <b-form-checkbox class="mb-2" v-model="showpassword" name="checkbox-1" @change="toggleShowpassword">แสดงรหัสผ่าน</b-form-checkbox>  
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" id="repeatpassword"  v-model.trim="$v.repeatpassword.$model" v-model="repeatpassword"  
                    :class="{ 'is-invalid': $v.repeatpassword.$error, 'is-valid': (password != '') ? !$v.repeatpassword.$invalid : '' }" 
                    class="form-control" placeholder="ระบุรหัสผ่านใหม่อีกครั้ง" autocomplete="new-password" />
                  <b-form-valid-feedback>รหัสผ่านตรงกัน</b-form-valid-feedback>
                  <b-form-invalid-feedback>
                    <span v-if="!$v.repeatpassword.sameAsPassword">รหัสผ่านไม่ตรงกัน</span>
                  </b-form-invalid-feedback>
                </b-input-group>
                <b-button type="submit" variant="success" block>สร้างบัญชี</b-button>
                <p class="text-center"> หรือ <router-link :to="{name : 'SignIn'}" >ลงชื่อเข้าใช้</router-link></p>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength, maxLength, email } from 'vuelidate/lib/validators'
// import firebase from 'firebase/firebase';
import { BoardService } from "@/services/BoardService";
const boardService = new BoardService();
import Loading from '@/components/loading.vue';
export default {
  name: 'Register',
   data: function() {
    return {
      firstname:'',
      lastname:'',
      gender:'',
      title:'',
      email: '',
      password: '',
      signinMethod: '',
      avatar:'',
      repeatpassword: '',
      showpassword: false,
      loadingShow: true,
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
      required,
      maxLength: maxLength(50)
    },
    // lastname:{
    //   required,
    //   maxLength: maxLength(50)
    // },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(50)
    },
    repeatpassword: {
      sameAsPassword: sameAs('password')
    },
    email:{
      required,
      email
    }
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
    toggleShowpassword(){
      var show = document.getElementById('password')
      var show1 = document.getElementById('repeatpassword')
      if(this.showpassword == false) {
        this.showpassword = true  
        show.type = 'text'  
        show1.type = 'text'
      }else {
        this.showpassword = false  
        show.type = 'password'  
        show1.type = 'password'
      }
    },
    signUp(){
      this.$v.$touch()
      if (this.$v.$invalid) {
        return 
      } else {
        this.loadingShow = false
        boardService.fetchSignup({email:this.email,signinMethod:this.signinMethod, avatar:this.avatar, password:this.password, genderID:this.gender, titleID:this.title, firstname: this.firstname, lastname: this.lastname})
        .then(res => {
          if (res.data.status === true) {
            alert(res.data.message)
            this.$router.push("/pages/signin")
          } else {
            alert(res.data.message)
          }
          this.loadingShow = true
          }).catch(err => {
            alert(err)
          })
        // let self = this;
        // firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(sendEmailVerify){
        //   if (sendEmailVerify === false) {
        //     return false;
        //   }else {
        //     firebase.auth().currentUser.sendEmailVerification();
        //     alert('Email Verification Sent! Please check email address.')
        //     self.$router.push("/pages/signin");
        //     return true;
        //   }
        // }).catch(function(error) {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   if (errorCode === 'auth/weak-password') {
        //     alert('The password is too weak')
        //   }else {
        //     alert(errorMessage)
        //   }
        // })
      }
    }
  }
}
</script>