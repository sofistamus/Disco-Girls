-- Banco de dados do Disco Girls
-- Rode este arquivo uma vez no MySQL para criar o banco e a tabela.

CREATE DATABASE IF NOT EXISTS disco_girls
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE disco_girls;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
