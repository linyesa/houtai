<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <div class="home_title">智慧文旅管理平台-系统管理员</div>
      <div class="home_userinfoContainer">
        <el-dropdown>
                  <span class="el-dropdown-link home_userinfo">
                    {{admin.username}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
                  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" @click.native="logout">基本信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting" @click.native="logout">密码设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>

      <el-aside class="home_aside" width="200px">

        <el-menu router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-platform"></i>景点管理</template>
            <el-menu-item index="/admin/scenicspot" :class="$route.path=='/admin/scenicspot'?'is-active':''">
              <i class="el-icon-folder-add"></i>景点列表
            </el-menu-item>
            <el-menu-item index="/admin/scenicspotadd" :class="$route.path=='/admin/scenicspotadd'?'is-active':''">
              <i class="el-icon-document-copy"></i>添加景点
            </el-menu-item>

          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-location-outline"></i>路线管理</template>
            <el-menu-item index="/admin/line" :class="$route.path=='/admin/line'?'is-active':''">
              <i class="el-icon-folder-add"></i>路线列表
            </el-menu-item>
            <el-menu-item index="/admin/lineadd">
              <i class="el-icon-document-copy"></i>添加路线
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/usermanager">
            <i class="el-icon-folder-add"></i>个人信息管理
          </el-menu-item>
<!--          <el-submenu index="3">-->
<!--            <template slot="title"><i class="el-icon-s-grid"></i>系统管理</template>-->
<!--            <el-menu-item index="/buildingAdd">-->
<!--              <i class="el-icon-folder-add"></i>用户管理-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/buildingManager">-->
<!--              <i class="el-icon-document-copy"></i>信息管理-->
<!--            </el-menu-item>-->
<!--          </el-submenu>-->

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-s-home"></i>订单管理</template>
            <el-menu-item index="/admin/order">
              <i class="el-icon-folder-add"></i>订单列表
            </el-menu-item>
            <el-menu-item index="/admin/orderadd">
              <i class="el-icon-document-copy"></i>订单添加
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-home"></i>数据统计分析</template>
            <el-menu-item index="/admin/datachart">
              <i class="el-icon-folder-add"></i>订单数据
            </el-menu-item>
<!--            <el-menu-item index="/admin/orderadd">-->
<!--              <i class="el-icon-document-copy"></i>订单添加-->
<!--            </el-menu-item>-->
          </el-submenu>
<!--          <el-menu-item index="/moveoutRegister">-->
<!--            <i class="el-icon-s-unfold"></i>-->
<!--            <span slot="title">学生迁出登记</span>-->
<!--          </el-menu-item>-->

<!--          <el-menu-item index="/moveoutRecord">-->
<!--            <i class="el-icon-s-order"></i>-->
<!--            <span slot="title">学生迁出记录</span>-->
<!--          </el-menu-item>-->

<!--          <el-menu-item index="/absentRecord">-->
<!--            <i class="el-icon-error"></i>-->
<!--            <span slot="title">学生缺寝记录</span>-->
<!--          </el-menu-item>-->
        </el-menu>

      </el-aside>

      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
        <el-footer class="home_footer">2022 © DORMS</el-footer>
      </el-container>

    </el-container>

  </el-container>
</template>
<script>
export default{
  methods: {
    logout(){
      let _this = this;
      this.$confirm('注销登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        localStorage.removeItem('systemAdmin')
        _this.$router.replace({path: '/loginto'})
      })
    }
  },
  data(){
    return {
      admin:''
    }
  },
  created() {
    let admin=JSON.parse(window.localStorage.getItem("systemAdmin"));
    this.admin=admin
  }
}
</script>
<style>
.home_container {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}

.home_header {
  background-color: #2B2B2B;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home_title {
  color: #C2C2C2;
  font-size: 22px;
  display: inline;
}

.home_userinfo {
  color: #fff;
  cursor: pointer;
}

.home_userinfoContainer {
  display: inline;
  margin-right: 20px;
}

.home_aside {
  background-color: #FFFFFF;
}

.home_footer {
  background-color: #FFFFFF;
  color: #000000;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
}
</style>
