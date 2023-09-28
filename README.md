# 在线旅途民宿预定租房应用

技术栈：Next.js, React Hooks, Typescript, Tailwind, Prisma,  NextAuth, Zustand

允许用户进行预定和管理租房等基本操作。包括根据条件搜索适合的出租，出租和管理自己的房产，添加和管理出租收藏夹，用户(业主)可以管理自己的行程和房产的预定。

## 在线预览：https://trip-rentify.vercel.app/

### Features:

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

### Data structure

- User
- Account
- Listing
- Reservation

详情见schema.prisma文件

### Prerequisites

**Node version 14.x**

### Cloning the repository

```
git clone git@github.com:jerry-rat-coder/Trip-Rentify.git
```



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
