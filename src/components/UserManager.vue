<template>
<div>
  <el-tabs tab-position="left" style="height: 1000px">
  <el-tab-pane label="基本信息"><h1 style="margin-left: 100px">基本设置</h1>
    <el-row style="text-align: center">
      <el-col :span="12">
        <el-row type="flex">
          <el-col :span="4">用户名称：</el-col>
          <el-col :span="4"><el-input
              placeholder="用户名称"
              v-model="user.username"
              :disabled="true">
          </el-input>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="4">用户id：</el-col>
          <el-col :span="4"><el-input
              placeholder="用户名称"
              v-model="user.username"
              :disabled="true">
          </el-input>
          </el-col>
        </el-row>
      </el-col>
<!--      <el-col :span="12" style="background-color: blue">-->
<!--        右-->
<!--      </el-col>-->
    </el-row>
  </el-tab-pane>
  <el-tab-pane label="密码设置">配置管理</el-tab-pane>
</el-tabs>
</div>
</template>

<script>
export default {
  name: "UserManager",
  data(){
    return{
      user:{
        username:'test',
        password:"123456"
      }
    }
  }
}
</script>

<style scoped>

</style>