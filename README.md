# Projeto de Cadastro de Alunos

O projeto é CRUD para cadastro de alunos, para criar o código foi utilizado ReacJS e PHP Codeigniter 4.

Para rodar o projeto é necessário ter instalado o PHP, NodeJS, ReactJS, CodeIgniter 4 e MySQL.

O projeto possui dois scripts de MySQL em (backend\sql_scripts) prontos, execute eles no seu gerenciador de banco de dados

Primeiramente é você deve clonar o repositório do projeto.

Na pasta do backend, altere o arquivo env para .env, este arquivo facilita as configurções do servidor PHP.

Abra o arquivo .env altere o trecho referente ao banco de dados, com os dados do seu banco local:

    database.default.hostname = localhost
    database.default.database = "Nome do seu database"
    database.default.username = "Nome do usuário (o normal é root)"
    database.default.password = 
    database.default.DBDriver = MySQLi
    database.default.DBPrefix =
    database.default.port = 3306 (esse é a porta padrão, mas pode ser alterada)

No terminal navegue até a pasta backend
   
    cd backend
Rode o comando
    
    php spark serve
O backend roda na porta 8080 por padrão do CodeIgniter
Abra um novo terminal e dentro da pasta delta_g_crud, pasta onde está o arquivo package.json

Rode os comandos
    
    npm install
e

    npm start
O projeto estará rodando em localhost:3000.

