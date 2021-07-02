<template>
  <div class="box">
    <!-- 查看和编辑 -->
    <div class="title2">
      <div class="left">
        <el-button type="danger" @click="out">返回</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="fabu">发布</el-button>
      </div>
    </div>
    <!-- 文章标题与摘要 -->
    <div class="category">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="ruleForm.abstract"></el-input>
        </el-form-item>
        <div class="flexo">
          <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <el-form-item label="类目" prop="category" required>
            <el-select v-model="ruleForm.category" placeholder="请选择">
              <el-option label="Vue" value="Vue"></el-option>
              <el-option label="React" value="React"></el-option>
              <el-option label="Node.js" value="Node.js"></el-option>
              <el-option label="性能优化" value="性能优化"></el-option>
              <el-option label="JavaScript" value="JavaScript"></el-option>
              <el-option label="小程序" value="小程序"></el-option>
              <el-option label="工具类" value="工具类"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源" prop="source" required>
            <el-select v-model="ruleForm.source" placeholder="请选择">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="与他人合作" value="与他人合作"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要性" prop="star" required>
            <el-select v-model="ruleForm.star" placeholder="请选择">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" prpo="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <mavon-editor v-model="ruleForm.text" prop="text" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: [],
      id1: "",
      ruleForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        date: "",
        text: "",
      },
      rules: {
        title: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入文章标题",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "blur",
          },
        ],
        abstract: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入文章摘要",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "blur",
          },
        ],
        author: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入作者名",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "blur",
          },
        ],
        category: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入类名",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "change",
          },
        ],
        source: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入来源",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "change",
          },
        ],
        star: [
          {
            // 必填项
            required: true,
            // 错误的提示
            message: "请输入重要性",
            // 触发的条件  失去焦点：blur  实时获取：change
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .post("/api/article/article", {
          _id: this.id1,
        })
        .then((res) => {
          this.arr = res.data.data;
          this.ruleForm = this.arr;
        })
        .catch((err) => {
          console.log("失败", err);
        });
    },
    // 发布
    fabu() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/article/update", {
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              text: this.ruleForm.text,
              date: this.ruleForm.date,
              id: this.id1,
            })
            .then((res) => {
              console.log(res);
              if (res.data.success === true) {
                this.$message.success("已修改");
                this.$router.push("/Publish");
              } else {
                this.$message.error(res.data.data);
              }
            })
            .catch((err) => {
              console.log("失败", err);
            });
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    //   点击返回上一步
    out() {
      this.$router.back();
    },
  },
  mounted() {
    // 接收路由传过来的数据
    this.id1 = this.$route.query.id;
    // console.log(this.obj);
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 1720px;
  background: #f0f2f5;
  height: 650px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  .title2 {
    width: 1700px;
    display: flex;
    .left {
      width: 850px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      width: 850px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .category {
    padding-top: 20px;
    .flexo {
      width: 1700px;
      display: flex;
    }
  }
  .fabu {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>