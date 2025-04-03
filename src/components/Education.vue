<template>
  <div class="education-container">
    <div class="education-header">
      <h2>Education</h2>
      <button @click="toggleEdit" class="edit-btn">{{ isEditing ? 'Save Changes' : 'Add/Edit Subjects' }}</button>
    </div>
    
    <div class="subjects-list">
      <div v-for="(subject, index) in (isEditing ? editedSubjects : subjects)" :key="subject.id || index" class="subject-card">
        <div v-if="!isEditing">
          <h3>{{ subject.subjectName }}</h3>
          <p>Subject ID: {{ subject.subjectId }}</p>
          <p>Credits: {{ subject.credit }}</p>
          <p>Grade: {{ subject.grade }}</p>
        </div>
        <div v-else class="edit-form">
          <input v-model="editedSubjects[index].subjectName" placeholder="Subject Name">
          <input v-model="editedSubjects[index].subjectId" placeholder="Subject ID">
          <input v-model="editedSubjects[index].credit" placeholder="Credits">
          <input v-model="editedSubjects[index].grade" placeholder="Grade">
          <button @click="deleteSubject(subject.id)" class="delete-btn">Delete Subject</button>
        </div>
      </div>
      
      <button v-if="isEditing" @click="addNewSubject" class="add-btn">Add Another Subject</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'user-education',
  data() {
    return {
      isEditing: false,
      subjects: [],
      editedSubjects: []
    }
  },
  async created() {
    await this.fetchSubjects();
  },
  methods: {
    async fetchSubjects() {
      try {
        const response = await axios.get('http://localhost:3000/subjects');
        this.subjects = response.data;
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    },
    async toggleEdit() {
      if (this.isEditing) {
        try {
          // Update existing subjects
          for (const subject of this.editedSubjects) {
            if (subject.id) {
              await axios.put(`http://localhost:3000/subjects/${subject.id}`, subject);
            } else {
              await axios.post('http://localhost:3000/subjects', subject);
            }
          }
          await this.fetchSubjects();
        } catch (error) {
          console.error('Error updating subjects:', error);
        }
      } else {
        this.editedSubjects = JSON.parse(JSON.stringify(this.subjects));
      }
      this.isEditing = !this.isEditing;
    },
    addNewSubject() {
      this.editedSubjects.push({
        subjectId: '',
        subjectName: '',
        credit: '',
        grade: ''
      });
    },
    async deleteSubject(id) {
      try {
        await axios.delete(`http://localhost:3000/subjects/${id}`);
        // Remove from both arrays
        this.subjects = this.subjects.filter(subject => subject.id !== id);
        this.editedSubjects = this.editedSubjects.filter(subject => subject.id !== id);
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  }
}
</script>

<style scoped>
.education-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.education-header h2 {
  margin: 0;
  color: #333;
}

.subjects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.subject-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subject-card h3 {
  margin: 0 0 1rem 0;
  color: #333;
}

.subject-card p {
  margin: 0.5rem 0;
  color: #666;
}

.edit-form input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
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