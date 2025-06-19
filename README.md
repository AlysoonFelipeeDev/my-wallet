🪙 My Wallet
My Wallet é uma API para controle de finanças pessoais. Com ela, o usuário pode registrar entradas e saídas de dinheiro, visualizar suas transações e editar ou excluir registros. A autenticação é feita com JWT e os dados são armazenados no MongoDB.

🔧 Tecnologias usadas
Node.js

Express

MongoDB

Joi (validação de dados)

JSON Web Token (JWT)

dotenv

bcrypt

📬 Rotas disponíveis

POST	/signup	Cadastrar novo usuário
POST	/signin	Login do usuário (retorna token)
GET	/transactions	Listar transações do usuário
POST	/transactions	Criar nova transação
PUT	/transactions/:id	Editar uma transação
DELETE	/transactions/:id	Deletar uma transação

✅ Funcionalidades
Registro e login com hash de senha

Autenticação via token JWT

CRUD completo de transações financeiras

Validação de dados com Joi


link de deploy render : https://my-wallet-2j5b.onrender.com
