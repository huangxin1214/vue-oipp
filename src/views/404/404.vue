<template>
  <div class="box">
    <div class="box2">
      <img src="../../assets/kkk.png" alt="" />
      <button @click="goto">返回首页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    goto() {
      this.$router.push("/");
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
  justify-content: center;
  align-items: center;
  padding-top: 200px;
  .box2 {
    button {
      font-size: 14px;
      width: 100px;
      height: 20px;
      border: 0px;
      border-radius: 5px;
      background: skyblue;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>