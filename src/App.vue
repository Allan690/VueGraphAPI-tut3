<template>
  <div id="app">
     {{ display }}
     <github-followers-component users-name="allan690" v-on:user-filter="customEventHandler"></github-followers-component>
  </div>
</template>

<script>

import GithubFollowersComponent from "@/components/GithubFollowers";
export default {
  name: 'app',
  data() {
    return { display: ''}
  },
  components: {
    GithubFollowersComponent
  },
  methods: {
    customEventHandler(data) {
      this.display = `${data} was selected`;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
