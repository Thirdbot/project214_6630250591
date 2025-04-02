<template>
    <router-link class="router-button" :to="to">   
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
.router-button {
    background-color: #10b981;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.2s;
}

.router-button:hover {
    background-color: #059669;
}
</style>