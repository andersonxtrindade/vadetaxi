# Desafio Técnico: API de Corridas de Táxi

## Objetivo

O objetivo deste desafio é desenvolver uma API para gerenciar corridas de táxi, permitindo que passageiros solicitem corridas e motoristas iniciem e finalizem essas corridas. A API foi desenvolvida em **Node.js** com **PostgreSQL** como banco de dados relacional e **Jest** para testes automatizados.

## Funcionalidades

A API inclui as seguintes funcionalidades:
- Cadastro de passageiros e motoristas.
- Solicitação de uma corrida (inicialmente com o status "Aguardando Motorista").
- Alteração do status de uma corrida para "Em Andamento" e "Finalizada".
  
### Endpoints:

- `POST /passengers`: Cadastrar um passageiro.
- `POST /drivers`: Cadastrar um motorista.
- `POST /rides`: Criar uma nova corrida.
- `PATCH /rides`: Atualizar o status de uma corrida.
- `GET /rides`: Lista uma corrida por ID.

### Regras Básicas:

- Uma corrida só pode ser criada se o passageiro existir.
- Alterar o status para “Em Andamento” somente se estiver em "Aguardando Motorista" e é obrigatório informar o ID do motorista.
- Alterar o status para "Finalizada" somente se estiver em "Em Andamento".

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **PostgreSQL**: Banco de dados relacional para armazenamento dos dados.
- **Jest**: Framework de testes para garantir a funcionalidade da API.
- **Docker**: Containers para facilitar a configuração e execução do ambiente.

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de que você tem o **Docker** e o **Docker Compose** instalados em sua máquina. Caso não tenha, você pode instalar seguindo as instruções:

- [Instalar Docker](https://docs.docker.com/get-docker/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

### Passos para Rodar o Projeto

1. **Clonar o repositório:**

```bash
git clone https://github.com/andersonxtrindade/vadetaxi.git
cd vadetaxi
```

2. **Construir as imagens e iniciar os containers:**

Execute o seguinte comando para construir as imagens Docker e iniciar os containers:

```bash
docker-compose up --build -d
```

3. **Verificar se os containers estão rodando:**

Para garantir que os containers foram iniciados corretamente, use o comando:

```bash
docker ps
```
Isso deve exibir o contêiner do Node.js e o do PostgreSQL.

4. **Acessar a API:**

A API estará disponível em http://127.0.0.1:3000. Você pode começar a interagir com a API utilizando ferramentas como Postman ou cURL.

5. **Rodar os testes automatizados:**

Para rodar os testes automatizados, basta executar o comando abaixo, que irá rodar os testes com Jest:

```bash
docker exec -it nodejs-vadetaxi npm test
```

## Banco de Dados
O banco de dados é configurado automaticamente através do Docker e utiliza o PostgreSQL. As tabelas principais são:

passengers (Passageiros)
drivers (Motoristas)
rides (Corridas)
O banco de dados é inicializado e migrado automaticamente ao subir os containers.
