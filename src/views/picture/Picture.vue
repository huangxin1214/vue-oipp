<template>
  <div class="box">
    <div class="box2">
      <div class="title">支持拖拽</div>
      <div class="back">Element UI 自带上次组件</div>
      <div class="photo">
        <el-upload class="upload-demo" drag action="/api/upload" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <div class="title2">支持裁剪</div>
      <div class="back">Vue-imgge-crop-upload</div>
      <!-- 上传图片 -->
      <div id="image">
        <!--上传图片的按钮-->
        <a class="btn" @click="toggleShow">设置头像</a>
        <!--组件主体-->
        <my-upload
          field="img"
          @crop-success="cropSuccess"
          v-model="show"
          :width="400"
          :height="200"
          img-format="jpg"
          :size="size"
          url="/api/upload"
        ></my-upload>
        <!-- <img :src="avatar" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload/upload-2.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      avatar: "",
      show: false,
      size: 2.1,
    };
  },
  components: {
    myUpload,
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    //剪切成功后的回调函数
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是图片的base64data码
      this.avatar = imgDataUrl;
      console.log(imgDataUrl); //这里打印出来的是base64格式的资源
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1720px;
  height: 800px;
  .box2 {
    width: 1600px;
    height: 700px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    #image {
      margin-top: 30px;
    }
    .title {
      font-size: 18px;
    }
    .title2 {
      font-size: 18px;
      margin-top: 20px;
    }
    .back {
      margin-top: 10px;
      display: flex;
      align-items: center;
      width: 1580px;
      background: #eeeeee;
      height: 40px;
      padding-left: 20px;
    }
    .photo {
      margin-top: 10px;
      width: 300px;
      height: 200px;
    }
    .box3 {
      margin-top: 10px;
    }
  }
}
</style>