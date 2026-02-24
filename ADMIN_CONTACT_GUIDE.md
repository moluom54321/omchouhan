# Admin Contact Management - Quick Guide

## 📊 Dashboard Overview

### Contact Messages Section
Located on the **Admin Dashboard**, below the Recent Admissions table.

### Stats Cards
- **New Messages** (Blue): Recently submitted messages not yet viewed
- **Unread** (Purple): Messages you've viewed but not replied to
- **Replied** (Teal): Messages you've already responded to

---

## 🎯 How to Reply to Contact Messages

### Step 1: View Messages
1. Log in to Admin Dashboard
2. Scroll to "Contact Messages" section
3. You'll see all submitted contact messages in a table

### Step 2: Open Reply Modal
1. Find the message you want to reply to
2. Click the **"Reply"** button (blue button with reply icon)
3. A modal popup will show:
   - Sender's name, email, phone
   - Original subject and message

### Step 3: Type Your Response
1. In the "Your Reply" text area, type your response message
2. Make sure to address the customer's concern

### Example Reply:
```
Dear [Customer Name],

Thank you for reaching out to Music School of Delhi. We appreciate your interest in our courses.

[Your response to their inquiry...]

For more information, you can also call us at +91 98765 43210 or visit our office during office hours.

Best regards,
[Your Name]
Music School of Delhi Team
```

### Step 4: Send Reply
1. Click **"Send Reply"** button
2. Wait for confirmation (usually takes a few seconds)
3. A success notification will appear
4. The customer will receive your reply via email automatically
5. The message status will change to "Replied"

### Step 5: (Optional) Delete Message
1. If you want to delete a message, click the **"Delete"** button (red trash icon)
2. Confirm the deletion
3. Message will be permanently removed

---

## 📱 Message Status Indicators

| Status | Color | Meaning |
|--------|-------|---------|
| **New** | Blue | Just submitted, not yet viewed |
| **Read** | Purple | You've viewed it, but haven't replied |
| **Replied** | Green | You've sent a reply |

---

## 💡 Tips

1. **Check Regularly**: Review "New Messages" count daily
2. **Professional Tone**: Always respond professionally and warmly
3. **Quick Response**: Try to reply within 24 hours
4. **Use Full Details**: Include relevant information about courses, timings, etc.
5. **Contact Info**: Always include school contact details in your reply
6. **Follow-up**: For admission inquiries, offer to send enrollment forms

---

## ❌ Common Issues & Solutions

### Email Not Sending
- **Problem**: You click Send but get an error
- **Solution**: Backend Gmail configuration might not be set. Admin needs to configure `.env` file with Gmail credentials

### Can't See Reply Field
- **Problem**: Reply modal doesn't open
- **Solution**: Refresh the page and try again. Check browser console for errors.

### Notification Not Showing
- **Problem**: User doesn't receive reply email
- **Solution**: Check the `.env` file has correct Gmail credentials. Check spam folder.

---

## 📧 Email Templates

### Confirmation Email (Sent to User)
Users receive an immediate confirmation when they submit a form:
- Confirms receipt of their message
- Shows their original inquiry
- States when they can expect a response

### Reply Email (Sent to User)  
When you send a reply:
- User receives your response
- Their original message is quoted
- Your name appears as the sender
- Includes school contact information

---

## 🔐 Privacy Note

All contact data is:
- Securely stored in the database
- Only visible to admin users
- Not shared with third parties
- Can be deleted if requested

---

## 🎓 Follow-up Actions

### After Replying:
1. **Admission Inquiries**: Consider sending them an admission form link
2. **Course Questions**: Send detailed course curriculum
3. **Feedback**: Thank them and note improvements
4. **General Inquiries**: Invite them to visit the school

---

**Last Updated:** February 7, 2026
**Version:** 1.0
