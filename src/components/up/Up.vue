<template>
  <div class="box">
    <div class="left">
      <div class="font">
        <i class="iconfont icon-lianxiren1"></i>
      </div>
      <div class="size">
        <div class="graySize">
          New visits
          <countTo
            :startVal="startVal"
            :endVal="list.visits"
            :duration="3000"
            class="jisu"
          ></countTo>
        </div>
      </div>
    </div>
    <div class="left2">
      <div class="font">
        <i class="iconfont icon-xiaoxi"></i>
      </div>
      <div class="size">
        <div class="graySize">
          Messages
          <countTo
            :startVal="startVal"
            :endVal="list.messages"
            :duration="3000"
            class="jisu"
          ></countTo>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="font">
        <i class="iconfont icon-qian"></i>
      </div>
      <div class="size">
        <div class="graySize">
          Purchases
          <countTo
            :startVal="startVal"
            :endVal="list.purchases"
            :duration="3000"
            class="jisu"
          ></countTo>
        </div>
      </div>
    </div>
    <div class="right2">
      <div class="font">
        <i class="iconfont icon-gouwuche"></i>
      </div>
      <div class="size">
        <div class="graySize">
          Shopping
          <countTo
            :startVal="startVal"
            :endVal="list.shopping"
            :duration="3000"
            class="jisu"
          ></countTo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 计数器开始值
      startVal: 0,
      // 计数器结束值
      endVal: "",
      list: "",
    };
  },
  components: {
    countTo,
  },
  methods: {
    getDate() {
      axios
        .get("/api/homeData")
        .then((res) => {
          // console.log(res, "请求成功");
          this.list = res.data.data;
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
  justify-content: space-between;
  .left {
    width: 420px;
    height: 95px;
    border: 1px #eee solid;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    .font {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 95px;
      i {
        color: #5ecfcd;
        font-size: 40px;
      }
    }
    .size {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 320px;
      height: 95px;
      .graySize {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 95px;
        color: gray;
        .jisu {
          color: black;
        }
      }
    }
  }
  .left2 {
    width: 420px;
    height: 95px;
    border: 1px #eee solid;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    .font {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 95px;
      i {
        color: #88c6f8;
        font-size: 40px;
      }
    }
    .size {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 320px;
      height: 95px;
      .graySize {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 95px;
        color: gray;
        .jisu {
          color: black;
        }
      }
    }
  }
  .right {
    width: 420px;
    height: 95px;
    border: 1px #eee solid;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    .font {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 95px;
      i {
        color: #f57e92;
        font-size: 40px;
      }
    }
    .size {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 320px;
      height: 95px;
      .graySize {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 95px;
        color: gray;
        .jisu {
          color: black;
        }
      }
    }
  }
  .right2 {
    width: 420px;
    height: 95px;
    border: 1px #eee solid;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    .font {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 95px;
      i {
        color: #fecca5;
        font-size: 40px;
      }
    }
    .size {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 320px;
      height: 95px;
      .graySize {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 95px;
        color: gray;
        .jisu {
          color: black;
        }
      }
    }
  }
}
</style>