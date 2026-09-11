import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#263127] p-6">
      <div className="max-w-sm w-full bg-[#F7F2E8] p-8 rounded shadow-2xl border border-[#B59A62]/30">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-[#263127] mb-2">Admin Portal</h2>
          <p className="text-[#263127]/60 text-xs tracking-widest uppercase">AALAM Housewarming</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#263127] uppercase tracking-widest mb-2">Username</label>
            <input
              type="text"
              required
              className="w-full border-b border-[#263127]/20 py-2 bg-transparent focus:outline-none focus:border-[#B59A62] text-[#263127]"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#263127] uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full border-b border-[#263127]/20 py-2 bg-transparent focus:outline-none focus:border-[#B59A62] text-[#263127]"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#B59A62] text-[#263127] font-bold text-sm tracking-widest uppercase hover:bg-[#D4C397] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
