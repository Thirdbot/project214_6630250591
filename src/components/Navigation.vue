<template>
    <nav class="nav-bar">
        <base-router to="/home">Home</base-router>
        <base-router to="/about">About</base-router>
        <base-router to="/setting">Setting</base-router>
        <base-router to="/contact">Contact</base-router>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBar',
}
</script>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 20px;
    background-color: black;
    color: #fff;
}
</style>