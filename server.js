const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('website')); // تأكد من وجود مجلد باسم 'website' يحتوي على ملفات الواجهة الأمامية

let projectData = {};

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    res.send(projectData);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});