<template>
  <div class="box">
    <div class="bigbox">
      <div id="count"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      option: {
        legend: {
          data: [],
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "",
            data: [],
            type: "bar",
          },
          {
            name: "",
            data: [],
            type: "bar",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getDa() {
      axios
        .get("/api/homeChat")
        .then((res) => {
          // console.log(res, "请求成功");
          this.list = res.data.data;
          // 获取list下面的expected
          this.list2 = this.list.map((item) => {
            return item.expected;
          });
          // 将获取的值赋给option对应的位置
          this.option.series[0].data = this.list2;

          // 获取list下面的actual
          this.list3 = this.list.map((item) => {
            return item.actual;
          });
          // 将获取的值赋给option对应的位置
          this.option.series[1].data = this.list3;

          // 将键单独拿出来  赋给一个变量
          let out = Object.keys(this.list[0]);
          // console.log(out);

          // 删除这个变量  从0下标开始  删除1位
          out.splice(0, 1);
          // console.log(out);

          // 赋值给option对应位置
          this.option.legend.data[0] = out[0];

          this.option.legend.data[1] = out[1];
          // 赋值给option对应位置
          this.option.series[0].name = out[0];
          this.option.series[1].name = out[1];

          let chartDom = document.getElementById("count");
          let myChart = echarts.init(chartDom);
          myChart.setOption(this.option);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
  },
  mounted() {
    this.getDa();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  margin-top: 30px;
  display: flex;
  width: 550px;
  .bigbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 550px;
    height: 500px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    #count {
      width: 550px;
      height: 500px;
    }
  }
}
</style>