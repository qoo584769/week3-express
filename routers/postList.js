const express = require('express');
const router = express.Router();
const postController = require('../controller/postController')
// 用來分辨刪除單筆還是全部
const deleteGate = (req,res,next)=>{
  if(req.method === 'DELETE' && req.url.startsWith('/posts/')){
    postController.deleteOnePost(req,res)
  }else{
    postController.deleteAllPost(req,res)
  }
};
router.get('/posts', postController.getPost);
// 加上bodyparser
router.post('/posts',express.json(), postController.postPost);
// 加上bodyparser
router.patch('/posts/:id', express.json(), postController.editPost);
router.delete('/posts/:id', deleteGate);
router.delete('/posts', deleteGate);
// options express已經內建
router.options('/posts', postController.options);

module.exports = router;
