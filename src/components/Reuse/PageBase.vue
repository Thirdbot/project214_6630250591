<template>
    <div class="page-base">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'page-base'
}
</script>

<style scoped>
.page-base {
    position: fixed;
    width: 100%;
    height: 100%;
    margin-top: 1.25rem;
    padding: 1.25rem;
    background-color: #10b981;
    border-radius: 0.5rem;
}
</style>