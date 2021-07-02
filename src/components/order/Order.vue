<template>
  <div class="box">
    <div class="left">
      <!-- 订单 -->
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="num" label="Order-No" width="400" align="center">
        </el-table-column>
        <el-table-column prop="price" label="price" width="400" align="center">
          <template slot-scope="scope">{{ `￥${scope.row.price}` }} </template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="Status"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="danger">
              pending
            </el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="success"
              >success
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <img
        src=" https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
        alt=""
      />

      <!-- 进度条 -->
      <div class="boo">
        <div>{{ op[0] }}</div>
        <el-progress :percentage="oui[0]"></el-progress>
        <div>{{ op[1] }}</div>
        <el-progress :percentage="oui[1]" status="success"></el-progress>
        <div>{{ op[2] }}</div>
        <el-progress :percentage="oui[2]"></el-progress>
        <div>{{ op[3] }}</div>
        <el-progress :percentage="oui[3]"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      list: [],
      arr: [],
      op: [],
      oui: [],
    };
  },
  components: {},
  methods: {
    //   获取订单的请求
    getDa() {
      axios
        .get("/api/orderData")
        .then((res) => {
          //   console.log(res, "请求成功");
          this.list = res.data.data;
          //   console.log(this.list);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },

    // 获取进度条的请求
    getJd() {
      axios
        .get("/api/progress")
        .then((res) => {
          //   console.log(res, "请求成功");

          this.arr = res.data.data;
          //   循环arr下的每项乘以100
          this.oui = this.arr.map((item) => {
            return (item.progress = item.progress * 100);
          });
          // console.log(this.oui);

          this.op = this.arr.map((item) => {
            return item.name;
          });
          //   console.log(op);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
  },
  mounted() {
    this.getDa();
    this.getJd();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  .left {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    width: 1060px;
  }
  .right {
    margin-left: 30px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    width: 600px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .boo {
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      margin-top: 20px;
    }
    img {
      width: 530px;
      height: 260px;
      margin-left: 30px;
    }
  }
}
</style>