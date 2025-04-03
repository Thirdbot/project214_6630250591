<template>
  <div class="profile-container">
    <div class="profile-header">
      <h2>Profile</h2>
      <button @click="toggleEdit" class="edit-btn">{{ isEditing ? 'Save Changes' : 'Edit Profile' }}</button>
    </div>
    
    <div v-if="!isEditing" class="profile-display">
      <div class="profile-picture">
        <img src="../assets/profile.jpg" alt="Profile Picture">
      </div>
      <div class="profile-info">
        <h3>{{ profile.fullName }} {{ profile.lastName }}</h3>
        <p class="title">{{ profile.title }}</p>
        <div class="info-item">
          <i class="fas fa-id-card"></i>
          <span>Student ID: {{ profile.studentId }}</span>
        </div>
        <div class="info-item">
          <i class="fas fa-graduation-cap"></i>
          <span>Department: {{ profile.department }}</span>
        </div>
        <div class="info-item">
          <i class="fas fa-school"></i>
          <span>{{ profile.oldSchool }}</span>
        </div>
        <p class="description">{{ profile.description }}</p>
      </div>
    </div>

    <form v-else @submit.prevent="saveProfile" class="profile-edit">
      <div class="form-group">
        <label for="picture">Profile Picture URL:</label>
        <input 
          id="picture"
          v-model="profile.picture" 
          type="url" 
          placeholder="Enter profile picture URL"
          required
        >
      </div>
      <div class="form-group">
        <label for="fullName">Full Name (Thai):</label>
        <input 
          id="fullName"
          v-model="profile.fullName" 
          type="text" 
          placeholder="Enter full name in Thai"
          required
        >
      </div>
      <div class="form-group">
        <label for="lastName">Last Name (Thai):</label>
        <input 
          id="lastName"
          v-model="profile.lastName" 
          type="text" 
          placeholder="Enter last name in Thai"
          required
        >
      </div>
      <div class="form-group">
        <label for="name">Name (English):</label>
        <input 
          id="name"
          v-model="profile.name" 
          type="text" 
          placeholder="Enter name in English"
          required
        >
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input 
          id="title"
          v-model="profile.title" 
          type="text" 
          placeholder="Enter your title"
          required
        >
      </div>
      <div class="form-group">
        <label for="studentId">Student ID:</label>
        <input 
          id="studentId"
          v-model="profile.studentId" 
          type="text" 
          placeholder="Enter your student ID"
          required
        >
      </div>
      <div class="form-group">
        <label for="department">Department:</label>
        <input 
          id="department"
          v-model="profile.department" 
          type="text" 
          placeholder="Enter your department"
          required
        >
      </div>
      <div class="form-group">
        <label for="oldSchool">School:</label>
        <input 
          id="oldSchool"
          v-model="profile.oldSchool" 
          type="text" 
          placeholder="Enter your school"
          required
        >
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea 
          id="description"
          v-model="profile.description" 
          placeholder="Enter your description"
          required
        ></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="save-btn">Save Profile</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'user-profile',
  data() {
    return {
      isEditing: false,
      profile: {
        id: '',
        picture: '',
        fullName: '',
        lastName: '',
        name: '',
        title: '',
        studentId: '',
        department: '',
        oldSchool: '',
        description: ''
      }
    }
  },
  async created() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get('http://localhost:3000/profile');
        if (response.data) {
          this.profile = response.data;
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },
    async saveProfile() {
      try {
        await axios.patch('http://localhost:3000/profile', this.profile);
        this.isEditing = false;
        alert('Profile saved successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to save profile. Please try again.');
      }
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-header h2 {
  margin: 0;
  color: #333;
}

.profile-display {
  display: flex;
  gap: 2rem;
}

.profile-picture {
  flex-shrink: 0;
}

.profile-picture img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info {
  flex-grow: 1;
}

.profile-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.profile-info .title {
  color: #666;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.info-item i {
  width: 20px;
  color: #4CAF50;
}

.profile-info .description {
  margin-top: 1rem;
  color: #666;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  margin-top: 1.5rem;
  text-align: center;
}

.edit-btn,
.save-btn {
  background: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
  font-size: 1rem;
  font-weight: bold;
}

.edit-btn:hover,
.save-btn:hover {
  background: #45a049;
}
</style> 