<template>
  <div class="box">
    <!-- 头部 -->
    <div class="top">
      <div class="left">
        <div class="font">
          <div class="zi">今日发布</div>
          <div class="num" style="color: #fff">{{ getTime() }}</div>
        </div>
        <div class="icon"><i class="el-icon-check"></i></div>
      </div>
      <div class="left2">
        <div class="font">
          <div class="zi">原创文章</div>
          <div class="num" style="color: #fff">{{ getCategory() }}</div>
        </div>
        <div class="icon"><i class="el-icon-s-order"></i></div>
      </div>
      <div class="right">
        <div class="font">
          <div class="zi">新留言</div>
          <div class="num" style="color: #fff">0</div>
        </div>
        <div class="icon"><i class="el-icon-bell"></i></div>
      </div>
      <div class="right2">
        <div class="font">
          <div class="zi">新消息</div>
          <div class="num" style="color: #fff">0</div>
        </div>
        <div class="icon"><i class="el-icon-phone-outline"></i></div>
      </div>
    </div>

    <!-- 内容 -->
    <fan></fan>

    <!-- 底部的柱状图 -->
    <bottom></bottom>
  </div>
</template>

<script>
import fan from "../../components/fan/Fan";
import axios from "axios";
import dayjs from "dayjs";
import bottom from "../../components/bottom/Bottom.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      oui: [],
    };
  },
  components: {
    fan,
    bottom,
  },
  methods: {
    // 获取全部的文章
    getDa() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          // console.log(res, "请求成功");
          this.list = res.data.data;
          // 拿到作品类型
          // console.log(this.list);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    // 获取文章的来源
    getCategory() {
      let arr = this.list.filter((item) => {
        return item.source === "原创";
      });
      return arr.length;
    },
    // 获取文章的发布时间
    getTime() {
      // 获取今天的时间
      let timer = dayjs().format("YYYY年MM月DD日");
      // console.log(timer);

      obj = dayjs(obj).format("YYYY年MM月DD日");
      // 过滤出list数组下的date并转换成dayjs格式   判断它是否等于今天的日期
      let obj = this.list.filter((item) => {
        return dayjs(item.date).format("YYYY年MM月DD日") === timer;
      });
      return obj.length;
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
  width: 1700px;
  background: #f0f2f5;
  padding: 10px;
  .top {
    display: flex;
    width: 1700px;
    height: 50px;
    .left {
      width: 425px;
      height: 50px;
      background: #7ccabf;
      display: flex;
      .font {
        width: 300px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .zi {
          color: #fff;
        }
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 125px;
        height: 50px;
        color: #fff;
      }
    }
    .left2 {
      width: 425px;
      height: 50px;
      background: #e88a87;
      display: flex;
      .font {
        width: 300px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .zi {
          color: #fff;
        }
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 125px;
        height: 50px;
        color: #fff;
      }
    }
    .right {
      width: 425px;
      height: 50px;
      display: flex;
      background: #8375a3;
      .font {
        width: 300px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .zi {
          color: #fff;
        }
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 125px;
        height: 50px;
        color: #fff;
      }
    }
    .right2 {
      width: 425px;
      height: 50px;
      display: flex;
      background: #9fcec1;
      .font {
        width: 300px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .zi {
          color: #fff;
        }
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 125px;
        height: 50px;
        color: #fff;
      }
    }
  }
}
</style>