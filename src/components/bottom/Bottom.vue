<template>
  <div class="box">
    <div id="szt"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import lodash from "lodash";
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      option: {
        title: {
          subtext: "数量",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          //   containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)",
            },
            emphasis: {
              itemStyle: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: [],
          },
          {
            name: "生活费",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
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
          //   拿到发布的日期
          let arr = lodash.groupBy(res.data.data, "date");
          //   console.log(arr);

          //   先let一个总数变量为0
          let sum = 0;
          //   循环arr 的数组
          for (let i in arr) {
            //   查询数组中是否有Z这个值，有就转换成年月日格式
            if (i.includes("Z")) {
              let obj = dayjs(i).format("YYYY年MM月DD日");
              //   将x轴增加转换好的年月日
              this.option.xAxis.data.push(obj);
            } else {
              // 如果没有Z就增加''
              this.option.xAxis.data.push("");
            }
            // 将数组每一天发的数量赋给option下面的对应值
            this.option.series[1].data.push(arr[i].length);
            // 总数就等于数组下的每一项的长度相加
            sum += arr[i].length;
          }
          // 给x轴头部增加一个总量
          this.option.xAxis.data.unshift("总量");

          // let一个新的变量接收sum总和
          let summ = sum;
          //   console.log(summ);

          //   循环每一天发布文章的数量
          this.option.series[1].data.map((item) => {
            //   获取空的部分   增加总和减去每一次的天数的条数
            this.option.series[0].data.push(summ - item);

            summ = summ - item;
          });
          //   头部添加空的部分为0 
          this.option.series[0].data.unshift(0);
          //   头部添加总数
          this.option.series[1].data.unshift(sum);

          //   console.log(this.option.series[0].data);
          //   console.log(this.option.series[1].data);

          
          let chartDom = document.getElementById("szt");
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
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  #szt {
    width: 1700px;
    height: 600px;
  }
}
</style>