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

// 用來分辨刪除單筆還是全部
const deleteGate = (req,res,next)=>{
  if(req.method === 'DELETE' && req.url.startsWith('/posts/')){
    deleteOnePost(req,res)
  }else{
    deleteAllPost(req,res)
  }
};

router.get('/posts', getPost);
// 加上bodyparser
router.post('/posts',express.json(), postPost);
// 加上bodyparser
router.patch('/posts/:id', express.json(), editPost);
router.delete('/posts/:id', deleteGate);
router.delete('/posts', deleteGate);
// options express已經內建
router.options('/posts', options);

module.exports = router;
