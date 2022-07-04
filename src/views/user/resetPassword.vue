<template>
 <div class="app flex-row align-items-center animated fadeIn">
    <div class="container">
      <Loading v-if="loadingShow === false" />
      <b-row class="justify-content-center" v-if="loadingShow === true">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form @submit.prevent="resetPassword()">
                <h1 class="mb-3">รีเซ็ตรหัสผ่าน</h1> 
                <i class="icon-lock-open text-center d-block ml-auto mr-auto mb-3" style="font-size: 7em;"></i>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="email" v-model.trim="$v.email.$model"
                    :class="{ 'is-invalid': $v.email.$error, 'is-valid': !$v.email.$invalid }" class="form-control" v-model="email" 
                    placeholder="อีเมล" autocomplete="email" /> 
                  <b-form-valid-feedback>อีเมลของคุณถูกต้อง!</b-form-valid-feedback>
                  <b-form-invalid-feedback>
                    <span v-if="!$v.email.required">กรุณาระบุอีเมล</span>
                    <span v-if="!$v.email.email">กรุณาระบุอีเมลให้ถูกต้อง</span>
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-key"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" v-model.trim="$v.OTP.$model" v-model="OTP" 
                    :class="{ 'is-invalid': $v.OTP.$error, 'is-valid': !$v.OTP.$invalid }" class="form-control" placeholder="OTP" autocomplete="OTP" />
                  <b-form-valid-feedback>OTP ของคุณถูกต้อง!</b-form-valid-feedback>
                   <b-form-invalid-feedback>
                    <span v-if="!$v.OTP.required">OTP ของคุณไม่ถูกต้อง!</span>
                    <span v-if="!$v.OTP.maxLength">OTP ต้องมีตัวอักษรไม่เกิน {{$v.OTP.$params.maxLength.max}} ตัว</span>
                    <span v-if="!$v.OTP.minLength">ระบุ OTP ขั้นต่ำ {{ $v.OTP.$params.minLength.min }} ตัว</span>
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3" >
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" id='password' v-model.trim="$v.password.$model" v-model='password' 
                    :class="{ 'is-invalid': $v.password.$error, 'is-valid': !$v.password.$invalid }" class="form-control" 
                    placeholder="รหัสผ่าน" autocomplete="new-password" />
                   <b-form-valid-feedback>รหัสผ่านของคุณถูกต้อง!</b-form-valid-feedback>
                    <b-form-invalid-feedback>
                      <span v-if="!$v.password.required">กรุณาระบุรหัสผ่าน</span>
                      <span v-if="!$v.password.minLength">ระบุขั้นต่ำ {{ $v.password.$params.minLength.min }} ตัว</span>
                    </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model.trim="$v.repeatpassword.$model" v-model="repeatpassword"  
                    :class="{ 'is-invalid': $v.repeatpassword.$error, 'is-valid': (password != '') ? !$v.repeatpassword.$invalid : '' }" 
                    class="form-control" placeholder="ระบุรหัสผ่านใหม่อีกครั้ง" autocomplete="new-password" />
                  <b-form-valid-feedback>รหัสผ่านตรงกัน</b-form-valid-feedback>
                  <b-form-invalid-feedback>
                    <span v-if="!$v.repeatpassword.sameAsPassword">รหัสผ่านไม่ตรงกัน</span>
                  </b-form-invalid-feedback>
                </b-input-group>

                <b-button type="submit" variant="success" block>รีเซ็ตรหัสผ่าน</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minLength, maxLength,} from 'vuelidate/lib/validators';
import Loading from '@/components/loading.vue'
import { BoardService } from "@/services/BoardService";
const boardService = new BoardService();
export default {
  name: 'forgetpassword',
  data() {
    return {
      loadingShow: true,
      email: '',
      password: '',
      repeatpassword: '',
      OTP:''
    }
  },
  components:{
    Loading
  },
  validations: {
    OTP:{
      required,
      minLength: minLength(6),
      maxLength: maxLength(6)
    },
    email:{
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(50)
    },
    repeatpassword: {
      sameAsPassword: sameAs('password')
    },
  },
  methods:{
    resetPassword(){
      this.$v.$touch()
      if (this.$v.$invalid) {
        return 
      } else {
        this.loadingShow = false
        boardService.fetchResetPassword({email:this.email, newPassword:this.password, OTP:this.OTP}).then(res =>{
        if(res.data.status === true) {
          alert(res.data.message)
          this.$router.push("/pages/signin")
        } else {
          alert(res.data.message)
        }
        this.loadingShow = true
       }).catch(err => {
         alert(err)
       })
      }
    }
  }
}
</script>