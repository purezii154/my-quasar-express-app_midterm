// backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // สำคัญ! อนุญาตให้ Frontend (คนละ Port) เรียก API ได้
app.use(express.json());

// เตรียมโฟลเดอร์ logs สำหรับ Demo เรื่อง Docker Volume
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Endpoint Demo
app.get('/api/demo', (req, res) => {
    // Demo: เขียน Log ลงไฟล์ (ข้อมูลนี้จะยังอยู่แม้ลบ Container ถ้าใช้ Volume)
    const logMessage = `[${new Date().toISOString()}] Request from: ${req.ip}\n`;
    fs.appendFileSync(path.join(logsDir, 'access.log'), logMessage);

    res.json({
        git: {
            title: 'Advanced Git Workflow',
            detail: 'ใช้ Monorepo Strategy: จัดการทั้ง Frontend/Backend ใน repo เดียว พร้อม Branch protection'
        },
        docker: {
            title: 'Advanced Docker Compose',
            detail: 'Orchestration: รัน 2 Services พร้อมกัน เชื่อมต่อผ่าน Internal Network และใช้ Volumes เก็บ Logs'
        }
    });
});

// Basic Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`);
});