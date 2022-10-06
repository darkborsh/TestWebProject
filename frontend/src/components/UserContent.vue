<template>
  <v-main
    style="padding-top: 5%; padding-left: 10%; padding-right: 10%"
  >
    <v-card
        justify="center"
        class="text-xs-center"
        width="50%"
    >
      <v-card-title>
        Информация о сотруднике
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            ФИO (полностью*)
            <v-text-field
                v-model="this.$store.getters.getEmplById.fio"
                :rules="this.$store.getters.getFioRule"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            Серия паспорта
            <v-text-field
                v-model="this.$store.getters.getEmplById.passSeria"
                :rules="this.$store.getters.getPassSeriaRule"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            Номер паспорта
            <v-text-field
                v-model="this.$store.getters.getEmplById.passNo"
                :rules="this.$store.getters.getPassNoRule"
            >
            </v-text-field>
          </v-col>
          <v-col
              cols="12"
              sm="12"
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
                    @click="$refs.menu.save(date)"
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
    date: null
  }),

  methods: {
    callDeleteEmployee() {
      let key = this.keyStorage
      let deletingId = this.$store.getters.getSelectedItem
      this.$store.dispatch("deleteEmployee", { key, deletingId })
    }
  }
}
</script>

<style scoped>

</style>