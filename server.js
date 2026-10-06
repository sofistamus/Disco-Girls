// =========================
// Servidor do Disco Girls
// Rota: POST /login
// =========================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());          // permite que o site (outra porta) fale com o servidor
app.use(express.json());  // permite ler JSON no body da requisição

// Conexão com o MySQL (os dados vêm do arquivo .env)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

// Proteção contra tentativas demais de senha: 10 por 15 minutos
const limiteLogin = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        sucesso: false,
        mensagem: "Muitas tentativas. Tente novamente em alguns minutos."
    }
});

app.post("/login", limiteLogin, async function (req, res) {

    try {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Preencha todos os campos!"
            });
        }

        // O "?" evita SQL injection (nunca junte texto direto na query)
        const [linhas] = await pool.execute(
            "SELECT id, usuario, senha_hash FROM usuarios WHERE usuario = ?",
            [usuario]
        );

        // Mesma mensagem para usuário errado ou senha errada (mais seguro)
        const erroLogin = {
            sucesso: false,
            mensagem: "Usuário ou senha incorretos."
        };

        if (linhas.length === 0) {
            return res.status(401).json(erroLogin);
        }

        const senhaCorreta = await bcrypt.compare(senha, linhas[0].senha_hash);

        if (!senhaCorreta) {
            return res.status(401).json(erroLogin);
        }

        res.json({
            sucesso: true,
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: linhas[0].id,
                nome: linhas[0].usuario
            }
        });

    } catch (erro) {
        console.error("Erro no login:", erro);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro no servidor."
        });
    }
});

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, function () {
    console.log("Servidor rodando em http://localhost:" + PORTA);
});
