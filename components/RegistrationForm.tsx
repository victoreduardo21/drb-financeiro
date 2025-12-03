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
  MoreVertical,
  Trash2,
  Edit2,
  RefreshCw
} from 'lucide-react';

// URL agora importada de types.ts para garantir que login e cadastro usem o mesmo endpoint

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
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* SECTION 1: FORMULÁRIO */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Novo Cadastro</h2>
            <p className="text-sm text-slate-500 mt-1">Preencha os dados para adicionar um colaborador à planilha.</p>
          </div>
          <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <User className="h-5 w-5" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {notification && (
            <div className={`p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="font-medium">{notification.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                  placeholder="Ex: João"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Sobrenome</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                  placeholder="Ex: Silva"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                  placeholder="usuario@empresa.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Senha Provisória</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Setor de Atuação</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <select
                  name="sector"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white text-slate-900"
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

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 focus:ring-4 focus:ring-blue-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              {isSaving ? 'Salvando...' : 'Confirmar Cadastro'}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: LISTA DE USUÁRIOS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
             <div className="flex items-center gap-2">
               <h3 className="text-lg font-bold text-slate-800">Usuários Cadastrados</h3>
               <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {filteredUsers.length}
               </span>
             </div>
             <p className="text-sm text-slate-500">Gerencie os acessos do sistema</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchUsers} 
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Atualizar lista da planilha"
            >
              <RefreshCw className={`h-5 w-5 ${isLoadingList ? 'animate-spin text-blue-600' : ''}`} />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar por nome ou email..." 
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full md:w-64 bg-white text-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[200px]">
          {isLoadingList ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400 animate-pulse">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p className="text-sm">Buscando dados na planilha...</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-6 py-4">Colaborador</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Setor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase">
                            {user.firstName ? user.firstName[0] : '?'}{user.lastName ? user.lastName[0] : '?'}
                          </div>
                          <span className="font-medium text-slate-900">{user.firstName} {user.lastName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          user.sector === Sector.FINANCE 
                            ? 'bg-blue-50 text-blue-700 border-blue-200' 
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {user.sector}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar (Em breve)">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remover (Requer implementação no Script)">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      {searchTerm ? 'Nenhum usuário encontrado com este termo.' : 'Nenhum usuário cadastrado na planilha ainda.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;