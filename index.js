const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSetting = require('./config/swagger');

const app = express();

const postRouter = require('./routers/postList');

app.use('/', postRouter);
// bodypaser可以用在這邊全域 也可以放在router裡面
// app.use(express.json());
// urlencoded是用來解析非網址列傳入的資料
app.use(express.urlencoded({ extended: true }));
// 路徑 https://week3-express.herokuapp.com/api-doc/ 沒在postman檔案裡
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSetting));
// 判斷網址不存在
app.use((req, res, next) => {
  res.status(404).send('頁面不存在');
});
// 判斷執行不存在的方法
app.use((err, req, res, next) => {
  res.status(500).send('程式出現問題，請稍後再試');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`伺服器已開啟在 ${port} port`);
});
