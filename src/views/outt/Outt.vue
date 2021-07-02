<template>
  <div class="box">
    <div class="title">期待你的下次光临</div>
    <el-button type="primary" @click="gotod">退出</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    gotod() {
      axios
        .get("/api/user/logout")
        .then((res) => {
          if (res.data.data === null) {
            this.$message.success("退出成功");
            localStorage.removeItem("vue-name");
            this.$router.push("login");
          }
          console.log(res, "请求成功");
        })
        .catch((err) => {
          console.log(err, "请求失败");
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
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1720px;
  height: 450px;
  .title {
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>