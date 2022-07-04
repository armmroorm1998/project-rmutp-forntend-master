<template>
  <div class="app">
    <AppHeader class="bg-header border-0" fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/dashboard">
        <img
          class="navbar-brand-full"
          src="img/logoB.png"
          width="130"
          height="30"
          alt="Barn Arharn"
        />
        <img
          class="navbar-brand-minimized"
          src="img/logoS.png"
          width="30"
          height="30"
          alt="Barn Arharn"
        />
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />
      <!-- <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">Settings</b-nav-item>
      </b-navbar-nav> -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item> -->
        <span class="text-white" v-if="this.username || null"> <i class="fa fa-user" /> {{this.username || null}}</span>
        <img  v-if="urlAvatar !== null && stat === false"  :src="urlAvatar"  border-radius  height="40" class="ml-2 rounded-circle" 
        alt="admin@bootstrapmaster.com" />
        <DefaultHeaderDropdownAccnt v-if="stat === true" />
        <a class="register-button d-md-down-none" @click="logout" href="#" v-if="token">
          <i class="nav-icon icon-logout"></i> ออกจากระบบ
        </a>
         <router-link class="register-button" :to="{name : 'SignIn'}" v-else>
          <i class="nav-icon icon-login"></i> ลงชื่อเข้าใช้
         </router-link>
      </b-navbar-nav>
      <!-- <AsideToggler class="d-none d-lg-block" /> -->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar class="bg-sidebar" fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <DefaultAside />
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://coreui.io">CoreUI</a>
        <span class="ml-1">&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI for Vue</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from "@/_nav";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
import firebase from 'firebase/app';
import { BoardService } from "@/services/BoardService";
const boardService = new BoardService();
import {mapGetters} from 'vuex';
export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      nav: nav.items
    };
  },
  methods:{
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
  computed: {
    ...mapGetters({
        token: "user/token",
        username: "user/username",
        stat: "user/stat",
        urlAvatar: "user/urlAvatar"
      }),
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  }
};
</script>

<style lang="scss">
.bg-header {
  // background-image: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)!important; //Color header
  background-image: url('/img/header6.png');
}
.bg-sidebar {
//  background: linear-gradient(40deg,#ffecd2 0% , #fcb69f 12%, #ffecd2 90%)!important; //Color sidebars
  background-image: url('/img/sidebar.png');
}
.sidebar .nav-link { //text sidebar 
  color: #000000;  
  font-size: 16px;
}
.sidebar .nav-title { //text-title sidebar
  color: #000000;
}
.sidebar .nav-link:hover { //Color dropdown
  color: #000000;
  background: linear-gradient(40deg, #fcb69f 0%, #ffecd2 100%)!important
}

.app-footer {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)!important; //Color footer
  // background-image: url('/img/footer.png');
}
.breadcrumb {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)!important;
  // background-image: url('/img/breadcrumb.png');
}
.navbar-nav .nav-link {
  color: #000000;
  font-size: 16px;
}
// span.active{
//   color: #fff;
// }
// a.router-link-active {
//     color: #fff;
// }
.sidebar .nav-link {
   background-image: url('/img/sign.png');
}
.sidebar .sidebar-minimizer {
  // background: linear-gradient(40deg, #ffecd2 0%, #fcb69f 50%)!important; //Color minimizer
  background-image: url('/img/toggle.png');
}
.nav-dropdown-items  {
  background: linear-gradient(40deg, #fcb69f 0%, #ffecd2 100%)!important; //Color dropdown-item
}
.sidebar-minimized .sidebar .nav-item:hover > .nav-link {
  background: linear-gradient(40deg, #fcb69f 0%, #ffecd2 100%)!important;
}
.sidebar-minimized .sidebar .nav > .nav-dropdown:hover {
  background: rgba(0, 0, 0, 0);
}
.sidebar .nav-dropdown.open {
    background: rgba(0, 0, 0, 0);
}
.sidebar .nav-dropdown.open .nav-link {
    color: #000000;
    border-left: 0;
}
.sidebar .nav-link .nav-icon {
  color: #000000;
}
.app-header .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2.25' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")
}

.register-button {  // button Sign Out
    background: rgba(0, 0, 0, 0);
    color: #000000;
    padding: 5px 25px;
     background-image: url('/img/buttonSignin.png');
}

.register-button:hover { // hover button Sign Out
    background-color: white;
    background: linear-gradient(40deg, #fcb69f 10%, #fcb69f 100%);
    color: #000000;
}
@media (min-width: 992px){
  .sidebar-minimized .sidebar .nav-link {
     background-image: url();
  }
}

.app-body{
  background-image: url("/img/Foods/bg3.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
}
</style>
