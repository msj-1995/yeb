<template>
  <div>
    <!-- rules是校验规则 -->
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <!-- 使用prop与data中rules下的username对应 -->
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px"></el-input>
        <img :src="captchaUrl" alt="">
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123',
        code: ''
      },
      captchaUrl: '',
      checked: true,
      // 校验规则
      rules: {
        // username为必填项，blue为失去焦点时触发，为空显示的信息为message后的字符串
        username: [{required: true, message: "请输入用户名", trigger: 'blur'}],
        password: [{required: true, message: "请输入密码", trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitLogin() {
      // 表单验证
      this.$refs.loginForm.validate((valid) => {
        if(valid) {
          alert('submit')
        } else {
          this.$message.error('字段不能为空哦')
          return false
        }
      })
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #ffff;
  border: 1px solid #c6c4c4;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 8px auto 48px auto;
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>
