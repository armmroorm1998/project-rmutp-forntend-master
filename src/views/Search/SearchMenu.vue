<template>
  <div class="animated fadeIn">
    <loading v-if="LoadingSubmit === false" />
    <div class="card" v-if="LoadingSubmit === true">
      <div class="card-header">
        <h5>ค้นหาเมนูอาหารจากวัตถุดิบ</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
              <div class="block">
                <div class="block-content">
                  <div class="row">
                    <div class="col-12">
                       <div class="col-12" v-for="(db, index) in selectedDatabase"
                            :value="db"
                            :key="index">
                          <div class="row">
                          </div>
                          <h4 class="text-danger"> (Tips) *กด F3 เพื่อค้นหาวัตถุดิบ จากนั้นคลิกเลือกวัตถุดิบแล้วกดปุ่มเพิ่ม </h4>
                          <div class="row">
                            <div class="col-5">
                              <div class="form-group">
                                <h4>โปรดเลือกรายการวัตถุดิบอาหาร</h4>
                                <select ref="availableDropdown" class="form-control" size="10"
                                        v-model="availableTable[index]">
                                  <option v-for="(table, i) in filterAvaliableTable[index]"
                                          :value="table"
                                          :key="i">
                                    {{ table.ingredientsName }} &nbsp {{'('+table.type+')'}}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="col-2">
                              <div style="margin-top:40%">
                                <div class="d-flex justify-content-center">
                                  <button type="button" class="btn btn-primary" @click="add(index)">เพิ่ม</button>
                                </div>
                                <div class="d-flex justify-content-center">
                                  <button type="button" class="btn btn-danger" @click="remove(index)">ลบ</button>
                                </div>
                              </div>
                            </div>
                            <div class="col-5">
                              <div class="form-group">
                                <h4>รายการวัตถุดิบอาหารที่เลือก</h4>
                                <select ref="selectedDropdown" class="form-control" size="10" v-model="selectedTable[index]"
                                        v-validate="'required'"
                                        :class="{ 'is-invalid': errors.has('table-select')}"
                                        name="table-select">
                                  <option v-for="(table, i) in filterSelectedTable[index]"
                                          :value="table"
                                          :key="i">
                                    {{ table.ingredientsName }} &nbsp {{'('+table.type+')'}}
                                  </option>
                                </select>
                                <b-form-invalid-feedback>
                                  <span v-if="errors.has('table-select')">
                                    โปรดเลือกข้อมูลวัตถุดิบ
                                  </span>
                                </b-form-invalid-feedback>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="block-content block-content-full block-content-sm bg-body-light">
          <button class="btn btn-success float-right" @click="FormSubmit()">
            ค้นหาเมนูอาหาร
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
// FIX import in main component then use in all component.
import _ from 'lodash'
import { FoodService } from "@/services/FoodService";
const foodService = new FoodService();
export default {
  computed: {
    ...mapGetters({databases: 'food/getData'}),
    selectedDatabase() {
        return this.databases.filter(database => {
          let index = _.findIndex(this.model.databases, v => { return v.id === database.id })
          if (index === -1) {
            this.removeTable(database)
          }
          return index !== -1
        })
      },
    filterAvaliableTable() {
        let result = []
        _.forEach(this.selectedDatabase, database => {
          let data = _.filter(database.ingredients, obj => {
            let index = this.model.ingredients.findIndex(model => model.ingredientsName === obj.ingredientsName && model.database.id === database.id)
            return index === -1
          })
          result.push(data)
        })
        const sortResult = result.map((item, index) => {
          return _.sortBy(result[index], ['ingredientsName'])
        })
        return sortResult
      },
      filterSelectedTable() {
        let result = []
        for (let i = 0; i < this.selectedDatabase.length; i++) {
          result[i] = []
        }
        _.forEach(this.model.ingredients, value => {
          let field = 'id'
          let index = _.indexOf(_.map(this.selectedDatabase, field), value.database.id)
          result[index].push(value)
        })
        const sortResult = result.map((item, index) => {
          return _.sortBy(result[index], ['ingredientsName'])
        })
        return sortResult
      },
  },
  mounted() {
      this.filterAvaliableTable.forEach((v, index) => {
        this.updateDropdownTable(index)
      })
      if (this.$refs.selectedDropdown && this.$refs.selectedDropdown.length > 0 && this.filterSelectedTable.length > 0) {
          this.filterSelectedTable.map((item, index) => {
          this.selectedTable[index] = this.filterSelectedTable[index][0]
          this.$refs.selectedDropdown[index].selectedIndex = 0
        })
      }
  },
   methods: {
     ...mapActions({ getDetailFood: 'food/getDetailFood' }),
      FormSubmit() {
        this.$validator.validate().then(valid => {
          if (valid) {
            if (confirm('คุณต้องการค้นหาเมนูอาหารใช่หรือไม่')) {
                // console.log('func submit :', this.model)
                this.LoadingSubmit = false;
                foodService.fetchSearch({ingredients:this.model.ingredients}).then(resp => {
                  this.Details = resp.data
                  this.getDetailFood(this.Details)
                  this.LoadingSubmit = true;
                  this.$router.push('/community/menu')
                }).catch(err => {
                alert(err)
              })
            } else {
                return;
            }
          }
        });
      },
      add(index) {
        let selectedIndex = this.$refs.availableDropdown[index].selectedIndex
        if (selectedIndex > -1) {
          this.model.ingredients.push({
            database: {
              id: this.selectedDatabase[index].id,
              name: this.selectedDatabase[index].name
            },
            id: this.availableTable[index].id,
            ingredientsName: this.availableTable[index].ingredientsName,
            type: this.availableTable[index].type
          })
        }
        if (this.filterAvaliableTable[index].length > 0) {
          selectedIndex = Math.min(selectedIndex, this.filterAvaliableTable[index].length)
          this.availableTable[index] = this.filterAvaliableTable[index][selectedIndex]    
        }
        this.updateDropdownTable(index)
      },
      remove(index) {
        let selectedIndex = this.$refs.selectedDropdown[index].selectedIndex
        if (selectedIndex > -1) {
          const i = _.findIndex(this.model.ingredients, value => value === this.selectedTable[index])
          this.model.ingredients.splice(i, 1)
        }
        if (this.filterSelectedTable[index].length > 0) {
          selectedIndex = Math.min(selectedIndex, this.filterSelectedTable[index].length - 1)
          this.selectedTable[index] = this.filterSelectedTable[index][selectedIndex]
        }
        this.updateDropdownTable(index)
      },
      updateDropdownTable(index = 0) {
        if (this.$refs.availableDropdown[index].selectedIndex === -1) {
          if (this.filterAvaliableTable[index].length > 0) {
            this.availableTable[index] = this.filterAvaliableTable[index][0]
            this.$refs.availableDropdown[index].selectedIndex = 0
          }
        }
        if (this.$refs.selectedDropdown[index].selectedIndex === -1) {
          if (this.filterSelectedTable[index].length > 0) {
            this.selectedTable[index] = this.filterSelectedTable[index][0]
            this.$refs.selectedDropdown[index].selectedIndex = 0
          }
        }
      },
      removeTable(database) {
        _.remove(this.model.ingredients, value => value.database.id === database.id) 
      }
    },
  data() {
    return {
      submitting : {
        loading: false,
      },
      LoadingSubmit : true,
      availableTable: [],
      selectedTable: [],
      model: {
          id:'001',
          ingredients: [],
          name: 'วัตถุดิบ',
          databases: [{id: "001",name: "วัตถุดิบ"}]
        }
    }
  },
}
</script>