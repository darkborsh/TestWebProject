<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      black
    >
      <div class="ma4">
        <div class="text-h5 white--text" style="user-select: none">Test Project</div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
