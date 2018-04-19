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
            left: 0,
            wheelSpeed: 30,
        }
    },
    methods: {
        scroll(e){
            const scrollWrapWidth = this.$refs.scrollWrap.offsetWidth
            const scrollContWidth = this.$refs.scrollCont.offsetWidth
            if(scrollContWidth > scrollWrapWidth){
                // 统一不同浏览器下wheel事件的滚动值
                // chrome/FF/Edge/IE11/IE10/IE9
                // e.deltaY > 0 即鼠标滚轮向下滚动，则该条向右滚动，left值变负
                const scrollSpace = e.deltaY > 0 ? -1 * this.wheelSpeed : this.wheelSpeed
                if(e.deltaY > 0){ 
                    if(Math.abs(this.left + scrollSpace) <= (scrollContWidth - scrollWrapWidth)){
                        this.left += scrollSpace
                    }
                } else {
                    if(this.left + scrollSpace < 0){
                        this.left += scrollSpace
                    } else {
                        this.left = 0
                    }
                }
            } else {
                return
            }
        },
        scrollToCurTag(tar){
            const scrollWrapWidth = this.$refs.scrollWrap.offsetWidth
            const tarWidth = tar.offsetWidth
            const tarLeft = tar.offsetLeft
            
            if(tarLeft < -1 * this.left){
                // 激活的标签导航在左边
                this.left = -tarLeft
            } else if(tarLeft + tarWidth > scrollWrapWidth){
                // 激活的标签导航在右边
                this.left = -(tarLeft + tarWidth - scrollWrapWidth)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.scroll-wrap{
    position: relative;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
}
.scroll-cont{
    position: absolute;
    transition: all .3s ease;
}
</style>


