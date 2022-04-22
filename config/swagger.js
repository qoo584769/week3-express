const apiDoc = {
  openapi: '3.0.0',
  info: {
    version: '1.0',
    title: 'post API',
    description: '塗鴉牆',
  },
  tags: [{ name: '發文API', description: '貼文用RESTful API' }],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    // API的路徑
    '/post': {
      // API呼叫方法
      get: {
        // API分類 一樣的會放在同一個框
        tags: ['發文API'],
        // API簡介
        summary: '取得所有貼文',
        produces: ['application/json'],
        // API回傳內容
        responses: {
          200: {
            description: 'OK',
            content: {
              // 回傳格式
              'application/json': {
                // 回傳的資料內容  在下面的definitions物件定義要什麼
                schema: {
                  $ref: '#/definitions/postModel',
                },
              },
            },
          },
        },
      },
      post: {
        // API分類 一樣的會放在同一個框
        tags: ['發文API'],
        // API簡介
        summary: '新增貼文',
        // API要傳給後端的資料
        requestBody: {
          description: '參數',
          required: true,
          content: {
            // 回傳格式
            'application/json': {
              // 回傳的資料內容  在下面的definitions物件定義要什麼
              schema: {
                $ref: '#/definitions/postModel',
              },
            },
          },
        },
        produces: ['application/json'],
        // API回傳內容
        responses: {
          200: {
            description: 'OK',
            // 回傳內容
            content: {
              // 回傳內容格式
              'application/json': {
                // 回傳的資料格式
                schema: {
                  $ref: '#/definitions/postModel',
                },
              },
            },
          },
        },
      },
      delete: {
        // API分類 一樣的會放在同一個框
        tags: ['發文API'],
        // API簡介
        summary: '刪除全部貼文',
        // API要傳給後端的資料
        requestBody: {
          description: '參數',
          required: true,
          content: {
            // 回傳格式
            'application/json': {
              // 回傳的資料內容  在下面的definitions物件定義要什麼
              schema: {
                $ref: '#/definitions/postModel',
              },
            },
          },
        },
        produces: ['application/json'],
        // API回傳內容
        responses: {
          200: {
            description: 'OK',
            // 回傳內容
            content: {
              // 回傳內容格式
              'application/json': {
                // 回傳的資料格式
                schema: {
                  $ref: '#/definitions/postModel',
                },
              },
            },
          },
        },
      },
    },
    '/post/{id}': {
      // API呼叫方法
      patch: {
        // API分類 一樣的會放在同一個框
        tags: ['發文API'],
        // API簡介
        summary: '編輯貼文',
        // 帶入參數的方式
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: '要編輯的資料ID',
            "schema": {
                "type": "string"
              }
          },
        ],
        // API要傳給後端的資料
        requestBody: {
          description: '參數',
          required: true,
          content: {
            // 回傳格式
            'application/json': {
              // 回傳的資料內容  在下面的definitions物件定義要什麼
              schema: {
                $ref: '#/definitions/postModel',
              },
            },
          },
        },
        produces: ['application/json'],
        // API回傳內容
        responses: {
          200: {
            description: 'OK',
            content: {
              // 回傳格式
              'application/json': {
                // 回傳的資料內容  在下面的definitions物件定義要什麼
                schema: {
                  $ref: '#/definitions/postModel',
                },
              },
            },
          },
        },
      },
      delete: {
        // API分類 一樣的會放在同一個框
        tags: ['發文API'],
        // API簡介
        summary: '刪除單筆貼文',
        // 帶入參數的方式
        parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '要編輯的資料ID',
            },
          ],
        // API要傳給後端的資料
        requestBody: {
          description: '參數',
          required: true,
          content: {
            // 回傳格式
            'application/json': {
              // 回傳的資料內容  在下面的definitions物件定義要什麼
              schema: {
                $ref: '#/definitions/postModel',
              },
            },
          },
        },
        produces: ['application/json'],
        // API回傳內容
        responses: {
          200: {
            description: 'OK',
            // 回傳內容
            content: {
              // 回傳內容格式
              'application/json': {
                // 回傳的資料格式
                schema: {
                  $ref: '#/definitions/postModel',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    postModel: {
      type: 'object',
      // 必填的選項在畫面的資料格式選schema會有紅色*字號
      required: ['name', 'tags', 'type', 'content'],
      properties: {
        name: {
          type: 'string',
        },
        tags: {
          type: 'string',
        },
        type: {
          type: 'string',
          enum: ['group', 'person'],
        },
        image: {
          type: 'string',
          default: '',
        },
        createAt: {
          type: 'string',
          format: 'date-time',
          default: 'Date.now',
        },
        content: {
          type: 'string',
        },
        likes: {
          type: 'integer',
          default: 0,
        },
        comments: {
          type: 'integer',
          default: 0,
        },
      },
    },
  },
};

module.exports = apiDoc;
