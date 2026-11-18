# Sistema de Gestão — Instituto Hermanitos

Protótipo acadêmico de MVP para apoiar o cadastro e acompanhamento de pessoas refugiadas e migrantes.

## Funcionalidades
- Login demonstrativo.
- Painel inicial com indicadores.
- Cadastro, pesquisa, edição e exclusão de beneficiários.
- Registro de atendimentos.
- Registro e atualização de encaminhamentos profissionais.
- Painel de relatórios com contagem por situação.

## Como executar
1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em um navegador atualizado.
3. Utilize os campos de login já preenchidos:
   - E-mail: `colaborador@hermanitos.org.br`
   - Senha: `Hermanitos123`

Não é necessário instalar dependências ou executar servidor.

## Dados e limitações
Este é um protótipo front-end para demonstração. Os dados são fictícios e ficam armazenados localmente no navegador por meio de `localStorage`. Não há servidor, banco de dados compartilhado, autenticação real, controle de acesso, criptografia, integração externa ou adequação para armazenar dados pessoais reais.

**Não utilize informações reais ou sensíveis.** Antes de qualquer uso institucional, será necessário desenvolver backend, autenticação segura, autorização por perfil, proteção de dados, cópias de segurança e validação com o Instituto.

## Estrutura
- `index.html`: estrutura das telas.
- `styles.css`: identidade visual responsiva.
- `app.js`: interações e dados demonstrativos.

## Objetivo
Demonstrar o fluxo do MVP: acesso → cadastro de beneficiário → acompanhamento de atendimento e encaminhamento.
