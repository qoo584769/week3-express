const express = require('express');
const router = express.Router();

const {
  getPost,
  postPost,
  editPost,
  deleteOnePost,
  deleteAllPost,
  options,
} = require('../controller/postController');

router.get('/posts', getPost);
// 加上bodyparser
router.post('/posts',express.json(), postPost);
// 加上bodyparser
router.patch('/posts/:id', express.json(), editPost);
// 這裡post跟post/會跑全部刪除的方法 只要沒放id就是全部刪除
router.delete('/posts/:id', deleteOnePost);
router.delete('/posts', deleteAllPost);
// options express已經內建
router.options('/posts', options);

module.exports = router;
