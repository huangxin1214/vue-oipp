<template>
  <div>
    <div id="ou"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import lodash from "lodash";
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
        .get("/api/article/allArticle")
        .then((res) => {
          //   console.log(res, "请求成功");

          let arr = lodash.groupBy(res.data.data, "source");
          //   console.log(arr);
          for (let i in arr) {
            this.option.series[0].data.push({ value: arr[i].length, name: i });
          }

          let chartDom = document.getElementById("ou");
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
#ou {
  width: 500px;
  height: 400px;
}
</style>