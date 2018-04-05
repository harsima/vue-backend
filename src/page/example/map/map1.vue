<template>
    <div id="map1" class="map-container"></div>
</template>

<script>
/* eslint-disable */
import amap from '@/util/amap'
var map
export default {
    mounted() {
        amap.load(() => {
            this.init()
        })
    },
    methods: {
        init(){
            map = new AMap.Map('map1', amap.defaultOption)
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                map.addControl(new AMap.ToolBar())
                map.addControl(new AMap.Scale())
            })
        }
    }
}
</script>

<style scoped>
.map-container{
    width: 100%;
    height: 100%;
}
</style>