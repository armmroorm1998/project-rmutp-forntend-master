<template>
  <div class="row">
    <div class="col-5">
      <div class="form-group">
        <h4>โปรดเลือกฐานข้อมูลวัตถุดิบ</h4>
       <select ref="availableDropdown" class="form-control" size="10"
                v-model="availableDatabaseValue">
          <option v-for="(db, index) in filterAvaliableDB"
                  :value="db"
                  :key="index">{{ db.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-2">
      <div style="margin-top:55%">
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary" @click="add">เพิ่ม</button>
        </div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-danger" @click="remove">ลบ</button>
        </div>
      </div>
    </div>
    <div class="col-5">
      <div class="form-group">
        <h4>ฐานข้อมูลวัตถุดิบที่เลือก</h4>
        <select ref="selectedDropdown" class="form-control" size="10" v-model="selectedDatabaseValue"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('db-select')}"
                name="db-select">
          <option v-for="(db, index) in models"
                  :value="db"
                  :key="index">
            {{ db.name }}
          </option>
        </select>
        <b-form-invalid-feedback>
         <span v-if="errors.has('db-select')">
            โปรดเลือกข้อมูลวัตถุดิบ
        </span>
        </b-form-invalid-feedback>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
     databases: {
        type: Array,
        default: () => []
      },
      models: {
        type: Array,
        default: () => []
      },
      model: {
        required: true
      }
    },
    data() {
      return {
        availableDatabaseValue: '',
        selectedDatabaseValue: ''
      }
    },
  mounted() {
      this.setFocus()
    },
    computed: {
      filterAvaliableDB() {
        return this.databases.filter(database => {
          const index = this.models.findIndex(model => model.id === database.id)
          return index === -1
        })
      },
    },
    methods: {
      formValidate() {
        // valiadate this form parent components call this
        return this.$validator.validate()
      },
      setFocus() {
        if (this.databases.length > 0) {
          this.availableDatabaseValue = this.databases[0]
        }
        if (this.models.length > 0) {
          this.selectedDatabaseValue = this.models[0]
        }
      },
      add() {
        let selectedIndex = this.$refs.availableDropdown.selectedIndex  
        if (selectedIndex > -1) {
          this.models.push({
            'id': this.availableDatabaseValue.id,
            'name': this.availableDatabaseValue.name,
          })
          this.model.name =  this.availableDatabaseValue.name
        }
        if (this.filterAvaliableDB.length > 0) {
          selectedIndex = Math.min(selectedIndex, this.filterAvaliableDB.length)
          this.availableDatabaseValue = this.filterAvaliableDB[selectedIndex]
        }
        this.updateDropdownIndex()
      },
      remove() {
        let selectedIndex = this.$refs.selectedDropdown.selectedIndex
        if (selectedIndex > -1) {
          const index = this.models.findIndex(value => value === this.selectedDatabaseValue)
          this.models.splice(index, 1)
        }
        if (this.models.length > 0) {
          selectedIndex = Math.min(selectedIndex, this.models.length - 1)
          this.selectedDatabaseValue = this.models[selectedIndex]
        } else {
          this.selectedDatabaseValue = ''
        }
        this.updateDropdownIndex()
      },
      updateDropdownIndex() {
        if (this.$refs.availableDropdown.selectedIndex === -1) {
          if (this.databases.length > 0) {
            this.availableDatabaseValue = this.databases[0]
          }
        } 
        if (this.$refs.selectedDropdown.selectedIndex === -1) {
          if (this.models.length > 0) {
            this.selectedDatabaseValue = this.models[0]
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vertical-center {
    top: 50% !important
  }
</style>
