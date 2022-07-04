<template>
  <div class="animated fadeIn">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";
// Font Wep App
@font-face {
  font-family: montserrat;
  src: url("./assets/montserrat/Montserrat-Regular.ttf");
  /* font-weight: bold; */
}
* {
  font-family: montserrat;
}

body::-webkit-scrollbar {
  width: 5px;
}
 
body::-webkit-scrollbar-thumb {
  background: #666; 
}

body::-webkit-scrollbar-button {display:none}
</style>
