<template>
<div>
  <el-tabs tab-position="left" style="height: 1000px">
  <el-tab-pane label="基本信息">
    <el-descriptions title="基本设置" direction="vertical" :column="4" border>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
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