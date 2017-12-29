<template>
    <div class="sys-login">
        <div class="login-area">
            <div class="logo">
                <img src="~sysStatic/images/logo.png" alt="">
            </div>
            <div class="form-group">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.name" type="text" placeholder="账户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha" v-if="captcha" class="captcha">
                        <el-input v-model="loginForm.captcha" type="text" placeholder="验证码"></el-input>
                        <img src="" alt="">
                    </el-form-item>
                    <p class="textR">忘记密码？</p>
                    <a class="btn-login" type="primary" @click="submitForm()">登录</a>
                </el-form>
                <div v-if="sys_error" class="err-msg">{{sys_error}}</div>
            </div>
            <div class="lang-toggle">
                <span :class="{cur: lang=='zh'}" @click="changeLang('zh')">中</span> | 
                <span :class="{cur: lang=='en'}" @click="changeLang('en')">En</span>
            </div>
            <div class="tip">
                <p>当前登录结果随机。验证码随便填</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
        data() {
            return {
                loginForm: {
                    name: '',
                    password: '',
                    captcha: ''
                },
                loginRules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password :[
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    captcha: [
                        {required: false, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                sys_error: '',
                validate: false
            }
        },
        computed: {
            ...mapState({
                lang: state => state.lang
            }),
            captcha(){
                if(this.validate) this.loginRules.captcha[0].required = true
                return this.validate
            }
        },
        methods: {
            ...mapMutations({
                toggleLang: 'changeLang'
            }),
            ...mapActions({
                loginByEmail: 'user/loginByEmail'
            }),
            submitForm(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let data = {
                            name: this.loginForm.name,
                            password: this.loginForm.password
                        }
                        if(this.validate) data.validate = this.loginForm.validate
                        this.loginByEmail(data).then(res => {
                            if(res.data.login){
                                this.$router.push('home')
                            } else{
                                this.sys_error = res.data.message
                                this.validate = res.data.validate
                            }
                        }).catch(err => {
                            this.sys_error = err.response.data
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            changeLang(val){
                if(val == this.lang) return
                this.toggleLang(val)
            }
        }
    }
</script>

