const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let dbUri = 'mongodb+srv://shivayechouhan6_db_user:X7Y6JJgbtitMMKd0@cluster0.g9wltvg.mongodb.net/music_school?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    try {
      console.log('Connected to MongoDB');
      const db = mongoose.connection;
      const admins = await db.collection('admins').find({}).toArray();
      if (admins.length > 0) {
        console.log('Admin found with email: ' + admins[0].email);
        
        // Let's reset the password to admin123
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        await db.collection('admins').updateOne(
          { _id: admins[0]._id },
          { $set: { password: hashedPassword } }
        );
        console.log('SUCCESS: Admin password has been reset to "admin123"');
      } else {
        console.log('No admins found in the database.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
