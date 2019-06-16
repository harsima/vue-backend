<template>
    <div class="sys-login">
        <div class="login-area">
            <div class="logo">
                <img src="~sysStatic/images/logo.png" alt="">
            </div>
            <div class="form-group">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.name" type="text" :placeholder="$t('global.username')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" :placeholder="$t('global.password')"></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha" v-if="captcha.show" class="captcha">
                        <img :src="captcha.src" alt="">
                        <el-input v-model="loginForm.captcha" type="text" :placeholder="$t('global.captcha')"></el-input>
                    </el-form-item>
                    <p class="textR">{{$t('global.forgetPassword')}}</p>
                    <a class="btn-login" type="primary" @click="submitForm()">{{$t('global.login')}}</a>
                </el-form>
                <div v-if="sysMsg" class="err-msg">{{sysMsg}}</div>
            </div>
            <div class="lang-toggle">
                <span :class="{cur: lang=='zhCN'}" @click="changeLang('zhCN')">中</span> | 
                <span :class="{cur: lang=='en'}" @click="changeLang('en')">En</span>
            </div>
            <div class="lang-toggle">
                <span :class="{cur: theme=='theme-default'}" @click="changeTheme('theme-default')">浅</span> | 
                <span :class="{cur: theme=='theme-dark'}" @click="changeTheme('theme-dark')">深</span>
            </div>
            <div class="tip">
                <p>{{$t('global.loginTip')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import setTheme from "@/util/setTheme"

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
                    {required: true, message: '', trigger: 'blur'}
                ],
                password :[
                    {required: true, message: '', trigger: 'blur'}
                ],
                captcha: [
                    {required: false, message: '', trigger: 'blur'}
                ]
            },
            captcha: {
                show: false,
                src: ''
            },
            sysMsg: ''
        }
    },
    computed: {
        ...mapState({
            lang: state => state.lang,
            theme: state => state.theme
        })
    },
    watch: {
        "captcha.show"(val){
            this.loginRules.captcha[0].required = val
        }
    },
    beforeMount(){
        // 初始化错误信息。保证单独点击input时可以弹出正确的错误提示
        this.setErrMsg()
    },
    methods: {
        ...mapActions({
            login: 'auth/loginByEmail',
            loadLang: 'loadLang'
        }),
        submitForm(){
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.login({
                        name: this.loginForm.name,
                        password: this.loginForm.password
                    }).then(res => {
                        if(res.login){
                            this.$router.push('home')
                        } else {
                            this.sysMsg = res.message
                            this.captcha.show = true
                            this.captcha.src = res.captcha
                        }
                    })
                } else {
                    return false
                }
            });
        },
        changeLang(val){
            if(val == this.lang) return
            // 切换语言后重新加载语言包，并对重置登陆表单
            this.loadLang(val).then(() => {
                this.setErrMsg()
                this.$refs.loginForm.resetFields()
            })
        },
        changeTheme(val){
            if(val == this.lang) return
            setTheme(val)
            this.$store.commit("setThemeColor", val)
        },
        setErrMsg(){
            this.loginRules.name[0].message = this.$t('global.errMsg.inputRequired', {cont: this.$t('global.username')})
            this.loginRules.password[0].message = this.$t('global.errMsg.inputRequired', {cont: this.$t('global.password')})
            this.loginRules.captcha[0].message = this.$t('global.errMsg.inputRequired', {cont: this.$t('global.captcha')})
        }
    }
}
</script>