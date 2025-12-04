import React, { useState } from 'react';
import { Truck, Loader2, AlertCircle, Lock, Mail, ArrowRight } from 'lucide-react';
import { UserRegistrationData, GOOGLE_SCRIPT_URL, Sector } from '../types';

interface LoginScreenProps {
  onLogin: (user: UserRegistrationData) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Busca todos os usuários da planilha
      // Adicionamos 'type=users' para o script saber que queremos a aba de usuários e não de Terminais
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?type=users&nocache=${new Date().getTime()}`);
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Erro ao conectar com o banco de dados.");
      }

      // 2. Procura o usuário correspondente
      // Nota: O Google Script retorna as chaves em MAIÚSCULO (ex: EMAIL, SENHA)
      const userFound = data.find((row: any) => {
        const rowEmail = row.EMAIL ? String(row.EMAIL).trim().toLowerCase() : '';
        const rowPass = row.SENHA ? String(row.SENHA).trim() : '';
        
        return rowEmail === email.trim().toLowerCase() && rowPass === password;
      });

      if (userFound) {
        // 3. Mapeia para o formato do sistema e loga
        const userData: UserRegistrationData = {
          id: userFound.ID,
          firstName: userFound.NOME,
          lastName: userFound.SOBRENOME,
          email: userFound.EMAIL,
          password: userFound.SENHA, // Em produção, não deveríamos trafegar a senha de volta, mas para este MVP funciona
          sector: (userFound.SETOR as Sector) || Sector.FINANCE,
          status: userFound.STATUS || 'Ativo',
          createdAt: userFound.DATA_CRIACAO
        };

        if (userData.status !== 'Ativo') {
          setError('Este usuário está inativo. Contate o administrador.');
        } else {
          onLogin(userData);
        }
      } else {
        setError('E-mail ou senha incorretos.');
      }

    } catch (err) {
      console.error(err);
      setError('Erro de conexão. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      
      {/* Lado Esquerdo - Branding com Efeito de Claridade (Spotlight) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#020617] relative overflow-hidden flex-col justify-between p-12 text-white">
        
        {/* CONFIGURAÇÃO DA CLARIDADE (LUZ) */}
        {/* 1. Gradiente de fundo suave saindo do canto superior esquerdo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/30 via-[#020617] to-[#020617] z-0"></div>
        
        {/* 2. O ponto de luz forte (Spotlight) com blur alto */}
        <div className="absolute -top-[150px] -left-[150px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 font-bold text-3xl tracking-wide">
             <div className="h-14 w-14 bg-blue-600/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
               <Truck className="h-8 w-8 text-white" />
             </div>
             <span>DRB Logística</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg mt-12">
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Sistema Financeiro <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Inteligente
            </span>
          </h1>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Controle total de receitas, despesas de frota e gestão de pessoal da DRB Logística. Otimize seu fluxo de caixa com dados em tempo real.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-600 font-medium">
          © {new Date().getFullYear()} GTS - Global Tech Software. Todos os direitos reservados.
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white lg:bg-transparent">
        <div className="w-full max-w-sm lg:max-w-md space-y-8 animate-in slide-in-from-right duration-700">
          
          <div className="text-center lg:text-left">
            
            {/* CABEÇALHO EXCLUSIVO MOBILE: Estruturado e Arrumado */}
            <div className="lg:hidden flex flex-col items-center mb-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Truck className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">DRB Logística</span>
              </div>
              <div className="px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Sistema Financeiro</span>
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Bem-vindo</h2>
            <p className="mt-2 text-slate-500 text-sm lg:text-base">Insira suas credenciais para acessar o painel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Corporativo</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 lg:top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    /* Text-base no mobile previne zoom */
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-base lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400 shadow-sm"
                    placeholder="nome@drblogistica.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Senha</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 lg:top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-base lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-600">Lembrar-me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-blue-600/30 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Acessar Painel</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
             <p className="text-xs text-slate-400">Acesso restrito a colaboradores autorizados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;