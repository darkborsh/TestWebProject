<template>
  <v-main
    style="padding-top: 5%; padding-left: 5%"
  >
    <v-card
        justify="center"
        class="text-xs-center"
        width="50%"
        v-if="this.$store.getters.getSelectedItem >= 0"
    >
      <v-card-title>
        Информация о сотруднике
      </v-card-title>
      <v-subheader v-if="changed">
        Неверные поля не будут учитываться при сохранении*
      </v-subheader>
      <v-card-text>
        <v-row>
          <v-col cols="12" style="font-size: 18px; font-weight: bold">
            ФИO : {{ this.$store.getters.getEmplById.fio }}
            <v-text-field
                v-model="inputFio"
                :rules="fioRule"
                ref="inputFio"
                @change="this.acceptChangingFio"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" style="font-size: 18px; font-weight: bold">
            Серия паспорта : {{ this.$store.getters.getEmplById.passSeria }}
            <v-text-field
                v-model="inputPassSeria"
                :rules="passSeriaRule"
                ref="inputPassSeria"
                @change="this.acceptChangingSeria"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" style="font-size: 18px; font-weight: bold">
            Номер паспорта : {{ this.$store.getters.getEmplById.passNo }}
            <v-text-field
                v-model="inputPassNo"
                :rules="passNoRule"
                ref="inputPassNo"
                @change="this.acceptChangingNo"
            >
            </v-text-field>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              style="font-size: 18px; font-weight: bold"
          >
            Дата регистрации паспорта : {{ this.$store.getters.getEmplById.passDate }}
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
              @click="this.callDeleteEmployee"
            >
              Удалить
            </v-btn>
            <v-btn
                style="margin-left: 10px"
                color="green"
                class="white--text"
                :disabled="!changed"
                @click="callResaveEmployee"
            >
              Сохранить
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>

export default {
  name: "UserContent",

  data: () => ({
    keyStorage: "empStorage",
    menu: false,
    modal: false,
    date: null,
    changed: false,
    inputFio: null,
    inputPassSeria: null,
    inputPassNo: null,
    correctFio: false,
    correctNo: false,
    correctSeria: false,
    fioRule: [
      v => ( v.trim().split(" ").length === 3 ) || "ФИО должно быть написано корректно"
    ],
    passSeriaRule: [
      v => ( new RegExp("^\\d{4}$").test(v) ) || "Серия паспорта должна содержать 4 цифры"
    ],
    passNoRule: [
      v => ( new RegExp("^\\d{6}$").test(v) ) || "Номер паспорта должен содержать 6 цифр"
    ]
  }),

  methods: {
    callDeleteEmployee() {
      let key = this.keyStorage
      let deletingId = this.$store.getters.getSelectedItem
      this.$store.dispatch("deleteEmployee", { key, deletingId })
    },

    acceptChangingFio() {
      this.correctFio = !!this.$refs.inputFio.validate();
      this.changed = (this.correctFio || this.correctSeria || this.correctNo)
      if (this.inputFio === "") this.$refs.inputFio.reset()
    },

    acceptChangingSeria() {
      this.correctSeria = !!this.$refs.inputPassSeria.validate();
      this.changed = (this.correctFio || this.correctSeria || this.correctNo)
      if (this.inputPassSeria === "") this.$refs.inputPassSeria.reset()
    },

    acceptChangingNo() {
      this.correctNo = !!this.$refs.inputPassNo.validate();
      this.changed = (this.correctFio || this.correctSeria || this.correctNo)
      if (this.inputPassNo === "") this.$refs.inputPassNo.reset()
    },

    saveDate() {
      this.$refs.menu.save(this.date)
      this.changed = true
    },

    callResaveEmployee() {
      let fio, passSeria, passNo, passDate
      if (this.correctFio) fio = this.inputFio
      else fio = this.$store.getters.getEmplById.fio
      if (this.correctSeria) passSeria = this.inputPassSeria
      else passSeria = this.$store.getters.getEmplById.passSeria
      if (this.correctNo) passNo = this.inputPassNo
      else passNo = this.$store.getters.getEmplById.passNo
      if (this.date !== null) passDate = this.date
      else passDate = this.$store.getters.getEmplById.passDate
      let resavedEmpl = {
        fio: fio,
        passSeria: passSeria,
        passNo: passNo,
        passDate: passDate
      }
      let key = this.keyStorage
      let resavingId = this.$store.getters.getSelectedItem
      this.$store.dispatch("resaveEmployee", { resavedEmpl, key, resavingId })
    }
  }
}
</script>

<style scoped>

</style>