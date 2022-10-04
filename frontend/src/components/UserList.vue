<template>
  <v-navigation-drawer>
    <v-list>
      <v-subheader style="font-size: 1.2rem; font-weight: bold">Список сотрудников</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="emp in emps"
        >
          <v-list-item-content>
            <v-list-item-title v-text="emp.text"></v-list-item-title>
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
    emp: {
      "fio": null,
      "pass_ser": null,
      "pass_no": null,
      "pass_dt": null
    },
    emps: [
      { text: 'Real-Time' },
      { text: 'Audience' },
      { text: 'Conversions' },
      { text: 'Real-Time' },
      { text: 'Audience' },
      { text: 'Conversions' },
      { text: 'Real-Time' },
      { text: 'Audience' },
      { text: 'Conversions' },
    ],
  }),
}
</script>

<style scoped/>