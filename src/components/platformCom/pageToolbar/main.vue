<template>
    <div class="sys-toolbar" :class="align">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'vPageToolbar',
        props: {
            align: {
                type: String,
                default: function(){
                    return 'right'
                }
            }
        }
    }
</script>