import './style.css'
import { userAPI } from './services/api'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>用户管理系统</h1>
    
    <form id="userForm" class="user-form">
      <div class="form-group">
        <label class="required">姓名</label>
        <input type="text" id="name" required>
      </div>

      <div class="form-group">
        <label class="required">邮箱</label>
        <input type="email" id="email" required>
      </div>

      <div class="form-group">
        <label>年龄</label>
        <input type="number" id="age" min="0" max="150">
      </div>

      <div class="form-group">
        <label>生日</label>
        <input type="date" id="birthday">
      </div>

      <div class="form-group">
        <label>描述</label>
        <textarea id="description"></textarea>
      </div>

      <button type="submit">添加用户</button>
      <div id="formMessage"></div>
    </form>

    <div id="userCards" class="user-cards"></div>
  </div>
`

// 显示消息提示
function showMessage(message, isError = false) {
  const messageElement = document.getElementById('formMessage');
  messageElement.textContent = message;
  messageElement.className = isError ? 'error-message' : 'success-message';
  setTimeout(() => {
    messageElement.textContent = '';
  }, 3000);
}

// 加载用户列表
async function loadUsers() {
  try {
    const users = await userAPI.getAll();
    const userCardsContainer = document.getElementById('userCards');
    userCardsContainer.innerHTML = users.map(user => `
      <div class="user-card">
        <h3>${user.name}</h3>
        <p><strong>邮箱:</strong> ${user.email}</p>
        ${user.age ? `<p><strong>年龄:</strong> ${user.age}</p>` : ''}
        ${user.birthday ? `<p><strong>生日:</strong> ${new Date(user.birthday).toLocaleDateString()}</p>` : ''}
        ${user.description ? `<p><strong>描述:</strong> ${user.description}</p>` : ''}
        <button onclick="deleteUser('${user.id}')" class="delete-btn">删除</button>
      </div>
    `).join('');
  } catch (error) {
    showMessage(error.message, true);
  }
}

// 删除用户
window.deleteUser = async (id) => {
  try {
    await userAPI.delete(id);
    showMessage('用户删除成功');
    loadUsers();
  } catch (error) {
    showMessage(error.message, true);
  }
};

// 表单提交处理
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    age: document.getElementById('age').value ? parseInt(document.getElementById('age').value) : null,
    birthday: document.getElementById('birthday').value || null,
    description: document.getElementById('description').value.trim()
  };

  try {
    await userAPI.create(formData);
    document.getElementById('userForm').reset();
    showMessage('用户创建成功');
    loadUsers();
  } catch (error) {
    showMessage(error.message, true);
  }
});

// 初始加载用户列表
loadUsers();