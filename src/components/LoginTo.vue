<template>
  <div class="login-container">
<!--    style="display: flex;justify-content: center"-->
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane label="登录" name="first" >
        <el-form :model="ruleForm" :rules="rules"
                                                      status-icon
                                                      ref="ruleForm"
                                                      label-position="left"
                                                      label-width="0px"
                                                      class="demo-ruleForm login-page">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
          <el-input type="text"
                    v-model="ruleForm.username"
                    placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    v-model="ruleForm.password"
                    placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="type" label="systemAdmin">用户</el-radio>
          <el-radio style="position: relative;left: 80px" v-model="type" label="dormitoryAdmin">系统管理员</el-radio>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second" >
        <el-form :model="ruleForm" :rules="rules"
                                                     status-icon
                                                     ref="ruleForm"
                                                     label-position="left"
                                                     label-width="0px"
                                                     class="demo-ruleForm login-page">
        <h3 class="title">系统注册</h3>
        <el-form-item prop="username">
          <el-input type="text"
                    v-model="ruleForm.username"
                    placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    v-model="ruleForm.password"
                    placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="type" label="systemAdmin">用户</el-radio>
          <el-radio style="position: relative;left: 80px" v-model="type" label="dormitoryAdmin">系统管理员</el-radio>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="registerSubmit" :loading="logining">注册</el-button>
        </el-form-item>
      </el-form>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: "LoginTo",
  data(){
    return{
      activeName: 'first',
      logining: false,
      ruleForm: {
        username: 'lys',
        password: '123456'
      },
      type: 'systemAdmin',
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if(valid){
          //登录按钮加载转圈
          this.logining = true
          let _this = this
          console.log(valid)
          if(_this.type=="dormitoryAdmin"){
            this.axios.get("http://localhost:9090/admin/login",{params:_this.ruleForm}).then(function (resp){
              console.log(resp)
              if(resp.data.code == -1){
                       _this.$alert('用户名不存在', '提示', {
                         confirmButtonText: '确定'
                       })
                     }
              if(resp.data.code == -2){
                _this.$alert('密码错误', '提示', {
                  confirmButtonText: '确定'
                })
              }
              if(resp.data.code == 0){
                //跳转到SystemAdmin
                //展示当前登录用户信息
                localStorage.setItem('systemAdmin', JSON.stringify(resp.data.data));
                _this.$router.replace({path: '/admin'})
                console.log("aaa",localStorage.getItem('systemAdmin'))
              }
            })
          }
          // if(_this.type == 'dormitoryAdmin'){
          //   this.axios.get('http://localhost:8181/dormitoryAdmin/login', {params:_this.ruleForm}).then(function (resp) {
          //     _this.logining = false
          //     if(resp.data.code == -1){
          //       _this.$alert('用户名不存在', '提示', {
          //         confirmButtonText: '确定'
          //       })
          //     }
          //     if(resp.data.code == -2){
          //       _this.$alert('密码错误', '提示', {
          //         confirmButtonText: '确定'
          //       })
          //     }
          //     if(resp.data.code == 0){
          //       //跳转到SystemAdmin
          //       //展示当前登录用户信息
          //       localStorage.setItem('dormitoryAdmin', JSON.stringify(resp.data.data));
          //       _this.$router.replace({path: '/dormitoryAdmin'})
          //     }
          //   })
          // }
          // if(_this.type == 'systemAdmin'){
          //   this.axios.get('http://localhost:8181/systemAdmin/login', {params:_this.ruleForm}).then(function (resp) {
          //     _this.logining = false
          //     if(resp.data.code == -1){
          //       _this.$alert('用户名不存在', '提示', {
          //         confirmButtonText: '确定'
          //       })
          //     }
          //     if(resp.data.code == -2){
          //       _this.$alert('密码错误', '提示', {
          //         confirmButtonText: '确定'
          //       })
          //     }
          //     if(resp.data.code == 0){
          //       //跳转到SystemAdmin
          //       //展示当前登录用户信息
          //       localStorage.setItem('systemAdmin', JSON.stringify(resp.data.data));
          //       _this.$router.replace({path: '/systemAdmin'})
          //     }
          //   })
          // }
        }
      })
    },
    registerSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if(valid) {
          //登录按钮加载转圈
          this.logining = true
          let _this = this
          if(_this.type=="dormitoryAdmin"){
            _this.axios.get("http://localhost:9090/admin/checkbyname/"+_this.ruleForm.username).then(
                function (resp){
                  console.log(resp)
                  if(resp.data.code==-1){
                    _this.axios.post("http://localhost:9090/admin/register",_this.ruleForm).then(function(resp){
                          if (resp.data.code == 0) {
                            //跳转到SystemAdmin
                            //展示当前登录用户信息
                            _this.$alert('注册成功','提示',{
                              confirmButtonText:'确定'
                            })
                            _this.activeName="first"
                            _this.logining = false

                          }
                        }
                    )
                  }
                  else if(resp.data.code==0){
                    _this.$alert('用户名已存在','提示',{
                      confirmButtonText:'确定'
                    }
                    )
                    _this.logining = false
                  }
                }
            )

          }
          // if (_this.type == "dormitoryAdmin") {
          //   this.axios.get("http://localhost:9090/admin/login", {params: _this.ruleForm}).then(function (resp) {
          //     console.log(resp)
          //     if (resp.data.code == -1) {
          //       _this.$alert('用户名不存在', '提示', {
          //         confirmButtonText: '确定'
          //       })
          //     }
          //     if (resp.data.code == -2) {
          //       _this.$alert('密码错误', '提示', {
          //         confirmButtonText: '确定'
          //       })
          //     }
          //     if (resp.data.code == 0) {
          //       //跳转到SystemAdmin
          //       //展示当前登录用户信息
          //       localStorage.setItem('systemAdmin', JSON.stringify(resp.data.data));
          //       _this.$router.replace({path: '/admin'})
          //       console.log("aaa", localStorage.getItem('systemAdmin'))
          //     }
          //   })
          // }
        }})

    }
  }

};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}

</style>