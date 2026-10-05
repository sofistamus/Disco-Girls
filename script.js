/* =========================
   CARROSSEL
========================= */

const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".dots span");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

if (slides && next && prev) {

    let index = 0;

    function showSlide(i) {

        index = (i + 3) % 3;

        slides.style.transform =
            `translateX(-${index * 100}%)`;

        dots.forEach(function(dot, n) {
            dot.classList.toggle("active", n === index);
        });
    }

    next.onclick = function() {
        showSlide(index + 1);
    };

    prev.onclick = function() {
        showSlide(index - 1);
    };

    dots.forEach(function(dot, i) {
        dot.onclick = function() {
            showSlide(i);
        };
    });

    setInterval(function() {
        showSlide(index + 1);
    }, 5000);
}


/* =========================
   CARRINHO
========================= */

let carrinho = [];

const botoesCarrinho =
    document.querySelectorAll(".adicionar-carrinho");

const iconeCarrinho =
    document.getElementById("carrinho");

const itensCarrinho =
    document.getElementById("itens-carrinho");

const totalCarrinho =
    document.getElementById("total-carrinho");

const carrinhoArea =
    document.getElementById("carrinho-area");


botoesCarrinho.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const produto = botao.closest(".produto");

        if (!produto) return;

        const nome =
            produto.querySelector(
                ".informacoes-produto p"
            );

        const preco =
            produto.querySelector(
                ".informacoes-produto strong"
            );

        const imagem =
            produto.querySelector(
                ".imagem-produto img"
            );

        if (!nome || !preco || !imagem) return;

        const produtoExistente =
            carrinho.find(function(item) {
                return item.nome === nome.textContent;
            });

        if (produtoExistente) {

            produtoExistente.quantidade++;

        } else {

            carrinho.push({

                nome: nome.textContent,

                preco: preco.textContent,

                imagem: imagem.src,

                quantidade: 1
            });
        }

        atualizarCarrinho();
    });
});


