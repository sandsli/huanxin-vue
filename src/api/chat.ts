import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import im from '@/components/WebIM'
var websdk = require('easemob-websdk');

class chat extends Vue {

  public login(username: string, password: string, callback: Function) {
    debugger;
    var that = this
    var options = {
      apiUrl: this.$WebIM.config.apiURL,
      user: username,
      pwd: password,
      appKey: this.$WebIM.config.appkey,
      success: (res: any) => {
        debugger;
        this.SetCurrentUser(res, password, that);
        // that.$currentUser = res;
        // let token = res.access_token;
        // //存储token到本地 方便二次登陆
        // that.$WebIM.utils.setCookie("webim_token", token, 1);
        // that.$WebIM.utils.setCookie("webim_user", res.user.username, 1);
        callback();
      },
      error: () => {
        alert("登陆失败");
      }
    };

    that.$imConn.open(options);

  }

  // 更新本地用户信息
  private SetCurrentUser(res: any, pwd: string, that: Vue) {
    that.$currentUser = res;
    let token = res.access_token;
    //存储token到本地 方便二次登陆
    that.$WebIM.utils.setCookie("webim_token", token, 1);
    that.$WebIM.utils.setCookie("webim_user", res.user.username, 1);
    that.$WebIM.utils.setCookie("webim_pwd", pwd, 1);
  }

  //验证登录状态
  public validateLogin(success: (res: any) => any, error: () => any): void {
    debugger;
    // if (this.$currentUser.access_token != undefined) {
    //   success(this.$currentUser)
    //   return;
    // }
    var cookieToken = this.$WebIM.utils.getCookie()["webim_token"];
    var cookieUsername = this.$WebIM.utils.getCookie()["webim_user"];
    var cookiePassword = this.$WebIM.utils.getCookie()["webim_pwd"];
    if (cookieToken == undefined) {
      //跳出登录
      error();
      return;
    }
    //重新登陆
    var that = this;
    var options = {
      apiUrl: this.$WebIM.config.apiURL,
      user: cookieUsername,
      // accessToken: cookieToken,
      pwd: cookiePassword,
      appKey: this.$WebIM.config.appkey,
      success: (res: any) => {
        debugger
        this.SetCurrentUser(res, cookiePassword, that)
        success(res)
      },
      error: () => {
        debugger;
      }
    };
    debugger;
    let webIM = (<any>window).WebIM = websdk;
    this.$WebIM = webIM;
    this.$imConn = im.conn();
    this.$imConn.open(options);
  }
  //退出
  public loginout() {
    this.$imConn.close();
  }

  public getGroup() {
    // let options: any = {
    //   success: function (resp: any) {
    //     console.log("Response: ", resp)
    //   },
    //   error: function (e: any) { }
    // }
    // this.$imConn.getGroup(options);
  }

}

export default new chat()