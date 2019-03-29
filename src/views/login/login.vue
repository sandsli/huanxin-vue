<template>
  <div class="main">
    <div>
      <div class="webim">
        <div class="webim-logo">
          <img src="images/logo.png">
        </div>
        <div class="webim-sign">
          <h2>登录</h2>
          <input class="webim-input" type="text" :value="username" placeholder="用户名">
          <input class="webim-input" type="password" :value="password" placeholder="密码">

          <button class="webim-button bg-color" @click="sign">登录</button>
          <p>
            <span>
              登录提示:
              <br>测试：
              <br>登录 mtest1234 密码 mtest1234
              <br>在 http://webim.easemob.com 登录 mtest123 密码 mtest123 相互发消息
              <br>
            </span>
          </p>
        </div>
      </div>
      <footer class="copyright">
        <span>©</span>
        <span>2019</span>
        <span>miutour sands</span>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import chat from "@/api/chat";
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
import { validateLocaleAndSetLanguage } from "typescript";

@Component({ name: "Login" })
export default class Login extends Vue {
  private username: string = "mtest1234";
  private password: string = "mtest1234";

  mounted() {}

  private sign() {
    let that = this;
    debugger;
    chat.login(this.username, this.password, () => {
      that.$router.push("/home");
    });
    // var options = {
    //   apiUrl: this.$WebIM.config.apiURL,
    //   user: this.username,
    //   pwd: this.password,
    //   appKey: this.$WebIM.config.appkey,
    //   success: (res: any) => {
    //     debugger;
    //     that.$currentUser = res;

    //     let token = res.access_token;
    //     //存储token到本地 方便二次登陆
    //     that.$WebIM.utils.setCookie("webim_" + res.user.uuid, token, 1);

    //     that.$router.push("/home");
    //   },
    //   error: (e: any) => {
    //     alert("登陆失败");
    //     console.log(e);
    //   }
    // };

    // this.$imConn.open(options);
  }
}
</script>

<style lang="scss" scoped>
html,
body,
section,
article,
h1,
h2,
h3,
h4,
h5,
h6,
p,
div,
i,
em,
span,
ul,
li,
ol {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  font-size: 13px;
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #fafafa;
  border: 1px solid rgba(250, 250, 250, 0);
  -webkit-font-smoothing: antialiased;
}

input,
button {
  outline: none;
}
input:focus,
button:focus {
  border: 1px solid #4eb1f4;
  box-shadow: rgba(25, 161, 219, 0.247059) 0px 0px 5px 0px;
}

.webim-logo {
  width: 200px;
  margin: 0 auto;
}

.webim {
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  top: 10%;
  bottom: 10%;
}

.copyright {
  z-index: 3;
  position: absolute;
  width: 100%;
  bottom: 10px;
  text-align: center;
  color: #cccccc;
}

.webim-sign {
  overflow: hidden;
  width: 400px;
  margin: 40px auto;
  text-align: center;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.298039) 0px 0px 6px 0px;
  border: 0px none black;
  -webkit-tap-highlight-color: transparent;
  background-color: white;
}
.webim-sign h2 {
  font-size: 24px;
  color: #1a1a1a;
  width: 100%;
  line-height: 84px;
  height: 64px;
}
.webim-sign p {
  margin: 0px auto 40px;
  width: 300px;
  text-align: left;
}
.webim-sign p i {
  font-style: normal;
  color: #4eb1f4;
  cursor: pointer;
}
.webim-sign.webim-signup button {
  margin-top: 30px;
}

.webim-input {
  box-sizing: border-box;
  font-size: 14px;
  padding: 0 4px;
  display: inline-block;
  margin: 10px auto 0;
  width: 300px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  -webkit-tap-highlight-color: transparent;
  background-color: white;
}
.webim-button {
  font-size: 16px;
  box-sizing: border-box;
  display: inline-block;
  margin: 10px auto;
  width: 300px;
  height: 36px;
  cursor: pointer;
  border-radius: 2px;
}
.webim-button.error {
  background-color: #ff3a00;
  border: 1px solid #ff3a00;
}
.webim-button:hover {
  background-color: #1aa1e4;
}

.bg-color {
  color: #fff;
  border: 1px solid #4eb1f4;
  -webkit-tap-highlight-color: transparent;
  background-color: #4eb1f4;
}

.copyright {
  z-index: 3;
  position: absolute;
  width: 100%;
  bottom: 10px;
  text-align: center;
  color: #cccccc;
}
</style>
