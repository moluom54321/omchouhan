const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const env = require('../config/env');

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_PASSWORD
    }
});

// Submit Contact Form
exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate input
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }

        // Create new contact
        const contact = new Contact({
            name,
            email,
            phone,
            subject,
            message
        });

        await contact.save();

        // Respond immediately - don't wait for email
        res.status(201).json({
            success: true,
            message: 'Your message has been received. We will contact you soon!',
            data: contact
        });

        // Send confirmation email in background (non-blocking)
        setImmediate(async () => {
            try {
                await transporter.sendMail({
                    from: env.GMAIL_USER,
                    to: email,
                    subject: 'We received your message - Music School of Delhi',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                                <h1 style="margin: 0;">Music School of Delhi</h1>
                            </div>
                            <div style="padding: 20px; background: #f9f9f9;">
                                <h2>Thank you for contacting us!</h2>
                                <p>Dear <strong>${name}</strong>,</p>
                                <p>We have received your message and will get back to you as soon as possible.</p>
                                <div style="background: white; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
                                    <p><strong>Your Message Details:</strong></p>
                                    <p><strong>Subject:</strong> ${subject}</p>
                                    <p><strong>Message:</strong> ${message}</p>
                                </div>
                                <p>Our team will review your inquiry and respond shortly.</p>
                                <p>Best regards,<br><strong>Music School of Delhi Team</strong></p>
                            </div>
                            <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px;">
                                <p>Email: info@musicschooldelhi.com | Phone: +91 98765 43210</p>
                            </div>
                        </div>
                    `
                });
                console.log('✅ Confirmation email sent to:', email);
            } catch (emailError) {
                console.error('❌ Error sending confirmation email to', email, ':', emailError.message);
                // Try to send admin alert
                try {
                    await transporter.sendMail({
                        from: env.GMAIL_USER,
                        to: env.GMAIL_USER,
                        subject: 'ALERT: Contact form email failed',
                        html: `<p>Failed to send confirmation email to user: <b>${email}</b></p>
                            <p><b>Error:</b> ${emailError.message}</p>
                            <p><b>Contact Details:</b></p>
                            <ul>
                                <li>Name: ${name}</li>
                                <li>Email: ${email}</li>
                                <li>Phone: ${phone}</li>
                                <li>Subject: ${subject}</li>
                            </ul>`
                    });
                } catch (adminAlertError) {
                    console.error('❌ Error sending admin alert:', adminAlertError.message);
                }
            }
        });
    } catch (error) {
        console.error('Error submitting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting contact form',
            error: error.message
        });
    }
};

// Get All Contact Messages (for admin)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: contacts,
            count: contacts.length
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: error.message
        });
    }
};

// Get Single Contact
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        // Mark as read
        contact.status = 'read';
        await contact.save();

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact',
            error: error.message
        });
    }
};

// Reply to Contact Message
exports.replyToContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, adminName } = req.body;

        if (!message || !adminName) {
            return res.status(400).json({
                success: false,
                message: 'Reply message and admin name are required'
            });
        }

        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        // Update admin reply
        contact.adminReply.message = message;
        contact.adminReply.repliedBy = adminName;
        contact.adminReply.repliedAt = new Date();
        contact.status = 'replied';
        contact.replyEmailSent = false;

        // Validate Gmail credentials before sending
        const hasValidCredentials = env.GMAIL_USER &&
            env.GMAIL_PASSWORD &&
            !env.GMAIL_USER.includes('your-email') &&
            !env.GMAIL_PASSWORD.includes('your-') &&
            env.GMAIL_USER !== 'your-email@gmail.com';

        // Check if it looks like a regular password instead of app password
        const looksLikeRegularPassword = env.GMAIL_PASSWORD &&
            env.GMAIL_PASSWORD.length < 16 &&
            !env.GMAIL_PASSWORD.includes(' ');

        let emailSendError = null;

        // Enhanced debugging for email configuration
        console.log('🔧 Email Reply Configuration Check:');
        console.log('   - Gmail User:', env.GMAIL_USER);
        console.log('   - Password Configured:', !!env.GMAIL_PASSWORD);
        console.log('   - Password Length:', env.GMAIL_PASSWORD ? env.GMAIL_PASSWORD.length : 0);
        console.log('   - Contact Email:', contact.email);
        console.log('   - Has Valid Credentials:', hasValidCredentials);
        console.log('   - Looks Like Regular Password:', looksLikeRegularPassword);

        // Send reply email only if valid credentials exist
        if (!hasValidCredentials) {
            console.warn('❌ Gmail credentials not configured. Email sending disabled.');
            emailSendError = 'Gmail credentials not configured. Please update .env file with valid GMAIL_USER and GMAIL_PASSWORD.';
            contact.replyEmailSent = false;
        } else if (looksLikeRegularPassword) {
            console.warn('⚠️ WARNING: Gmail password looks like a regular password, not an App Password!');
            console.warn('Google App Passwords are 16 characters with spaces (e.g., "abcd efgh ijkl mnop")');
            console.warn('Regular Gmail passwords will NOT work. Please generate an App Password from:');
            console.warn('https://myaccount.google.com/security');

            // Try to send anyway, but it will likely fail
            try {
                console.log('📧 Attempting to send email with regular password...');
                const emailResponse = await transporter.sendMail({
                    from: `"${adminName} - Music School of Delhi" <${env.GMAIL_USER}>`,
                    replyTo: env.GMAIL_USER,
                    to: contact.email,
                    subject: `Re: ${contact.subject} - Music School of Delhi`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                                <h1 style="margin: 0;">Music School of Delhi</h1>
                            </div>
                            <div style="padding: 20px; background: #f9f9f9;">
                                <h2>Response to Your Inquiry</h2>
                                <p>Dear <strong>${contact.name}</strong>,</p>
                                <p>Thank you for reaching out to us. Here is our response to your inquiry:</p>
                                <div style="background: white; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
                                    <p>${message}</p>
                                </div>
                                <p><strong>Your Original Message:</strong></p>
                                <div style="background: #f0f0f0; padding: 10px; border-radius: 5px; margin: 10px 0;">
                                    <p style="margin: 0;">${contact.message}</p>
                                </div>
                                <p>If you have further questions, feel free to contact us.</p>
                                <p>Best regards,<br><strong>${adminName}</strong><br>Music School of Delhi Team</p>
                            </div>
                            <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px;">
                                <p>Email: info@musicschooldelhi.com | Phone: +91 98765 43210</p>
                            </div>
                        </div>
                    `
                });
                contact.replyEmailSent = true;
                console.log('✅ Reply email sent successfully to:', contact.email);
            } catch (emailError) {
                console.error('❌ Error sending reply email:', emailError.message);

                // Provide specific error message for authentication failures
                if (emailError.message.includes('Invalid login') ||
                    emailError.message.includes('Username and Password not accepted') ||
                    emailError.message.includes('535')) {
                    emailSendError = 'Authentication failed. You are using a regular Gmail password instead of a Google App Password. Please generate an App Password from https://myaccount.google.com/security and update your .env file. See FIX_EMAIL_NOW.md for detailed instructions.';
                } else {
                    emailSendError = emailError.message;
                }
                contact.replyEmailSent = false;
            }
        } else {
            // Credentials look valid, try to send
            try {
                console.log('📧 Sending email with proper app password...');
                console.log('   - From:', env.GMAIL_USER);
                console.log('   - To:', contact.email);
                console.log('   - Admin Name:', adminName);
                
                const emailResponse = await transporter.sendMail({
                    from: `"${adminName} - Music School of Delhi" <${env.GMAIL_USER}>`,
                    replyTo: env.GMAIL_USER,
                    to: contact.email,
                    subject: `Re: ${contact.subject} - Music School of Delhi`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                                <h1 style="margin: 0;">Music School of Delhi</h1>
                            </div>
                            <div style="padding: 20px; background: #f9f9f9;">
                                <h2>Response to Your Inquiry</h2>
                                <p>Dear <strong>${contact.name}</strong>,</p>
                                <p>Thank you for reaching out to us. Here is our response to your inquiry:</p>
                                <div style="background: white; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
                                    <p>${message}</p>
                                </div>
                                <p><strong>Your Original Message:</strong></p>
                                <div style="background: #f0f0f0; padding: 10px; border-radius: 5px; margin: 10px 0;">
                                    <p style="margin: 0;">${contact.message}</p>
                                </div>
                                <p>If you have further questions, feel free to contact us.</p>
                                <p>Best regards,<br><strong>${adminName}</strong><br>Music School of Delhi Team</p>
                            </div>
                            <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px;">
                                <p>Email: info@musicschooldelhi.com | Phone: +91 98765 43210</p>
                            </div>
                        </div>
                    `
                });
                contact.replyEmailSent = true;
                console.log('✅ Reply email sent successfully to:', contact.email);
            } catch (emailError) {
                console.error('❌ Error sending reply email:', emailError.message);

                // Provide specific error message for authentication failures
                if (emailError.message.includes('Invalid login') ||
                    emailError.message.includes('Username and Password not accepted') ||
                    emailError.message.includes('535')) {
                    emailSendError = 'Authentication failed. Please verify your Gmail App Password is correct. Regular Gmail passwords do not work. Generate an App Password from https://myaccount.google.com/security';
                } else {
                    emailSendError = emailError.message;
                }
                contact.replyEmailSent = false;
            }
        }

        await contact.save();

        res.status(200).json({
            success: true,
            message: emailSendError ?
                `Reply saved successfully but email could not be sent: ${emailSendError}` :
                'Reply sent successfully via email!',
            emailSent: contact.replyEmailSent,
            emailError: emailSendError,
            data: contact
        });
    } catch (error) {
        console.error('Error replying to contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending reply',
            error: error.message
        });
    }
};

// Delete Contact Message
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact',
            error: error.message
        });
    }
};

// Get Dashboard Stats
exports.getContactStats = async (req, res) => {
    try {
        const total = await Contact.countDocuments();
        const newMessages = await Contact.countDocuments({ status: 'new' });
        const replied = await Contact.countDocuments({ status: 'replied' });
        const read = await Contact.countDocuments({ status: 'read' });

        res.status(200).json({
            success: true,
            data: {
                total,
                newMessages,
                read,
                replied
            }
        });
    } catch (error) {
        console.error('Error fetching contact stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact stats',
            error: error.message
        });
    }
};

// Test Email Configuration
exports.testEmailConfiguration = async (req, res) => {
    try {
        const { toEmail } = req.body;
        
        if (!toEmail) {
            return res.status(400).json({
                success: false,
                message: 'Test email address is required'
            });
        }

        console.log('🔧 Testing email configuration:');
        console.log('   - From:', env.GMAIL_USER);
        console.log('   - To:', toEmail);
        console.log('   - Password configured:', !!env.GMAIL_PASSWORD);
        console.log('   - Password length:', env.GMAIL_PASSWORD ? env.GMAIL_PASSWORD.length : 0);

        // Test email sending
        const emailResponse = await transporter.sendMail({
            from: env.GMAIL_USER,
            to: toEmail,
            subject: '📧 Email Configuration Test - Music School of Delhi',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0;">✅ Email Test Successful!</h1>
                    </div>
                    <div style="padding: 20px; background: #f9f9f9;">
                        <h2>Email Configuration Test</h2>
                        <p>This is a test email to verify that your Gmail configuration is working correctly.</p>
                        <div style="background: white; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0;">
                            <p><strong>Test Details:</strong></p>
                            <p><strong>From:</strong> ${env.GMAIL_USER}</p>
                            <p><strong>To:</strong> ${toEmail}</p>
                            <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        <p>If you received this email, your Gmail configuration is working perfectly!</p>
                        <p>Best regards,<br><strong>Music School of Delhi System</strong></p>
                    </div>
                    <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px;">
                        <p>Email: info@musicschooldelhi.com | Phone: +91 98765 43210</p>
                    </div>
                </div>
            `
        });

        console.log('✅ Test email sent successfully to:', toEmail);
        console.log('   - Message ID:', emailResponse.messageId);
        console.log('   - Response:', emailResponse);

        res.status(200).json({
            success: true,
            message: 'Test email sent successfully',
            emailSent: true,
            messageId: emailResponse.messageId,
            fromEmail: env.GMAIL_USER,
            toEmail: toEmail
        });

    } catch (error) {
        console.error('❌ Test email failed:', error);
        console.error('   - Error code:', error.code);
        console.error('   - Error message:', error.message);
        
        let errorMessage = 'Email test failed';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Authentication failed. Please check your Gmail App Password.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Connection failed. Please check your internet connection.';
        } else if (error.message.includes('Invalid login')) {
            errorMessage = 'Invalid Gmail credentials. Please verify your App Password.';
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
            emailSent: false,
            error: error.message,
            errorCode: error.code
        });
    }
};
