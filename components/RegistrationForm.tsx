import React, { useState, useEffect } from 'react';
import { Sector, UserRegistrationData, GOOGLE_SCRIPT_URL } from '../types';
import { 
  Save, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  Lock,
  Briefcase,
  Search,
  Trash2,
  Edit2,
  RefreshCw
} from 'lucide-react';

const RegistrationForm: React.FC = () => {
  // Estado inicial vazio
  const [users, setUsers] = useState<UserRegistrationData[]>([]);
  // Estado para busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para controlar o carregamento da lista
  const [isLoadingList, setIsLoadingList] = useState(true);

  const [formData, setFormData] = useState<UserRegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    sector: Sector.FINANCE,
    status: 'Ativo',
    createdAt: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // BUSCAR DADOS DA PLANILHA AO INICIAR
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoadingList(true);
    try {
      // Adiciona 'type=users' para diferenciar da tabela de terminais
      // Adiciona timestamp para evitar cache do navegador (nocache)
      const urlWithParams = `${GOOGLE_SCRIPT_URL}?type=users&nocache=${new Date().getTime()}`;
      
      const response = await fetch(urlWithParams);
      const data = await response.json();

      // Verifica se retornou um array
      if (Array.isArray(data)) {
        // Mapeia os dados da planilha (que vêm com chaves em MAIÚSCULO do Google Script) 
        // para o formato do nosso sistema
        const mappedUsers: UserRegistrationData[] = data.map((item: any) => ({
          id: item.ID ? String(item.ID) : Math.random().toString(),
          firstName: item.NOME || '',
          lastName: item.SOBRENOME || '',
          email: item.EMAIL || '',
          password: item.SENHA || '***',
          sector: (item.SETOR as Sector) || Sector.FINANCE,
          status: item.STATUS || 'Ativo',
          createdAt: item.DATA_CRIACAO ? new Date(item.DATA_CRIACAO).toISOString().split('T')[0] : ''
        }));
        
        // Filtra linhas inválidas (que não tenham pelo menos email ou nome)
        const validUsers = mappedUsers.filter(u => u.email || u.firstName);
        
        // Inverte a ordem para mostrar os mais recentes primeiro
        setUsers(validUsers.reverse());
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setNotification(null);

    if (!GOOGLE_SCRIPT_URL) {
      setNotification({ type: 'error', message: 'ERRO: URL da API não configurada.' });
      setIsSaving(false);
      return;
    }

    try {
      // Adiciona type=users na URL do POST também para o script saber
      const postUrl = `${GOOGLE_SCRIPT_URL}?type=users`;

      // Envia os dados para a planilha
      const response = await fetch(postUrl, {
        method: 'POST',
        // O body deve ser stringify, e o fetch usará text/plain por padrão para evitar preflight CORS complexo com GAS
        body: JSON.stringify({ ...formData, type: 'users' }), // Envia type no body também por garantia
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Adiciona o novo usuário na lista local imediatamente para não precisar recarregar
        const newUser: UserRegistrationData = {
          ...formData,
          id: data.id || Math.random().toString(36),
          createdAt: new Date().toISOString().split('T')[0]
        };

        setUsers(prev => [newUser, ...prev]);
        setNotification({ type: 'success', message: 'Usuário salvo na planilha com sucesso!' });
        
        // Limpar formulário
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          sector: Sector.FINANCE,
          status: 'Ativo',
          createdAt: ''
        });
      } else {
        throw new Error(data.message || 'Erro desconhecido ao salvar.');
      }

    } catch (error) {
      console.error('Erro ao salvar:', error);
      setNotification({ type: 'error', message: 'Erro ao conectar com a planilha.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Lógica de Filtro
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    // Alteração de lg:flex-row para manter mobile em coluna. lg:h-full para desktop.
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 lg:h-full">
      
      {/* SECTION 1: FORMULÁRIO (Lado Esquerdo no Desktop) */}
      <div className="w-full lg:w-1/3 flex-none">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:sticky lg:top-0">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
                <h2 className="text-lg font-bold text-slate-800">Novo Cadastro</h2>
                <p className="text-xs text-slate-500 mt-0.5">Adicionar colaborador.</p>
            </div>
            <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <User className="h-4 w-4" />
            </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {notification && (
                <div className={`p-3 rounded-lg flex items-start gap-2 text-sm ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {notification.type === 'success' ? <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" /> : <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />}
                <span className="font-medium">{notification.message}</span>
                </div>
            )}

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nome</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 lg:top-2.5 h-4 w-4 text-slate-400" />
                            <input
                            type="text"
                            name="firstName"
                            required
                            /* MUDANÇA: text-base no mobile (16px) previne zoom no iOS. lg:text-sm volta ao normal no desktop */
                            className="w-full pl-9 pr-3 py-2.5 lg:py-2 text-base lg:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                            placeholder="Nome"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sobrenome</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            className="w-full px-3 py-2.5 lg:py-2 text-base lg:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                            placeholder="Sobrenome"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Corporativo</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 lg:top-2.5 h-4 w-4 text-slate-400" />
                    <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-9 pr-3 py-2.5 lg:py-2 text-base lg:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                    placeholder="usuario@drblogistica.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </div>
                </div>

                <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Senha Provisória</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 lg:top-2.5 h-4 w-4 text-slate-400" />
                    <input
                    type="password"
                    name="password"
                    required
                    className="w-full pl-9 pr-3 py-2.5 lg:py-2 text-base lg:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    />
                </div>
                </div>

                <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Setor</label>
                <div className="relative">
                    <Briefcase className="absolute left-3 top-3 lg:top-2.5 h-4 w-4 text-slate-400" />
                    <select
                    name="sector"
                    className="w-full pl-9 pr-3 py-2.5 lg:py-2 text-base lg:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white text-slate-900"
                    value={formData.sector}
                    onChange={handleInputChange}
                    >
                    {Object.values(Sector).map((sec) => (
                        <option key={sec} value={sec}>{sec}</option>
                    ))}
                    </select>
                </div>
                </div>
            </div>

            <div className="pt-2">
                <button
                type="submit"
                disabled={isSaving}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 lg:py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 focus:ring-4 focus:ring-blue-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isSaving ? 'Salvando...' : 'Confirmar Cadastro'}
                </button>
            </div>
            </form>
        </div>
      </div>

      {/* SECTION 2: LISTA DE USUÁRIOS (Lado Direito no Desktop) */}
      <div className="w-full lg:w-2/3 flex-grow min-w-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:h-full flex flex-col min-h-[500px]">
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-none">
            <div>
                <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">Usuários</h3>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {filteredUsers.length}
                </span>
                </div>
            </div>
            
            {/* Barra de Busca Adaptável */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <button 
                onClick={fetchUsers} 
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-none flex items-center justify-center sm:justify-start"
                title="Atualizar lista"
                >
                <RefreshCw className={`h-4 w-4 ${isLoadingList ? 'animate-spin text-blue-600' : ''}`} />
                <span className="ml-2 sm:hidden text-sm">Atualizar</span>
                </button>
                <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="pl-9 pr-4 py-2.5 lg:py-2 rounded-lg border border-slate-200 text-base lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-48 bg-white text-slate-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>
            </div>

            <div className="overflow-x-auto flex-1 custom-scrollbar w-full">
            {isLoadingList ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-pulse min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p className="text-sm">Carregando...</p>
                </div>
            ) : (
                // MUDANÇA: Adicionado min-w-[700px] para forçar scroll horizontal no mobile.
                <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 sticky top-0 z-10">
                    <tr>
                    <th className="px-6 py-3 bg-slate-50">Nome</th>
                    <th className="px-6 py-3 bg-slate-50">Email</th>
                    <th className="px-6 py-3 bg-slate-50">Setor</th>
                    <th className="px-6 py-3 bg-slate-50">Status</th>
                    <th className="px-6 py-3 bg-slate-50 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-[10px] uppercase">
                                {user.firstName ? user.firstName[0] : '?'}{user.lastName ? user.lastName[0] : '?'}
                            </div>
                            <span className="font-medium text-slate-900 truncate max-w-[120px]" title={`${user.firstName} ${user.lastName}`}>
                                {user.firstName} {user.lastName}
                            </span>
                            </div>
                        </td>
                        <td className="px-6 py-3 truncate max-w-[150px]" title={user.email}>{user.email}</td>
                        <td className="px-6 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            user.sector === Sector.FINANCE 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-orange-50 text-orange-700 border-orange-200'
                            }`}>
                            {user.sector}
                            </span>
                        </td>
                        <td className="px-6 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            user.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {user.status}
                            </span>
                        </td>
                        <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        {searchTerm ? 'Nenhum usuário encontrado.' : 'Lista vazia.'}
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;