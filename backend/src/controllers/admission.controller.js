const Admission = require('../models/Admission');
const Student = require('../models/Student');
const { hashPassword } = require('../services/auth.service');
const nodemailer = require('nodemailer');
const env = require('../config/env');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: env.GMAIL_USER, pass: env.GMAIL_PASSWORD }
});

// Send enrollment confirmation email (non-blocking)
function sendEnrollmentEmail(toEmail, studentName, courses) {
    const courseList = Array.isArray(courses) ? courses.join(', ') : courses;
    setImmediate(async () => {
        try {
            await transporter.sendMail({
                from: `"Music School of Delhi" <${env.GMAIL_USER}>`,
                to: toEmail,
                subject: 'Enrollment Received – Awaiting Admin Approval',
                html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                  <div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:24px;border-radius:10px 10px 0 0;text-align:center;">
                    <h1 style="margin:0;">🎵 Music School of Delhi</h1>
                  </div>
                  <div style="padding:24px;background:#f9f9f9;">
                    <h2 style="color:#333;">You have enrolled successfully! 🎉</h2>
                    <p>Dear <strong>${studentName}</strong>,</p>
                    <p>Thank you for submitting your admission form for <strong>${courseList}</strong>.</p>
                    <p>Your enrollment request has been received. Our admin team will review your details and <strong>approve your account shortly</strong>.</p>
                    <div style="background:#fff3cd;border-left:4px solid #ffc107;padding:14px;margin:20px 0;border-radius:4px;">
                      <p style="margin:0;"><strong>⏳ Please Wait:</strong> You will receive another email once your account is approved. Only then will you be able to log in to your Student Dashboard.</p>
                    </div>
                    <p>If you have questions, WhatsApp us or visit the school directly.</p>
                    <p>Best regards,<br><strong>Music School of Delhi Team</strong></p>
                  </div>
                  <div style="background:#f0f0f0;padding:14px;text-align:center;font-size:12px;color:#666;border-radius:0 0 10px 10px;">
                    <p>Music School of Delhi | info@musicschooldelhi.com</p>
                  </div>
                </div>`
            });
            console.log('✅ Enrollment confirmation email sent to:', toEmail);
        } catch (err) {
            console.error('❌ Enrollment email failed:', err.message);
        }
    });
}

// Send approval email (non-blocking)
function sendApprovalEmail(toEmail, studentName) {
    setImmediate(async () => {
        try {
            await transporter.sendMail({
                from: `"Music School of Delhi" <${env.GMAIL_USER}>`,
                to: toEmail,
                subject: '✅ Your Admission is Approved – You Can Now Login!',
                html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                  <div style="background:linear-gradient(135deg,#11998e,#38ef7d);color:#fff;padding:24px;border-radius:10px 10px 0 0;text-align:center;">
                    <h1 style="margin:0;">🎵 Music School of Delhi</h1>
                  </div>
                  <div style="padding:24px;background:#f9f9f9;">
                    <h2 style="color:#333;">Your Admission is Approved! ✅</h2>
                    <p>Dear <strong>${studentName}</strong>,</p>
                    <p>Great news! Your admission has been <strong>approved by our admin team</strong>.</p>
                    <div style="background:#d4edda;border-left:4px solid #28a745;padding:14px;margin:20px 0;border-radius:4px;">
                      <p style="margin:0;"><strong>🎉 You can now login to your Student Dashboard</strong> using the email and password you registered with.</p>
                    </div>
                    <p>Welcome to the Music School of Delhi family! We look forward to seeing you in class.</p>
                    <p>Best regards,<br><strong>Music School of Delhi Team</strong></p>
                  </div>
                  <div style="background:#f0f0f0;padding:14px;text-align:center;font-size:12px;color:#666;border-radius:0 0 10px 10px;">
                    <p>Music School of Delhi | info@musicschooldelhi.com</p>
                  </div>
                </div>`
            });
            console.log('✅ Approval email sent to:', toEmail);
        } catch (err) {
            console.error('❌ Approval email failed:', err.message);
        }
    });
}

