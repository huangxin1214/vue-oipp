<template>
  <div class="box">
    <div class="bigbox">
      <div id="meigui"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      option: {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [15, 150],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getDa() {
      axios
        .get("/api/ringChat ")
        .then((res) => {
          //   console.log(res, "请求成功");

          this.list = res.data.data;
          // 循环list  返回对象
          let arr = this.list.map((item) => {
            return { value: item.data, name: item.name };
          });
          // console.log(arr);

          // 将arr 赋值给option对应的地方
          this.option.series[0].data = arr;
          //   console.log(arr);
          let chartDom = document.getElementById("meigui");
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
    #meigui {
      width: 500px;
      height: 500px;
    }
  }
}
</style>