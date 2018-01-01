<template>
    <div class="sys-page" v-once>
        <v-pageTitle title="介绍"></v-pageTitle>
        <div class="page-content">
            <v-pageNotes>
                该部分组件为本系统自行开发的组件（包括对第三方组件的封装），不包括纯粹的第三方组件。系统组件仅为通用的大众化组件，需注意和项目组件进行区分。全部系统组件文件位于 src/components/platformCom 
            </v-pageNotes>
            <v-pageSection title="使用方法">
                <div class="sys-article">
                    <p>系统组件默认使用全局注册，无需再次引入。如果需要按需引入，只需在<code>src/main.js</code>中取消对全局组件的引入即可。如下所示</p>
                    <pre v-pre class="sys-pre"><code>
    import Vue from "vue"
    import VueRouter from 'vue-router'
    ...
-   // 全局组件
-   import './components/platformCom/install'
    ...
                    </code></pre>
                    <p>如果需要取消部分全局组件的应用，则修改<code>src/components/platformCom/install.js</code>的引入组件即可</p>
                </div>
            </v-pageSection>
            <v-pageSection title="分类说明">
                <div class="sys-article">
                    <p>系统组件主要分为三大类</p>
                    <p>功能类：以实现具体功能为主，包括对第三方组件的二次封装类，尽量不要修改。</p>
                    <p>布局类：以常用布局为主，包括标题、间距、搜索之类的纯布局组件，可按实际项目要求修改</p>
                    <p>辅助类：文档辅助说明及其他组件部分，可能不会应用在正式产品中，该类别可以不引入到正式产品中</p>
                </div>
            </v-pageSection>
        </div>
    </div>
</template>