// Script para trazer o nome inserido pelo usuário cadastrado no localStorage
document.addEventListener('DOMContentLoaded', function() {
    // tenta chaves individuais
    let nomeCliente = localStorage.getItem('nomeCliente');
    let emailCliente = localStorage.getItem('emailCliente');

    // se não houver, tenta objetos comuns (ex.: 'cliente', 'user', 'usuario')
    if (!nomeCliente || !emailCliente) {
        const possibleKeys = ['cliente', 'user', 'usuario', 'profile'];
        for (const key of possibleKeys) {
            const raw = localStorage.getItem(key);
            if (!raw) continue;
            try {
                const obj = JSON.parse(raw);
                if (!nomeCliente && obj && (obj.nome || obj.name || obj.fullName)) {
                    nomeCliente = obj.nome || obj.name || obj.fullName;
                }
                if (!emailCliente && obj && (obj.email || obj.mail)) {
                    emailCliente = obj.email || obj.mail;
                }
            } catch (e) {
                // não-json, pula
            }
            if (nomeCliente && emailCliente) break;
        }
    }

    console.log("Dados buscados do localStorage:", { nomeCliente, emailCliente });

    const elNome = document.getElementById("nomeCliente");
    const elNomeHeader = document.getElementById("nomeClienteHeader");
    const elEmail = document.getElementById("emailCliente");

    if (nomeCliente) {
        if (elNome) elNome.innerText = nomeCliente;
        if (elNomeHeader) elNomeHeader.innerText = nomeCliente;
    } else {
        console.log("Nome do cliente não encontrado no localStorage");
    }

    if (emailCliente) {
        if (elEmail) elEmail.innerText = emailCliente;
    } else {
        console.log("Email do cliente não encontrado no localStorage");
    }
});