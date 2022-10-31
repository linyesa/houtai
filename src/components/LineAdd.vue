<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="线路名" prop="lineName">
        <el-input v-model="ruleForm.lineName"></el-input>
      </el-form-item>
      <el-form-item label="线路分类" prop="lineCategory">
        <el-input v-model="ruleForm.lineCategory"></el-input>
      </el-form-item>
      <el-form-item label="线路分类排序" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="线路价格" prop="lineAmount">
        <el-input v-model="ruleForm.lineAmount"></el-input>
      </el-form-item>
      <!--      <el-form-item label="性别">-->
      <!--        <div style="width: 170px;height: 30px;">-->
      <!--          <template>-->
      <!--            <el-radio v-model="ruleForm.gender" label="男">男</el-radio>-->
      <!--            <el-radio v-model="ruleForm.gender" label="女">女</el-radio>-->
      <!--          </template>-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="联系电话" prop="telephone">-->
      <!--        <el-input v-model.number="ruleForm.telephone"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="线路图片" prop="img">
        <el-input v-model="ruleForm.img"></el-input>
      </el-form-item>
      <el-form-item label="线路备注" prop="remark">
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      category:null,
      ruleForm: {
        id:null,
        lineName:'',
        lineCategory:'',
        sort:null,
        lineAmount:null,
        img:'',
        remark:''
      },
      rules: {
        lineName: [
          { required: true, message: '请输入线路名', trigger: 'blur' }
        ],
        lineCategory: [
          { required: true, message: '请输入线路分类', trigger: 'blur' }
        ],
        sort:[
          { required: true, message: '请输入线路分类排序', trigger: 'blur',type: "number", transform(value) { return Number(value)} }
        ],
        lineAmount: [
          { required: true, message: '请输入价格',trigger:'blur',type: "number", transform(value) { return Number(value)}}
        ],
        img:[
          { required: true, message: '请输入线路图片',trigger:'blur',}
        ],
        remark:[
          { required: true, message: '请输入线路备注', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // axios.post('http://localhost:8181/dormitoryAdmin/save',_this.ruleForm).then(function (resp) {
          //   if(resp.data.code == 0){
          //     _this.$alert(_this.ruleForm.username+'添加成功', '', {
          //       confirmButtonText: '确定',
          //       callback: action => {
          //         _this.$router.push('/dormitoryAdminManager')
          //       }
          //     });
          //   }
          // })
          this.axios.post("http://localhost:9090/line/save",_this.ruleForm).then(function (resp){
            console.log(resp);
            if(resp.data.code == 0){
              _this.$alert(_this.ruleForm.scenicname+'添加成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                  console.log(action)
                  _this.$router.push('/admin')
                }
              });
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
