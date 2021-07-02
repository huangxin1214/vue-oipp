<template>
  <div class="box">
    <el-card>
      <el-table
        :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          label="标题"
          prop="title"
          align="center"
        ></el-table-column>
        <el-table-column
          label="作者"
          prop="author"
          align="center"
        ></el-table-column>
        <el-table-column label="类目" prop="category" align="center">
          <!-- 分类别 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.category === '其他'">
              {{ scope.row.category }}
            </el-tag>
            <el-tag
              type="info"
              v-else-if="
                scope.row.category === 'Vue' || scope.row.category === 'React'
              "
            >
              {{ scope.row.category }}
            </el-tag>
            <el-tag
              type="warning"
              v-else-if="
                scope.row.category === 'Node.js' ||
                scope.row.category === '性能优化'
              "
            >
              {{ scope.row.category }}
            </el-tag>
            <el-tag
              type="danger"
              v-else-if="
                scope.row.category === 'JavaScript' ||
                scope.row.category === '小程序'
              "
            >
              {{ scope.row.category }}
            </el-tag>
            <el-tag
              type="success"
              v-else-if="
                scope.row.category === '工具类' || scope.row.category === '其他'
              "
            >
              {{ scope.row.category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="来源"
          prop="source"
          align="center"
        ></el-table-column>
        <!-- 星星 -->
        <el-table-column label="重要性" prop="star" align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.ostar" disabled></el-rate> </template
        ></el-table-column>
        <!-- 发布时间 -->
        <el-table-column label="发布时间" prop="date" align="center">
          <template slot-scope="scope">
            {{ timer(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="alter(scope.row._id)" size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="omit(scope.row._id)"
              size="mini"
              v-model="out"
              >删除</el-button
            >
            <el-button type="success" @click="look(scope.row._id)" size="mini"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 5, 2, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.list.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      date: "",
      out: "",
      currentPage: 1,
      pagesize: 10,
      lop: "",
    };
  },
  components: {},
  methods: {
    // 每页显示多少条
    handleSizeChange(i) {
      this.pagesize = i;
    },
    // 每页
    handleCurrentChange(o) {
      this.currentPage = o;
    },
    // 转换时间
    timer(row) {
      return dayjs(row).format("YYYY年MM月DD日HH时mm分ss秒");
    },
    // 删除id
    omit(id) {
      axios
        .post("/api/article/delete", {
          _id: id,
        })
        .then((res) => {
          this.getDate();
          console.log(res, "请求成功");
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    // 查看文章
    look(id) {
      axios
        .post("/api/article/article", {
          _id: id,
        })
        .then((res) => {
          console.log(res, "请求成功");
          this.lop = res.data.data;
          this.$router.push({
            path: "/vieww",
            query: {
              id: this.lop,
            },
          });
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    // 编辑文章
    alter(val) {
      this.$router.push({
        path: "/well",
        query: {
          id: val,
        },
      });
    },
    // 获取发布的请求
    getDate() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          if (res.data.code === 200) {
            // console.log(res, "请求成功");
            // 将数据赋给新数组
            this.list = res.data.data;
            // 增加一个属性
            this.list.map((item) => {
              return this.$set(item, "ostar", Number(item.star));
            });
          }
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
  width: 1720px;
  display: flex;
  flex-direction: column;
}
</style>