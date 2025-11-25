# 🔬 Aluminum Recovery System  
Smart Workflow System for Enhanced Aluminum Processing & Sustainable Refinement

This project is a full-stack web application built using **Django REST Framework** (backend), **React.js** (frontend), and **MySQL** (database).  
It helps industries analyze materials, track aluminum recovery, and manage by-products efficiently.

---

## 🚀 Features

### ⭐ User Management
- Custom user model (Email login)
- Roles: Agent, Scrap Team, Analyst
- Secure registration & login
- First name, last name, role stored in DB

### ⭐ Material Analysis Module
- Submit material name, purity, weight
- Calculates:
  - Aluminum yield
  - Aluminum weight produced
  - Auto-generates by-products (Red Mud, Silica, etc.)
- Stores analysis history

### ⭐ By-Product Management
- Add new by-products
- Update status: Pending → Processing → Completed → Recycled
- View inventory of all by-products

### ⭐ Dashboard
- Total materials processed  
- Total by-products  
- Average yield (dummy or real)
- Recent analysis logs
- Welcome message with user's name

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Axios  
- React Router  
- Modern CSS UI  

### **Backend**
- Django 5  
- Django REST Framework  
- MySQL  
- CORS Headers  
- Custom User Model  

