<template>
  <div style="display: flex; height: 100%; width: 100%">
    <user-list/>
    <v-main
        style="margin-left: 20%;"
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
              <v-text-field
                  v-model="inputFio"
                  :rules="fioRule"
                  ref="inputFio"
                  @change="this.acceptChangingFio"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" style="font-size: 18px; font-weight: bold">
              Серия паспорта :
              <v-text-field
                  v-model="inputPassSeria"
                  :rules="passSeriaRule"
                  ref="inputPassSeria"
                  @change="this.acceptChangingSeria"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" style="font-size: 18px; font-weight: bold">
              Номер паспорта :
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
              Дата регистрации паспорта :
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
  </div>
</template>

<script>
  import UserList from '../components/UserList'

  export default {
    name: 'Home',

    components: {
      UserList
    },
  }
</script>

<style scoped/>
