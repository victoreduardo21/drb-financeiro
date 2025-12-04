import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Users, 
  Settings, 
  LogOut, 
  Truck, 
  Wallet, 
  Menu,
  X,
  Bell,
  PieChart,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Sparkles,
  Bot
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import RegistrationForm from './components/RegistrationForm';
import LoginScreen from './components/LoginScreen';
import { Screen, UserRegistrationData } from './types';

// Componente Dashboard com IA integrada
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

      // Dados simulados do dashboard para contexto da IA
      const contextData = `
        Receita Total: R$ 1.245.000 (+12.5% vs mês anterior)
        Despesas Operacionais: R$ 854.200 (+4.2% vs mês anterior)
        Lucro Líquido: R$ 390.800 (+8.1% vs mês anterior)
      `;

      const prompt = `
        Atue como um Consultor Financeiro Sênior especializado em Logística (CFO Virtual).
        Analise os seguintes dados financeiros do mês atual da DRB Logística:
        ${contextData}

        Forneça uma análise concisa e direta (máximo 3 parágrafos curtos) cobrindo:
        1. Saúde financeira atual.
        2. Um ponto de atenção (risco).
        3. Uma recomendação estratégica rápida para o próximo mês.
        
        Use formatação Markdown simples (negrito para destaque). Tom profissional e encorajador.
      `;

      const result = await model.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      setAiAnalysis(result.text);
    } catch (error) {
      console.error("Erro na IA:", error);
      setAiAnalysis("Não foi possível gerar a análise no momento. Tente novamente mais tarde.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 lg:pb-10">
      
      {/* Cards Principais - Responsividade Ajustada:
          Mobile/Tablet: grid-cols-1 ou 2
          Notebook/Desktop (xl): grid-cols-3
      */}
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
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+12.5%</span>
            <span className="text-slate-400 ml-2">vs. mês anterior</span>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Despesas Operacionais</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-2">R$ 854.200</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <ArrowDownRight className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 font-medium">+4.2%</span>
            <span className="text-slate-400 ml-2">vs. mês anterior</span>
          </div>
        </div>
        
        {/* No tablet (2 colunas), este card ocupa a largura total na linha de baixo para ficar bonito */}
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
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+8.1%</span>
            <span className="text-slate-400 ml-2">vs. mês anterior</span>
          </div>
        </div>
      </div>

      {/* Seção AI Agent */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-slate-700 overflow-hidden text-white relative">
        {/* Efeito de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 p-3 bg-blue-600/20 rounded-xl border border-blue-500/30 backdrop-blur-sm self-start">
              <Bot className="h-8 w-8 text-blue-400" />
            </div>
            
            <div className="flex-1 space-y-4 w-full">
              <div>
                <h3 className="text-xl font-bold flex flex-wrap items-center gap-2">
                  Análise Financeira Inteligente
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium uppercase tracking-wider">Beta AI</span>
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Utilize nossa IA para cruzar dados de receita e despesas e obter insights estratégicos para a DRB Logística.
                </p>
              </div>

              {aiAnalysis ? (
                 <div className="bg-white/5 border border-white/10 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-2">
                   <div className="prose prose-invert prose-sm max-w-none">
                     <div className="whitespace-pre-line leading-relaxed text-slate-200">
                       {aiAnalysis}
                     </div>
                   </div>
                   <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                      <button 
                        onClick={() => setAiAnalysis(null)}
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        Limpar análise
                      </button>
                   </div>
                 </div>
              ) : (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <Sparkles className="h-8 w-8 text-yellow-500/50" />
                  <p className="text-sm text-slate-500 max-w-md">
                    Clique no botão abaixo para processar os indicadores financeiros atuais e gerar um relatório executivo.
                  </p>
                </div>
              )}

              {!aiAnalysis && (
                <button
                  onClick={handleGenerateAnalysis}
                  disabled={isAiLoading}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAiLoading ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" />
                      <span>Processando Inteligência...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Gerar Análise Executiva</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-96 flex items-center justify-center hidden md:flex">
        <div className="text-center text-slate-400">
          <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Gráfico de desempenho financeiro será carregado aqui.</p>
        </div>
      </div>
       {/* Versão Mobile do Gráfico (menor altura) */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64 flex items-center justify-center md:hidden">
        <div className="text-center text-slate-400 text-sm">
          <PieChart className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p>Gráfico de desempenho</p>
        </div>
      </div>
    </div>
  );
};

const FinanceView = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-800">Contas a Pagar</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Nova Conta</button>
    </div>
    <div className="p-6">
       <div className="text-center py-12 text-slate-500">
         <Wallet className="h-12 w-12 mx-auto mb-4 text-slate-300" />
         <p>Nenhuma conta pendente para hoje.</p>
       </div>
    </div>
  </div>
);

const ReportsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64 flex flex-col justify-center items-center">
             <FileText className="h-10 w-10 text-blue-500 mb-3" />
             <h3 className="font-bold text-slate-800">DRE Gerencial</h3>
             <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">Baixar PDF</button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64 flex flex-col justify-center items-center">
             <FileText className="h-10 w-10 text-orange-500 mb-3" />
             <h3 className="font-bold text-slate-800">Relatório de Custo de Frota</h3>
             <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">Baixar PDF</button>
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

  // Se não estiver logado, mostra apenas a tela de Login
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const menuItems = [
    { id: 'dashboard', name: 'Painel Geral', icon: LayoutGrid },
    { id: 'users', name: 'Cadastro Usuários', icon: Users },
    { id: 'finance', name: 'Contas a Pagar', icon: Wallet },
    { id: 'reports', name: 'Relatórios', icon: PieChart },
    { id: 'docs', name: 'Documentação', icon: FileText },
  ];

  const renderContent = () => {
    switch (currentScreen) {
      case 'dashboard': return <DashboardView />;
      case 'users': return <RegistrationForm />;
      case 'finance': return <FinanceView />;
      case 'reports': return <ReportsView />;
      case 'docs': return <div className="text-center p-10 text-slate-500">Módulo de Documentação em desenvolvimento.</div>;
      default: return <DashboardView />;
    }
  };

  const getPageTitle = () => {
      switch (currentScreen) {
          case 'dashboard': return { title: 'Painel Geral', subtitle: 'Visão estratégica dos indicadores' };
          case 'users': return { title: 'Gestão de Usuários', subtitle: 'Controle de acesso e cadastro' };
          case 'finance': return { title: 'Financeiro', subtitle: 'Controle de contas a pagar e receber' };
          case 'reports': return { title: 'Relatórios', subtitle: 'Exportação de dados analíticos' };
          default: return { title: 'DRB Logística', subtitle: 'Sistema Financeiro' };
      }
  }

  const headerInfo = getPageTitle();

  return (
    // Usa h-[100dvh] para mobile e w-full. overflow-hidden evita scroll na pagina principal.
    <div className="h-[100dvh] w-full flex bg-slate-50 font-sans overflow-hidden">
      
      {/* Sidebar Mobile Overlay - Z-INDEX 40 para cobrir o header (Z-30) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - CORREÇÃO: Removido 'relative' solto.
          Agora é 'fixed' (mobile - z-50) e 'lg:relative' (desktop).
          Isso impede que ela ocupe espaço no fluxo (flex) quando está escondida no mobile.
      */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-[#020617] text-white transform transition-transform duration-300 ease-in-out 
          lg:relative lg:translate-x-0 lg:flex lg:flex-col overflow-hidden shadow-2xl lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Efeitos de Fundo da Sidebar (Spotlight) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] z-0 pointer-events-none"></div>
        <div className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen z-0"></div>

        {/* Botão de Fechar Mobile - Agora aparece em Tablets também (lg:hidden) */}
        <div className="lg:hidden absolute top-4 right-4 z-20">
            <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="h-6 w-6" />
            </button>
        </div>

        {/* Conteúdo da Sidebar */}
        <div className="relative z-10 flex flex-col h-full">
            {/* Brand Area */}
            <div className="p-6 md:p-8 flex items-center gap-3 font-bold text-2xl tracking-tighter text-white">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 backdrop-blur-sm">
                <Truck className="h-6 w-6 text-white" />
            </div>
            <span>DRB Logística</span>
            </div>

            {/* Section Header */}
            <div className="px-6 mt-2 mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Setor Financeiro
            </h3>
            </div>

            {/* Navigation Menu */}
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

            {/* Bottom Actions */}
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

      {/* Main Content Area - Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Header - Aparece em Mobile e Tablet (lg:hidden) */}
        <div className="lg:hidden bg-[#020617] text-white p-4 flex justify-between items-center z-30 flex-none border-b border-white/10 shadow-md">
            <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
            <Truck className="h-5 w-5 text-blue-500" />
            <span>DRB LOGÍSTICA</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white p-1">
            <Menu className="h-6 w-6" />
            </button>
        </div>

        {/* Top Navigation Bar - Fixo no topo, apenas em Desktop (lg:flex) */}
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

        {/* Content Render - ÁREA COM SCROLL INTERNO */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F8FAFC] overflow-x-hidden">
           {/* w-full garante que não passe da largura da viewport */}
           <div className="max-w-7xl mx-auto w-full h-full">
             {renderContent()}
           </div>
        </main>
      </div>
      
    </div>
  );
};

export default App;