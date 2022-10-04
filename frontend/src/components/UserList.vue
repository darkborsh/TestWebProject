<template>
  <v-navigation-drawer>
    <v-list>
      <v-subheader style="font-size: 1.2rem; font-weight: bold; user-select: none">Список сотрудников</v-subheader>
      <v-subheader>
        <v-btn
            color="primary"
            dark
        >
          Добавить сотрудника
        </v-btn>
      </v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        style="margin-top: 5px"
      >
        <v-list-item
          v-for="emp in emps"
        >
          <v-list-item-content>
            <v-list-item-title v-text="getSurnameWithInits(emp)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "UserList",
  data: () => ({
    selectedItem: 0,
    emps: [
      {fio: "Толстой Лев Николаевич"},
    ],
  }),

  methods: {
    getSurnameWithInits(emp) {
      let splitedFio = emp.fio.split(" ")
      if (splitedFio.length === 3) {
        return splitedFio[0] + ' ' + splitedFio[1].charAt(0) + '.' + ' ' + splitedFio[2].charAt(0) + '.'
      } else {
        console.log("Wrong Fio parameters: " + emp.fio)
        this.selectedItem = null
      }
    },
  }
}
</script>

<style scoped/>