/**
 * ============================================================================
 * K1RA - PRICING DATA
 * Kerber Labs - Dados de preços por nível de complexidade
 * 
 * NOTA: O preço varia de acordo com a COMPLEXIDADE do projeto,
 * não com o que o usuário recebe. Todos recebem tudo.
 * ============================================================================
 */

export interface PricingPlan {
  id: string;
  name: string;
  complexity: string;
  description: string;
  price: number; // Em centavos
  priceFormatted: string;
  examples: string[];
  pixCode: string;
  qrCodePath: string;
}

/**
 * Planos de preço por complexidade
 * Todos os planos incluem TODOS os entregáveis
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Nível I",
    complexity: "Complexidade Baixa",
    description: "Projetos simples com geometria básica e poucos componentes",
    price: 7900, // R$ 79,00
    priceFormatted: "R$ 79",
    examples: [
      "Móveis simples (estantes, mesas)",
      "Suportes e brackets básicos",
      "Peças para impressão 3D simples",
      "Pequenas estruturas residenciais",
    ],
    pixCode: "00020101021126730014br.gov.bcb.pix0136be6c2de4-a6f8-4401-9c38-8a291494ff9a0211K1RA BASIC520400005303986540579.005802BR5918DAVI G K SOSSMEIER6011PASSO FUNDO62070503***63047159",
    qrCodePath: "/assets/qr-codes/pix-basic.jpeg",
  },
  {
    id: "pro",
    name: "Nível II",
    complexity: "Complexidade Média",
    description: "Projetos intermediários com múltiplos componentes",
    price: 29700, // R$ 297,00
    priceFormatted: "R$ 297",
    examples: [
      "Sistemas mecânicos com engrenagens",
      "Móveis sob medida complexos",
      "Estruturas metálicas residenciais",
      "Dispositivos eletromecânicos",
    ],
    pixCode: "00020101021126710014br.gov.bcb.pix0136be6c2de4-a6f8-4401-9c38-8a291494ff9a0209K1RA PRO5204000053039865406297.005802BR5918DAVI G K SOSSMEIER6011PASSO FUNDO62070503***63040FB1",
    qrCodePath: "/assets/qr-codes/pix-pro.jpeg",
  },
  {
    id: "advanced",
    name: "Nível III",
    complexity: "Complexidade Alta",
    description: "Projetos avançados com alta precisão técnica",
    price: 99700, // R$ 997,00
    priceFormatted: "R$ 997",
    examples: [
      "Máquinas e equipamentos industriais",
      "Elevadores e sistemas de transporte",
      "Estruturas arquitetônicas complexas",
      "Sistemas hidráulicos/pneumáticos",
    ],
    pixCode: "00020101021126760014br.gov.bcb.pix0136be6c2de4-a6f8-4401-9c38-8a291494ff9a0214K1RA ADVANCED5204000053039865406997.005802BR5918DAVI G K SOSSMEIER6011PASSO FUNDO62070503***6304D882",
    qrCodePath: "/assets/qr-codes/pix-advanced.jpeg",
  },
  {
    id: "enterprise",
    name: "Nível IV",
    complexity: "Complexidade Extrema",
    description: "Engenharia de ponta para projetos industriais",
    price: 499970, // R$ 4.999,70
    priceFormatted: "R$ 4.999",
    examples: [
      "Plantas industriais completas",
      "Sistemas de automação avançada",
      "Projetos aeroespaciais",
      "Infraestrutura crítica",
    ],
    pixCode: "00020101021126580014br.gov.bcb.pix0136be6c2de4-a6f8-4401-9c38-8a291494ff9a52040000530398654074999.705802BR5918DAVI G K SOSSMEIER6011PASSO FUNDO62070503***6304E102",
    qrCodePath: "/assets/qr-codes/pix-enterprise.jpeg",
  },
];

/**
 * Entregáveis inclusos em TODOS os planos
 */
export const universalDeliverables = [
  "Desenhos técnicos completos (2D)",
  "Modelos 3D renderizados",
  "Arquivos CAD (DXF/DWG/STEP)",
  "Lista de materiais detalhada",
  "Especificações técnicas",
  "Memorial descritivo",
  "Guia de execução passo a passo",
  "Suporte por 30 dias",
];

/**
 * Formata preço de centavos para Real brasileiro
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/**
 * Busca plano por ID
 */
export function getPlanById(id: string): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === id);
}
