const mongoose = require('mongoose');
require('dotenv').config();

const DBString = process.env.MONGO_DB_CONNECTING_STRING.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

function DBConnect() {
  const DB = mongoose
    .connect(DBString)
    .then(() => {
      console.log('db connected');
    })
    .catch((err) => {
      console.log(err);
    });
  return DB;
}

// 用傳進來的model去資料庫搜尋
async function getDB(schemaModel) {
  // 等待資料庫連線
  await DBConnect();
  try {
    const result = await schemaModel.find({});
    return result;
  } catch (error) {
    console.log('查詢失敗');
    console.log(error);
  }
}

async function postDB(schemaModel, modelData) {
  // 等待資料庫連線
  await DBConnect();
  try {
    const result = schemaModel.create(modelData);
    return result;
  } catch (error) {
    return error;
  }
  // 上下兩種新增方式都可以

  // const newPostlist = new schemaModel(modelData);
  // return await newPostlist
  //   .save()
  //   .then((res) => {
  //     console.log('DB資料新增成功');
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log('DB資料寫入錯誤');
  //     return err;
  //   });
}

async function patchDB(schemaModel, modelData) {
  // 等待資料庫連線
  await DBConnect();
  try {
    const query = { _id: modelData.id };
    const exist = await schemaModel.exists(query);
    if (exist === null) {
      let wrong = { status: false, error: 'wrong id or data not exist' };
      return wrong;
    }

    //runValidators會進行schema驗證 new會回傳更新後的值
    const result = await schemaModel.findOneAndUpdate(query, modelData, {
      runValidators: true,
      new: true,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// 直接刪除 未使用軟刪除
async function deleteOneDB(schemaModel, id) {
  // 等待資料庫連線
  await DBConnect();
  try {
    const result = await schemaModel.findOneAndDelete({ _id: id });
    return result;
  } catch (error) {
    console.log('刪除單筆資料失敗');
    return error;
  }
}
async function deleteAllDB(schemaModel) {
  // 等待資料庫連線
  await DBConnect();
  try {
    const result = await schemaModel.deleteMany();
    return result;
  } catch (error) {
    console.log('刪除全部資料失敗');
    return error;
  }
}

module.exports = { getDB, postDB, patchDB, deleteOneDB, deleteAllDB };
