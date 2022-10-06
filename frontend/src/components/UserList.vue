<template>
  <v-navigation-drawer>
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
                        :rules="this.$store.getters.getFioRule"
                        ref="empInput1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="typedPassSeria"
                        label="Серия паспорта*"
                        :rules="this.$store.getters.getPassSeriaRule"
                        ref="empInput2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="typedPassNo"
                        label="Номер паспорта*"
                        :rules="this.$store.getters.getPassNoRule"
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
                  @click="this.callSaveEmployee"
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
          v-for="emp in allEmpls"
        >
          <v-list-item-content>
            <v-list-item-title
                v-text="getSurnameWithInits(emp)"
            >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: "UserList",

  watch: {
    selectedItem (val) {
      this.$store.dispatch("selectItem", val)
    }
  },

  computed: {
    allEmpls() {
      return this.$store.getters.getAllEmpls
    }
  },

  data: () => ({
    selectedItem: 0,
    menu: false,
    modal: false,
    addEmplDialog: false,
    keyStorage: "empStorage",
    initialDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    typedFio: null,
    typedPassSeria: null,
    typedPassNo: null
  }),

  created() {
    if (localStorage.getItem(this.keyStorage) === null) {
      localStorage.setItem(this.keyStorage, JSON.stringify([]))
      this.$store.dispatch("fetchEmpls", this.keyStorage)
    } else {
      this.$store.dispatch("fetchEmpls", this.keyStorage)
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
      this.date = this.initialDate
    },

    getSurnameWithInits(emp) {
      let splitedFio = emp.fio.split(" ")
      if (splitedFio.length === 3) {
        return splitedFio[0] + ' ' + splitedFio[1].charAt(0) + '.' + ' ' + splitedFio[2].charAt(0) + '.'
      } else {
        console.log("Wrong Fio parameters: " + emp.fio)
      }
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
      let key = this.keyStorage
      this.$store.dispatch("saveEmployee", { key, emp, inputValidations }).then(response => {
        if (response) this.clearDialog()
      })
    }
  }
}
</script>

<style scoped/>