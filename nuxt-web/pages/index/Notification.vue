<template>
  <div class="container h-100">
    <el-row type="flex" class="pt-4">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="通知提醒" name="first">
            <el-button type="text">全部标记为已读</el-button>

            <div>{{}}</div>
          </el-tab-pane>
          <el-tab-pane label="私信消息" name="second">私信消息</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
        :lg="6"
        :xl="6"
        class="hidden-sm-and-down pl-2"
        >123</el-col
      >
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Notification extends Vue {
  @Prop()
  name: any
  notifies = ''
  activeName = 'first'
  mounted() {
    this.fetchNotify()
  }

  async fetchNotify() {
    const res = await this.$http.get('/notification')
    this.notifies = res.data
  }

  handleClick(e: any) {}
}
</script>

<style lang="scss">
.notification ul li {
  width: 200px;
  padding: 12px 0 12px 20px;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  i {
    padding-right: 10px;
  }
}
.bg {
  background-color: #f0f0f0;
}
</style>
