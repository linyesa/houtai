<template>
    <el-container>
      <el-header>头部logo</el-header>
      <el-container>
        <el-aside width="200px">菜单
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">
                      <router-link to="/son">选项1</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>内容
          <el-input type="text"
                    placeholder="用户名"
          ></el-input>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-header{
  background-color: azure;
}
.el-aside{
  background-color: bisque;
  height: 700px;
}
.el-main{
  background-color: cornflowerblue;
}
</style>
