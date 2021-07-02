<template>
  <div class="box">
    <!-- 控制表格的盒子 -->
    <div class="biao">
      <div class="title">欢迎来到小爱后台管理系统</div>
      <div class="biao2">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="输入用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="输入密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <div class="el--about-out">
            <el-form-item label="输入验证码" prop="verify">
              <el-input v-model="ruleForm.verify"></el-input>
            </el-form-item>
            <div v-html="arr" @click="codee"></div>
          </div>

          <div class="biao3">
            <el-button type="primary" @click="gotod">立即登录</el-button>
            <el-button type="primary" @click="goto">立即注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: "",
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        verify: "",
      },
      // 验证规则
      rules: {
        // 用户名
        username: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入用户名",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "blur",
          },
          // 限制字符
          {
            // 最小输入
            min: 2,
            // 最大输入
            max: 8,
            message: "请输入用户名在2-8位之间",
            trigger: "blur",
          },
        ],
        // 密码
        password: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入密码",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "blur",
          },
          {
            // 最小输入
            min: 6,
            // 最大输入
            max: 15,
            message: "请输入密码在6-15位之间",
            trigger: "blur",
          },
        ],
        // 验证码
        verify: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入验证码",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    // 登录页跳转到注册页面
    goto() {
      this.$router.push("/register");
    },
    // 判断验证是否通过
    gotod() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 发送登录请求
          axios
            .post("/api/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              code: this.ruleForm.verify,
            })
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success("登录成功");
                localStorage.setItem(
                  "vue-name",
                  JSON.stringify(res.data.data[0])
                );
                this.$router.push("/");
              } else {
                this.$message.error(res.data.message);
              }
              console.log(res, "请求成功");
            })
            .catch((err) => {
              console.log(err, "请求失败");
            });
        } else {
          this.$message.error("表单填写有误,请检查");
          return;
        }
      });
    },

    // 验证码请求
    getData() {
      axios
        .get("/api/captcha ")
        .then((res) => {
          if (res.status === 200) {
            this.arr = res.data;
          }
          console.log(res, "请求成功");
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    // 点击验证码随机切换
    codee() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    3deg,
    #6fa7cc,
    #6fa7cc,
    #d6e9ed,
    #9acee3,
    #8ebad7
  );
  height: 980px;
  .biao {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: #fff;
    height: 400px;
    width: 600px;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 600px;
      height: 60px;
      border-bottom: 1px #edf0f6 solid;
    }
    .biao2 {
      width: 600px;
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      .biao3 {
        padding-left: 100px;
      }
    }
  }
}
</style>