<template>
    <page-base>
        <h2>Home</h2>
        <p>{{ user?.name }}</p>
        <data-card @selecteduser="handleSelectedUser"></data-card>
    </page-base>
</template>

<script>
import DataCard from './DataCard.vue'
export default {
    name: 'page-home',
    components: {
        'data-card': DataCard
    },
    data() {
        return {
            user: ''
        }
    },
    methods: {
        handleSelectedUser(user) {
            this.user = user;
        }
    }
}
</script>

<style scoped>

</style>