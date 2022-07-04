<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        v-if="urlAvatar !== null"
        :src="urlAvatar"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
      <img
        v-else
        src="img/avatars/user.png"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <!-- <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" /> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" /> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks" /> Tasks
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments" /> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item> -->
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
       <b-dropdown-item @click="profile"><router-link style="text-decoration:none" :to="{name : 'โปรไฟล์'}"><i class="fa fa-user" /> Profile</router-link></b-dropdown-item>
       <!-- <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item> 
       <b-dropdown-item><i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item> -->
      <b-dropdown-divider class="d-lg-none" />
      <b-dropdown-item class="d-lg-none" v-if="token" @click="logout"><i class="fa fa-lock"  />Sign Out</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue';
import {mapGetters} from 'vuex';
import firebase from 'firebase/firebase';
import { BoardService } from "@/services/BoardService";
const boardService = new BoardService();
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  computed: {
     ...mapGetters({
        token: "user/token",
        username: "user/username",
        stat: "user/stat",
        urlAvatar: "user/urlAvatar"
      })
  },
  methods:{
      profile(){
        this.$router.push('/profile')
      },
      logoutSocial(){
        boardService.fetchSignout({token : 'token'})
          .then(() => {
            return;
          }).catch(err => {
            alert(err)
          });
      },
      logout: function(){
        const self = this;
        if(this.stat === true) {
          boardService.fetchSignout({token : 'token'})
          .then(() => {
            alert('Sign-out successful.')
            self.$store.dispatch('user/logout');
            self.$store.dispatch('food/deleteData');
            self.$router.push("/pages/signin");
          }).catch(err => {
            alert(err)
          });
        } else {
          firebase.auth().signOut().then(function(){
            alert('Sign-out successful.')
            self.logoutSocial();
            self.$store.dispatch('user/logout');
            self.$store.dispatch('food/deleteData');
            self.$router.push("/pages/signin");
          }).catch(function(error) {
            alert("Oops. " + error.message)
          });
        }
    }
  },
}
</script>
