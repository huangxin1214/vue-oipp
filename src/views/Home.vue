<template>
  <div class="box">
    <up></up>
    <broken></broken>
    <div class="obj">
      <pointed></pointed>
      <rose></rose>
      <datamation></datamation>
    </div>
    <order></order>
    <todo></todo>
  </div>
</template>

<script>
import up from "../components/up/Up.vue";
import Broken from "../components/broken/Broken.vue";
import Pointed from "../components/pointed/Pointed.vue";
import Rose from "../components/rose/Rose";
import Datamation from "../components/datamation/Datamation.vue";
import todo from "../components/todo/Todo";
import Order from "../components/order/Order.vue";
import Todo from "../components/todo/Todo.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    up,
    Broken,
    Pointed,
    Rose,
    Datamation,
    Order,
    todo,
    Todo,
  },
  Ordermethods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 1720px;
  padding: 10px;
  .obj {
    display: flex;
    justify-content: space-between;
  }
}
</style>
