// main.js
const express = require('express');
const multer = require('multer');
const uuid4 = require('uuid4');

const app = express();

const path = require('path');
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath));

const upload = multer({
    storage: multer.diskStorage({
        filename(req, file, done) {
            const randomID = uuid4();
            const ext = path.extname(file.originalname);
            const filename = randomID + ext;
            done(null, filename);
        },
        destination(req, file, done) {
            console.log(file),
            done(null, path.join(__dirname, "files"));
        },
    }),
    // limits: { fileSize: 0 },
});

const uploadMiddleware = upload.single('myFile');

// app.use(uploadMiddleware);

app.post('/upload', uploadMiddleware, (req, res) => {
    console.log(req.file);
    res.status(200).send('uploaded');
});

app.listen(3000, () => {
    console.log('server is running at 3000');
});

