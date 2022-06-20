const express = require('express')
const router = express.Router()
const fs = require('fs')
const files = require('./musicList')

router.get('/',(req,res)=>{
    res.redirect('/index.html')
})
//C:\Users\lkjui\Music

router.get('/music',(req,res)=>{
    let id = req.query.id
    var filePath = files[id].path
    var stat = fs.statSync(filePath);
    var total = stat.size;
    if (req.headers.range) {
        var range = req.headers.range;
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total-1;
        var chunksize = (end-start)+1;
        var readStream = fs.createReadStream(filePath, {start: start, end: end});
        readStream.on('end',()=>{readStream.close();console.log("closed")})
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
            'Content-Type': 'audio/flac'
        });
        readStream.pipe(res);
     } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/flac' });
        fs.createReadStream(filePath).pipe(res);
     }
})

router.get("/music/getList",(req,res)=>{
    res.send(files)
})

module.exports = router