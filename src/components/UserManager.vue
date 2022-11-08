<template>
<div>
  <el-tabs tab-position="left" style="height: 1000px">
  <el-tab-pane label="基本信息">
    <el-descriptions title="基本设置" direction="vertical" border>
      <el-descriptions-item label="用户名">{{user.username}}</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>

    </el-descriptions>
  </el-tab-pane>
  <el-tab-pane label="密码设置">
    <h1>密码设置</h1>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        账户密码：<el-tag size="small" type="success">{{user.password}}</el-tag>
      </el-col>
      <el-col :span="6">
        <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="dialogPasswordVisible = true">编辑</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        绑定手机号：<el-tag size="small" type="success">{{user.phone}}</el-tag>
      </el-col>
      <el-col :span="6">
        <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="dialogPhoneVisible = true">编辑</el-button>
      </el-col>
    </el-row>
    <el-dialog title="修改手机号" :visible.sync="dialogPhoneVisible">
      <el-form :model="form">
        <el-form-item label="旧手机号" :label-width="formLabelWidth">
          <el-input  :disabled="false" autocomplete="off" v-text="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="新手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPhoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPhoneVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialogPasswordVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="请输入密码" :label-width="formLabelWidth" prop="newPassword">
          <el-input  :disabled="false" autocomplete="off" v-model="ruleForm.newPassword"
                     @keyup.enter.native="updatepwFunc" show-password></el-input>
        </el-form-item>
        <el-form-item label="请再次输入密码" :label-width="formLabelWidth" prop="confirmPwd">
          <el-input autocomplete="off" v-model="ruleForm.confirmPwd"
                    @keyup.enter.native="updatepwFunc" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-tab-pane>
</el-tabs>

</div>
</template>

<script>
export default {
  name: "UserManager",
  data(){
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.confirmPwd !== "") {
          this.$refs.ruleForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return{
      user:{
        username:'',
        password:'',
        phone:"17783052743"
      },
      dialogPhoneVisible: false,
      dialogPasswordVisible: false,
      form: {
        phone: '',
        delivery: false,
      },
      ruleForm:{
        newPassword: "",
        confirmPwd: "",
        delivery:false
      },
      rules: {
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        confirmPwd: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur", required: true },
        ],
      },
      formLabelWidth: '120px'

    }
  },
  methods:{
    submit(){
      const _this=this;
      _this.dialogPasswordVisible=false
     this.axios.post("http://localhost:9090/admin/changepassword",_this.passwordform).then(function (resp){
       if (resp.data.code==0){
         this.$message({
           message: '密码修改成功',
           type: 'success'
         });
       }
       else{
         this.$message({
           message: '密码修改失败',
           type: 'warning'
         });
       }
     })
    }
  },
  created() {
    this.user.username=JSON.parse(window.localStorage.getItem("systemAdmin")).username
    this.user.password=JSON.parse(window.localStorage.getItem("systemAdmin")).password}
}
</script>

<style scoped>

</style>