// Send rejection email (non-blocking)
function sendRejectionEmail(toEmail, studentName) {
    setImmediate(async () => {
        try {
            await transporter.sendMail({
                from: `"Music School of Delhi" <${env.GMAIL_USER}>`,
                to: toEmail,
                subject: 'Admission Update – Music School of Delhi',
                html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                  <div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:24px;border-radius:10px 10px 0 0;text-align:center;">
                    <h1 style="margin:0;">🎵 Music School of Delhi</h1>
                  </div>
                  <div style="padding:24px;background:#f9f9f9;">
                    <p>Dear <strong>${studentName}</strong>,</p>
                    <p>We regret to inform you that your admission request could not be approved at this time.</p>
                    <p>Please contact us directly for more information or to reapply.</p>
                    <p>Best regards,<br><strong>Music School of Delhi Team</strong></p>
                  </div>
                  <div style="background:#f0f0f0;padding:14px;text-align:center;font-size:12px;color:#666;border-radius:0 0 10px 10px;">
                    <p>Music School of Delhi | info@musicschooldelhi.com</p>
                  </div>
                </div>`
            });
            console.log('✅ Rejection email sent to:', toEmail);
        } catch (err) {
            console.error('❌ Rejection email failed:', err.message);
        }
    });
}

// Submit admission request
const submitAdmission = async (req, res) => {
    try {
        console.log('Received admission request:', req.body); // Debug log
        const {
            fullName,
            email,
            phone,
            dateOfBirth,
            gender,
            address,
            course,
            preferredSchedule,
            guardianDetails
        } = req.body;

        // Calculate age from date of birth
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Check if student already exists with this email
        // This line is moved down as per the instruction's implied flow
        // const existingStudent = await Student.findOne({ email });

        // Check if admission already exists and update it, or create new one
        const existingAdmission = await Admission.findOne({ email });

        // Prepare admission data
        // Determine branch based on course selection
        let branch = 'Pitampura'; // Default
        const selectedCourses = Array.isArray(course) ? course : [course];
        if (selectedCourses.some(c => c && c.toLowerCase().includes('rohini'))) {
            branch = 'Rohini';
        }

        const admissionData = {
            fullName,
            email,
            phone,
            dateOfBirth,
            age,
            gender,
            address,
            course,
            preferredSchedule,
            guardianDetails,
            branch: branch,
            admissionStatus: req.body.admissionStatus || "pending",  // Changed default to pending for verification
            paymentStatus: req.body.paymentStatus || "unpaid",        // Changed default to unpaid
            enrollmentStatus: req.body.enrollmentStatus || "not_enrolled", // Changed default
            transactionId: req.body.transactionId || null,
            whatsappScreenshotSent: req.body.whatsappScreenshotSent === true,
            isCashPayment: req.body.isCashPayment === true
        };

        let admission;
        if (existingAdmission) {
            // Update existing admission request
            admission = await Admission.findOneAndUpdate(
                { email: email },
                admissionData,
                { new: true, runValidators: true }
            );
        } else {
            // Create new admission record
            const newAdmission = new Admission(admissionData);
            admission = await newAdmission.save();
        }

        // 3. Create or update the student record
        let existingStudent = await Student.findOne({ email: email });
        const hashedPassword = await hashPassword(req.body.password || 'TempPass123!');

        if (existingStudent) {
            await Student.updateOne(
                { email: email },
                {
                    $set: {
                        name: fullName,
                        password: hashedPassword,
                        admissionStatus: admissionData.admissionStatus,
                        paymentStatus: admissionData.paymentStatus,
                        enrollmentStatus: admissionData.enrollmentStatus,
                        selectedCourse: course,
                        preferredSchedule: req.body.preferredSchedule || null,
                        guardianDetails: guardianDetails,
                        branch: branch,
                        transactionId: admissionData.transactionId,
                        whatsappScreenshotSent: admissionData.whatsappScreenshotSent,
                        isCashPayment: admissionData.isCashPayment,
                        updatedAt: new Date()
                    }
                }
            );
            console.log('Student updated successfully:', existingStudent._id);
        } else {
            const newStudentData = {
                name: fullName,
                email,
                phone,
                password: hashedPassword, // Set the password
                dateOfBirth,
                joinedDate: req.body.joinedDate || new Date(),
                age,
                gender,
                guardianDetails,
                address: {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    zipCode: address.pincode || address.zipCode
                },
                selectedCourse: course,
                preferredSchedule: req.body.preferredSchedule || null,
                admissionStatus: admissionData.admissionStatus,
                paymentStatus: admissionData.paymentStatus,
                enrollmentStatus: admissionData.enrollmentStatus,
                branch: branch,
                transactionId: admissionData.transactionId,
                whatsappScreenshotSent: admissionData.whatsappScreenshotSent,
                isCashPayment: admissionData.isCashPayment,
                role: 'student',
                isActive: true
            };

            const newStudent = new Student(newStudentData);
            await newStudent.save();
            console.log('New Student created successfully:', newStudent._id);
        }

        // Send confirmation email to student (non-blocking)
        sendEnrollmentEmail(email, fullName, course);

        res.status(201).json({
            success: true,
            message: 'Admission request submitted successfully',
            data: admission
        });
    } catch (error) {
        console.error('Admission submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get all admission requests
const getAllAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find({});

        res.status(200).json({
            success: true,
            count: admissions.length,
            data: admissions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get admission by ID
const getAdmissionById = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);

        if (!admission) {
            return res.status(404).json({
                success: false,
                message: 'Admission request not found'
            });
        }

        res.status(200).json({
            success: true,
            data: admission
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Update admission status
const updateAdmissionStatus = async (req, res) => {
    try {
        const { admissionStatus, paymentStatus, enrollmentStatus } = req.body;

        const admission = await Admission.findByIdAndUpdate(
            req.params.id,
            { admissionStatus, paymentStatus, enrollmentStatus },
            { new: true, runValidators: true }
        );

        if (!admission) {
            return res.status(404).json({
                success: false,
                message: 'Admission request not found'
            });
        }

        // Update the corresponding student record if it exists
        await Student.updateOne(
            { email: admission.email },
            {
                $set: {
                    admissionStatus: admissionStatus,
                    paymentStatus: paymentStatus,
                    enrollmentStatus: enrollmentStatus,
                    selectedCourse: admission.course,
                    updatedAt: new Date()
                }
            }
        );

        // Send status email to student (non-blocking)
        if (admissionStatus === 'approved') {
            sendApprovalEmail(admission.email, admission.fullName);
        } else if (admissionStatus === 'rejected') {
            sendRejectionEmail(admission.email, admission.fullName);
        }

        res.status(200).json({
            success: true,
            message: 'Admission status updated successfully',
            data: admission
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get admission statistics
const getAdmissionStats = async (req, res) => {
    try {
        const total = await Admission.countDocuments();
        const pending = await Admission.countDocuments({ admissionStatus: 'pending' });
        const approved = await Admission.countDocuments({ admissionStatus: 'approved' });
        const rejected = await Admission.countDocuments({ admissionStatus: 'rejected' });
        const recentlyJoined = await Admission.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });

        res.status(200).json({
            success: true,
            data: {
                total,
                pending,
                approved,
                rejected,
                recentlyJoined
            }
        });
    } catch (error) {
        console.error('Error fetching admission stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching admission stats',
            error: error.message
        });
    }
};

module.exports = {
    submitAdmission,
    getAllAdmissions,
    getAdmissionById,
    updateAdmissionStatus,
    getAdmissionStats
};