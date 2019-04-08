<template>
  <div class="app-wrapper">
    <div class="main-container">
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view/>
        </transition>
      </section>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";

@Component({
  components: {}
})
export default class Layout extends Vue {
 
}
</script>


<style lang="scss" scoped>
// .app-wrapper {
//   position: relative;
//   height: 100%;
//   width: 100%;
//   &.mobile.openSidebar {
//     position: fixed;
//     top: 0;
//   }
// }
// .drawer-bg {
//   background: #000;
//   opacity: 0.3;
//   width: 100%;
//   top: 0;
//   height: 100%;
//   position: absolute;
//   z-index: 999;
// }

// .app-main {
//   /*84 = navbar + tags-view = 50 +34 */
//   min-height: calc(100vh - 84px);
//   width: 100%;
//   position: relative;
//   overflow: hidden;
// }
</style>




