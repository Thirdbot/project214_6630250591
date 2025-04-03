# Vue Portfolio

A personal portfolio website built with Vue.js that showcases education history, school information, and contact details.

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vue-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON server for the backend:
```bash
json-server --watch data/db.json
```

4. In a new terminal, start the development server:
```bash
npm run serve
```

5. Open your browser and navigate to:
```
http://localhost:8080
```

### Project Structure
```
vue-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── ContactInfo.vue
│   │   ├── Education.vue
│   │   ├── Profile.vue
│   │   └── SchoolHistory.vue
│   ├── App.vue
│   └── main.js
├── data/
│   └── db.json
└── package.json
```

### Features
- Profile information display
- Education history with subjects and grades
- School history with details
- Contact information with edit functionality
- Responsive design
- Form validation
- Real-time updates

### Technologies Used
- Vue.js
- Axios
- JSON Server
- Font Awesome
- CSS3
