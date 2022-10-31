<template>
  <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="景点名" prop="scenicname">
        <el-input v-model="ruleForm.scenicname"></el-input>
      </el-form-item>
      <el-form-item label="景点地址" prop="scenicaddress">
        <el-input v-model="ruleForm.scenicaddress"></el-input>
      </el-form-item>
      <el-form-item label="景点描述" prop="scenicdescribe">
        <el-input v-model="ruleForm.scenicdescribe"></el-input>
      </el-form-item>
      <el-form-item label="图片地址" prop="scenicimage">
        <el-input v-model="ruleForm.scenicimage"></el-input>
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
      <el-form-item label="景点经度" prop="longitude">
        <el-input v-model="ruleForm.longitude"></el-input>
      </el-form-item>
      <el-form-item label="景点纬度" prop="latitude">
        <el-input v-model="ruleForm.latitude"></el-input>
      </el-form-item>
      <el-form-item label="景点所属省份" prop="prov" style="width: 100%">
        <el-input v-model="ruleForm.prov"></el-input>
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
      id:"",
      ruleForm: {
        scenicname: '',
        scenicaddress: '',
        scenicdescribe: '',
        scenicimage: '',
        longitude: '',
        latitude: '',
        prov:'',
      },
      rules: {
        scenicname: [
          { required: true, message: '请输入景点名', trigger: 'blur' }
        ],
        scenicaddress: [
          { required: true, message: '请输入景点地址', trigger: 'blur' }
        ],
        scenicdescribe: [
          { required: true, message: '请输入景点描述', trigger: 'blur' }
        ],
        scenicimage:[
          { required: true, message: '请输入图片地址', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入经度',trigger:'blur',type: "number", transform(value) { return Number(value)}}
        ],
        latitude:[
          { required: true, message: '请输入维度',trigger:'blur',type: "number", transform(value) { return Number(value)}}
        ],
        prov:[
          { required: true, message: '请输入所属省份', trigger: 'blur' }
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
          this.axios.post("http://localhost:9090/scenicspot/update/"+_this.id,_this.ruleForm).then(function (resp){
            console.log("update post-----------------------")
            console.log(resp);
            if(resp.data.code == 0){
              _this.$alert(_this.ruleForm.scenicname+'修改成功', '', {
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
  },
  created() {
    const _this=this
    console.log("manager id",_this.$route.query.id)
    _this.id=_this.$route.query.id
    this.axios.get("http://localhost:9090/scenicspot/getbyid/"+_this.$route.query.id).then(
        function (resp){
          console.log("manager resp",resp)
          _this.ruleForm.scenicimage=resp.data.data.scenicImage
          _this.ruleForm.scenicaddress=resp.data.data.scenicAddress
          _this.ruleForm.scenicname=resp.data.data.scenicName
          _this.ruleForm.scenicdescribe=resp.data.data.scenicDescribe
          _this.ruleForm.longitude=resp.data.data.longitude
          _this.ruleForm.latitude=resp.data.data.latitude
          _this.ruleForm.prov=resp.data.data.prov
          // _this.ruleForm.scenicimage=resp.data.data.data.scenicImage
          // _this.ruleForm.scenicaddress=resp.data.data.data.scenicAddress
          // _this.ruleForm.scenicname=resp.data.data.data.scenicName
          // _this.ruleForm.scenicdescribe=resp.data.data.data.scenicDescribe
          // _this.ruleForm.longitude=resp.data.data.data.longitude
          // _this.ruleForm.latitude=resp.data.data.data.latitude
          // _this.ruleForm.prov=resp.data.data.data.prov

        }
    )
  }
}
</script>
