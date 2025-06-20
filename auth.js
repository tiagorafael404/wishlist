// auth.js

// Importe as funções necessárias do Firebase Authentication SDK
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Espere o documento estar completamente carregado antes de tentar acessar os elementos
document.addEventListener('DOMContentLoaded', () => {
    // --- Código para o Formulário de Registro ---
    const registerForm = document.getElementById('form-register');

    if (registerForm) { // Verifique se o formulário de registro existe na página
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailInput = document.getElementById('email-register');
            const passwordInput = document.getElementById('password-register');
            // Opcional: Pegar o nome se quiser
            // const nameInput = document.getElementById('name-register');
            // const userName = nameInput ? nameInput.value : null; // Verifique se o elemento existe

            const email = emailInput.value;
            const password = passwordInput.value;

            const auth = getAuth(); // Obtenha a instância do Firebase Auth

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Usuário criado com sucesso!
                    const user = userCredential.user;
                    console.log("Usuário criado com sucesso:", user);

                    // TODO: O que fazer agora?
                    // - Mostrar uma mensagem de sucesso.
                    // - Redirecionar para a página da wishlist.
                    // - Limpar o formulário.
                    alert("Conta criada com sucesso! Bem-vindo!");
                    emailInput.value = '';
                    passwordInput.value = '';
                    // if (nameInput) nameInput.value = ''; // Limpar o nome se pegou

                    // Exemplo de redirecionamento:
                    // window.location.href = '/sua-pagina-de-wishlist.html';

                })
                .catch((error) => {
                    // Ocorreu um erro durante a criação do usuário
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Erro ao criar usuário:", errorCode, errorMessage);

                    if (errorCode === 'auth/email-already-in-use') {
                        alert('Este endereço de email já está em uso.');
                    } else if (errorCode === 'auth/weak-password') {
                        alert('A senha é muito fraca. Por favor, escolha uma senha mais forte (mínimo de 6 caracteres).');
                    } else {
                        alert(`Erro ao criar conta: ${errorMessage}`);
                    }
                });
        });
    }

    // --- Código para o Formulário de Login ---
    const loginForm = document.getElementById('form-login');

    if (loginForm) { // Verifique se o formulário de login existe na página
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailInput = document.getElementById('email-login');
            const passwordInput = document.getElementById('password-login');

            const email = emailInput.value;
            const password = passwordInput.value;

            const auth = getAuth(); // Obtenha a instância do Firebase Auth

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Usuário logado com sucesso!
                    const user = userCredential.user;
                    console.log("Usuário logado com sucesso:", user);

                    // TODO: O que fazer agora?
                    // - Mostrar uma mensagem de sucesso.
                    // - Redirecionar para a página da wishlist.
                    alert("Login bem-sucedido! Bem-vindo(a) de volta!");
                    emailInput.value = '';
                    passwordInput.value = '';

                    // Exemplo de redirecionamento:
                    // window.location.href = '/sua-pagina-de-wishlist.html';

                })
                .catch((error) => {
                    // Ocorreu um erro durante o login
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Erro no login:", errorCode, errorMessage);

                    if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                        alert('Email ou senha incorretos.'); // Não diga exatamente qual está errado por segurança
                    } else {
                        alert(`Erro no login: ${errorMessage}`);
                    }
                });
        });
    }

    // --- Opcional: Lidar com o estado de autenticação (se o usuário está logado ou não) ---
    // Isto é útil para redirecionar usuários que já estão logados ou que acabaram de se registrar/logar
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário está logado
        console.log("Estado de autenticação mudou: Usuário logado", user);
        // TODO: Redirecionar para a página principal da wishlist se estiver na página de login/registro
        // Ex: if (window.location.pathname.endsWith('/login-or-register.html')) {
        //         window.location.href = '/sua-pagina-de-wishlist.html';
        //     }
      } else {
        // Usuário está deslogado
        console.log("Estado de autenticação mudou: Usuário deslogado");
        // TODO: Redirecionar para a página de login/registro se estiver em uma página protegida
        // Ex: if (window.location.pathname.startsWith('/sua-pagina-de-wishlist')) {
        //         window.location.href = '/login-or-register.html';
        //     }
      }
    });


});

