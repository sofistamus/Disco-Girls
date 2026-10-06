# Disco Girls

Site de loja de discos de vinil, CDs/DVDs e camisetas, com login usando Node.js e MySQL.

## Como rodar no seu computador

Você precisa ter instalado: [Node.js](https://nodejs.org) e [MySQL](https://dev.mysql.com/downloads/).

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Crie o banco de dados** (vai pedir a senha do MySQL)
   ```bash
   mysql -u root -p < schema.sql
   ```

3. **Crie o arquivo `.env`**
   Copie o `.env.example`, renomeie para `.env` e coloque a senha do seu MySQL.

4. **Crie um usuário para testar**
   ```bash
   node criar-usuario.js maria minhasenha123
   ```

5. **Ligue o servidor**
   ```bash
   npm start
   ```
   Deve aparecer: `Servidor rodando em http://localhost:3000`

6. **Abra o site** com a extensão *Live Server* do VS Code (clique direito no `index.html` > *Open with Live Server*) e faça login pelo ícone de perfil.

## Como funciona

- O site (`index.html` + `script.js`) envia usuário e senha para `POST http://localhost:3000/login`.
- O servidor (`server.js`) procura o usuário no MySQL e compara a senha com o hash salvo (bcrypt).
- As senhas **nunca** são salvas em texto normal, só o hash.

## Importante

- O servidor precisa estar ligado (`npm start`) para o login funcionar.
- O GitHub Pages só mostra páginas estáticas, ele **não** roda o servidor Node nem o MySQL. Para o login funcionar online, é preciso hospedar o servidor e o banco em outro lugar.
