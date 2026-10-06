// Cria um usuário no banco com a senha criptografada.
// Uso:  node criar-usuario.js NOME SENHA
// Exemplo: node criar-usuario.js maria minhasenha123

require("dotenv").config();

const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

async function main() {

    const usuario = process.argv[2];
    const senha = process.argv[3];

    if (!usuario || !senha) {
        console.log("Uso: node criar-usuario.js NOME SENHA");
        process.exit(1);
    }

    if (senha.length < 6) {
        console.log("A senha precisa ter pelo menos 6 caracteres.");
        process.exit(1);
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const conexao = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        await conexao.execute(
            "INSERT INTO usuarios (usuario, senha_hash) VALUES (?, ?)",
            [usuario, senhaHash]
        );
        console.log("Usuário '" + usuario + "' criado com sucesso!");

    } catch (erro) {
        if (erro.code === "ER_DUP_ENTRY") {
            console.log("Esse usuário já existe.");
        } else {
            console.error("Erro:", erro.message);
        }
    } finally {
        await conexao.end();
    }
}

main();