function atualizarCarrinho() {

    if (!itensCarrinho || !totalCarrinho) return;

    itensCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach(function(produto, indice) {

        const valor = parseFloat(
            produto.preco
                .replace("R$", "")
                .replace(".", "")
                .replace(",", ".")
        );

        total += valor * produto.quantidade;

        const item = document.createElement("div");

        item.className = "item-carrinho";

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="dados-item">

                <p>${produto.nome}</p>

                <strong>${produto.preco}</strong>

                <div class="quantidade">

                    <button onclick="diminuirQuantidade(${indice})">
                        −
                    </button>

                    <span>${produto.quantidade}</span>

                    <button onclick="aumentarQuantidade(${indice})">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remover"
                onclick="removerProduto(${indice})">
                ×
            </button>
        `;

        itensCarrinho.appendChild(item);
    });

    totalCarrinho.textContent =
        "Total: R$ " +
        total.toFixed(2).replace(".", ",");
}


function aumentarQuantidade(indice) {

    if (!carrinho[indice]) return;

    carrinho[indice].quantidade++;

    atualizarCarrinho();
}


function diminuirQuantidade(indice) {

    if (!carrinho[indice]) return;

    if (carrinho[indice].quantidade > 1) {

        carrinho[indice].quantidade--;

    } else {

        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}


function removerProduto(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();
}


if (iconeCarrinho && carrinhoArea) {

    iconeCarrinho.addEventListener("click", function() {

        if (carrinhoArea.style.display === "block") {

            carrinhoArea.style.display = "none";

        } else {

            carrinhoArea.style.display = "block";
        }
    });
}


/* =========================
   PERFIL
========================= */

const perfil =
    document.getElementById("perfil");

const perfilArea =
    document.getElementById("perfil-area");

const fecharPerfil =
    document.getElementById("fechar-perfil");


if (perfil && perfilArea) {

    perfil.addEventListener("click", function() {

        perfilArea.style.display = "flex";
    });
}


if (fecharPerfil && perfilArea) {

    fecharPerfil.addEventListener("click", function() {

        perfilArea.style.display = "none";
    });
}


/* =========================
   MENU
========================= */

const menu =
    document.getElementById("menu");

const menuArea =
    document.getElementById("menu-area");

const fecharMenu =
    document.getElementById("fechar-menu");
if (menu && menuArea) {

    menu.addEventListener("click", function() {

        menuArea.style.display = "block";
    });
}
if (fecharMenu && menuArea) {
    fecharMenu.addEventListener("click", function() {

        menuArea.style.display = "none";
    });
}
/* =========================
   FECHAR CARRINHO
========================= */

const fecharCarrinho =
    document.getElementById("fechar-carrinho");
if (fecharCarrinho && carrinhoArea) {

    fecharCarrinho.addEventListener("click", function() {

        carrinhoArea.style.display = "none";
    });
}
/* =========================
   MODAL DO PRODUTO
========================= */

const botoesVerProduto =
    document.querySelectorAll(".ver-produto");

const produtoModal =
    document.getElementById("produto-modal");

const modalImagem =
    document.getElementById("modal-imagem");

const modalNome =
    document.getElementById("modal-nome");

const modalPreco =
    document.getElementById("modal-preco");

const fecharModal =
    document.getElementById("fechar-modal");

const modalAdicionar =
    document.getElementById("modal-adicionar");

let produtoSelecionado = null;
botoesVerProduto.forEach(function(botao) {
    botao.addEventListener("click", function() {
        produtoSelecionado =
            botao.closest(".produto");
        if (!produtoSelecionado) return;
        const nome =
            produtoSelecionado.querySelector(
                ".informacoes-produto p"
            );
        const preco =
            produtoSelecionado.querySelector(
                ".informacoes-produto strong"
            );
        const imagem =
            produtoSelecionado.querySelector(
                ".imagem-produto img"
            );
        if (!nome || !preco || !imagem) return;
        if (modalNome)
            modalNome.textContent = nome.textContent;
        if (modalPreco)
            modalPreco.textContent = preco.textContent;
        if (modalImagem)
            modalImagem.src = imagem.src;
        if (produtoModal)
            produtoModal.style.display = "flex";
    });
});
if (fecharModal && produtoModal) {

    fecharModal.addEventListener("click", function() {

        produtoModal.style.display = "none";
    });
}
if (modalAdicionar) {

    modalAdicionar.addEventListener("click", function() {

        if (!produtoSelecionado) return;

        const botaoCarrinho =
            produtoSelecionado.querySelector(
                ".adicionar-carrinho"
            );
        if (botaoCarrinho) {
            botaoCarrinho.click();
        }
        if (produtoModal) {
            produtoModal.style.display = "none";
        }
    });
}


/* =========================
   FAVORITOS
========================= */

const botoesFavoritar =
    document.querySelectorAll(".favoritar");
botoesFavoritar.forEach(function(botao) {
    botao.addEventListener("click", function() {
        if (botao.classList.contains("ativo")) {
            botao.classList.remove("ativo");
            botao.textContent = "♡";
        } else {
            botao.classList.add("ativo");
            botao.textContent = "♥";
        }
    });
});
const abrirFavoritos =
    document.getElementById("abrir-favoritos");
const favoritosArea =
    document.getElementById("favoritos-area");
const listaFavoritos =
    document.getElementById("lista-favoritos");
const fecharFavoritos =
    document.getElementById("fechar-favoritos");
if (
    abrirFavoritos &&
    favoritosArea &&
    listaFavoritos
) {
    abrirFavoritos.addEventListener(
        "click",
        function(event) {
            event.preventDefault();
            favoritosArea.style.display = "block";
            listaFavoritos.innerHTML = "";
            const favoritos =
                document.querySelectorAll(
                    ".favoritar.ativo"
                );
            favoritos.forEach(function(botao) {
                const produto =
                    botao.closest(".produto");
                if (!produto) return;
                const nome =
                    produto.querySelector(
                        ".informacoes-produto p"
                    );
                const imagem =
                    produto.querySelector(
                        ".imagem-produto img"
                    );
                if (!nome || !imagem) return;
                const item =
                    document.createElement("div");
                item.className =
                    "item-favorito";
                item.innerHTML = `
                    <img src="${imagem.src}" alt="${nome.textContent}">
                    <span>${nome.textContent}</span>
                `;
                listaFavoritos.appendChild(item);
            });
            if (favoritos.length === 0) {
                listaFavoritos.innerHTML =
                    "<p>Nenhum produto favoritado.</p>";
            }
            if (menuArea) {
                menuArea.style.display = "none";
            }
        }
    );
}
if (fecharFavoritos && favoritosArea) {
    fecharFavoritos.addEventListener(
        "click",
        function() {
            favoritosArea.style.display = "none";
        }
    );
}



const pesquisa = document.getElementById("pesquisa");

if (pesquisa) {
    const caixa = document.createElement("div");
    caixa.className = "resultados-pesquisa";
    pesquisa.parentElement.appendChild(caixa);

    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    pesquisa.addEventListener("input", async function () {
        const texto = normalizar(pesquisa.value);
        caixa.innerHTML = "";

        if (texto === "") {
            caixa.style.display = "none";
            return;
        }

        const paginas = [
            "index.html",
            "discos.html",
            "cds-dvds.html",
            "camisetas.html"
        ];

        let encontrou = false;

        for (const pagina of paginas) {
            try {
                const paginaCompleta = new URL(
                    pagina,
                    window.location.href
                );

                const resposta = await fetch(paginaCompleta);

                if (!resposta.ok) {
                    continue;
                }

                const html = await resposta.text();
                const documento = new DOMParser().parseFromString(
                    html,
                    "text/html"
                );

                const produtos = documento.querySelectorAll(".produto");

                produtos.forEach(function (produto) {
                    const nome = produto.querySelector(
                        ".informacoes-produto p"
                    );
                    const preco = produto.querySelector(
                        ".informacoes-produto strong"
                    );
                    const imagem = produto.querySelector(
                        ".imagem-produto img"
                    );

                    if (!nome || !preco || !imagem) {
                        return;
                    }

                    if (!normalizar(nome.textContent).includes(texto)) {
                        return;
                    }

                    encontrou = true;

                    const resultado = document.createElement("div");
                    resultado.className = "resultado-produto";

                    const foto = document.createElement("img");
                    foto.src = new URL(
                        imagem.getAttribute("src"),
                        paginaCompleta.href
                    ).href;
                    foto.alt = nome.textContent.trim();

                    const informacoes = document.createElement("div");

                    const nomeProduto = document.createElement("p");
                    nomeProduto.textContent = nome.textContent.trim();

                    const precoProduto = document.createElement("strong");
                    precoProduto.textContent = preco.textContent.trim();

                    informacoes.appendChild(nomeProduto);
                    informacoes.appendChild(precoProduto);

                    resultado.appendChild(foto);
                    resultado.appendChild(informacoes);

                    resultado.addEventListener("click", function () {
                        window.location.href = paginaCompleta.href;
                    });

                    caixa.appendChild(resultado);
                });
            } catch (erro) {
                console.error("Erro ao pesquisar em " + pagina, erro);
            }
        }

        if (!encontrou) {
            caixa.innerHTML =
                '<div class="nenhum-resultado">Produto não encontrado.</div>';
        }

        caixa.style.display = "block";
    });

    document.addEventListener("click", function (evento) {
        if (!pesquisa.parentElement.contains(evento.target)) {
            caixa.style.display = "none";
        }
    });
}


const entrarLogin = document.getElementById("entrar-login");
const cancelarLogin = document.getElementById("cancelar-login");
const mensagemLogin = document.getElementById("mensagem");

entrarLogin.addEventListener("click", function () {

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === "" || senha === "") {
        mensagemLogin.textContent = "Preencha todos os campos!";
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: usuario,
            senha: senha
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.sucesso) {
            mensagemLogin.textContent = "Login realizado com sucesso!";
            setTimeout(() => {
                document.getElementById("login-formulario").innerHTML = `
                    <p>Olá, ${usuario}! 💗</p>
                    <button id="sair-login" type="button">Sair</button>
                `;
                document.getElementById("sair-login").addEventListener("click", function () {
                    location.reload();
                });
            }, 500);
        } else {
            mensagemLogin.textContent = dados.mensagem;
        }
    })
    .catch(erro => {
        console.error(erro);
        mensagemLogin.textContent = "Erro ao conectar ao servidor.";

    });

});
cancelarLogin.addEventListener("click", function () {

    document.getElementById("perfil-area").style.display = "none";
});


const fecharPerfilLogin = document.getElementById("fechar-perfil-login");

fecharPerfilLogin.addEventListener("click", function () {
    document.getElementById("perfil-area").style.display = "none";
});