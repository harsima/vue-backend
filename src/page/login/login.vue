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
                    <el-form-item prop="captcha" v-if="captcha" class="captcha">
                        <el-input v-model="loginForm.captcha" type="text" :placeholder="$t('global.captcha')"></el-input>
                        <img src="" alt="">
                    </el-form-item>
                    <p class="textR">{{$t('global.forgetPassword')}}</p>
                    <a class="btn-login" type="primary" @click="submitForm()">{{$t('global.login')}}</a>
                </el-form>
                <div v-if="sys_error" class="err-msg">{{sys_error}}</div>
            </div>
            <div class="lang-toggle">
                <span :class="{cur: lang=='zh'}" @click="changeLang('zh')">中</span> | 
                <span :class="{cur: lang=='en'}" @click="changeLang('en')">En</span>
            </div>
            <div class="lang-toggle">
                <span :class="{cur: theme=='default'}" @click="setTheme('default')">深</span> | 
                <span :class="{cur: theme=='green'}" @click="setTheme('green')">浅</span>
            </div>
            <div class="tip">
                <p>{{$t('global.loginTip')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import changeTheme from "@/util/changeTheme"

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
                lang: state => state.lang,
                theme: state => state.theme
            }),
            captcha(){
                if(this.validate) 
                    this.loginRules.captcha[0].required = true
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
                        if(this.validate) 
                            data.validate = this.loginForm.validate
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
            },
            setTheme(val){
                if(val == this.lang) return
                changeTheme(`theme-${val}`)
                this.$store.commit("setThemeColor", val)
            }
        }
    }
</script>

