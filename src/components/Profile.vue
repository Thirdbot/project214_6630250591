<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-image">
        <img src="../assets/profile.jpg" alt="Profile Picture" class="profile-pic">
        <button @click="toggleEdit" class="edit-btn">{{ isEditing ? 'Save' : 'Edit' }}</button>
      </div>
      <div class="profile-info">
        <h1 v-if="!isEditing">{{ profile.fullName }} {{ profile.lastName }}</h1>
        <div v-else class="edit-form">
          <input v-model="editedProfile.fullName" placeholder="First Name">
          <input v-model="editedProfile.lastName" placeholder="Last Name">
          <input v-model="editedProfile.oldSchool" placeholder="School Name">
        </div>
        <p class="school">{{ profile.oldSchool }}</p>
      </div>
    </div>
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
        picture: '',
        fullName: '',
        lastName: '',
        oldSchool: ''
      },
      editedProfile: {
        fullName: '',
        lastName: '',
        oldSchool: ''
      }
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/profile');
      this.profile = response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  },
  methods: {
    async toggleEdit() {
      if (this.isEditing) {
        try {
          await axios.put('http://localhost:3000/profile', this.editedProfile);
          this.profile = { ...this.editedProfile };
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      } else {
        this.editedProfile = { ...this.profile };
      }
      this.isEditing = !this.isEditing;
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-image {
  position: relative;
}

.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.edit-btn:hover {
  background: #45a049;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  margin: 0;
  color: #333;
  font-size: 2rem;
}

.school {
  color: #666;
  margin-top: 0.5rem;
}

.edit-form input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
}
</style> 