const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../db.json');

async function main() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ rsvps: [], adminUser: null }, null, 2));
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  if (!db.adminUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.adminUser = {
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log('Admin user created. Username: admin, Password: admin123');
  } else {
    console.log('Admin user already exists.');
  }
}

main().catch(console.error);
