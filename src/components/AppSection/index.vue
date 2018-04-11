<template>
    <div class="sys-section">
        <div class="title">
            <strong>{{title}}</strong>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'AppSection',
    props: ['title']
}
</script>