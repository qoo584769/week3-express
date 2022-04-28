const { HttpMethod } = require('../HttpFun');
const { modelOperator } = require('../models/postModel');

const getPost = async (req, res) => {
  try {
    const result = await modelOperator(req.method);
    HttpMethod(res, 200, 'success', result, '資料查詢成功');
  } catch (error) {
    HttpMethod(res, 404, 'false', error, '資料查詢失敗');
    console.log('查詢失敗');
  }
};

const postPost = async (req, res) => {
  try {
    const data = req.body;
    const result = await modelOperator(req.method, data);
    // 接收沒通過schema資料格式的錯誤
    if (result.errors !== undefined) {
      HttpMethod(
        res,
        404,
        'false',
        result.errors.content.properties.message,
        '資料新增失敗'
      );
      return;
    }
    HttpMethod(res, 200, 'success', result, '資料新增成功');
  } catch (error) {
    // repl回傳必須使用promise不然這裡的error會是空的
    HttpMethod(res, 404, 'false', error, '資料格式錯誤');
  }
};

const editPost = async (req, res) => {
  try {
    const data = req.body;

    if (req.params.id === undefined) {
      HttpMethod(res, 404, 'false', data, '資料ID錯誤或未填寫');
      return;
    } else {
      data.id = req.params.id;
    }

    if (data.content === undefined) {
      HttpMethod(res, 404, 'false', data, '貼文內容須填寫');
      return;
    }

    const result = await modelOperator(req.method, data);

    if (result.name === 'CastError') {
      HttpMethod(res, 404, 'false', result, 'id格式錯誤');
      return;
    }

    if (result.status === false) {
      HttpMethod(res, 404, 'false', result, '資料id錯誤或不存在');
      return;
    }

    HttpMethod(res, 200, 'success', result, '資料更新成功');
  } catch (error) {
    console.log(error);
    HttpMethod(res, 404, 'false', error, '資料格式錯誤');
  }
};

const deleteOnePost = async (req, res, next) => {
  try {
    let data = {};
    data.str = '刪除單筆';

    if (req.params.id === undefined) {
      data.id = '未加上ID';
      HttpMethod(res, 404, 'false', data, '資料ID錯誤或未填寫');
      return;
    } else {
      data.id = req.params.id;
    }

    const result = await modelOperator(req.method, data);
    if (result.message) {
      HttpMethod(res, 404, 'false', '資料ID錯誤', '刪除單筆資料失敗');
      return;
    }
    HttpMethod(res, 200, 'success', result, '刪除單筆資料成功');
  } catch (error) {
    HttpMethod(res, 404, 'false', error, '資料不存在');
  }
};

const deleteAllPost = async (req, res) => {
  try {
    let data = {};
    data.str = '刪除全部';
    const result = await modelOperator(req.method, data);
    HttpMethod(res, 200, 'success', result, '刪除多筆資料成功');
  } catch (error) {
    console.log(error);
    HttpMethod(res, 404, 'false', error, '刪除多筆資料失敗');
  }
};

const options = async (req, res) => {
  HttpMethod(res, 200, 'true', '連線測試', '連線成功');
};

const noRoute = async (req, res) => {
  HttpMethod(res, 404, 'false', '連線測試', '查無此路由');
};

module.exports = {
  getPost,
  postPost,
  editPost,
  deleteOnePost,
  deleteAllPost,
  options,
  noRoute,
};
