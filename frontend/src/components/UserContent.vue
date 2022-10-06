<template>
  <v-main
    style="padding-top: 5%; padding-left: 30%; padding-right: 30%"
  >
    <v-card
        justify="center"
        class="text-xs-center"
        height="60%"
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
            >
            </v-text-field>
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
  })
}
</script>

<style scoped>

</style>