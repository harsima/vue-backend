<!-- 每个页面的标题，用来重复确认当前所处页面，亦可用作面包屑导航的外层结构。 -->
<template>
    <div class="sys-title">
        <strong>{{title}}</strong>
    </div>
</template>

<script>
    export default {
        name: 'vPageTitle',
        props: ['title']
    }
</script>