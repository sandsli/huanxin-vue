import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import im from '@/components/WebIM'
var websdk = require('easemob-websdk');

class chat extends Vue {

  /**
   * 登录
   */
  public login(username: string, password: string) {
    var that = this
    return new Promise(function(resolve,reject){
      var options = {
        apiUrl: that.$WebIM.config.apiURL,
        user: username,
        pwd: password,
        appKey: that.$WebIM.config.appkey,
        success: (res: any) => {
          that.SetCurrentUser(res, password, that);
          resolve();
        },
        error: () => {
          alert("登陆失败");
          reject();
        }
      };
  
      that.$imConn.open(options);
    })
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

  /**
   * 验证登录状态
   */
  public validateLogin() {
    let that = this;
    return new Promise(function (resolve, reject) {
      if (that.$currentUser.access_token != undefined) {
        resolve(that.$currentUser)
        return;
      }
      let cookieToken = that.$WebIM.utils.getCookie()["webim_token"];
      let cookieUsername = that.$WebIM.utils.getCookie()["webim_user"];
      let cookiePassword = that.$WebIM.utils.getCookie()["webim_pwd"];
      if (cookieToken == undefined) {
        //跳出登录
        reject();
        return;
      }

      //重新登陆
      let options = {
        apiUrl: that.$WebIM.config.apiURL,
        user: cookieUsername,
        // accessToken: cookieToken,
        pwd: cookiePassword,
        appKey: that.$WebIM.config.appkey,
        success: (res: any) => {
          that.SetCurrentUser(res, cookiePassword, that)
          resolve(res)
        },
        error: () => {
          alert('登陆发生异常')
        }
      };
      that.$imConn.open(options);
    })

  }
  //退出
  public loginout() {
    this.$imConn.close();
  }

  public getGroup() {
    var that = this;
    return new Promise(function (resolve, reject) {
      let options = {
        success: (resp: any) => {
          console.log("Response: ", resp);
          resolve(resp);
        },
        error: (e: any) => {
          reject(e);
        }
      };
      that.$imConn.getGroup(options);
    })
  }

  public listGroupMember(groupid: string) {
    var that = this;
    return new Promise(function (resolve, reject) {
      var pageNum = 1,
        pageSize = 1000;
      var options = {
        pageNum: pageNum,                                               // 页码
        pageSize: pageSize,                                             // 预期每页获取的记录数
        groupId: groupid,
        success: function (resp: any) {
          console.log("Response: ", resp)
          resolve(resp);
        },
        error: function (e: any) {
          reject(e);
        }
      };
      that.$imConn.listGroupMember(options);
    });

  }

  /**
   * 给群组发送消息
   */
  public sendMsgToGroup(uname: string, groupid: string, msgCon: string, ) {
    debugger
    let that = this;
    return new Promise(function (resolve, reject) {

      let id = that.$imConn.getUniqueId();                 // 生成本地消息id
      let msg = new that.$WebIM.message('txt', id);      // 创建文本消息
      let option = {
        msg: msgCon,             // 消息内容
        to: groupid,                     // 接收消息对象(群组id)
        roomType: false,                    // 群聊类型，true时为聊天室，false时为群组
        success: function (id: string, serverMsgId: string) {
          console.log('send room text success');
          resolve({
            id: serverMsgId,
            type: 'groupchat',
            from: uname,
            to: groupid,
            data: msgCon,
            ext: {},
            head: ""
          });
        },                                  // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
        fail: function () {
          console.log('failed');
          reject();
        }                                   // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
      };
      msg.set(option);
      msg.setGroup('groupchat');
      that.$imConn.send(msg.body);
    });
  }
}

export default new chat()