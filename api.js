const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/packet', (req, res) => {
    const data = fs.readFileSync('./cap.json', 'utf-8').split('\n').filter(Boolean);
    const packetData = [
        '[',
        data.join(','),
        ']'
    ].join('');

    res.json(JSON.parse(packetData));
});

module.exports = router;
