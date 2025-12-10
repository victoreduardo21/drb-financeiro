import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Users, 
  LogOut, 
  Truck, 
  Menu,
  X,
  Bell,
  PieChart,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Sparkles,
  Bot,
  ClipboardList, // Para Protocolo
  UserPlus,      // Para Cadastro Favorecido
  CalendarClock, // Para Vencimento
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  FileCheck,
  Building2,
  Calendar,
  Edit2,
  Printer,       // Icone para Recibo
  MapPin,
  Box,
  CreditCard,
  BadgeDollarSign, // Para Valores Frete
  Calculator,
  Save,
  Wallet
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import RegistrationForm from './components/RegistrationForm';
import LoginScreen from './components/LoginScreen';
import { Screen, UserRegistrationData } from './types';

// --- COMPONENTES DAS NOVAS TELAS ---

// 1. Painel Geral (Mantido e Ajustado)
const DashboardView = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleGenerateAnalysis = async () => {
    setIsAiLoading(true);
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        setAiAnalysis("Chave de API não configurada no ambiente.");
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = ai.models;

      const contextData = `
        Receita Total: R$ 1.245.000 (+12.5% vs mês anterior)
        Despesas Operacionais: R$ 854.200 (+4.2% vs mês anterior)
        Lucro Líquido: R$ 390.800 (+8.1% vs mês anterior)
        Contas a Vencer (Próx. 7 dias): R$ 45.000
        Protocolos Pendentes: 12
      `;

      const prompt = `
        Atue como um Consultor Financeiro Sênior (CFO).
        Analise os dados da DRB Logística:
        ${contextData}

        Forneça:
        1. Análise relâmpago da saúde financeira.
        2. Alerta sobre os vencimentos e protocolos.
        3. Uma ação recomendada.
      `;

      const result = await model.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      setAiAnalysis(result.text);
    } catch (error) {
      console.error("Erro na IA:", error);
      setAiAnalysis("Sistema indisponível momentaneamente.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 lg:pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Receita Total</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-2">R$ 1.245.000</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <ArrowUpRight className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Despesas</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-2">R$ 854.200</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <ArrowDownRight className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 sm:col-span-2 xl:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Lucro Líquido</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-2">R$ 390.800</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-slate-700 overflow-hidden text-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 p-3 bg-blue-600/20 rounded-xl border border-blue-500/30 backdrop-blur-sm">
              <Bot className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div>
                <h3 className="text-xl font-bold">CFO Virtual AI</h3>
                <p className="text-slate-400 text-sm">Análise inteligente de fluxo de caixa e pendências.</p>
              </div>
              {aiAnalysis ? (
                 <div className="bg-white/5 border border-white/10 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-2">
                   <div className="prose prose-invert prose-sm max-w-none whitespace-pre-line text-slate-200">
                     {aiAnalysis}
                   </div>
                   <button onClick={() => setAiAnalysis(null)} className="mt-4 text-xs text-slate-400 hover:text-white">Limpar</button>
                 </div>
              ) : (
                <button
                  onClick={handleGenerateAnalysis}
                  disabled={isAiLoading}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition-all"
                >
                  {isAiLoading ? <Sparkles className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  <span>Gerar Insights</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CONFIGURAÇÃO DE VALORES FRETE (NOVA TELA) ---
const RATES = {
  RPA: 2.7,
  VENDA: 5.0
};

const FreightValuesView = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
             <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                <BadgeDollarSign className="h-6 w-6" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-slate-800">Configuração de Valores de Frete</h2>
                <p className="text-sm text-slate-500">Defina as taxas padrões para cálculos de RPA e Venda.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <FileText className="h-24 w-24 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                   Taxa RPA (Recibo Pagamento Autônomo)
                </h3>
                <div className="flex items-center gap-3">
                   <div className="relative flex-1">
                      <input 
                        type="number" 
                        defaultValue={2.7} 
                        step="0.1"
                        className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 text-lg font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                      <span className="absolute right-4 top-3.5 font-bold text-slate-400">%</span>
                   </div>
                   <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <Save className="h-5 w-5" />
                   </button>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                   Aplicado em todos os pagamentos (Vista, Prazo e Integral).
                </p>
             </div>

             <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <DollarSign className="h-24 w-24 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                   Taxa de Venda (Comissão)
                </h3>
                <div className="flex items-center gap-3">
                   <div className="relative flex-1">
                      <input 
                        type="number" 
                        defaultValue={5.0} 
                        step="0.1"
                        className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 text-lg font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                      <span className="absolute right-4 top-3.5 font-bold text-slate-400">%</span>
                   </div>
                   <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <Save className="h-5 w-5" />
                   </button>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                   Aplicado apenas em pagamentos "A Vista".
                </p>
             </div>
          </div>
       </div>
    </div>
  )
}

// 3. Protocolo (REFORMULADO - LAYOUT PLANILHA)
interface ProtocolData {
  id: string;
  ref: string;
  opDate: string;
  plate: string;
  service: string;
  origin: string;
  destination: string;
  container: string;
  value: number; // Valor da Minuta
}

const ProtocolView = () => {
  // State for Inputs Top
  const [plateFilter, setPlateFilter] = useState('');
  const [payee, setPayee] = useState('');
  const [pix, setPix] = useState('');
  const [paymentType, setPaymentType] = useState<'A vista' | 'Prazo' | 'Integral'>('A vista');

  const [protocols, setProtocols] = useState<ProtocolData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data: Placas sem hífen e valores base
    const mockData: ProtocolData[] = [
      { id: '1', ref: '20491', opDate: '24/10/2024', plate: 'GQI9J96', service: 'Importação', origin: 'Term. Santos', destination: 'DRB Armazém', container: 'MSKU-9988771', value: 600.00 },
      { id: '2', ref: '20492', opDate: '24/10/2024', plate: 'ABC1234', service: 'Exportação', origin: 'Fábrica SP', destination: 'Porto Itajaí', container: 'HLCU-1122334', value: 850.00 },
      { id: '3', ref: '20493', opDate: '25/10/2024', plate: 'GQI9J96', service: 'Transferência', origin: 'CD Cajamar', destination: 'CD Extrema', container: 'N/A', value: 450.00 },
      { id: '4', ref: '20494', opDate: '25/10/2024', plate: 'GQI9J96', service: 'Devolução', origin: 'DRB Armazém', destination: 'Depot MSC', container: 'MSKU-9988771', value: 600.00 },
      { id: '5', ref: '20495', opDate: '26/10/2024', plate: 'KLO8877', service: 'DTA', origin: 'Aeroporto VCP', destination: 'EADI Suzano', container: 'AA-22991', value: 1200.00 },
    ];
    
    setTimeout(() => {
      setProtocols(mockData);
      setIsLoading(false);
    }, 600);
  }, []);

  // Filter Logic: Puxa viagens da placa selecionada
  const filteredProtocols = protocols.filter(p => 
    plateFilter ? p.plate.toLowerCase().includes(plateFilter.toLowerCase()) : false
  );

  // Financial Calculations: Aplica regras no TOTAL
  const calculateTotals = () => {
    const totalGross = filteredProtocols.reduce((acc, curr) => acc + curr.value, 0);
    const rpaVal = totalGross * (RATES.RPA / 100);
    
    // REGRA: Venda (5%) só se for 'A vista'
    const vendaVal = paymentType === 'A vista' ? totalGross * (RATES.VENDA / 100) : 0;
    
    const totalNet = totalGross - rpaVal - vendaVal;

    return { totalGross, rpaVal, vendaVal, totalNet };
  };

  const totals = calculateTotals();

  const handleGenerateReceipt = () => {
    if (filteredProtocols.length === 0) {
      alert("Selecione um cavalo (placa) válido para gerar o recibo.");
      return;
    }
    alert(
      `RECIBO GERADO COM SUCESSO!\n\n` +
      `Favorecido: ${payee || 'N/A'}\n` +
      `Cavalo: ${plateFilter.toUpperCase()}\n` +
      `Pagamento: ${paymentType}\n` +
      `----------------------------\n` +
      `Total Bruto: R$ ${totals.totalGross.toFixed(2)}\n` +
      `(-) RPA: R$ ${totals.rpaVal.toFixed(2)}\n` +
      (paymentType === 'A vista' ? `(-) Venda: R$ ${totals.vendaVal.toFixed(2)}\n` : '') +
      `LÍQUIDO: R$ ${totals.totalNet.toFixed(2)}`
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-500">
      
      {/* --- TOP SECTION (THE SHEET HEADER / RECIBO) --- */}
      <div className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: Inputs de Controle */}
              <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Entregue Por / Favorecido</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input 
                                type="text" 
                                value={payee}
                                onChange={(e) => setPayee(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                                placeholder="Nome do motorista..."
                            />
                          </div>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Chave PIX</label>
                          <div className="relative">
                            <Wallet className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input 
                                type="text" 
                                value={pix}
                                onChange={(e) => setPix(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="CPF/Email/Tel..."
                            />
                          </div>
                      </div>
                  </div>

                  {/* Placa e Pagamento */}
                  <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                      <div className="flex flex-col sm:flex-row gap-4 items-end">
                          <div className="flex-1 w-full">
                              <label className="block text-xs font-bold text-blue-700 uppercase mb-1">Cavalo (Placa)</label>
                              <div className="relative">
                                <Truck className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                                <input 
                                    type="text" 
                                    value={plateFilter}
                                    onChange={(e) => setPlateFilter(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border-2 border-blue-200 text-lg font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none uppercase placeholder:text-sm placeholder:font-normal placeholder:text-slate-400"
                                    placeholder="Ex: GQI9J96"
                                />
                              </div>
                          </div>
                          
                          <div className="flex-1 w-full">
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo de Pagamento</label>
                               <select 
                                  value={paymentType}
                                  onChange={(e: any) => setPaymentType(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                               >
                                  <option value="A vista">À Vista (RPA + Venda)</option>
                                  <option value="Prazo">A Prazo (Apenas RPA)</option>
                                  <option value="Integral">Integral (Apenas RPA)</option>
                               </select>
                          </div>
                          
                          <div className="flex-none">
                              <button 
                                onClick={handleGenerateReceipt}
                                disabled={!plateFilter}
                                className="h-[42px] px-6 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-bold text-sm shadow-md shadow-green-600/20 transition-all flex items-center gap-2"
                              >
                                  <Printer className="h-4 w-4" /> GERAR RECIBO
                              </button>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Right Side: QUADRO DE RECIBO (Cálculo Automático) */}
              <div className="lg:col-span-5">
                  <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
                      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600 uppercase">Resumo | Entrega de Minutas</span>
                          <span className="text-[10px] text-slate-400">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-center">
                          {/* Grid de Valores */}
                          <div className="grid grid-cols-3 gap-0 border border-slate-300 rounded-lg overflow-hidden text-center mb-3">
                              
                              {/* Headers */}
                              <div className="bg-slate-200 p-2 border-r border-slate-300 border-b border-slate-300">
                                  <div className="text-[10px] font-bold text-slate-500 uppercase">Total Bruto</div>
                              </div>
                              <div className="bg-green-100 p-2 border-r border-slate-300 border-b border-slate-300">
                                  <div className="text-[10px] font-bold text-green-700 uppercase">Total Líquido</div>
                              </div>
                              <div className="bg-red-50 p-2 border-b border-slate-300">
                                  <div className="text-[10px] font-bold text-red-700 uppercase">(-) RPA {RATES.RPA}%</div>
                              </div>
                              
                              {/* Values */}
                              <div className="p-2 border-r border-slate-300 bg-white flex items-center justify-center">
                                  <div className="text-sm font-bold text-slate-800">{totals.totalGross.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                              </div>
                              <div className="p-2 border-r border-slate-300 bg-green-50 flex items-center justify-center">
                                  <div className="text-lg font-bold text-green-700">{totals.totalNet.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                              </div>
                              <div className="p-2 bg-white flex items-center justify-center">
                                  <div className="text-sm font-medium text-red-600">-{totals.rpaVal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                              </div>
                          </div>
                          
                          {/* Linha Condicional de Venda */}
                          {paymentType === 'A vista' && (
                             <div className="flex justify-between items-center px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-800">
                                <span className="font-semibold uppercase flex items-center gap-1">
                                    <BadgeDollarSign className="h-3 w-3" /> (-) Venda / Comissão ({RATES.VENDA}%)
                                </span>
                                <span className="font-bold text-sm">-{totals.vendaVal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                             </div>
                          )}

                          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                              <span>Qtd. Minutas: <strong>{filteredProtocols.length}</strong></span>
                              <span>Ref Inicial: <strong>{filteredProtocols.length > 0 ? filteredProtocols[0].ref : '-'}</strong></span>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
  
      {/* --- BOTTOM SECTION (DATA TABLE LIST) --- */}
      <div className="overflow-auto custom-scrollbar flex-1 bg-white">
        <table className="w-full text-left text-sm text-slate-600 min-w-[1000px]">
          <thead className="bg-slate-100 text-xs uppercase font-bold text-slate-600 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-4 py-3 border-b border-slate-300 w-24">Ref.</th>
              <th className="px-4 py-3 border-b border-slate-300 w-32">Data OP</th>
              <th className="px-4 py-3 border-b border-slate-300 w-32">Cavalo</th>
              <th className="px-4 py-3 border-b border-slate-300">Serviço</th>
              <th className="px-4 py-3 border-b border-slate-300">Terminal Origem</th>
              <th className="px-4 py-3 border-b border-slate-300">Terminal Destino</th>
              <th className="px-4 py-3 border-b border-slate-300">Container</th>
              <th className="px-4 py-3 border-b border-slate-300 text-right w-32 bg-slate-200/50">Valor Minuta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProtocols.length > 0 ? (
                filteredProtocols.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.ref}</td>
                    <td className="px-4 py-3">{item.opDate}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-700">{item.plate}</td>
                    <td className="px-4 py-3">{item.service}</td>
                    <td className="px-4 py-3 text-xs">{item.origin}</td>
                    <td className="px-4 py-3 text-xs">{item.destination}</td>
                    <td className="px-4 py-3 text-xs">{item.container}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-800 bg-slate-50">
                        {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-400">
                        {plateFilter ? (
                             <>
                                <Truck className="h-10 w-10 mx-auto mb-3 opacity-20 text-red-400" />
                                <p>Nenhuma viagem encontrada para a placa <span className="font-bold uppercase">{plateFilter}</span></p>
                             </>
                        ) : (
                             <>
                                <Search className="h-10 w-10 mx-auto mb-3 opacity-20" />
                                <p>Digite uma placa no campo <strong>CAVALO</strong> acima para carregar as viagens.</p>
                             </>
                        )}
                    </td>
                </tr>
            )}
            
            {/* Total Row at Bottom of Table */}
            {filteredProtocols.length > 0 && (
                <tr className="bg-slate-50 font-bold text-slate-800 border-t-2 border-slate-300">
                    <td colSpan={7} className="px-4 py-3 text-right uppercase text-xs">Total Bruto das Minutas:</td>
                    <td className="px-4 py-3 text-right">
                        {totals.totalGross.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 4. Relatório (ReportsView - Atualizado)
const ReportsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64 flex flex-col justify-between hover:shadow-md transition-shadow">
             <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
               <PieChart className="h-6 w-6" />
             </div>
             <div>
                <h3 className="font-bold text-slate-800 text-lg">DRE Gerencial</h3>
                <p className="text-sm text-slate-500 mt-1">Demonstrativo de resultado do exercício detalhado.</p>
             </div>
             <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-blue-600 transition-colors">Visualizar</button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64 flex flex-col justify-between hover:shadow-md transition-shadow">
             <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-4">
               <Truck className="h-6 w-6" />
             </div>
             <div>
                <h3 className="font-bold text-slate-800 text-lg">Custo de Frota</h3>
                <p className="text-sm text-slate-500 mt-1">Análise de combustível, manutenção e pneus.</p>
             </div>
             <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-orange-600 transition-colors">Visualizar</button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64 flex flex-col justify-between hover:shadow-md transition-shadow">
             <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4">
               <FileCheck className="h-6 w-6" />
             </div>
             <div>
                <h3 className="font-bold text-slate-800 text-lg">Fechamento Mensal</h3>
                <p className="text-sm text-slate-500 mt-1">Consolidado de todas as entradas e saídas.</p>
             </div>
             <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-green-600 transition-colors">Visualizar</button>
        </div>
    </div>
);

// 5. Cadastro Favorecido
const PayeesView = () => (
  <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 lg:h-[calc(100vh-140px)]">
      {/* Formulário */}
      <div className="w-full lg:w-1/3 flex-none">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <h2 className="text-lg font-bold text-slate-800">Novo Favorecido</h2>
               <UserPlus className="h-4 w-4 text-slate-400" />
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Razão Social / Nome</label>
                  <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Auto Peças Silva" />
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">CNPJ / CPF</label>
                      <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="00.000.000/0000-00" />
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Categoria</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>Fornecedor</option>
                        <option>Prestador de Serviço</option>
                        <option>Funcionário</option>
                      </select>
                  </div>
               </div>
               <div className="pt-2 border-t border-slate-100 mt-2">
                 <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Dados Bancários</p>
                 <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="col-span-3">
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Banco</label>
                      <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Banco do Brasil" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Agência</label>
                      <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Conta</label>
                      <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                 </div>
               </div>
               <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">Cadastrar Favorecido</button>
            </div>
        </div>
      </div>

      {/* Lista */}
      <div className="w-full lg:w-2/3 flex-grow min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-800">Favorecidos Cadastrados</h3>
                 <div className="relative">
                    <Search className="absolute left-3 top-2 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Buscar..." className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48" />
                 </div>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all bg-slate-50/30">
                           <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                 <div className="h-10 w-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-slate-500" />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-slate-800 text-sm">Fornecedor Exemplo {i}</h4>
                                    <p className="text-xs text-slate-500">CNPJ: 12.345.678/0001-90</p>
                                 </div>
                              </div>
                              <button className="text-slate-400 hover:text-blue-600"><Edit2 className="h-4 w-4" /></button>
                           </div>
                           <div className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
                              <p>Banco: 001 - Brasil</p>
                              <p>Ag: 1234-5 | CC: 102030-X</p>
                           </div>
                        </div>
                     ))}
                  </div>
              </div>
          </div>
      </div>
  </div>
);

// 6. Vencimento
const MaturityView = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Agenda de Vencimentos</h2>
            <p className="text-sm text-slate-500">Contas a pagar e receber previstas.</p>
          </div>
          <div className="flex gap-2">
             <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Filtro Data
             </button>
             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Lançar Conta
             </button>
          </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar p-6">
          <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
             <div className="min-w-[200px] p-4 rounded-xl border border-red-100 bg-red-50">
                <p className="text-xs font-bold text-red-600 uppercase">Vencendo Hoje</p>
                <h3 className="text-2xl font-bold text-red-700 mt-1">R$ 12.450,00</h3>
                <p className="text-xs text-red-600/80 mt-1">3 títulos</p>
             </div>
             <div className="min-w-[200px] p-4 rounded-xl border border-orange-100 bg-orange-50">
                <p className="text-xs font-bold text-orange-600 uppercase">Próximos 7 dias</p>
                <h3 className="text-2xl font-bold text-orange-700 mt-1">R$ 45.200,00</h3>
                <p className="text-xs text-orange-600/80 mt-1">8 títulos</p>
             </div>
             <div className="min-w-[200px] p-4 rounded-xl border border-blue-100 bg-blue-50">
                <p className="text-xs font-bold text-blue-600 uppercase">Total do Mês</p>
                <h3 className="text-2xl font-bold text-blue-700 mt-1">R$ 158.900,00</h3>
                <p className="text-xs text-blue-600/80 mt-1">24 títulos</p>
             </div>
          </div>

          <table className="w-full text-left text-sm text-slate-600 min-w-[800px]">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 rounded-lg">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Vencimento</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Favorecido</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {[1, 2, 3, 4, 5, 6].map((i) => (
                 <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">
                       <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${i === 1 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                          <span>1{i}/10/2024</span>
                       </div>
                    </td>
                    <td className="px-4 py-3">Manutenção Caminhão Volvo {i}</td>
                    <td className="px-4 py-3">Oficina Diesel Pro</td>
                    <td className="px-4 py-3">Manutenção Frota</td>
                    <td className="px-4 py-3 font-medium text-slate-900">R$ {1200 * i},00</td>
                    <td className="px-4 py-3">
                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${i === 1 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          {i === 1 ? 'Atrasado' : 'A Vencer'}
                       </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <button className="text-slate-400 hover:text-blue-600"><FileText className="h-4 w-4" /></button>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
      </div>
  </div>
);


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserRegistrationData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const handleLogin = (user: UserRegistrationData) => {
    setCurrentUser(user);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('dashboard');
    setSidebarOpen(false);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // NOVA ORDEM DO MENU
  const menuItems = [
    { id: 'dashboard', name: 'Painel Geral', icon: LayoutGrid },
    { id: 'users', name: 'Gestão de Usuários', icon: Users },
    { id: 'protocol', name: 'Protocolo', icon: ClipboardList },
    { id: 'freight_values', name: 'Valores Frete', icon: BadgeDollarSign },
    { id: 'reports', name: 'Relatórios', icon: PieChart },
    { id: 'payees', name: 'Cadastro Favorecido', icon: UserPlus },
    { id: 'maturity', name: 'Vencimento', icon: CalendarClock },
  ];

  const renderContent = () => {
    switch (currentScreen) {
      case 'dashboard': return <DashboardView />;
      case 'users': return <RegistrationForm />;
      case 'protocol': return <ProtocolView />;
      case 'reports': return <ReportsView />;
      case 'payees': return <PayeesView />;
      case 'maturity': return <MaturityView />;
      case 'freight_values': return <FreightValuesView />;
      default: return <DashboardView />;
    }
  };

  const getPageTitle = () => {
      switch (currentScreen) {
          case 'dashboard': return { title: 'Painel Geral', subtitle: 'Visão estratégica dos indicadores' };
          case 'users': return { title: 'Gestão de Usuários', subtitle: 'Controle de acesso e cadastro' };
          case 'protocol': return { title: 'Protocolo de Viagens', subtitle: 'Gestão de Operações e Recibos' };
          case 'reports': return { title: 'Relatórios', subtitle: 'Central de relatórios gerenciais' };
          case 'payees': return { title: 'Cadastro Favorecido', subtitle: 'Gestão de fornecedores e beneficiários' };
          case 'maturity': return { title: 'Agenda de Vencimentos', subtitle: 'Controle de fluxo de caixa' };
          case 'freight_values': return { title: 'Configuração de Valores', subtitle: 'Taxas de RPA e Venda' };
          default: return { title: 'DRB Logística', subtitle: 'Sistema Financeiro' };
      }
  }

  const headerInfo = getPageTitle();

  return (
    <div className="h-[100dvh] w-full flex bg-slate-50 font-sans overflow-hidden">
      
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-[#020617] text-white transform transition-transform duration-300 ease-in-out 
          lg:relative lg:translate-x-0 lg:flex lg:flex-col overflow-hidden shadow-2xl lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] z-0 pointer-events-none"></div>
        <div className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen z-0"></div>

        <div className="lg:hidden absolute top-4 right-4 z-20">
            <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="h-6 w-6" />
            </button>
        </div>

        <div className="relative z-10 flex flex-col h-full">
            <div className="p-6 md:p-8 flex items-center gap-3 font-bold text-2xl tracking-tighter text-white">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 backdrop-blur-sm">
                <Truck className="h-6 w-6 text-white" />
            </div>
            <span>DRB Logística</span>
            </div>

            <div className="px-6 mt-2 mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Menu Principal
            </h3>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
                const isActive = currentScreen === item.id;
                return (
                <button
                    key={item.id}
                    onClick={() => {
                        setCurrentScreen(item.id as Screen);
                        setSidebarOpen(false);
                    }}
                    className={`
                    w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 group border
                    ${isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-transparent' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
                    }
                    `}
                >
                    <item.icon 
                    className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} 
                    strokeWidth={1.5}
                    />
                    <span className="font-medium text-sm tracking-wide">{item.name}</span>
                </button>
                );
            })}
            </nav>

            <div className="p-6 mt-auto bg-[#020617]/50 backdrop-blur-sm">
            <div className="mb-6 px-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                    {currentUser.firstName[0]}{currentUser.lastName[0]}
                </div>
                <div className="overflow-hidden">
                    <p className="text-xs font-medium text-white truncate">{currentUser.firstName}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-6 px-4">
                <button 
                onClick={handleLogout}
                className="flex items-center gap-4 text-slate-400 hover:text-red-400 w-full transition-colors group"
                >
                <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                <span className="font-medium text-sm">Sair do Sistema</span>
                </button>
            </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="lg:hidden bg-[#020617] text-white p-4 flex justify-between items-center z-30 flex-none border-b border-white/10 shadow-md">
            <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
            <Truck className="h-5 w-5 text-blue-500" />
            <span>DRB LOGÍSTICA</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white p-1">
            <Menu className="h-6 w-6" />
            </button>
        </div>

        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex-none hidden lg:flex items-center justify-between px-6 z-20 transition-all">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-800">{headerInfo.title}</h1>
            <p className="hidden md:block text-xs text-slate-400 mt-0.5">{headerInfo.subtitle}</p>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
               <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
               Sistema Online
            </div>
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell className="h-6 w-6" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 text-sm cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F8FAFC] overflow-x-hidden">
           <div className="max-w-7xl mx-auto w-full h-full">
             {renderContent()}
           </div>
        </main>
      </div>
      
    </div>
  );
};

export default App;