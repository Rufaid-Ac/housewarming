import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, Users, UserCheck, UserX, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  const fetchData = async () => {
    try {
      const [statsRes, rsvpsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/rsvps', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (statsRes.status === 401 || rsvpsRes.status === 401) {
        handleLogout();
        return;
      }

      const statsData = await statsRes.json();
      const rsvpsData = await rsvpsRes.json();

      setStats(statsData);
      setRsvps(rsvpsData);
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this RSVP?')) return;
    
    try {
      const res = await fetch(`/api/admin/rsvp/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete RSVP', error);
    }
  };

  const downloadCSV = () => {
    const headers = ['Name,Attending,Guests,Message,Date'];
    const rows = rsvps.map(r => 
      `"${r.name}",${r.attendance ? 'Yes' : 'No'},${r.guestCount},"${r.message || ''}","${new Date(r.createdAt).toLocaleString()}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "rsvps.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <div className="min-h-screen bg-[#F7F2E8] flex items-center justify-center text-[#263127]">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#263127] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-4 border-b border-[#263127]/10">
          <div>
            <h1 className="text-3xl font-serif text-[#263127] mb-1">Admin Dashboard</h1>
            <p className="text-sm text-[#263127]/60">AALAM Housewarming RSVPs</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={downloadCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-[#263127] text-[#B59A62] text-sm rounded hover:bg-[#1e271f] transition-colors"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 border border-[#263127]/20 text-[#263127] text-sm rounded hover:bg-[#263127]/5 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow-sm border border-[#263127]/5">
            <div className="flex items-center space-x-3 mb-2 text-[#263127]/60">
              <Users size={20} />
              <h3 className="font-bold text-sm uppercase tracking-wider">Total Responses</h3>
            </div>
            <p className="text-4xl font-serif text-[#263127]">{stats?.totalResponses || 0}</p>
          </div>
          <div className="bg-white p-6 rounded shadow-sm border border-[#263127]/5">
            <div className="flex items-center space-x-3 mb-2 text-green-600/80">
              <UserCheck size={20} />
              <h3 className="font-bold text-sm uppercase tracking-wider">Attending</h3>
            </div>
            <p className="text-4xl font-serif text-[#263127]">{stats?.attending || 0}</p>
          </div>
          <div className="bg-white p-6 rounded shadow-sm border border-[#263127]/5">
            <div className="flex items-center space-x-3 mb-2 text-red-600/80">
              <UserX size={20} />
              <h3 className="font-bold text-sm uppercase tracking-wider">Not Attending</h3>
            </div>
            <p className="text-4xl font-serif text-[#263127]">{stats?.notAttending || 0}</p>
          </div>
          <div className="bg-[#B59A62]/10 p-6 rounded shadow-sm border border-[#B59A62]/30">
            <div className="flex items-center space-x-3 mb-2 text-[#263127]">
              <Users size={20} />
              <h3 className="font-bold text-sm uppercase tracking-wider">Total Guests</h3>
            </div>
            <p className="text-4xl font-serif text-[#263127]">{stats?.totalGuests || 0}</p>
          </div>
        </div>

        {/* RSVPs Table */}
        <div className="bg-white rounded shadow-sm border border-[#263127]/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#263127]/5 border-b border-[#263127]/10">
                  <th className="p-4 text-xs font-bold text-[#263127] uppercase tracking-wider">Name</th>
                  <th className="p-4 text-xs font-bold text-[#263127] uppercase tracking-wider">Attendance</th>
                  <th className="p-4 text-xs font-bold text-[#263127] uppercase tracking-wider">Guests</th>
                  <th className="p-4 text-xs font-bold text-[#263127] uppercase tracking-wider">Message</th>
                  <th className="p-4 text-xs font-bold text-[#263127] uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-[#263127] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-[#263127]/50">No RSVPs yet.</td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b border-[#263127]/5 hover:bg-[#263127]/[0.02] transition-colors">
                      <td className="p-4 font-medium text-[#263127]">{rsvp.name}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${rsvp.attendance ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rsvp.attendance ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="p-4">{rsvp.guestCount}</td>
                      <td className="p-4 text-sm text-[#263127]/70 truncate max-w-xs">{rsvp.message || '-'}</td>
                      <td className="p-4 text-sm text-[#263127]/60">{new Date(rsvp.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(rsvp.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          title="Delete RSVP"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
