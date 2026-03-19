import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Clock, 
  PlusCircle,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router';

const AdminDashboard = () => {
  // Mock Data for Analytics
  const stats = [
    { title: "Total Revenue", value: "$4,250.00", icon: <DollarSign className="text-green-600" />, trend: "+12%" },
    { title: "Active Mentors", value: "24", icon: <Users className="text-blue-600" />, trend: "+2" },
    { title: "Total Bookings", value: "142", icon: <BookOpen className="text-purple-600" />, trend: "+18%" },
    { title: "Pending Payments", value: "8", icon: <Clock className="text-amber-600" />, trend: "Action Required" },
  ];

  const recentBookings = [
    { id: "BK-102", student: "Amara Silva", mentor: "Dr. Kasun", subject: "Java Design Patterns", status: "Pending", date: "2026-03-12" },
    { id: "BK-101", student: "Ranil Perera", mentor: "Sarah Chen", subject: "React Hooks", status: "Confirmed", date: "2026-03-11" },
    { id: "BK-100", student: "Nimali Fonseka", mentor: "Dr. Kasun", subject: "Spring Security", status: "Completed", date: "2026-03-10" },
  ];

  return (
    <div className="flex w-full lg:w-7xl">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex flex-col w-full p-8">
        <header className="flex w-full justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Analytics Overview</h2>
            <p className="text-slate-500 text-sm">Welcome back, Admin. Here is what's happening today.</p>
          </div>
          <Link to={"/admin/subject"}>
          <button className="hidden lg:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <PlusCircle size={18} /> New Subject
          </button>
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${i === 3 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="font-bold text-slate-800">Recent Booking Requests</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{booking.student}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{booking.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        booking.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 
                        booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:underline font-medium">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Platform Performance */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">Engagement Rate</h3>
            <div className="flex items-center gap-4 mb-6 text-green-600">
              <TrendingUp size={32} />
              <div>
                <p className="text-2xl font-bold">84%</p>
                <p className="text-xs text-slate-500">Avg. Session Completion</p>
              </div>
            </div>
            <div className="space-y-4">
              <ProgressItem label="Java Development" value={90} color="bg-blue-500" />
              <ProgressItem label="React & TS" value={75} color="bg-purple-500" />
              <ProgressItem label="Database Design" value={60} color="bg-amber-500" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};



const ProgressItem = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-slate-600 font-medium">{label}</span>
      <span className="text-slate-400">{value}%</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full">
      <div className={`${color} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default AdminDashboard;