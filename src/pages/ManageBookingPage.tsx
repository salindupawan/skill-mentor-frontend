import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  X, 
  Eye, 
  CreditCard 
} from 'lucide-react';

// 1. Define the Booking Interface
interface Booking {
  id: string;
  student: string;
  mentor: string;
  subject: string;
  date: string;
  time: string;
  paymentStatus: 'Pending' | 'Confirmed';
  sessionStatus: 'Pending' | 'Confirmed' | 'Completed';
  proofUrl: string;
}

const BookingManagement: React.FC = () => {
  // 2. State Management with Types
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock Data typed as Booking[]
  const [bookings, setBookings] = useState<Booking[]>([
    { 
      id: "SESS-001", 
      student: "Amara Silva", 
      mentor: "Dr. Kasun", 
      subject: "Java Design Patterns", 
      date: "2026-03-20", 
      time: "10:00 AM", 
      paymentStatus: "Pending", 
      sessionStatus: "Pending", 
      proofUrl: "https://placehold.co/400x600?text=Bank+Slip+Sample+1" 
    },
    { 
      id: "SESS-002", 
      student: "Ranil Perera", 
      mentor: "Sarah Chen", 
      subject: "React Hooks", 
      date: "2026-03-18", 
      time: "02:30 PM", 
      paymentStatus: "Confirmed", 
      sessionStatus: "Confirmed", 
      proofUrl: "https://placehold.co/400x600?text=Bank+Slip+Sample+2" 
    },
    { 
      id: "SESS-003", 
      student: "Nimali Fonseka", 
      mentor: "Dr. Kasun", 
      subject: "Spring Security", 
      date: "2026-03-15", 
      time: "09:00 AM", 
      paymentStatus: "Confirmed", 
      sessionStatus: "Completed", 
      proofUrl: "https://placehold.co/400x600?text=Bank+Slip+Sample+3" 
    },
  ]);

  // 3. Sorting & Filtering Logic
  const filteredAndSortedBookings = useMemo(() => {
    return bookings
      .filter((b: Booking) => {
        const matchesSearch = 
          b.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
          b.mentor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || b.paymentStatus === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a: Booking, b: Booking) => {
        if (a.paymentStatus === "Pending" && b.paymentStatus !== "Pending") return -1;
        if (a.paymentStatus !== "Pending" && b.paymentStatus === "Pending") return 1;
        return 0;
      });
  }, [bookings, searchTerm, filterStatus]);

  const handleApprove = (id: string) => {
    setBookings((prev) => 
      prev.map((b) => 
        b.id === id ? { ...b, paymentStatus: "Confirmed", sessionStatus: "Confirmed" } : b
      )
    );
  };

  return (
    <div className="p-4 md:p-8 sm:w-full lg:w-7xl min-h-screen font-sans">
      <div className="w-full mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Booking & Payments</h1>
          <p className="text-slate-500">Manage enrollments and verify bank transfers.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by student or mentor name..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white transition shadow-sm"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white font-medium outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={filterStatus}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Payments</option>
            <option value="Pending">Pending Only</option>
            <option value="Confirmed">Confirmed Only</option>
          </select>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Student / Mentor</th>
                  <th className="px-6 py-4">Session Details</th>
                  <th className="px-6 py-4 text-center">Payment Proof</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {booking.student.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-800 truncate">{booking.student}</div>
                          <div className="text-xs text-slate-500 truncate">Mentor: {booking.mentor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-700">{booking.subject}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Calendar size={12} /> {booking.date} at {booking.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedImage(booking.proofUrl)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                      >
                        <Eye size={14} /> View Slip
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        booking.paymentStatus === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {booking.paymentStatus === 'Pending' ? (
                        <button 
                          onClick={() => handleApprove(booking.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-md shadow-emerald-100 whitespace-nowrap"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs italic font-medium">Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSortedBookings.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-medium">No bookings found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- BANK SLIP MODAL --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" />
                Payment Proof
              </h3>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-1 hover:bg-slate-100 rounded-full transition text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-2 bg-slate-50 flex justify-center">
              <img 
                src={selectedImage} 
                alt="Bank Slip" 
                className="max-h-[70vh] rounded-lg shadow-sm object-contain"
              />
            </div>

            <div className="p-4 bg-white text-center">
              <button 
                onClick={() => setSelectedImage(null)}
                className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;