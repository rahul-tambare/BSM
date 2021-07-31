const path = require('path');
exports.imageUpload = (req, res) => {
    if (req.files == null) {
        return res.status(400).json({ msg: 'no file uploaded' });
    }
    console.log(req.files, 'uploads');
    const file = req.files.file;
    file.forEach(element => {
        element.mv(path.join('public', 'uploads', element.name), err => {
            console.error(err);
            return res.status(500).send(err);
        })
    });

    res.status(200).json({ fileName: file.name });
};