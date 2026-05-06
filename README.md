# 🛡️ LockNest AI

**LockNest AI** is a premium, AI-powered password management suite designed for ultimate security and a high-end user experience. Built with the "Emerald Sovereign" aesthetic, it combines minimalist design with robust encryption.

![LockNest AI Banner](https://raw.githubusercontent.com/Shourya-h3/LockNest-AI/main/client/public/lock-icon.svg)

## ✨ Features

- **Emerald Sovereign UI**: A stunning, high-performance interface with 3D grid layouts and fluid animations.
- **Vault Management**: Securely store, organize, and manage your master keys and credentials.
- **AI-Powered Analytics**: Real-time insights into your security posture and password health.
- **Multi-Device Sync**: Access your vault from any device on your local network.
- **Student Registration**: Dedicated portal for academic integration.
- **Secure Authentication**: JWT-based auth with encrypted password recovery.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion, Recharts.
- **Backend**: Node.js, Express, MongoDB Atlas.
- **Security**: Bcrypt.js for hashing, AES-256 for vault encryption, JWT for session management.

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shourya-h3/LockNest-AI.git
   cd LockNest-AI
   ```

2. **Install dependencies**:
   ```bash
   npm run install-all
   ```

3. **Environment Configuration**:
   Create a `.env` file in the `server/` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ENCRYPTION_KEY=your_encryption_key
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5555`
   - Backend: `http://localhost:5000`

## 📱 Mobile Access
To access on your phone, use your computer's local IP address:
`http://192.168.x.x:5555`

## 📄 License
This project is for personal and educational use.

---
Created with ❤️ by Shourya-h3
