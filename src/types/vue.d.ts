//声明Vue自定义属性
import Vue from 'vue'
import { CurrentUserInfo } from '@/components/WebIM';

declare module "vue/types/vue" {
  interface Vue {
    $WebIM: any,
    $imConn: any,
    $currentUser:CurrentUserInfo
  }
}
