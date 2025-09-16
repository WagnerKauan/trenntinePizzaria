# 🏠 Trenntine Pizzaria

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Trenntine Pizzaria** é uma aplicação web fullstack para pizzarias, permitindo que clientes façam pedidos online e que o dono gerencie produtos, promoções e pedidos em tempo real.

---

## 🔧 Stack

- **Front-end:** Next.js, TypeScript, TailwindCSS, Shadcn UI, React Query  
- **State Management:** Redux + Redux Persist  
- **Back-end / Database:** Prisma, NeonDB  
- **Autenticação & Segurança:** JWT, bcrypt  
- **Outros:** Cloudinary (upload de imagens), Swiper (carrosséis)

---

## ⚡ Funcionalidades

### 👥 Cliente
- Navegar por produtos em destaque e promoções ativas  
- Adicionar produtos ao carrinho com **1 clique**  
- Filtros de pesquisa e por categoria  
- Carrinho com cálculo automático de preços e promoções  
- Checkout em **steps**, com validação (React Hook Form + Zod)  

### 🧑‍💼 Dono / Administração
- Gerenciar pedidos em tempo real (status: aguardando, em preparo, entregue)  
- CRUD completo de produtos: imagens, tags, destaque, ativação/desativação  
- Criar promoções: desconto percentual, combos ou globais  
- Regras automáticas de aplicação de promoções no carrinho  
- Controle de abertura/fechamento da pizzaria  
- Criação de contas de funcionários com permissões limitadas

---

## 🚀 Features Futuras
- Integração com WhatsApp para envio de status dos pedidos  
- Página de relatórios do estabelecimento  

---

## 📝 Aprendizado / Dificuldades
- Organização de regras de negócio complexas (promoções e descontos)  
- Cache e revalidação no Next.js  
- UX responsivo com grids e carrosséis  
- Estruturação de queries avançadas no Prisma  
- Modularização do projeto com `_data-access` e `_actions`

---

## 🌐 Deploy
- Projeto publicado na **Vercel**

---

