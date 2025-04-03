<template>
  <div class="accomplishments-container">
    <div class="accomplishments-header">
      <h2>Accomplishments</h2>
      <button @click="toggleEdit" class="edit-btn">{{ isEditing ? 'Save' : 'Edit' }}</button>
    </div>
    
    <div class="accomplishments-list">
      <div v-for="(accomplishment, index) in accomplishments" :key="accomplishment.id" class="accomplishment-card">
        <div v-if="!isEditing">
          <h3>{{ accomplishment.title }}</h3>
          <p>{{ accomplishment.description }}</p>
          <p class="date">{{ accomplishment.date }}</p>
        </div>
        <div v-else class="edit-form">
          <input v-model="editedAccomplishments[index].title" placeholder="Title">
          <textarea v-model="editedAccomplishments[index].description" placeholder="Description"></textarea>
          <input v-model="editedAccomplishments[index].date" placeholder="Date" type="date">
          <button @click="deleteAccomplishment(accomplishment.id)" class="delete-btn">Delete</button>
        </div>
      </div>
      
      <button v-if="isEditing" @click="addNewAccomplishment" class="add-btn">Add New Accomplishment</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'user-accomplishments',
  data() {
    return {
      isEditing: false,
      accomplishments: [],
      editedAccomplishments: []
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/accomplishments');
      this.accomplishments = response.data;
    } catch (error) {
      console.error('Error fetching accomplishments:', error);
    }
  },
  methods: {
    async toggleEdit() {
      if (this.isEditing) {
        try {
          // Update existing accomplishments
          for (const accomplishment of this.editedAccomplishments) {
            if (accomplishment.id) {
              await axios.put(`http://localhost:3000/accomplishments/${accomplishment.id}`, accomplishment);
            } else {
              await axios.post('http://localhost:3000/accomplishments', accomplishment);
            }
          }
          const response = await axios.get('http://localhost:3000/accomplishments');
          this.accomplishments = response.data;
        } catch (error) {
          console.error('Error updating accomplishments:', error);
        }
      } else {
        this.editedAccomplishments = JSON.parse(JSON.stringify(this.accomplishments));
      }
      this.isEditing = !this.isEditing;
    },
    addNewAccomplishment() {
      this.editedAccomplishments.push({
        title: '',
        description: '',
        date: ''
      });
    },
    async deleteAccomplishment(id) {
      try {
        await axios.delete(`http://localhost:3000/accomplishments/${id}`);
        this.editedAccomplishments = this.editedAccomplishments.filter(acc => acc.id !== id);
      } catch (error) {
        console.error('Error deleting accomplishment:', error);
      }
    }
  }
}
</script>

<style scoped>
.accomplishments-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.accomplishments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.accomplishments-header h2 {
  margin: 0;
  color: #333;
}

.accomplishments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accomplishment-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.accomplishment-card h3 {
  margin: 0 0 1rem 0;
  color: #333;
}

.accomplishment-card p {
  margin: 0.5rem 0;
  color: #666;
}

.date {
  font-style: italic;
  color: #888;
}

.edit-form input,
.edit-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.edit-form textarea {
  min-height: 100px;
  resize: vertical;
}

.edit-btn, .add-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.edit-btn:hover, .add-btn:hover {
  background: #45a049;
}

.add-btn {
  margin-top: 1rem;
}

.delete-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 0.5rem;
}

.delete-btn:hover {
  background: #cc0000;
}
</style> 