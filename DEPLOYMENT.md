# 📦 部署指南

## ✅ 构建状态
✅ **项目构建成功！** 所有 TypeScript 错误已修复，可以正常部署。

## 🚀 部署选项

### 1. **Vercel 部署** (推荐)
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署到 Vercel
vercel

# 或者直接连接 GitHub 仓库
# 访问 https://vercel.com 连接仓库自动部署
```

### 2. **Netlify 部署**
```bash
# 构建命令
pnpm build

# 发布目录
.next

# 上传到 Netlify 或连接 GitHub 仓库
```

### 3. **传统服务器部署**
```bash
# 1. 构建项目
pnpm build

# 2. 启动生产服务器
pnpm start

# 3. 使用 PM2 管理进程 (可选)
npm install -g pm2
pm2 start "pnpm start" --name "yunda-admin"
```

### 4. **Docker 部署**
创建 `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm 和依赖
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]
```

构建和运行：
```bash
docker build -t yunda-admin .
docker run -p 3000:3000 yunda-admin
```

## 🌐 环境变量配置

创建 `.env.production` 文件：
```env
# 生产环境配置
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-domain.com
HASURA_GRAPHQL_ENDPOINT=https://your-hasura-endpoint.com/v1/graphql
HASURA_GRAPHQL_ADMIN_SECRET=your-admin-secret

# 第三方服务配置 (如需要)
ALICLOUD_ACCESS_KEY_ID=your-access-key
ALICLOUD_ACCESS_KEY_SECRET=your-secret
QINIU_ACCESS_KEY=your-qiniu-key
QINIU_SECRET_KEY=your-qiniu-secret
WECHAT_APP_ID=your-wechat-app-id
WECHAT_APP_SECRET=your-wechat-secret
```

## 📋 部署前检查清单

### ✅ **已完成**
- [x] TypeScript 编译无错误
- [x] 所有页面路由正常
- [x] 静态资源构建成功
- [x] API 路由创建完成
- [x] 模拟数据正常工作

### ⚠️ **生产环境注意事项**
- [ ] 配置真实的 API 端点
- [ ] 设置环境变量
- [ ] 配置域名和 SSL
- [ ] 设置错误监控 (如 Sentry)
- [ ] 配置分析工具 (如 Google Analytics)

## 🎯 演示功能

### 🔐 **登录账号**
```
👑 管理员: admin@yunda.com / admin123
🤱 代孕母亲: surrogate@yunda.com / surrogate123  
👨‍👩‍👧‍👦 准父母: parent@yunda.com / parent123
🤝 代理机构: agency@yunda.com / agency123
```

### 📱 **核心功能路径**
- **申请审核**: `/admin/super-admin/surrogate-applications`
- **案例管理**: `/admin/super-admin/cases`
- **生活动态**: `/admin/surrogate/social`
- **旅程跟踪**: `/admin/surrogate/journey`
- **文件管理**: `/admin/surrogate/case-files`

## 🔧 故障排除

### 常见问题
1. **构建失败**: 检查 TypeScript 错误
2. **页面 404**: 检查路由配置
3. **样式丢失**: 确保 CSS 文件正确导入
4. **API 错误**: 检查环境变量配置

### 调试命令
```bash
# 检查构建输出
pnpm build

# 本地测试生产版本
pnpm start

# 检查依赖
pnpm audit

# 清理缓存
rm -rf .next node_modules
pnpm install
pnpm build
```

## 📊 构建结果

```
Route (app)                                       Size  First Load JS    
┌ ○ /                                            535 B         102 kB
├ ○ /admin/dashboard                           1.81 kB         131 kB
├ ○ /admin/intended-parent                     5.48 kB         380 kB
├ ○ /admin/super-admin                         3.95 kB         376 kB
├ ○ /admin/super-admin/accounts                6.58 kB         397 kB
├ ○ /admin/super-admin/cases                   4.41 kB         403 kB
├ ○ /admin/surrogate                           4.53 kB         337 kB
├ ○ /admin/surrogate/case-files                4.22 kB         406 kB
├ ○ /admin/surrogate/journey                   12.6 kB         292 kB
├ ○ /admin/surrogate/social                    4.55 kB         334 kB
├ ○ /admin/third-party                         4.14 kB         376 kB
└ ○ /login                                     5.45 kB         268 kB

✅ 所有页面构建成功，总共 24 个静态页面
```

## 🎉 总结

项目已经准备好部署！选择适合你的部署方式，配置环境变量，即可上线演示。

**推荐部署流程**：
1. 推送代码到 GitHub
2. 连接 Vercel 自动部署
3. 配置自定义域名
4. 设置环境变量
5. 开始演示！🚀




