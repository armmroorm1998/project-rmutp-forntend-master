<template lang="html">
  <div>
    <div class="col-12" v-for="(db, index) in selectedDatabase"
         :value="db"
         :key="index">
      <div class="row">
      </div>
      <h4 class="text-danger"> (Tips) *กด F3 เพื่อค้นหาวัตถุดิบ จากนั้นคลิกเลือกวัตถุดิบแล้วกดปุ่มเพิ่ม </h4>
      <div class="row">
        <!-- <input type="text" id="search" @change="filterSearch()" class="form-control" v-model="search" placeholder="Search Sprint..." aria-label="Search" autocomplete="on"/> -->
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
            <!-- <div class="d-flex justify-content-center mt-2">
              <button type="button" class="btn btn-outline-primary" @click="removeAll()">reset</button>
            </div> -->
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
</template>

<script>
  // FIX import in main component then use in all component.
  import _ from 'lodash'

  export default {
    props: {
      databases: {
        type: Array,
        default: () => []
      },
      selected: {
        type: Array,
        default: () => []
      },
      models: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        availableTable: [],
        selectedTable: [],
        search: ''
      }
    },
    computed: {
      selectedDatabase() {
        return this.databases.filter(database => {
          let index = _.findIndex(this.selected, v => { return v.id === database.id })
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
            let index = this.models.findIndex(model => model.ingredientsName === obj.ingredientsName && model.database.id === database.id)
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
        _.forEach(this.models, value => {
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
      formValidate() {
        // valiadate this form parent components call this
        return this.$validator.validate()
      },
      add(index) {
        let selectedIndex = this.$refs.availableDropdown[index].selectedIndex
        if (selectedIndex > -1) {
          this.models.push({
            database: {
              id: this.selectedDatabase[index].id,
              name: this.selectedDatabase[index].name
            },
            id: this.availableTable[index].id,
            ingredientsCalories: this.availableTable[index].ingredientsCalories,
            ingredientsName: this.availableTable[index].ingredientsName,
            ingredientsType: this.availableTable[index].ingredientsType,
            quantity: this.availableTable[index].quantity,
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
          const i = _.findIndex(this.models, value => value === this.selectedTable[index])
          this.models.splice(i, 1)
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
        _.remove(this.models, value => value.database.id === database.id) 
      }
    }
  }
</script>

<style lang="css" scoped>
  .vertical-center {
    top: 50% !important
  }
</style>
