require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Attendance = require('./src/models/Attendance');
require('./src/models/Student');

async function fixBranches() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!\n');

    const records = await Attendance.find({}).populate('student', 'name preferredSchedule branch');

    let fixed = 0;
    for (const r of records) {
        if (!r.student) continue;
        const schedules = Array.isArray(r.student.preferredSchedule) ? r.student.preferredSchedule : [r.student.preferredSchedule || ''];

        // Find the schedule string that matches this record's courseType and timeSlot
        const cleanSlot = r.timeSlot.toLowerCase().replace(/[\s\u2013\u2014:\-_\/]|and|to|&/g, '');

        for (const sc of schedules) {
            if (!sc) continue;
            const cleanSc = sc.toLowerCase().replace(/[\s\u2013\u2014:\-_\/]|and|to|&/g, '');
            const courseMatch = sc.toLowerCase().includes(r.courseType.toLowerCase());
            const timeMatch = cleanSc.includes(cleanSlot);

            if (courseMatch && timeMatch) {
                // Determine branch from this specific schedule string
                let correctBranch = 'Pitampura';
                if (sc.toLowerCase().includes('rohini')) correctBranch = 'Rohini';

                if (correctBranch !== r.branch) {
                    await Attendance.findByIdAndUpdate(r._id, { branch: correctBranch });
                    console.log(`FIXED: ${r.student.name} | ${r.courseType} ${r.timeSlot} | ${new Date(r.date).toLocaleDateString('en-IN')} | ${r.branch} => ${correctBranch}`);
                    fixed++;
                }
                break;
            }
        }
    }

    console.log(`\nDone! Fixed ${fixed} records.`);
    await mongoose.disconnect();
}
fixBranches().catch(console.error);
