<template>
  <div class="main">
    <div id="chat">
      <div class="sidebar">
        <div class="m-card">
          <header>
            <img class="avatar" width="40" height="40" alt="Coffce" src="images/1.jpg">
            <p class="name">{{currentUser.nickname}}</p>
          </header>
          <footer>
            <input class="search" placeholder="search user...">
          </footer>
        </div>
        <!--v-component-->
        <div class="m-list">
          <ul>
            <!--v-for-start-->
            <li v-for="item in groups" :key="item.groupid" @click="chat(item)">
              <img class="avatar" width="30" height="30" alt="示例介绍" src="images/group_user.png">
              <p class="name">{{item.groupname}}</p>
            </li>
            <!--v-for-end-->
          </ul>
        </div>
        <!--v-component-->
      </div>
      <div class="main">
        <div class="m-message">
          <ul>
            <!--v-for-start-->
            <li>
              <p class="time">
                <span>18:55</span>
              </p>
              <div class="main">
                <img class="avatar" width="30" height="30" src="images/2.png">
                <div
                  class="text"
                >Hello，这是一个基于Vue + Webpack构建的简单chat示例，聊天记录保存在localStorge。简单演示了Vue的基础特性和webpack配置。</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:55</span>
              </p>
              <div class="main">
                <img class="avatar" width="30" height="30" src="img/images/2.png">
                <div class="text">项目地址: https://github.com/coffcer/vue-chat</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">sadasdadas</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">asdasda</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">asasdasd</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">sfsdfsd</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">sdfsdf</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">sdfsdf</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">sdfsdf</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">sdfsdf</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">sfsfsd</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>18:56</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">sdfs</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>19:7</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="img/images/1.jpg">
                <div class="text">啊实打实大</div>
              </div>
            </li>
            <!--v-for-end-->
          </ul>
        </div>
        <!--v-component-->
        <div class="m-text">
          <textarea placeholder="按 Ctrl + Enter 发送"></textarea>
        </div>
        <!--v-component-->
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
import chat from "@/api/chat";
import { validateLocaleAndSetLanguage } from "typescript";
import { CurrentUserInfo } from "@/components/WebIM";

interface Message {
  content: string;
  head: string;
}

interface GroupInfo {
  groupname: string;
  groupid: string;
}

@Component({ name: "HomeIndex" })
export default class HomeIndex extends Vue {
  private groups: GroupInfo[] = [];
  private currentUser: CurrentUserInfo = {} as CurrentUserInfo;

  mounted() {
    // this.bindGroup();
    let that = this;
    chat.validateLogin(
      (res: any) => {
        debugger;
        that.currentUser = res;
        that.onload();
        that.bindGroup();
      },
      () => {
        this.$router.push("/login");
      }
    );
  }

  private bindGroup() {
    let that = this;
    let options = {
      success: (resp: any) => {
        console.log("Response: ", resp);
        that.groups = resp.data;
        debugger;
      },
      error: (e: any) => {}
    };
    debugger;
    this.$imConn.getGroup(options);
  }

  private onload() {
    // debugger;

    this.$imConn.listen({
      onOpened: function(message: any) {
        alert("连接成功回调");
        //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();
      },
      onClosed: function(message: any) {}, //连接关闭回调
      onTextMessage: function(message: any) {
        debugger;
        alert(message);
      }, //收到文本消息
      onEmojiMessage: function(message: any) {}, //收到表情消息
      onPictureMessage: function(message: any) {}, //收到图片消息
      onCmdMessage: function(message: any) {}, //收到命令消息
      onAudioMessage: function(message: any) {}, //收到音频消息
      onLocationMessage: function(message: any) {}, //收到位置消息
      onFileMessage: function(message: any) {}, //收到文件消息
      onVideoMessage: function(message: any) {
        // // var node = document.getElementById("privateVideo");
        // // var option = {
        // //   url: message.url,
        // //   headers: {
        // //     Accept: "audio/mp4"
        // //   },
        // //   onFileDownloadComplete: function(response:any) {
        // //     var objectURL = WebIM.utils.parseDownloadResponse.call(
        // //       conn,
        // //       response
        // //     );
        // //     node.src = objectURL;
        // //   },
        // //   onFileDownloadError: function() {
        // //     console.log("File down load error.");
        // //   }
        // };
        // WebIM.utils.download.call(conn, option);
      }, //收到视频消息
      onPresence: function(message: any) {}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onRoster: function(message: any) {}, //处理好友申请
      onInviteMessage: function(message: any) {}, //处理群组邀请
      onOnline: function() {}, //本机网络连接成功
      onOffline: function() {}, //本机网络掉线
      onError: function(message: any) {}, //失败回调
      onBlacklistUpdate: function(list: any) {
        //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
      },
      onReceivedMessage: function(message: any) {}, //收到消息送达服务器回执
      onDeliveredMessage: function(message: any) {}, //收到消息送达客户端回执
      onReadMessage: function(message: any) {}, //收到消息已读回执
      onCreateGroup: function(message: any) {}, //创建群组成功回执（需调用createGroupNew）
      onMutedMessage: function(message: any) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    });
  }

  private chat(group: GroupInfo) {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
</style>

