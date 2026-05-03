require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Attendance = require('./src/models/Attendance');
require('./src/models/Student'); // register Student schema

async function check() {
    await mongoose.connect(process.env.MONGODB_URI);
    const records = await Attendance.find({}).populate('student', 'name preferredSchedule branch');
    records.forEach(r => {
        console.log(`ID: ${r._id} | Student: ${r.student?.name || 'N/A'} | Course: ${r.courseType} | Slot: ${r.timeSlot} | Branch(saved): ${r.branch} | Date: ${new Date(r.date).toLocaleDateString('en-IN')} | Status: ${r.status}`);
        if (r.student) {
            console.log(`   Student schedules: ${JSON.stringify(r.student.preferredSchedule)} | Student branch: ${r.student.branch}`);
        }
    });
    await mongoose.disconnect();
}
check().catch(console.error);
