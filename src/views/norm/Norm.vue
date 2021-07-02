<template>
  <div>
    <div class="box">
      <!-- 获取表单 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="unread" name="first">
          <div class="unread">
            <!-- 定义一个函数 -->
            <el-table
              :data="getunread()"
              style="width: 100%"
              :show-header="false"
            >
              <el-table-column prop="title" width="1350"> </el-table-column>
              <el-table-column prop="time" width="180"> </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button @click="chang(scope.row)">标为已读</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" class="clearall" @click="clearall"
              >全部标未已读</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane :label="reader" name="second">
          <div class="unread">
            <!-- 定义一个函数 -->
            <el-table
              :data="getread()"
              style="width: 100%"
              :show-header="false"
            >
              <el-table-column prop="title" width="1350"> </el-table-column>
              <el-table-column prop="time" width="180"> </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button @click="chang1(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="danger" class="removeall" @click="removeall"
              >删除全部</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane :label="deleter" name="third">
          <div class="unread">
            <!-- 定义一个函数 -->
            <el-table
              :data="getdelete()"
              style="width: 100%"
              :show-header="false"
            >
              <el-table-column prop="title" width="1350"> </el-table-column>
              <el-table-column prop="time" width="180"> </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button type="warning" @click="chang2(scope.row)"
                    >还原</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-button type="info" class="empty" @click="empty"
              >清空回收站</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          time: "2018-04-19 20:00:00",
          read: false,
          delete: false,
        },
        {
          title: "今晚12点整发大红包，先到先得",
          time: "2018-04-19 21:00:00",
          read: false,
          delete: false,
        },
        {
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          time: "2018-04-19 20:00:00",
          read: true,
          delete: false,
        },
        {
          title: "【系统通知】您的优惠券已经过期",
          time: "2018-04-19 21:00:00",
          read: true,
          delete: true,
        },
      ],
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 标未已读
    chang(row) {
      row.read = true;
    },
    // 删除
    chang1(row) {
      row.delete = true;
    },
    // 还原
    chang2(row) {
      row.delete = false;
    },
    // 过滤出未读的消息
    getunread() {
      let list = this.tableData.filter((item) => {
        return item.read === false && item.delete === false;
      });
      return list;
    },
    // 过滤出已读的消息
    getread() {
      let list1 = this.tableData.filter((item) => {
        return item.read === true && item.delete === false;
      });
      return list1;
    },
    // 过滤出已删除的消息
    getdelete() {
      let list2 = this.tableData.filter((item) => {
        return item.read === true && item.delete === true;
      });
      return list2;
    },
    // 标记全部已读
    clearall() {
      this.tableData.map((item) => {
        return (item.read = true);
      });
    },
    // 全部删除
    removeall() {
      this.tableData.map((item) => {
        return (item.delete = true);
      });
    },
    // 清空回收站
    empty() {
      this.tableData = this.tableData.filter((item) => {
        return !item.delete === true;
      });
    },
  },
  mounted() {},
  computed: {
    // 未读消息计算总和
    unread() {
      return `未读消息(${this.getunread().length})`;
    },
    // 已读消息计算总和
    reader() {
      return `已读消息(${this.getread().length})`;
    },
    // 回收站消息计算总和
    deleter() {
      return `回收站(${this.getdelete().length})`;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 1720px;
  background: #f0f2f5;
  .unread {
    background: white;
    padding: 10px;
    .clearall {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
  .removeall {
    margin-top: 10px;
    margin-left: 10px;
  }
  .empty {
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>