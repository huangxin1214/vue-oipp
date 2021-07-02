<template>
  <el-container>
    <!-- 头部盒子 -->
    <el-header>
      <div class="box">
        <div class="left">欢迎{{ username }}来到小爱后台管理系统</div>
        <div class="right">
          {{ wenhao }},亲爱的{{ username }}上次登录时间为:{{ tito }}
        </div>
      </div>
    </el-header>
    <!-- 左边盒子 -->
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="$route.meta.index"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/Publish">
            <i class="el-icon-menu"></i>
            <span slot="title">已发布</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <i class="el-icon-menu"></i>
            <span slot="title">统计</span>
          </el-menu-item>
          <el-menu-item index="/essay">
            <i class="el-icon-check"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/norm">
            <i class="el-icon-setting"></i>
            <span slot="title">标签页</span>
          </el-menu-item>
          <el-menu-item index="/derive">
            <i class="el-icon-setting"></i>
            <span slot="title">导出excel</span>
          </el-menu-item>
          <el-menu-item index="/picture">
            <i class="el-icon-setting"></i>
            <span slot="title">图片上传</span>
          </el-menu-item>
          <el-menu-item index="/outt">
            <i class="el-icon-delete"></i>
            <span slot="title">退出系统</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 公共路由 -->
     <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      username: "",
      wenhao: "",
      tito: "",
    };
  },
  components: {},
  methods: {},
  mounted() {
    // 获取本地存储的用户
    let uname = localStorage.getItem("vue-name");
    // 问好
    let day = new Date();
    let ho = day.getHours();
    if (ho >= 0 && ho < 6) {
      this.wenhao = "该睡觉了";
    } else if (ho >= 6 && ho <= 11) {
      this.wenhao = "早上好";
    } else if (ho >= 12 && ho <= 13) {
      this.wenhao = "中午好";
    } else if (ho >= 14 && ho <= 18) {
      this.wenhao = "下午好";
    } else {
      0;
      this.wenhao = "晚上好";
    }
    // console.log(uname);
    if (uname !== null) {
      uname = JSON.parse(uname);
      this.username = uname.username;
      this.tito = dayjs(uname.date).format("YYYY年MM月DD日HH时mm分ss秒");
    }
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  background: #2e5e85;
  height: 60px;
  .box {
    display: flex;
    align-items: center;
    background: #2e5e85;
    width: 1920px;
    height: 60px;
    .left {
      display: flex;
      align-items: center;
      width: 400px;
      height: 60px;
      color: #fff;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 1520px;
      height: 60px;
      color: #fff;
    }
  }
}
</style>