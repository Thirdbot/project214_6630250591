<template>
  <div id="app">
    <header class="app-header">
      <h1>My Portfolio</h1>
    </header>
    <main class="app-main">
      <Profile />
      <SchoolHistory />
      <Education />
      <Accomplishments />
      <ContactInfo />
    </main>
  </div>
</template>

<script>
import Profile from './components/Profile.vue'
import Education from './components/Education.vue'
import Accomplishments from './components/Accomplishments.vue'
import SchoolHistory from './components/SchoolHistory.vue'
import ContactInfo from './components/ContactInfo.vue'

export default {
  name: 'App',
  components: {
    Profile,
    Education,
    Accomplishments,
    SchoolHistory,
    ContactInfo
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
}

.app-header {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 2rem;
}

.app-main {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

button {
  font-family: inherit;
}

input, textarea {
  font-family: inherit;
  font-size: 1rem;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}
</style>
