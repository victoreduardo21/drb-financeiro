
import React from 'react';
import { 
  Book, 
  Code, 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Calculator,
  Info,
  Layers,
  FileJson
} from 'lucide-react';

const DocumentationView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Book className="h-32 w-32 text-blue-600" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">Documentação Oficial</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Manual do Sistema Financeiro DRB</h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Este documento detalha o funcionamento técnico e as regras de negócio do ERP Financeiro da DRB Logística, 
            projetado para otimizar o fluxo de caixa e a gestão de minutas.
          </p>
        </div>
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Lado Esquerdo - Navegação Rápida/Cards */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-blue-400" /> Stack Tecnológica
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
                Frontend: React 19 + TypeScript
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
                Styling: Tailwind CSS
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
                Inteligência: Google Gemini 2.5
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
                Backend: Google Apps Script
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
                Database: Google Sheets (Spreadsheet)
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-green-600" /> Segurança
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              O acesso é restrito via autenticação vinculada à planilha de usuários. 
              As senhas são validadas em tempo real e o sistema suporta níveis de setor (Financeiro/Operação).
            </p>
          </div>
        </div>

        {/* Lado Direito - Conteúdo Detalhado */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Seção 1: Protocolo e Cálculos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 border-b pb-4">
              <Calculator className="h-5 w-5 text-blue-600" /> Módulo de Protocolo & Regras
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-700 text-sm uppercase mb-2">Fluxo de Pagamento</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  O módulo de protocolo é responsável por consolidar as "Minutas de Viagem" entregues pelos motoristas. 
                  Ao informar a placa do cavalo, o sistema recupera as viagens pendentes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Taxa RPA Padrão</span>
                  <p className="text-2xl font-bold text-blue-800">2.7%</p>
                  <p className="text-xs text-blue-600 mt-1 italic">Aplicado sobre o valor bruto em todos os casos.</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <span className="text-[10px] font-bold text-orange-600 uppercase">Taxa de Venda (Comissão)</span>
                  <p className="text-2xl font-bold text-orange-800">5.0%</p>
                  <p className="text-xs text-orange-600 mt-1 italic">Aplicado apenas em pagamentos "À Vista".</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 mb-2">Fórmula do Cálculo Líquido:</h4>
                <code className="text-xs block bg-slate-800 text-blue-300 p-3 rounded-lg font-mono">
                  Líquido = Bruto - (Bruto * TaxaRPA) - (Bruto * TaxaVenda se À Vista)
                </code>
              </div>
            </div>
          </div>

          {/* Seção 2: IA & Insights */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 border-b pb-4">
              <Cpu className="h-5 w-5 text-indigo-600" /> Inteligência Artificial (CFO Virtual)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              O sistema utiliza o modelo <strong>Gemini 2.5 Flash</strong> da Google para realizar análises preditivas 
              e consultoria financeira instantânea.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <div className="h-5 w-5 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">1</div>
                <span>Processa dados de Receita vs Despesa do Dashboard.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <div className="h-5 w-5 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">2</div>
                <span>Identifica gargalos em protocolos pendentes e vencimentos próximos.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <div className="h-5 w-5 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">3</div>
                <span>Gera recomendações estratégicas para o gestor financeiro.</span>
              </div>
            </div>
          </div>

          {/* Seção 3: Integração de Dados */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4 border-b pb-4">
              <Database className="h-5 w-5 text-amber-600" /> Persistência de Dados
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              O sistema utiliza uma arquitetura "Serverless" com Google Apps Script para comunicação com planilhas.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-100 p-3 rounded-lg text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tabela de Usuários</p>
                <p className="text-xs font-medium text-slate-700">Aba: USUARIOS</p>
              </div>
              <div className="border border-slate-100 p-3 rounded-lg text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tabela de Viagens</p>
                <p className="text-xs font-medium text-slate-700">Aba: PROTOCOLOS</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Docs */}
      <div className="text-center p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
        <p className="text-slate-400 text-sm">
          Fim da documentação v1.0.0 | Desenvolvido por GTS - Global Tech Software
        </p>
      </div>

    </div>
  );
};

export default DocumentationView;
