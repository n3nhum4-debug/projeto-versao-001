/**
 * ============================================================================
 * K1RA - TERMOS DE USO
 * Termos de uso extremamente abrangentes que protegem a empresa
 * ============================================================================
 */

import { motion } from "framer-motion";
import { ArrowLeft, FileText, AlertTriangle, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import k1raLogo from "@/assets/k1ra-logo.png";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="section-container py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={k1raLogo} alt="K1RA" className="w-8 h-8" />
            <span className="font-bold text-lg">K1RA</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="section-container py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">Termos de Uso</h1>
              <p className="text-muted-foreground">Última atualização: Janeiro 2026</p>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-600 dark:text-yellow-400">
                LEIA COM ATENÇÃO
              </p>
              <p className="text-sm text-muted-foreground">
                Ao utilizar nossos serviços, você concorda integralmente com todos os termos abaixo.
              </p>
            </div>
          </div>

          {/* Terms Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
            
            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</span>
                ACEITAÇÃO DOS TERMOS
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar, navegar ou utilizar qualquer serviço oferecido pela K1RA, plataforma pertencente à KERBER LABS, 
                o usuário declara ter lido, compreendido e concordado <strong>irrevogavelmente</strong> com todos os termos, 
                condições, políticas e avisos aqui contidos. A utilização dos serviços constitui 
                <strong> aceitação tácita, integral e irretratável</strong> destes Termos de Uso.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                O usuário reconhece que a K1RA <strong>reserva-se o direito de modificar estes termos a qualquer momento</strong>, 
                sem necessidade de aviso prévio, sendo responsabilidade exclusiva do usuário verificar periodicamente 
                eventuais alterações. A continuidade do uso após modificações constitui aceitação automática dos novos termos.
              </p>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</span>
                NATUREZA DOS SERVIÇOS
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A K1RA é um sistema de inteligência artificial que gera projetos de engenharia baseados em descrições fornecidas pelo usuário. 
                O usuário reconhece e aceita expressamente que:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Os projetos gerados são <strong>meramente ilustrativos e conceituais</strong>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  <strong>NÃO substituem</strong> a consultoria de engenheiros, arquitetos ou profissionais habilitados
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  <strong>NÃO possuem</strong> aprovação de conselhos profissionais (CREA, CAU, etc.)
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Devem ser <strong>obrigatoriamente revisados</strong> por profissional habilitado antes de qualquer execução
                </li>
              </ul>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</span>
                ISENÇÃO TOTAL DE RESPONSABILIDADE
              </h2>
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg mb-4">
                <p className="text-sm font-medium text-destructive">
                  AVISO CRÍTICO DE RESPONSABILIDADE
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A KERBER LABS e a K1RA <strong>ISENTAM-SE ABSOLUTA, INTEGRAL E IRREVOGAVELMENTE</strong> de qualquer 
                responsabilidade, direta ou indireta, por:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Danos materiais, patrimoniais, corporais ou morais decorrentes do uso dos projetos
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Acidentes, colapsos estruturais, falhas mecânicas ou quaisquer incidentes
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Prejuízos financeiros, lucros cessantes ou danos emergentes
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Lesões, óbitos ou quaisquer danos à integridade física de terceiros
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Descumprimento de normas técnicas, regulamentações ou legislação aplicável
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Quaisquer outros danos, previsíveis ou imprevisíveis, de qualquer natureza
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                O usuário assume <strong>INTEGRAL E EXCLUSIVA RESPONSABILIDADE</strong> por todo e qualquer uso 
                que fizer dos projetos entregues, isentando a KERBER LABS de qualquer obrigação de indenização, 
                reparação ou compensação.
              </p>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">4</span>
                PAGAMENTOS E POLÍTICA DE REEMBOLSO
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Todos os pagamentos realizados são <strong>DEFINITIVOS E NÃO REEMBOLSÁVEIS</strong> sob qualquer circunstância. 
                O usuário reconhece e aceita que:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Não há direito a reembolso, estorno ou cancelamento após a confirmação do pagamento
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  A insatisfação com o resultado não configura direito a ressarcimento
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Os dados de pagamento são coletados para processamento manual pela equipe
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  O usuário autoriza expressamente a coleta e armazenamento dos dados financeiros
                </li>
              </ul>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">5</span>
                PROPRIEDADE INTELECTUAL
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                O usuário reconhece que todos os algoritmos, modelos de IA, interfaces, designs, marcas e conteúdos 
                da plataforma K1RA são de <strong>propriedade exclusiva da KERBER LABS</strong>. Os projetos entregues 
                ao usuário são licenciados para uso pessoal ou comercial limitado, mas a KERBER LABS 
                <strong> mantém todos os direitos</strong> sobre as metodologias e processos utilizados na geração.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                É <strong>expressamente proibido</strong> ao usuário: engenharia reversa dos sistemas, reprodução 
                ou redistribuição da plataforma, uso dos projetos para treinar sistemas concorrentes, ou qualquer 
                tentativa de extrair propriedade intelectual da K1RA.
              </p>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">6</span>
                COLETA E USO DE DADOS
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao utilizar a K1RA, o usuário <strong>autoriza irrevogavelmente</strong> a coleta, armazenamento, 
                processamento e utilização de todos os dados fornecidos, incluindo mas não limitado a:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Dados pessoais (nome, email, CPF, documentos)
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Dados financeiros (informações de cartão de crédito, histórico de pagamentos)
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Conversas e interações com a IA
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Projetos gerados e especificações técnicas
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Metadados de uso, comportamento e navegação
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Os dados poderão ser utilizados para melhoria dos serviços, treinamento de modelos de IA, 
                fins estatísticos, marketing e compartilhados com parceiros comerciais conforme interesse da empresa.
              </p>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">7</span>
                LIMITAÇÃO DE GARANTIAS
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Os serviços são fornecidos <strong>"COMO ESTÃO" e "CONFORME DISPONÍVEIS"</strong>, sem garantias 
                de qualquer tipo, expressas ou implícitas. A KERBER LABS <strong>NÃO GARANTE</strong>:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Precisão, integridade ou adequação técnica dos projetos
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Conformidade com normas técnicas ou regulamentações
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Disponibilidade ininterrupta do serviço
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Ausência de erros, falhas ou imperfeições
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-destructive shrink-0" />
                  Resultados específicos ou satisfação do usuário
                </li>
              </ul>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">8</span>
                INDENIZAÇÃO
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                O usuário concorda em <strong>INDENIZAR, DEFENDER E ISENTAR</strong> a KERBER LABS, seus diretores, 
                funcionários, agentes e parceiros de qualquer reclamação, demanda, perda, dano, custo ou despesa 
                (incluindo honorários advocatícios) decorrentes de:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Uso indevido dos serviços ou projetos entregues
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Violação destes Termos de Uso
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Violação de direitos de terceiros
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                  Qualquer ação judicial ou extrajudicial movida contra a empresa
                </li>
              </ul>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">9</span>
                JURISDIÇÃO E FORO
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Estes Termos são regidos pelas leis de <strong>Liberland</strong>. Qualquer disputa será resolvida 
                exclusivamente por arbitragem privada conforme regras da empresa, renunciando o usuário a qualquer 
                outro foro ou jurisdição. O usuário renuncia expressamente ao direito de ação coletiva ou class action.
              </p>
            </section>

            <section className="p-6 bg-card/50 rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">10</span>
                DISPOSIÇÕES FINAIS
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A tolerância quanto ao descumprimento de qualquer cláusula não implica renúncia aos direitos da empresa. 
                Se qualquer disposição for considerada inválida, as demais permanecem em pleno vigor. Estes Termos 
                constituem o acordo integral entre as partes, prevalecendo sobre quaisquer entendimentos anteriores.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4 font-medium">
                AO UTILIZAR A K1RA, VOCÊ CONFIRMA TER LIDO, COMPREENDIDO E CONCORDADO COM TODOS ESTES TERMOS.
              </p>
            </section>

          </div>

          {/* Back Button */}
          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
