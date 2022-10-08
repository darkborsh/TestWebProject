<template>
  <div style="display: flex; height: 100%; width: 100%">
    <user-list :is-delete-called="isDeleteCalled" :employee="employeeToUpdate" @showEmployee="showEmployee"/>
    <v-main
        style="margin-left: 20%;"
    >
      <v-card
          justify="center"
          class="text-xs-center"
          width="50%"
          v-if="employeeToShow !== null"
      >
        <v-card-title>
          Информация о сотруднике
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" style="font-size: 18px; font-weight: bold">
              ФИО (полностью*) : {{ this.employeeToShow.fio }}
              <v-text-field
                  v-model="inputFio"
                  :rules="fioRule"
                  ref="inputFio"
                  @change="checkAllInputFields"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" style="font-size: 18px; font-weight: bold">
              Серия паспорта : {{ this.employeeToShow.passSeria }}
              <v-text-field
                  v-model="inputPassSeria"
                  :rules="passSeriaRule"
                  ref="inputPassSeria"
                  @change="checkAllInputFields"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" style="font-size: 18px; font-weight: bold">
              Номер паспорта : {{ this.employeeToShow.passNo }}
              <v-text-field
                  v-model="inputPassNo"
                  :rules="passNoRule"
                  ref="inputPassNo"
                  @change="checkAllInputFields"
              >
              </v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="12"
                style="font-size: 18px; font-weight: bold"
            >
              Дата регистрации паспорта : {{ this.employeeToShow.passDate }}
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                      @click:clear="clearDate"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                    locale="rus"
                    v-model="date"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                  >
                    Закрыть
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="saveDate"
                  >
                    ОК
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-btn
                  color="pink"
                  class="white--text"
                  @click="callChildsDeteleMethod"
              >
                Удалить
              </v-btn>
              <v-btn
                  style="margin-left: 10px"
                  color="green"
                  class="white--text"
                  :disabled="!changed"
                  @click="callUpdateEmployee"
              >
                Сохранить
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-main>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import UserList from '../components/UserList'

  export default {
    name: 'Home',

    components: {
      UserList
    },

    data: () => ({
      isDeleteCalled: false,
      employeeToShow: null,
      employeeToUpdate: null,
      menu: false,
      modal: false,
      date: null,
      changed: false,
      inputFio: "",
      inputPassSeria: "",
      inputPassNo: "",
      correctFio: false,
      correctNo: false,
      correctSeria: false,
      fioRule: [
        v => ( v && v.trim().split(" ").length === 3 ) || "ФИО должно быть написано корректно"
      ],
      passSeriaRule: [
        v => ( v && new RegExp("^\\d{4}$").test(v) ) || "Серия паспорта должна содержать 4 цифры"
      ],
      passNoRule: [
        v => ( v && new RegExp("^\\d{6}$").test(v) ) || "Номер паспорта должен содержать 6 цифр"
      ]
    }),

    methods: {
      showEmployee(emp) {
        this.employeeToShow = emp
      },

      callChildsDeteleMethod() {
        this.isDeleteCalled = !this.isDeleteCalled
      },

      saveDate() {
        this.$refs.menu.save(this.date)
        this.checkAllInputFields()
      },

      clearDate() {
        this.date = null
        this.checkAllInputFields()
      },

      checkAllInputFields() {
        let isEmptyFio = this.inputFio === ""
        let isEmptySeria = this.inputPassSeria === ""
        let isEmptyNo = this.inputPassNo === ""
        this.changed =
            (this.$refs.inputFio.validate() || isEmptyFio) &&
            (this.$refs.inputPassNo.validate() || isEmptyNo) &&
            (this.$refs.inputPassSeria.validate() || isEmptySeria)
        if (isEmptyFio) {
          this.$refs.inputFio.reset()
          this.inputFio = ""
        }
        if (isEmptySeria) {
          this.$refs.inputPassSeria.reset()
          this.inputPassSeria = ""
        }
        if (isEmptyNo) {
          this.$refs.inputPassNo.reset()
          this.inputPassNo = ""
        }
        if (isEmptyFio && isEmptySeria && isEmptyNo && this.date === null) {
          this.changed = false
        }
      },

      callUpdateEmployee() {
        let fio = this.inputFio
        if (fio === "") fio = this.employeeToShow.fio
        let passSeria = this.inputPassSeria
        if (passSeria === "") passSeria = this.employeeToShow.passSeria
        let passNo = this.inputPassNo
        if (passNo === "") passNo = this.employeeToShow.passNo
        let passDate = this.date
        if (passDate === null) passDate = this.employeeToShow.passDate
        else passDate = dayjs(this.date).format("YYYY-MM-DDThh:mm:ssZ")
        this.employeeToUpdate = {
          fio: fio,
          passSeria: passSeria,
          passNo: passNo,
          passDate: passDate
        }
      }
    }
  }
</script>

<style scoped/>
