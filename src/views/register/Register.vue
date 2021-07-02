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
          <el-form-item label="注册用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="注册密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <div class="biao3">
            <el-button type="primary" @click="gotozc">立即注册</el-button>
            <el-button type="primary">立即登录</el-button>
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
    // 判断用户是否输入中文
    let checkusername = (rule, value, callback) => {
      let regin = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!regin.test(value)) {
        return callback(new Error("用户名不能输入中文"));
      } else {
        return callback();
      }
    };
    return {
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
      },
      // 验证规则
      rules: {
        // 用户名
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 2,
            max: 8,
            message: "请输入用户名在2-8位之间",
            trigger: "blur",
          },
          {
            validate: checkusername,
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
      },
    };
  },
  components: {},
  methods: {
    // 判断验证是否通过
    gotozc() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success("注册成功");
                this.$router.push("/login");
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
  },
  mounted() {},
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