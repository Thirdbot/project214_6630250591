<template>
    <router-link class="customButton" :to="to">   
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: 'base-router-button',
    props: {
        to: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.customButton{
    background-color: #42b983;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}
</style>