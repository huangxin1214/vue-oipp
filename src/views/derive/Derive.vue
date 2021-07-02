<template>
  <div class="box">
    <!-- 点击修改 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="box2">
        <span>名称:</span><el-input v-model="uname"></el-input>
      </div>
      <div class="box2">
        <span>原价:</span><el-input v-model="mone"></el-input>
      </div>
      <div class="box2">
        <span>现价:</span><el-input v-model="mone2"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 卡片试图 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="6">
          <el-input
            placeholder="请输入你想搜索的商品名称"
            v-model="seek"
          ></el-input>
        </el-col>
      </el-row>
      <!-- 商品列表 -->
      <el-table
        :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      >
        <el-table-column label="名称" prop="NAME"></el-table-column>
        <el-table-column
          label="商品编号"
          prop="GOODS_SERIAL_NUMBER"
        ></el-table-column>
        <el-table-column label="原价" prop="ORI_PRICE"></el-table-column>
        <el-table-column label="现价" prop="PRESENT_PRICE"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="amend(scope.row)"
              icon="el-icon-edit"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="omit(scope.row)"
              icon="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
      <!-- 导出 -->
      <div class="mpo">
        <JsonExcel :data="list" header="这是个excel的头部" name="卡卡卡卡.xls">
          <el-button type="primary" size="small">导出xls</el-button>
        </JsonExcel>
        <JsonExcel :data="list" header="这是个excel的头部" name="噜噜噜.csv">
          <el-button type="danger" size="small">导出csv</el-button>
        </JsonExcel>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import JsonExcel from "vue-json-excel";
export default {
  name: "",
  props: {},
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: "100px",
      list: [],
      currentPage: 1,
      pagesize: 10,
      uname: "",
      mone: "",
      mone2: "",
      seek: "",
      list1: [],
    };
  },
  components: {
    JsonExcel,
  },
  methods: {
    // 每页显示多少条
    handleSizeChange(i) {
      this.pagesize = i;
    },
    // 每页
    handleCurrentChange(o) {
      this.currentPage = o;
    },
    // 修改
    amend(row) {
      this.dialogVisible = true;
      this.uname = row.NAME;
      this.mone = row.ORI_PRICE;
      this.mone2 = row.PRESENT_PRICE;
    },
    // 删除
    omit(row) {
      this.list.shift(row, 1);
    },
    // 发送请求
    getData() {
      axios
        .get("/api/tableData ")
        .then((res) => {
          this.list = res.data.data;
          this.list1 = res.data.data;
          console.log(res, "请求成功");
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {
    // 监听数组
    seek(val1) {
      if (val1 !== "") {
        this.list = this.list.filter((item) => {
          return item.NAME.includes(val1);
        });
      } else {
        this.list = this.list1;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  width: 1720px;
  .box2 {
    display: flex;
    width: 400px;
    margin-top: 10px;
    span {
      width: 35px;
      display: flex;
      height: 30px;
      line-height: 30px;
    }
  }
  .mpo {
    display: flex;
    margin-top: 20px;
  }
}
</style>