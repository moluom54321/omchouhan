const connectDB = require('./src/config/db');
const Student = require('./src/models/Student');
const { hashPassword } = require('./src/services/auth.service');

// Default student credentials
const STUDENT_EMAIL = 'student@musicschooldelhi.com';
const STUDENT_PASSWORD = 'student123';
const STUDENT_NAME = 'Default Student';

async function createStudentUser() {
  try {
    // Connect to database
    await connectDB();

    // Check if student user already exists
    const existingStudent = await Student.findOne({ 
      email: STUDENT_EMAIL,
      role: 'student' 
    });

    if (existingStudent) {
      console.log('Student user already exists:', existingStudent.email);
      console.log('Email:', existingStudent.email);
      console.log('Role:', existingStudent.role);
      process.exit(0);
    }

    // Hash the student password
    const hashedPassword = await hashPassword(STUDENT_PASSWORD);

    // Create student user
    const studentUser = await Student.create({
      name: STUDENT_NAME,
      email: STUDENT_EMAIL,
      password: hashedPassword,
      role: 'student',
      isActive: true,
      gender: 'other', // Default gender value
    });

    console.log('Student user created successfully!');
    console.log('Email:', STUDENT_EMAIL);
    console.log('Password:', STUDENT_PASSWORD);
    console.log('Role:', studentUser.role);

    process.exit(0);
  } catch (error) {
    console.error('Error creating student user:', error.message);
    process.exit(1);
  }
}

// Run the function if this file is executed directly
if (require.main === module) {
  createStudentUser();
}

module.exports = createStudentUser;