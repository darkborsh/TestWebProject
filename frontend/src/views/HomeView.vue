<template>
  <user-list/>
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
