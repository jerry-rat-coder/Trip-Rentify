# Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth

This is a repository for a Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth.

Features:

- 使用Tailwind实现完全响应式设计的页面和动画效果
- 凭证身份验证
- Google身份验证
- Github身份验证
- 使用Cloudinary CDN上传图片
- 使用react-hook-form进行客户端表单验证和处理
- 使用react-toast处理服务器错误
- 使用react-date-range实现日历功能
- 页面加载状态
- 页面空状态
- 预定/预约系统
- 客人预约取消功能
- 业主预约取消功能
- 创建和删除房产信息
- 价格计算功能
- 根据类别、日期范围、地图位置、客人数量、房间和浴室进行高级搜索
- 例如，我们会筛选出在您希望出行的日期范围内已有预定的房产
- 收藏功能
- 在路由处理器中编写POST和DELETE路由的方法
- 在服务器React组件中直接访问数据库获取数据的方法而无需通过API
- 处理像error.tsx和loading.tsx这样的文件（Next 13），用于统一加载和错误处理
- 处理Server和Child组件之间的关系

### Prerequisites

**Node version 14.x**

### Cloning the repository





### Install packages

```
npm i
```



### Setup .env file

```
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```



### Setup Prisma

```
npx prisma db push
```



### Start the app

```
npm run dev
```
