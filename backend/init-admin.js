const connectDB = require('./src/config/db');
const Admin = require('./src/models/Admin');
const { hashPassword } = require('./src/services/auth.service');

// Default admin credentials
const ADMIN_EMAIL = 'admin@musicschooldelhi.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_NAME = 'Admin User';

async function createAdminUser() {
  try {
    // Connect to database
    await connectDB();

    // Check if admin user already exists
    const existingAdmin = await Admin.findOne({
      email: ADMIN_EMAIL,
      role: 'admin'
    });

    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      const hashedPassword = await hashPassword(ADMIN_PASSWORD);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log('Admin password updated successfully!');
      process.exit(0);
    }

    // Hash the admin password
    const hashedPassword = await hashPassword(ADMIN_PASSWORD);

    // Create admin user
    const adminUser = await Admin.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('Admin user created successfully!');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('Role:', adminUser.role);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
}

// Run the function if this file is executed directly
if (require.main === module) {
  createAdminUser();
}

module.exports = createAdminUser;