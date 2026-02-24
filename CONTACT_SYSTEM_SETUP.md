# Contact Management System - Setup Guide

## Overview
This contact management system allows:
- **Students/Visitors** to submit contact forms from the website
- **Contact submissions** are saved to the database
- **Admin dashboard** displays all contact messages with stats
- **Admin can reply** via email directly to users
- **Automatic email confirmations** sent to users

---

## 📂 Files Created/Updated

### Backend Files Created:
1. **[Contact.js](backend/src/models/Contact.js)** - MongoDB model for storing contact messages
2. **[contact.controller.js](backend/src/controllers/contact.controller.js)** - API logic for handling contact submissions and replies
3. **[contact.routes.js](backend/src/routes/contact.routes.js)** - API endpoints for contact management

### Backend Files Updated:
1. **[app.js](backend/src/app.js)** - Added contact routes
2. **[env.js](backend/src/config/env.js)** - Added Gmail configuration variables
3. **[package.json](backend/package.json)** - Added nodemailer dependency

### Frontend Files Updated:
1. **[contact.html](contact.html)** - Added JavaScript to submit form to API
2. **[admin-dashboard.html](admin%20folder/admin-dashboard.html)** - Added contact messages section with reply functionality

---

## 🔧 Setup Instructions

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Gmail (IMPORTANT!)
You need to set up Gmail with an **App Password** for automated emails:

#### For Gmail:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App passwords** (select Mail and Windows Computer)
4. Google will generate a 16-character password
5. Copy this password

#### Create a `.env` file in the backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/music_school_delhi
JWT_SECRET=music_school_delhi_secret_key
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-char-app-password
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `your-16-char-app-password` with the password generated from Google

### Step 3: Start the Server
```bash
npm start
```

---

## 📝 Contact Form Flow

### User Side (contact.html):
1. User fills the contact form with: Name, Email, Phone, Subject, Message
2. Form is submitted via JavaScript fetch to API
3. User receives a confirmation email
4. Success message is shown on the website

### Admin Side (admin-dashboard.html):
1. Admin sees contact messages in the dashboard
2. Message stats show: New Messages, Unread, Replied
3. Admin can click "Reply" button to open a reply modal
4. Admin types response and sends
5. User receives reply via email automatically

---

## 🔌 API Endpoints

### Public Endpoint:
- **POST** `/api/contact/submit` - Submit a contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "subject": "general",
    "message": "Your message here"
  }
  ```

### Admin Endpoints (Protected):
- **GET** `/api/contact` - Get all contact messages
- **GET** `/api/contact/stats` - Get contact statistics
- **GET** `/api/contact/:id` - Get single contact message
- **POST** `/api/contact/:id/reply` - Send reply to a contact
  ```json
  {
    "message": "Thank you for your inquiry...",
    "adminName": "Admin Name"
  }
  ```
- **DELETE** `/api/contact/:id` - Delete a contact message

---

## 📊 Message Status

- **new** - Newly submitted message (yellow highlight)
- **read** - Admin has viewed the message
- **replied** - Admin has sent a reply

---

## 🎨 Features

✅ Contact form validation
✅ Auto-confirmation emails to users
✅ Admin dashboard with message table
✅ Quick statistics (New, Unread, Replied)
✅ Reply modal with message preview
✅ Auto-send reply emails to users
✅ Delete message functionality
✅ Responsive design
✅ Loading states and error handling
✅ Alert notifications

---

## 🚀 Testing

1. **Test Contact Form:**
   - Go to http://localhost:3000/contact.html
   - Fill and submit the form
   - Check for success message
   - Check your email for confirmation

2. **Test Admin Dashboard:**
   - Go to admin dashboard
   - Scroll to "Contact Messages" section
   - See submitted messages in the table
   - Click "Reply" button
   - Send a reply (check user's email for response)

---

## ⚠️ Troubleshooting

### Email not sending:
1. Check `.env` file has correct Gmail credentials
2. Verify Gmail App Password is 16 characters
3. Check if 2-Step Verification is enabled on Gmail
4. Check MongoDB is running
5. Check server console for error messages

### Contact not saving:
1. Check MongoDB connection in logs
2. Verify form validation is passing
3. Check browser console for fetch errors
4. Verify backend API is running on port 5000

### Admin can't see messages:
1. Make sure you're logged in as admin
2. Check JWT token in browser localStorage
3. Verify contact route is added in app.js
4. Check browser console for API errors

---

## 📁 Database Model (Contact Schema)

```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  subject: String (enum: ['general', 'admission', 'courses', 'feedback', 'other']),
  message: String (required, max 2000 chars),
  status: String (enum: ['new', 'read', 'replied'], default: 'new'),
  adminReply: {
    message: String,
    repliedBy: String,
    repliedAt: Date
  },
  replyEmailSent: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 📞 Support Email Settings

The system uses Gmail SMTP. You can modify email templates in [contact.controller.js](backend/src/controllers/contact.controller.js) to customize:
- Confirmation email template
- Reply email template
- Email sender name and address

---

**Created:** February 7, 2026
**Status:** Ready for Production
