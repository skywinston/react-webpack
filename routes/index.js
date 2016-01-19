var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + "/build/"}, function (err) {
        if (err) throw new Error ("Error sending index.html file from the build directory in GET route to /");
    });
});

module.exports = router;
