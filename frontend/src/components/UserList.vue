<template>
  <v-navigation-drawer absolute permanent width="15%">
    <v-list>
      <v-subheader style="font-size: 1.2rem; font-weight: bold; user-select: none">Список сотрудников</v-subheader>
      <v-subheader>
        <v-dialog
            v-model="addEmplDialog"
            persistent
            max-width="35%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                width="100%"
                style="font-size: 0.7em"
            >
              Добавить сотрудника
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Профиль сотрудника</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                        v-model="typedFio"
                        label="ФИО (полностью)*"
                        :rules="fioRule"
                        ref="empInput1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="typedPassSeria"
                        label="Серия паспорта*"
                        :rules="passSeriaRule"
                        ref="empInput2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="typedPassNo"
                        label="Номер паспорта*"
                        :rules="passNoRule"
                        ref="empInput3"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="12"
                  >
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
                            label="Выберите дату регистрации паспорта"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
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
                            @click="$refs.menu.save(date)"
                        >
                          ОК
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="clearDialog"
              >
                Отмена
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="callSaveEmployee"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        style="margin-top: 5px"
      >
        <v-list-item
          v-for="employee in employees"
          @click="showEmployee(employee)"
        >
          <v-list-item-content>
            <v-list-item-title
                v-text="getSurnameWithInits(employee)"
            >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import dayjs from "dayjs";

export default {
  name: "UserList",
  props: {
    isDeleteCalled: {
      value: Boolean
    },
    employee: {
      fio: String,
      passSeria: String,
      passNo: String,
      passDate: Date
    }
  },

  watch: {
    employees() {
    },

    isDeleteCalled() {
      this.deleteEmployee()
    },

    employee() {
      this.resaveEmployee()
    }
  },

  data: () => ({
    employees: [],
    selectedItem: 0,
    menu: false,
    modal: false,
    addEmplDialog: false,
    date: dayjs().format('YYYY-MM-DD'),
    typedFio: null,
    typedPassSeria: null,
    typedPassNo: null,
    fioRule: [
      v => !!v || "Это поле обязательно",
      v => ( v && v.trim().split(" ").length === 3 ) || "ФИО должно быть написано корректно"
    ],
    passSeriaRule: [
      v => !!v || "Это поле обязательно",
      v => ( v && new RegExp("^\\d{4}$").test(v) ) || "Серия паспорта должна содержать 4 цифры"
    ],
    passNoRule: [
      v => !!v || "Это поле обязательно",
      v => ( v && new RegExp("^\\d{6}$").test(v) ) || "Номер паспорта должен содержать 6 цифр"
    ]
  }),

  created() {
    if (localStorage.getItem("empStorage") === null) {
      localStorage.setItem("empStorage", JSON.stringify([]))
    } else {
      this.employees = JSON.parse(localStorage.getItem("empStorage"))
      if (this.employees.length !== 0) {
        this.showEmployee(this.employees[0])
      }
    }
  },

  methods: {
    clearDialog() {
      this.addEmplDialog = false
      //selecting all empInput for clearing input forms
      for (let [key, value] of Object.entries(this.$refs)) {
        if (/^empInput/.test(key)) {
          value.reset()
        }
      }
      this.date = dayjs().format('YYYY-MM-DD')
    },

    getSurnameWithInits(employee) {
      let splitedFio = employee.fio.split(" ")
      if (splitedFio.length === 3) {
        return splitedFio[0] + ' ' + splitedFio[1].charAt(0) + '.' + ' ' + splitedFio[2].charAt(0) + '.'
      } else {
        console.log("Wrong Fio parameters: " + employee.fio)
      }
    },

    deleteEmployee() {
      this.employees.splice(this.selectedItem, 1)
      localStorage.setItem("empStorage", JSON.stringify(this.employees))
      this.selectedItem = null
      this.showEmployee(null)
    },

    saveEmployee(emp, inputValidations) {
      let valid = inputValidations.fioValidate && inputValidations.passSeriaValidate && inputValidations.passNoValidate
      if (valid) {
        emp.passDate = dayjs(emp.passDate).format("YYYY-MM-DDThh:mm:ssZ")
        this.employees.push(emp)
        localStorage.setItem("empStorage", JSON.stringify(this.employees))
        this.clearDialog()
        if (this.selectedItem === 0) this.showEmployee(this.employees[this.selectedItem])
      } else {
        console.log(
            "Wrong saving employee data: " +
            emp.fio +
            " " +
            emp.passSeria +
            " " +
            emp.passNo
        )
      }
    },

    resaveEmployee() {
      this.employees.splice(this.selectedItem, 1, this.employee)
      localStorage.setItem("empStorage", JSON.stringify(this.employees))
      this.showEmployee(this.employees[this.selectedItem])
    },

    callSaveEmployee() {
      let emp = {
        fio: this.typedFio,
        passSeria: this.typedPassSeria,
        passNo: this.typedPassNo,
        passDate: this.date
      }
      let inputValidations = {
        fioValidate: this.$refs.empInput1.validate(),
        passSeriaValidate: this.$refs.empInput2.validate(),
        passNoValidate: this.$refs.empInput3.validate()
      }
      this.saveEmployee(emp, inputValidations)
    },

    showEmployee(emp) {
      if (emp !== null) emp.passDate = dayjs(emp.passDate).format("YYYY-MM-DD")
      this.$emit("showEmployee", emp)
    }
  }
}
</script>

<style scoped/>