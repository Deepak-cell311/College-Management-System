const router = require('express').Router();
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');

router.post('/NoticeCreate/', noticeCreate);        //done
router.get('/NoticeList/', noticeList);             //done
router.delete("/Notices/", deleteNotices);
router.delete("/Notice/:id", deleteNotice);         //done
router.put("/Notice/:id", updateNotice);

module.exports = router;