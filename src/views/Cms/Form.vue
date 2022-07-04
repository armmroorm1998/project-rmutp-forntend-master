<template>
  <div class="animated fadeIn">
    <loading v-if="submitting.loading === false" />
    <div class="card" v-if="submitting.loading === true">
      <div class="card-header">
        <h5>สร้างเมนูอาหาร</h5>
        <!-- <div class="block-content block-content-full block-content-sm bg-body-light">
            <a class="btn btn-secondary" @click="step--">
              ย้อนกลับ
            </a>
        </div> -->
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
              <div class="block">
                <div class="block-content">
                  <div class="row">
                    <component v-if="step === index + 1" v-for="(name, index) in componentName"
                              :key="index"
                              v-bind:is="name"
                              ref="child"
                              :model="model"
                              :changImg='changImg'
                              :submitting="submitting">
                    </component>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="block-content block-content-full block-content-sm bg-body-light">
          <button v-if="step === componentName.length" class="btn btn-success float-right" @click="FormSubmit()">
            บันทึกข้อมูล
          </button>
         <button type="button" class="btn btn-primary float-left" @click="step--">
            ย้อนกลับ
          </button>
          <button type="button" v-if="step !== componentName.length" class="btn btn-primary float-right" @click="next()">
            ต่อไป
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FormCms from './form/FormCms'
  import FormSelectTable from './form/FormSelectTable'
  import FormDetail from './form/FormDetail'
  import { FoodService } from "@/services/FoodService";
  const foodService = new FoodService();
  export default {
    components: {
        FormCms,
        FormSelectTable,
        FormDetail
    },
    props: {
      model: {
        required: true
      }
    },
    watch: {
      step: function (val) {
        if (val === 0) {
          this.$router.push({path:'/dashboard'})
        }
      }
    },
    data() {
      return {
        submitting : {
          loading: true,
        },
        step: 1,
        componentName: ['FormSelectTable','FormDetail'],
        changImg : {
          loading: false,
        },
      }
    },
     methods: {
      async next() {
        const ref = this.$refs.child[0]
        if (typeof ref.formValidate === 'function') {
          let result = await ref.formValidate()
          if (result) {
            this.step++
          }
        } else {
          this.step++
        }
      },
       async FormSubmit() {
        const ref = this.$refs.child[0]
        if (typeof ref.formValidate === 'function') {
          let result = await ref.formValidate()
          if (result) { 
            // console.log('func submit :', this.model)
            if (confirm('คุณต้องการบันทึกข้อมูลเมนูอาหารใช่หรือไม่')) {
                foodService.fetchPostApiCMS({id:this.model.id,menuId:this.model.menuId,ingredients:this.model.ingredients,menuName:this.model.menuName,
                                         methods:this.model.methods, name:this.model.name, point:this.model.point,userId:this.model.userId,
                                         adminId:this.model.adminId,categoryId:this.model.categoryId,databases:this.model.databases, }).then(resp => {
              this.model.menuId = resp.data.menuId
              if (this.changImg.loading === true) {
                ref.RequestApiUpload()
              }
              this.$router.push('/cms/index')
              // location.reload();
            }).catch(err => {
              alert(err)
              })
            } else {
                return;
            }
          }
        }
      },
      // disableNextStep() {
      //   const isChooseSourceType = this.componentName[this.step - 1] === 'ChooseSourceType'
      //   const vals = Object.keys(this.checkbox_selected).map(key => {
      //     return this.checkbox_selected[key]
      //   })
      //   return isChooseSourceType && !vals.includes(true)
      // }
    }
  }
</script>

<style lang="scss">

</style>
