const users = [];

function register(username, password) {
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Usuário já existe' };
  }
  users.push({ username, password });
  return { success: true, message: 'Usuário registrado com sucesso' };
}

function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return { success: true, message: 'Login realizado com sucesso' };
  }
  return { success: false, message: 'Usuário ou senha inválidos' };
}

module.exports = { register, login };