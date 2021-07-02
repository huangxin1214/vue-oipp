<template>
  <div class="box">
    <div id="rou"></div>
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
        //表头
        legend: {
          data: [],
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
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
            type: "line",
            smooth: true,
          },
          {
            name: "",
            data: [],
            type: "line",
            smooth: true,
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getDate() {
      axios
        .get("/api/homeChat")
        .then((res) => {
          // console.log(res, "请求成功");

          this.list = res.data.data;
          // 获取actual数据
          this.list1 = this.list.map((item) => {
            return item.actual;
          });
          // 将获取到的值赋给option下对应位置
          this.option.series[1].data = this.list1;
          // console.log(this.list1);

          // 获取expected数据
          this.list2 = this.list.map((item) => {
            return item.expected;
          });
          // 将获取到的值赋给option下对应位置
          this.option.series[0].data = this.list2;

          // 拿到数组的对象取值的键，组成新的数组
          let out = Object.keys(this.list[0]);
          // console.log(out);
          // 删除从0下标开始  删除一位
          out.splice(0, 1);
          // console.log(out);

          this.option.legend.data[0] = out[0];
          this.option.legend.data[1] = out[1];

          this.option.series[0].name = out[0];
          this.option.series[1].name = out[1];

          let chartDom = document.getElementById("rou");
          let myChart = echarts.init(chartDom);
          myChart.setOption(this.option);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
  },
  mounted() {
    this.getDate();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  margin-top: 30px;
  margin-left: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  #rou {
    width: 1720px;
    height: 500px;
    padding: 0px;
    margin: 0px;
  }
}
</style>