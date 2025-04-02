<template>
    <div class="container">
        <ul>
            <button @click="selectData(data)" v-for="data in datas" :key="data.id" class="data-item">
                {{ data.name }}
            </button>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'DataCard',
    emits:['seleteduser'],
    data(){
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
    },
    methods: {
        selectData(data) {
            this.$emit('selecteduser',data)
        }
    }
}
</script>

<style scoped>
.container {
    float: left;
    position: fixed;
    bottom: 0;

    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
}
.data-item {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
}
</style>