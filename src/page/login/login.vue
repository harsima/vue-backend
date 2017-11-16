<template>
    <div class="login-page">
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

<style lang="scss">
    .login-page{
        width: 100%;
        height: 100%;
        background: #2d3a4b;

        .login-area {
            width: 330px;
            padding-top: 10%;
            margin: 0 auto;
            .logo {
                width: 100%;
                height: 200px;
                text-align: center;
                    img {
                    width: 160px;
                }
            }
        }

        .form-group {
            input::-webkit-input-placeholder{
                color: #7e9fb0;
            }
            position: relative;
            padding-bottom: 20px;
            color: #ccc;
            overflow: hidden;
            .el-input__inner {
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                background: rgba(0,0,0,.1);
                border: 1px solid rgba(255,255,255,.1);
                border-radius: 4px;
                color: #ccc;
                font-size: 15px;
                overflow: hidden;
                &:hover{
                    border-color: rgba(255,255,255,.2);
                }
                &:focus{
                    border-color: rgba(255,255,255,.4);
                }
            }
            .el-form-item{
                &.is-error .el-input__inner{
                    border-color: #d45b5b;
                }
                &.captcha input{
                    width: 200px;
                }
                &.captcha img{
                    float: right;
                }
            }
            .el-form-item__error{
                color: #d45b5b;
            }
        }

        .btn-login {
            display: block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            margin: 10px 0;
            padding: 0;
            background: #424f60;
            border: none;
            border-radius: 4px;
            color: #ccc !important;
            font-size: 18px;
            text-align: center;
            cursor: pointer;
            &:hover{
                background: darken(#424f60, 2%)
            }
        }
        
        .err-msg{
            color: #d45b5b;
        }
        .tip{
            margin-top: 10px;
            color: #ccc;
        }

        .lang-toggle{
            text-align: center;
            color: #ccc;
            span{
                display: inline-block;
                width: 26px;
                height: 26px;
                line-height: 26px;
                border-radius: 50%;
                color: #ccc;
                font-size: 14px;
                text-align: center;
                cursor: pointer;
                &.cur{
                    background: #ff6363;
                    color: #2d3a4b;
                }
            }
        }

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 80px;
            line-height: 80px;
            color: #ccc;
            font-size: 16px;
            text-align: center;
        }
    }
</style>

