<template>
  <div class="contact-container">
    <div class="contact-header">
      <h2>Contact Information</h2>
      <button @click="toggleEdit" class="edit-btn">{{ isEditing ? 'Save Changes' : 'Edit Contact' }}</button>
    </div>
    
    <div class="contact-content">
      <div v-if="!isEditing" class="contact-display">
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <span>{{ contact.email }}</span>
        </div>
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <span>{{ contact.phone }}</span>
        </div>
        <div class="contact-item">
          <i class="fab fa-line"></i>
          <span>{{ contact.line }}</span>
        </div>
        <div class="contact-item">
          <i class="fab fa-github"></i>
          <a :href="contact.github" target="_blank">{{ contact.github }}</a>
        </div>
        <div class="contact-item">
          <i class="fab fa-linkedin"></i>
          <a :href="contact.linkedin" target="_blank">{{ contact.linkedin }}</a>
        </div>
        <div class="contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ contact.address }}</span>
        </div>
      </div>
      
      <form v-else @submit.prevent="saveContact" class="contact-edit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            id="email"
            v-model="editedContact.email" 
            type="email" 
            placeholder="Enter your email"
            required
          >
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input 
            id="phone"
            v-model="editedContact.phone" 
            type="tel" 
            placeholder="Enter your phone number"
            required
          >
        </div>
        <div class="form-group">
          <label for="line">Line ID:</label>
          <input 
            id="line"
            v-model="editedContact.line" 
            type="text" 
            placeholder="Enter your Line ID"
            required
          >
        </div>
        <div class="form-group">
          <label for="github">GitHub:</label>
          <input 
            id="github"
            v-model="editedContact.github" 
            type="url" 
            placeholder="Enter your GitHub URL"
            required
          >
        </div>
        <div class="form-group">
          <label for="linkedin">LinkedIn:</label>
          <input 
            id="linkedin"
            v-model="editedContact.linkedin" 
            type="url" 
            placeholder="Enter your LinkedIn URL"
            required
          >
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <textarea 
            id="address"
            v-model="editedContact.address" 
            placeholder="Enter your address"
            required
          ></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="save-btn">Save Changes</button>
          <button type="button" @click="cancelEdit" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactInfo',
  data() {
    return {
      isEditing: false,
      contact: {
        id: '',
        email: '',
        phone: '',
        line: '',
        github: '',
        linkedin: '',
        address: ''
      },
      editedContact: {
        id: '',
        email: '',
        phone: '',
        line: '',
        github: '',
        linkedin: '',
        address: ''
      }
    }
  },
  async created() {
    await this.fetchContact();
  },
  methods: {
    async fetchContact() {
      try {
        const response = await axios.get('http://localhost:3000/contact');
        if (response.data) {
          this.contact = response.data;
          this.editedContact = JSON.parse(JSON.stringify(this.contact));
        }
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    },
    async saveContact() {
      try {
        await axios.patch('http://localhost:3000/contact', this.editedContact);
        this.contact = JSON.parse(JSON.stringify(this.editedContact));
        this.isEditing = false;
      } catch (error) {
        console.error('Error updating contact information:', error);
        alert('Failed to save contact information. Please try again.');
      }
    },
    cancelEdit() {
      this.editedContact = JSON.parse(JSON.stringify(this.contact));
      this.isEditing = false;
    },
    toggleEdit() {
      if (!this.isEditing) {
        this.editedContact = JSON.parse(JSON.stringify(this.contact));
      }
      this.isEditing = !this.isEditing;
    }
  }
}
</script>

<style scoped>
.contact-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.contact-header h2 {
  margin: 0;
  color: #333;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.contact-item i {
  width: 24px;
  color: #4CAF50;
}

.contact-item a {
  color: #4CAF50;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
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
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.edit-btn,
.save-btn,
.cancel-btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
}

.edit-btn,
.save-btn {
  background: #4CAF50;
  color: white;
}

.cancel-btn {
  background: #f44336;
  color: white;
}

.edit-btn:hover,
.save-btn:hover {
  background: #45a049;
}

.cancel-btn:hover {
  background: #d32f2f;
}
</style> 