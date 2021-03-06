/**
 * Created by WWL on 2017/9/20.
 */
var express = require('express');
var router = express.Router();
var scenicDao = require('./../dao/scenicDAO').scenicDao;

router.get('/getScenic', function (req, res, next) {
  // console.log('<<<<<<<<<<<<<<<<<<<<');
  scenicDao.getScenic(function (result) {
    if (result) {
      res.json(result);
    }
  });

});
router.post('/getScenicItem', function (req, res, next) {
  var id = req.body.id;
  // console.log(id);
  if (id) {
    scenicDao.getScenicItem(id, function (result) {
      if (result) {
        // console.log(result);
        res.json(result);
      }
    })
  }
});
router.post('/getHotScenic', function (req, res) {
  scenicDao.getHotScenic('', function (result) {
    if (result) {
      res.json(result);
    }
  })
});
router.post('/getCitys', function (req, res) {
  scenicDao.getCitys('', function (result) {
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
})

module.exports = router;
