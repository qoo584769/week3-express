const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSetting = require('./config/swagger');

const app = express();

const postRouter = require('./routers/postList');

app.use('/',postRouter);
// bodypaser可以用在這邊全域 也可以放在router裡面
// app.use(express.json());
// urlencoded是用來解析非網址列傳入的資料
app.use(express.urlencoded({ extended: true }));
// 路徑 https://week3-express.herokuapp.com/api-doc/ 沒在postman檔案裡
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerSetting));
const port =process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`伺服器已開啟在 ${port} port`);
});