import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // 尝试执行一个简单的查询
    await prisma.user.findMany({ take: 1 });
    console.log('✅ 数据库连接成功！');
  } catch (error) {
    console.error('❌ 数据库连接失败：', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();