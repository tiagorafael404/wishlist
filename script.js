document.getElementById("signup-button").addEventListener("click", function() {
    var divmenu = document.getElementById("signup");
  
    // Verifica se a div já está visível com a classe "show"
    if (divmenu.classList.contains("show")) {
      // Se a div estiver visível, remova a classe "show" para aplicar a animação de esconder
      divmenu.classList.remove("show");
  
      // Espera o tempo da animação e depois coloca o display de volta para "none"
      setTimeout(function() {
        divmenu.style.display = "none"; // Esconde a div após a animação
      }, 500); // Tempo de duração da animação (0.5s)
    } else {
      // Se a div não estiver visível, exibe a div e aplica a animação
      divmenu.style.display = "block"; // Torna a div visível
      setTimeout(function() {
        divmenu.classList.add("show"); // Inicia a animação de exibição (de baixo para cima)
      }, 10); // Pequeno delay para garantir que o display seja alterado antes de aplicar a animação
    }
  });

  document.getElementById("close").addEventListener("click", function() {
    var divmenu = document.getElementById("signup");
  
    // Verifica se a div já está visível com a classe "show"
    if (divmenu.classList.contains("show")) {
      // Se a div estiver visível, remova a classe "show" para aplicar a animação de esconder
      divmenu.classList.remove("show");
  
      // Espera o tempo da animação e depois coloca o display de volta para "none"
      setTimeout(function() {
        divmenu.style.display = "none"; // Esconde a div após a animação
      }, 500); // Tempo de duração da animação (0.5s)
    } else {
      // Se a div não estiver visível, exibe a div e aplica a animação
      divmenu.style.display = "block"; // Torna a div visível
      setTimeout(function() {
        divmenu.classList.add("show"); // Inicia a animação de exibição (de baixo para cima)
      }, 10); // Pequeno delay para garantir que o display seja alterado antes de aplicar a animação
    }
  });

  window.addEventListener("load", executeCodes);