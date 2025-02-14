import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// CORS 配置
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// 解析 JSON
app.use(bodyParser.json());

// 创建用户
app.post('/users', async (req, res) => {
  try {
    const { name, age, birthday, email, description } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: '名字和邮箱为必填项' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        age,
        birthday: birthday ? new Date(birthday) : null,
        email,
        description
      }
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取所有用户
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个用户
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });
    
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新用户
app.put('/users/:id', async (req, res) => {
  try {
    const { name, age, birthday, email, description } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: '名字和邮箱为必填项' });
    }

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name,
        age,
        birthday: birthday ? new Date(birthday) : null,
        email,
        description
      }
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除用户
app.delete('/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: '用户已删除' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});