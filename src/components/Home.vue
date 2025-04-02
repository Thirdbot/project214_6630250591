<template>
    <page-base>
        <h2>Home</h2>
        <li v-for="data in datas" :key="data.id">
            {{ data.email }}
        </li>
    </page-base>
</template>

<script>
export default {
    name: 'page-home',
    data() {
        return {
            datas:null
        }
    },
    created() {
        fetch('http://localhost:3000/users',
            {
                mathod:'GET'
            })
            .then(response => response.json())
            .then(data => {
                this.datas = data
            })
    }
}
</script>

<style scoped>

</style>