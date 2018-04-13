<template>
    <div class="scroll-wrap" ref="scrollWrap" @wheel.prevent="scroll">
        <div class="scroll-cont" ref="scrollCont" :style="{left: left + 'px'}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            left: 0
        }
    },
    methods: {
        scroll(e){
            // TODO
            const eventDelta = e.wheelDelta || -e.deltaY * 3
        }
    }
}
</script>
<style lang="scss" scoped>
.scroll-wrap{
    width: 100%;
    overflow: hidden;
}
.scroll-cont{
    display: inline-block;
    white-space: nowrap;
}
</style>


