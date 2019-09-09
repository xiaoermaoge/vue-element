<template>
  <div class='login-all-container'>
    <el-form :model="ruleForm2"
             :rules="rules2"
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm2.username"
                  auto-complete="off"
                  @keyup.enter.native='login'
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  auto-complete="off"
                  @keyup.enter.native='login'
                  placeholder="密码"></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked"
                 checked
                 class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:100%;"
                   @click.native.prevent="login"
                   :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import NProgress from 'nprogress'
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        username: '',
        password: ''
      },
      rules2: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // { validator: validaePass }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { validator: validaePass2 }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    login (ev) {
      this.$refs.ruleForm2.validate(async (valid) => {
        if (valid) {
          this.logining = true
          let resData = await this.api.user.login(this.ruleForm2)
          this.logining = false
          if (resData.code === 200) {
            switch (resData.data.roles) {
              case 1:
                this.$router.push({
                  path: '/sysAdmin'
                })
                break
              case 2:
                this.$router.push({
                  path: '/compAdmin'
                })
                break
              case 3:
                this.$router.push({
                  path: '/shopsAdmin'
                })
                break
              case 4:
                this.$router.push({
                  path: '/shopsAdmin'
                })
                break
            }
            sessionStorage.setItem('userInfo', JSON.stringify(resData.data))
            this.dicData.userInfo = resData.data
            // console.log('this.dicData', this.dicData)
            // console.log('resData', resData)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    sessionStorage.clear()
  }
}
</script>

<style lang="scss" scoped>
.login-all-container {
  position: fixed;
  background: -webkit-linear-gradient(
    left,
    white,
    #5f9ac4
  ); /* Safari 5.1 - 6.0 */
  // background: url("../../assets/login-bg.jpg") no-repeat;
  // background-size: 100% 100%;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
