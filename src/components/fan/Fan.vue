<template>
  <div class="box">
    <div class="left">
      <div id="fabu"></div>
    </div>
    <div class="right">
      <reap></reap>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import * as echarts from "echarts";
import reap from "./reap/Reap";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "center",
          top: "5%",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  components: {
    reap,
  },
  methods: {
    getDa() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          //   console.log(res, "请求成功");

          // 将res下的category单独拿出来  并组成一个对象
          let arr = lodash.groupBy(res.data.data, "category");
          // console.log(arr);
          //   循环arr
          for (let i in arr) {
            // 将arr里面的元素添加到option里面   增加的一个对象
            this.option.series[0].data.push({ value: arr[i].length, name: i });
          }
          let chartDom = document.getElementById("fabu");
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
  margin-top: 10px;
  display: flex;
  padding: 0px;
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    width: 850px;
    #fabu {
      width: 850px;
      height: 400px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    width: 850px;
  }
}
</style>