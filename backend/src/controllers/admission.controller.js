const Admission = require('../models/Admission');
const Student = require('../models/Student');
const { hashPassword } = require('../services/auth.service');

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
            admissionStatus: req.body.admissionStatus || "approved",  // Use provided status or default to approved
            paymentStatus: req.body.paymentStatus || "paid",        // Use provided status or default to paid
            enrollmentStatus: req.body.enrollmentStatus || "enrolled" // Use provided status or default to enrolled
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
        const hashedPassword = await hashPassword(req.body.password);

        if (existingStudent) {
            await Student.updateOne(
                { email: email },
                {
                    name: fullName,
                    password: hashedPassword, // Ensure password is updated
                    admissionStatus: admissionData.admissionStatus,
                    paymentStatus: admissionData.paymentStatus,
                    enrollmentStatus: admissionData.enrollmentStatus,
                    selectedCourse: course,
                    preferredSchedule: req.body.preferredSchedule || null,
                    guardianDetails: guardianDetails,
                    branch: branch,
                    $set: { updatedAt: new Date() }
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
                role: 'student',
                isActive: true
            };

            const newStudent = new Student(newStudentData);
            await newStudent.save();
            console.log('New Student created successfully:', newStudent._id);
        }

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
                admissionStatus: admissionStatus,
                paymentStatus: paymentStatus,
                enrollmentStatus: enrollmentStatus,
                selectedCourse: admission.course,
                $set: { updatedAt: new Date() }
            }
        );

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