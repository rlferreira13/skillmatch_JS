# SkillMatch JS 🚀

## Sobre o projeto

O SkillMatch JS é um simulador de compatibilidade entre um candidato e vagas de front-end júnior. O motor de análise compara as habilidades do candidato com os requisitos das vagas, gerando um relatório completo com percentual de aderência, habilidades faltantes, a melhor vaga disponível e uma recomendação de estudos personalizada.

### Links do Projeto
- **Repositório GitHub:** https://github.com/rlferreira13/skillmatch_JS
- **Quadro Kanban:** https://github.com/users/rlferreira13/projects/2
- **Apresentação em Vídeo:** 

---

## Objetivo e Conceitos Aplicados

O projeto foi desenvolvido para consolidar os fundamentos de JavaScript e lógica de programação do Módulo 01, abordando:

- Tipos de dados, escopo e condicionais (if-else, operador ternário).
- Laços de repetição e métodos de array (`map`, `filter`, `reduce`, `includes`).
- Funções puras e Arrow Functions.
- Programação Orientada a Objetos (Classes, Construtores, Herança e uso do `this`).
- Assincronicidade (Promises, `async/await`), Callbacks e Closures.
- Versionamento com GitFlow simplificado e Kanban.

---

## Conceitos Técnicos Requeridos

### 🌐 Como a internet funciona?
A internet é uma rede global de computadores interconectados que se comunicam através de protocolos padronizados (como o TCP/IP). Quando você acessa um site, seu dispositivo envia pacotes de dados através de roteadores e cabos submarinos até encontrar o servidor onde o site está hospedado, que então devolve as informações solicitadas.

### 🖥️ Arquitetura Cliente-Servidor
É o modelo de divisão de tarefas onde o **Cliente** (seu navegador) faz uma requisição e o **Servidor** (computador remoto) processa e devolve os dados. Neste projeto, simulamos esse comportamento usando uma `Promise` na função `buscarVagasSimuladas()`, criando um atraso de 1.5s para emular o tempo de resposta de um banco de dados real antes de processar a compatibilidade.

### 📦 Diferença entre `var`, `let` e `const`
Neste projeto, utilizamos apenas `const` (para valores que não mudam, como nossas arrow functions e instâncias) e `let` (para variáveis que sofrem reatribuição, como nosso contador no closure). O `var` foi evitado pois ele possui escopo global ou de função (o que pode causar vazamento de memória e bugs de reatribuição acidental), enquanto `let` e `const` respeitam o escopo de bloco.

---

## Como executar

Este projeto não requer instalação do Node.js para rodar. Você pode testá-lo diretamente no navegador:

1. Abra o navegador Google Chrome.
2. Pressione `F12` ou `Ctrl + Shift + J` para abrir o **Console**.
3. Copie todo o código do arquivo `skillmatch.js`.
4. Cole no console e pressione `Enter`.
5. Acompanhe o fluxo simulado de carregamento e o relatório final.

*Dica para VS Code:* Caso queira executar no editor, recomendamos a extensão **Code Runner**, que permite rodar o arquivo JavaScript com um único clique.

---

## Estrutura do projeto

```
skillmatch-js/
│
├── skillmatch.js
└── README.md