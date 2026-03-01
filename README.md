# Weather Forecast

App de previsão do tempo com dados atuais e projeção de 3 dias, construído com Next.js App Router e WeatherAPI.

## Funcionalidades

- Clima atual: temperatura, condição, sensação térmica, vento, umidade e visibilidade
- Previsão de 3 dias com ícone, temperatura máxima e probabilidade de chuva
- Busca por cidade via URL search params
- Fundo dinâmico que muda conforme a condição climática
- Resumo diário baseado na diferença entre temperatura real e sensação térmica
- Cache automático de 5 minutos por cidade

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, Server Components, fetch com `revalidate`
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [WeatherAPI](https://www.weatherapi.com/) — dados meteorológicos

## Estrutura do projeto

```
app/
  page.tsx          # Server Component — orquestra fetch e layout
  layout.tsx        # Root layout e metadata
  loading.tsx       # Estado de carregamento (Suspense automático)
  error.tsx         # Boundary de erro

components/
  WeatherCard.tsx   # Card principal com dados do clima atual
  WeatherChip.tsx   # Chip de métrica (vento, umidade, visibilidade)
  ForecastCard.tsx  # Card de previsão por dia
  SearchInput.tsx   # Input de busca (Client Component)

lib/
  weather.ts        # Interface WeatherData + função getWeather

utils/
  weather.ts        # Funções puras: formatDay, formatDate,
                    # getBackgroundColor, weatherSummary
```

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variável de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
WEATHER_API_KEY=sua_chave_aqui
```

Obtenha sua chave gratuita em [weatherapi.com](https://www.weatherapi.com/).

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Arquitetura

### Server Components

`page.tsx` é um Server Component assíncrono. O fetch acontece no servidor — a API key nunca é exposta ao cliente e a página chega ao browser já renderizada.

```ts
// A cidade vem da URL: /?city=Tokyo
export default async function Home({ searchParams }) {
  const { city = "London" } = await searchParams;
  const data = await getWeather(city);
  // ...
}
```

### Cache e revalidação

O fetch usa a estratégia `revalidate` do Next.js. Requisições para a mesma cidade são cacheadas por 5 minutos no servidor, evitando chamadas desnecessárias à API.

```ts
fetch(url, { next: { revalidate: 300 } })
```

### Busca por cidade

`SearchInput` é o único Client Component. Ao submeter o formulário, ele atualiza a URL com `router.push`, o que dispara uma nova renderização do Server Component com a cidade escolhida.
