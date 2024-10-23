![stylehub](https://github.com/user-attachments/assets/2bc923f7-ac03-4ce9-9614-96e50070809e)

Bem-vindo ao **Style Hub** – uma loja de camisetas personalizadas construída com as mais modernas tecnologias web. Este projeto utiliza **Next.js** para renderização estática (SSG), a API do **Stripe** para gerenciamento de produtos e finalização de pagamentos, além de estilização com **TailwindCSS**, **Shadcn/UI**, e **MagicUI**.

## ⚡️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)**: Framework React para a construção de interfaces rápidas e otimizadas, utilizando Static Site Generation (SSG) para melhor performance e SEO. O **Next.js** também é utilizado para construir a API do projeto.
- **[Stripe API](https://stripe.com/docs/api)**: Integração com o Stripe para cadastro de produtos e processamento de pagamentos.

## 🚀 Funcionalidades

- **Catálogo de camisetas personalizadas**: Exibição dos produtos disponíveis com seleção de quantidade e tamanho para compra.
- **Checkout com Stripe**: Finalização de pedidos com a API do Stripe para garantir transações seguras e confiáveis.
- **Design responsivo**: Interface construída com TailwindCSS, Shadcn/UI, e MagicUI para garantir uma experiência fluida em dispositivos móveis e desktop.

## 📦 Como rodar o projeto

1. Clone este repositório:
   ```
   git clone https://github.com/pedrokarnoski/style-hub
   cd style-hub
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```
   
3. Crie um arquivo *.env.local* na raiz do projeto e adicione as seguintes variáveis de ambiente:
   ```
   NEXT_URL=http://localhost:3000
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   STRIPE_SECRET_KEY=
   ```
   **Dica**: Gere suas chaves no painel do Stripe: https://dashboard.stripe.com
  
4. Inicie o servidor de desenvolvimento:
    ```bash
    yarn dev
    # ou
    npm run dev
    ```

5. Teste a finalização de compra: Para testar o pagamento, utilize o número de cartão de teste fornecido pelo Stripe:
    ```
    4242 4242 4242 4242
    ```
    Preencha com qualquer data futura, CVV, e-mail e nome fictícios.

<hr>
Disponível também em: https://stylehub.pedrokarnoski.dev
