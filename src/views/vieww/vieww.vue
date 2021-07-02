<template>
  <div class="box">
    <!-- 返回上一级 -->
    <div class="op">
      <el-button type="primary" @click="gou">返回</el-button>
    </div>
    <div class="top">{{ lop.title }}</div>
    <div class="zaiyao">{{ lop.abstract }}</div>
    <div class="fa">发布于:{{ lop.author }}</div>
    <el-card>{{ lop.text }}</el-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      lop: "",
    };
  },
  components: {},
  methods: {
    // 返回上一步操作
    gou() {
      this.$router.back();
    },
  },
  mounted() {
    this.lop = this.$route.query.id;
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 1720px;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
  padding: 10px;
  .op {
    width: 200px;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
  }
  .zaiyao {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fa {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: gray;
    font-size: 13px;
  }
  .el-card {
    margin-top: 10px;
  }
}
</style>