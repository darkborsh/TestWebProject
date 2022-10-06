<template>
  <div style="display: flex; height: 100%; width: 100%">
    <user-list/>
    <user-content/>
  </div>
</template>

<script>
  import UserList from '../components/UserList'
  import UserContent from '../components/UserContent'

  export default {
    name: 'Home',

    components: {
      UserList,
      UserContent
    },
  }
</script>

<style scoped/>
