<template>
  <div class="box">
    <div class="wechat">
      <div class="sidestrip">
        <div class="am-dropdown" data-am-dropdown>
          <!--头像插件-->
          <div class="own_head am-dropdown-toggle"></div>
          <div class="am-dropdown-content">
            <div class="own_head_top">
              <div class="own_head_top_text">
                <p class="own_name">
                  {{currentUser.nickname}}
                  <img src="images/icon/head.png" alt>
                </p>
                <p class="own_numb">微信号：123456</p>
              </div>
              <img src="images/own_head.jpg" alt>
            </div>
            <div class="own_head_bottom">
              <p>
                <span>地区</span>江西 九江
              </p>
              <div class="own_head_bottom_img">
                <a href>
                  <img src="images/icon/head_1.png">
                </a>
                <a href>
                  <img src="images/icon/head_2.png">
                </a>
              </div>
            </div>
          </div>
        </div>
        <!--三图标-->
        <div class="sidestrip_icon">
          <a
            id="si_1"
            style="background: url(images/icon/head_2_1.png) no-repeat;"
            @click="loadgroup"
          ></a>
          <!-- <a id="si_2"></a>
          <a id="si_3"></a>-->
        </div>

        <!--底部扩展键-->
        <div id="doc-dropdown-justify-js">
          <div class="am-dropdown" id="doc-dropdown-js" style="position: initial;">
            <div class="sidestrip_bc am-dropdown-toggle"></div>
            <ul class="am-dropdown-content" style>
              <li>
                <a
                  href="#"
                  data-am-modal="{target: '#doc-modal-1', closeViaDimmer: 0, width: 400, height: 225}"
                >意见反馈</a>
                <div class="am-modal am-modal-no-btn" tabindex="-1" id="doc-modal-1">
                  <div class="am-modal-dialog">
                    <div class="am-modal-hd">
                      Modal 标题
                      <a
                        href="javascript: void(0)"
                        class="am-close am-close-spin"
                        data-am-modal-close
                      >&times;</a>
                    </div>
                    <div class="am-modal-bd">Modal 内容。本 Modal 无法通过遮罩层关闭。</div>
                  </div>
                </div>
              </li>

              <li>
                <a href="#">备份与恢复</a>
              </li>
              <li>
                <a href="#">设置</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--聊天列表-->
      <div class="middle on">
        <div class="wx_search">
          <input type="text" placeholder="搜索">
          <button>+</button>
        </div>
        <div class="office_text">
          <ul class="user_list">
            <li
              class="user_active"
              v-for="item in groups"
              :key="item.groupid"
              @click="onchat(item)"
            >
              <div class="user_head">
                <img src="images/head/15.jpg">
              </div>
              <div class="user_text">
                <p class="user_name">{{item.groupname}}</p>
                <p class="user_message">我是傻逼！，金少凯牛逼！</p>
              </div>
              <div class="user_time">下午 2：54</div>
            </li>
          </ul>
        </div>
      </div>

      <!--聊天窗口-->
      <div class="talk_window">
        <div class="windows_top">
          <div class="windows_top_box">
            <span>{{group.groupname}}</span>
            <ul class="window_icon">
              <li>
                <a href>
                  <img src="images/icon/icon7.png">
                </a>
              </li>
              <li>
                <a href>
                  <img src="images/icon/icon8.png">
                </a>
              </li>
              <li>
                <a href>
                  <img src="images/icon/icon9.png">
                </a>
              </li>
              <li>
                <a href>
                  <img src="images/icon/icon10.png">
                </a>
              </li>
            </ul>
            <div class="extend am-btn am-btn-success" @click="showgroupinfo"></div>
            <!-- 侧边栏内容 -->
            <div id="doc-groupinfo" class="my-offcanvas" v-show="isshowgroupinfo">
              <div class="my-offcanvas-bar">
                <div class="my-offcanvas-head">
                  <a href="javascript:;" @click="isshowhistory=false">关闭</a>
                </div>
                <div class="am-offcanvas-content">
                  <p>
                    <a href="javascript:;" @click="isshowgroupinfo=false">关闭</a>
                  </p>
                  <p>群组人员：</p>
                  <ul>
                    <li v-for="item in group.members" :key="item">{{item.name}}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="doc-history" class="my-offcanvas" v-show="isshowhistory">
              <div class="my-offcanvas-bar">
                <div class="my-offcanvas-head">
                  <a href="javascript:;" @click="isshowhistory=false">关闭</a>
                </div>
                <div class="am-offcanvas-content">
                  <div>
                    <ul class="content" id="chatbox">
                      <li :class="isme(msg)" v-for="msg in currentchat" :key="msg.id">
                        <!-- <p class="time">
                    <span>18:56</span>
                        </p>-->
                        <img src="images/own_head.jpg" title="金少凯">
                        <span>{{msg.data}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--聊天内容-->
        <div class="windows_body">
          <div class="office_text m-message" style="height: 100%;">
            <ul class="content" id="chatbox">
              <li :class="isme(msg)" v-for="msg in currentchat" :key="msg.id">
                <!-- <p class="time">
                    <span>18:56</span>
                </p>-->
                <img src="images/own_head.jpg" title="金少凯">
                <span>{{msg.data}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="windows_input" id="talkbox">
          <div class="input_icon">
            <a href="javascript:;"></a>
            <a href="javascript:;"></a>
            <a href="javascript:;"></a>
            <a href="javascript:;" title="历史记录" @click="history"></a>
            <a href="javascript:;"></a>
            <a href="javascript:;"></a>
          </div>
          <div class="input_box">
            <textarea
              name
              rows
              cols
              id="input_box"
              v-model="sendmsg"
              @keyup="sendkey($event)"
              placeholder="ctrl+enter 发送消息"
            ></textarea>
            <button id="send" type="button" @click="send">发送（S）</button>
          </div>
        </div>
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
  id: string;
  type: string;
  from: string;
  to: string;
  data: string;
  ext: any;
  head: string;
}

interface GroupMember {
  name: string;
}

interface GroupInfo {
  groupname: string;
  groupid: string;
  members: GroupMember[];
}

@Component({ name: "HomeIndex" })
export default class HomeIndex extends Vue {
  private groups: GroupInfo[] = [];
  private currentUser: CurrentUserInfo = {} as CurrentUserInfo;
  private group: GroupInfo = {} as GroupInfo;
  public messages: Message[] = [];
  //当前聊天的内容
  // @Watch('scrollMessage')
  public currentchat: Message[] = [];

  //发送的内容
  private sendmsg: string = "";
  //是否显示群组信息
  private isshowgroupinfo: boolean = false;
  //是否显示历史消息
  private isshowhistory: boolean = false;

  mounted() {
    chat
      .validateLogin()
      .then(res => {
        this.currentUser = res as CurrentUserInfo;
        this.onload();
        this.bindGroup();
      })
      .catch(() => {
        this.$router.push("/login");
      });
  }

  private scrollMessage() {}

  private loadgroup() {
    this.bindGroup();
  }

  private bindGroup() {
    chat.getGroup().then((res: any) => {
      this.groups = res.data;
    });
  }

  private onload() {
    // debugger;
    var that = this;
    this.$imConn.listen({
      onOpened: function(message: any) {
        console.log("连接成功回调");
        //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();
      },
      onClosed: function(message: any) {
        console.log("连接关闭回调");
      }, //连接关闭回调
      onTextMessage: function(msg: Message) {
        console.log(msg);
        if (msg.type == "groupchat") {
          that.messages.push(msg);
          if (that.group.groupid == msg.to) {
            that.currentchat.push(msg);
          }
          // debugger
          that.$nextTick(() => {
            that.scrollToBottom();
          });
        }
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
      onOffline: function() {
        alert("掉线了");
      }, //本机网络掉线
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

  private onchat(group: GroupInfo) {
    this.group = group;
    //获取最新的消息
    this.currentchat = this.messages.filter(p => p.to == group.groupid);
  }

  //是否是我发的消息
  private isme(msg: Message) {
    return msg.from == this.currentUser.user.username ? "me" : "other";
  }

  //聊天窗口滚动到底部
  private scrollToBottom() {
    var ele = document.getElementsByClassName("m-message")[0];
    ele.scrollTop = ele.scrollHeight;
  }

  private sendkey(e: KeyboardEvent) {
    if (e.ctrlKey && e.keyCode == 13) {
      this.send();
    }
  }

  private send() {
    debugger;
    if (this.group.groupid == undefined) {
      alert("请先选择群组");
      return;
    }
    chat
      .sendMsgToGroup(
        this.currentUser.user.username,
        this.group.groupid,
        this.sendmsg
      )
      .then(res => {
        let nm = res as Message;
        this.messages.push(nm);
        if (this.group.groupid == nm.to) {
          this.currentchat.push(nm);
        }
        this.sendmsg = "";
        // alert("发送成功");
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      });
  }
  //历史记录
  private history() {
    debugger;
    this.isshowhistory = !this.isshowhistory;
  }

  private showgroupinfo() {
    //获取人员信息
    chat.listGroupMember(this.group.groupid).then((res: any) => {
      let that = this;
      that.group.members = [];
      res.data.forEach((p: any) => {
        let name = "";
        if (p.member != undefined) name = p.member;
        if (p.owner != undefined) name = p.owner;
        that.group.members.push({ name: name } as GroupMember);
      });

      this.isshowgroupinfo = true;
    });
  }
}
</script>

<style lang="scss" scoped>
// @import "/css/amazeui.min.css";
// @import "/css/main.css";
@import "@/assets/styles/main.scss";

.my-offcanvas {
  width: 400px;
  /* display: none; */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1090;
  background: rgba(0, 0, 0, 0.15);

  .my-offcanvas-bar {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1091;
    width: 400px;
    max-width: 100%;
    background: #333;
  }
}
.my-offcanvas-head {
  padding: 10px;
  a {
    color: #fff;
    :hover {
      color: #0e90d2;
    }
  }
}
.am-offcanvas-content {
  height: 90%;
  overflow-y: auto;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
}
</style>

