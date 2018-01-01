<template>
    <div class="sys-page">
        <div class="note">
            <v-pageNotes>本层为浮动层。本页实际路径: src/page/example/map.vue</v-pageNotes>
        </div>
        <div id="container">
            <map1></map1>
        </div>
    </div>
</template>

<script>
import map1 from './map1'
export default {
    components: {map1}
}
</script>
<style lang="scss" scoped>
#container{
    width: 100%;
    height: 100%;
}
.note{
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    z-index: 1000;
}
</style>

