<template>
    <page-base>
        <h2>Setting</h2>
        <form v-on:submit.prevent="SubmitForm" class="setting-form">
            <input type="text" name="name" placeholder="Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Submit</button>
            <p v-if="message" :class="['message', messageType]">{{ message }}</p>
        </form>
    </page-base>
</template>

<script>
export default {
    name: 'page-setting',
    data() {
        return {
            message: '',
            messageType: 'success'
        }
    },
    methods: {
        async SubmitForm(e) {
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await response.json();
            this.message = 'Form submitted successfully!';
            this.messageType = 'success';
            e.target.reset();
        }
    }
}
</script>

<style scoped>
.setting-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 300px;
    margin: 1rem auto;
}

.setting-form input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
}

.setting-form button {
    padding: 0.5rem;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.setting-form button:hover {
    background-color: #059669;
}

.message {
    padding: 0.5rem;
    border-radius: 0.25rem;
    margin-top: 1rem;
}

.success {
    background-color: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
}

.error {
    background-color: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
}
</style>