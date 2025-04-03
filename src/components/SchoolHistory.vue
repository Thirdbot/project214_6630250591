<template>
  <div class="school-history-container">
    <div class="school-history-header">
      <h2>School History</h2>
      <button @click="toggleEdit" class="edit-btn">{{ isEditing ? 'Save Changes' : 'Add/Edit Schools' }}</button>
    </div>
    
    <div class="schools-list">
      <div v-for="(school, index) in (isEditing ? editedSchools : schools)" :key="school.id || index" class="school-card">
        <div v-if="!isEditing">
          <h3>{{ school.schoolName }}</h3>
          <p class="degree">{{ school.degree }}</p>
          <p class="years">{{ school.startYear }} - {{ school.endYear }}</p>
          <p class="description">{{ school.description }}</p>
        </div>
        <div v-else class="edit-form">
          <input v-model="editedSchools[index].schoolName" placeholder="School Name">
          <input v-model="editedSchools[index].degree" placeholder="Degree">
          <div class="year-inputs">
            <input v-model="editedSchools[index].startYear" placeholder="Start Year" type="number">
            <input v-model="editedSchools[index].endYear" placeholder="End Year" type="number">
          </div>
          <textarea v-model="editedSchools[index].description" placeholder="Description"></textarea>
          <button @click="deleteSchool(school.id)" class="delete-btn">Delete School</button>
        </div>
      </div>
      
      <button v-if="isEditing" @click="addNewSchool" class="add-btn">Add Another School</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SchoolHistory',
  data() {
    return {
      isEditing: false,
      schools: [],
      editedSchools: []
    }
  },
  async created() {
    await this.fetchSchools();
  },
  methods: {
    async fetchSchools() {
      try {
        const response = await axios.get('http://localhost:3000/schoolHistory');
        this.schools = response.data;
        this.editedSchools = JSON.parse(JSON.stringify(this.schools));
      } catch (error) {
        console.error('Error fetching school history:', error);
      }
    },
    async toggleEdit() {
      if (this.isEditing) {
        try {
          // First, handle new schools (those without IDs)
          const newSchools = this.editedSchools.filter(school => !school.id);
          for (const school of newSchools) {
            // Convert years to numbers
            const schoolData = {
              ...school,
              startYear: parseInt(school.startYear),
              endYear: parseInt(school.endYear)
            };
            const response = await axios.post('http://localhost:3000/schoolHistory', schoolData);
            const index = this.editedSchools.findIndex(s => s === school);
            if (index !== -1) {
              this.editedSchools[index] = response.data;
            }
          }

          // Then, update existing schools
          const existingSchools = this.editedSchools.filter(school => school.id);
          for (const school of existingSchools) {
            // Convert years to numbers
            const schoolData = {
              ...school,
              startYear: parseInt(school.startYear),
              endYear: parseInt(school.endYear)
            };
            await axios.put(`http://localhost:3000/schoolHistory/${school.id}`, schoolData);
          }

          // Update the main array with the edited data
          this.schools = JSON.parse(JSON.stringify(this.editedSchools));
        } catch (error) {
          console.error('Error updating school history:', error);
        }
      } else {
        // When entering edit mode, create a deep copy of the schools
        this.editedSchools = JSON.parse(JSON.stringify(this.schools));
      }
      this.isEditing = !this.isEditing;
    },
    addNewSchool() {
      this.editedSchools.push({
        schoolName: '',
        degree: '',
        startYear: null,
        endYear: null,
        description: ''
      });
    },
    async deleteSchool(id) {
      try {
        await axios.delete(`http://localhost:3000/schoolHistory/${id}`);
        // Remove from both arrays
        this.schools = this.schools.filter(school => school.id !== id);
        this.editedSchools = this.editedSchools.filter(school => school.id !== id);
      } catch (error) {
        console.error('Error deleting school:', error);
      }
    }
  }
}
</script>

<style scoped>
.school-history-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.school-history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.school-history-header h2 {
  margin: 0;
  color: #333;
}

.schools-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.school-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.school-card h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.degree {
  font-weight: bold;
  color: #2c3e50;
  margin: 0.5rem 0;
}

.years {
  color: #666;
  font-style: italic;
  margin: 0.5rem 0;
}

.description {
  color: #666;
  margin: 0.5rem 0;
}

.edit-form input,
.edit-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.year-inputs {
  display: flex;
  gap: 1rem;
}

.year-inputs input {
  flex: 1;
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

.add-btn {
  margin-top: 1rem;
}
</style> 