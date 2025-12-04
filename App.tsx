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
  DollarSign
} from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import LoginScreen from './components/LoginScreen';
import { Screen, UserRegistrationData } from './types';

// Componentes Simples para as outras telas
const DashboardView = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
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
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
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
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
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
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-96 flex items-center justify-center">
      <div className="text-center text-slate-400">
        <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <p>Gráfico de desempenho financeiro será carregado aqui.</p>
      </div>
    </div>
  </div>
);

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
    // MUDANÇA: h-screen e overflow-hidden no container principal impede scroll da página inteira
    <div className="h-screen w-full flex bg-slate-50 font-sans overflow-hidden">
      
      {/* Sidebar Mobile Overlay - só aparece quando aberto */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Fixo no Desktop, Drawer no Mobile */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-[#0B1120] text-white transform transition-transform duration-300 ease-in-out 
          md:relative md:translate-x-0 md:flex md:flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Area */}
        <div className="p-6 md:p-8 flex items-center gap-3 font-bold text-2xl tracking-tighter text-white">
           <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
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

        {/* Navigation Menu - Scrollável se a tela for muito pequena verticalmente */}
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
                  w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }
                `}
              >
                <item.icon 
                  className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'}`} 
                  strokeWidth={1.5}
                />
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 mt-auto">
          <div className="mb-6 px-4">
             <div className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3">
               <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                 {currentUser.firstName[0]}{currentUser.lastName[0]}
               </div>
               <div className="overflow-hidden">
                 <p className="text-xs font-medium text-white truncate">{currentUser.firstName}</p>
                 <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
               </div>
             </div>
          </div>
          <div className="border-t border-slate-800 pt-6 px-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 text-slate-400 hover:text-red-400 w-full transition-colors group"
            >
              <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              <span className="font-medium text-sm">Sair do Sistema</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Header (Só aparece no mobile) */}
        <div className="md:hidden bg-[#0B1120] text-white p-4 flex justify-between items-center z-30 flex-none">
            <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
            <Truck className="h-5 w-5 text-blue-500" />
            <span>DRB LOGÍSTICA</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white">
            {sidebarOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* Top Navigation Bar - Fixo no topo do main content */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex-none flex items-center justify-between px-6 z-20 transition-all">
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
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F8FAFC]">
           <div className="max-w-7xl mx-auto w-full h-full">
             {renderContent()}
           </div>
        </main>
      </div>
      
    </div>
  );
};

export default App;