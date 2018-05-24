<template>
    <div class="sys-page">
        <div id="container">
            <map1></map1>
        </div>
    </div>
</template>

<script>
import Map1 from './map1'
export default {
    name: 'exampleMap',
    components: {Map1}
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