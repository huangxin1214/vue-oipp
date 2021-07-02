<template>
  <div class="box">
    <div class="bigbox">
      <div id="radar"></div>
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
          data: [],
        },
        radar: {
          shape: "circle",
          indicator: [
            { name: "" },
            { name: "" },
            { name: "" },
            { name: "" },
            { name: "" },
          ],
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [],
                name: " ",
              },
              {
                value: [],
                name: " ",
              },
              {
                value: [],
                name: " ",
              },
            ],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getDa() {
      axios
        .get("/api/radarChat")
        .then((res) => {
          //   console.log(res, "请求成功");
          this.list = res.data.data;
          // 获取数组3个对象的name
          this.list2 = this.list.map((item) => {
            return item.name;
          });
          // 在头部显示
          this.option.legend.data = this.list2;
          // 给三条系列赋名字
          this.option.series[0].data[0].name = this.list2[0];
          this.option.series[0].data[1].name = this.list2[1];
          this.option.series[0].data[2].name = this.list2[2];

          // 将对象转成数组
          let arr = Object.values(this.list[0]);
          // 转成数组后删除第一项
          arr.splice(0, 1);
          // console.log(arr);

          // 将5个值赋给系列的value
          this.option.series[0].data[0].value = arr;
          // 将对象转数组
          let arr1 = Object.values(this.list[1]);
          // 转成数组后删除第一项
          arr1.splice(0, 1);
          // 赋值给下标为1的value
          this.option.series[0].data[1].value = arr1;
          // 将对象转数组
          let arr2 = Object.values(this.list[2]);
          // 转成数组后删除第一项
          arr2.splice(0, 1);
          // 赋值给下标为2的value
          this.option.series[0].data[2].value = arr2;
          // console.log(this.list);
          // 拿到数组的对象取值的键，组成新的数组
          let out = Object.keys(this.list[0]);
          // console.log(out);
          // 删除名字的键
          out.splice(0, 1);
          // console.log(out);

          // 将数组对象的键删除后赋值给新数组的每一项
          this.option.radar.indicator[0].name = out[0];
          this.option.radar.indicator[1].name = out[1];
          this.option.radar.indicator[2].name = out[2];
          this.option.radar.indicator[3].name = out[3];
          this.option.radar.indicator[4].name = out[4];

          let chartDom = document.getElementById("radar");
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
    #radar {
      width: 500px;
      height: 400px;
    }
  }
}
</style>