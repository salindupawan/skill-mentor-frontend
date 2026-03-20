import React, { useState, useMemo, useEffect } from "react";
import { Search, Calendar, X, Eye, CreditCard } from "lucide-react";
import type { Session } from "@/Types";
import { getAllSessions, updateSession } from "@/lib/api";
import { useAuth } from "@clerk/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const BookingManagement: React.FC = () => {
  // 2. State Management with Types
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [approve, setApprove] = useState<number>(0);
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Mock Data typed as Booking[]
  const [bookings, setBookings] = useState<Session[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchBookings = async () => {
      const token = await getToken({ template: "skill-mentor-backend" });

      if (!token) return;
      const data = await getAllSessions(token);
      console.log("Fetched Bookings:", data);
      setBookings(data);
    };
    fetchBookings();
  }, [getToken]);

  const handlPaymentSlipView = (imageUrl: string) => {
    if (!imageUrl) {
      toast.error("No payment proof available");
      return;
    }
    setIsImageLoading(true);
    setSelectedImage(imageUrl);
  };

  const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
  );

  // 3. Sorting & Filtering Logic
  const filteredAndSortedBookings = useMemo(() => {
    return bookings
      .filter((b: Session) => {
        const matchesSearch =
          b.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.mentorName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          filterStatus === "All" || b.PaymentStatus === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a: Session, b: Session) => {
        if (a.PaymentStatus === "PENDING" && b.PaymentStatus !== "PENDING")
          return -1;
        if (a.PaymentStatus !== "PENDING" && b.PaymentStatus === "PENDING")
          return 1;
        return 0;
      });
  }, [bookings, searchTerm, filterStatus]);

  const handleApprove = async (id: number, meetingLink: string) => {
    // Here you would call your API to update the session status and meeting link
    setIsLoading(true);
    try {
      const token = await getToken({ template: "skill-mentor-backend" });
      if (!token) {
        toast.error("Authentication required");
        return;
      }
      const sess = await updateSession(
        token,
        { meetingLink: meetingLink, paymentStatus: "APPROVED" },
        id,
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.sessionId === id ? { ...b, PaymentStatus: sess.PaymentStatus } : b,
        ),
      );
      toast.success("Session approved successfully");
    } catch (error) {
      console.error("Error approving session:", error);
      toast.error("Failed to approve session. Please try again.");
    } finally {
      setApprove(0);
      setMeetingLink("");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 sm:w-full lg:w-6xl min-h-screen font-sans">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Booking & Payments
          </h1>
          <p className="text-slate-500">
            Manage enrollments and verify bank transfers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by student or mentor name..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white transition shadow-sm"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          <select
            className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white font-medium outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={filterStatus}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilterStatus(e.target.value)
            }
          >
            <option value="All">All Payments</option>
            <option value="PENDING">Pending Only</option>
            <option value="APPROVED">Confirmed Only</option>
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
                  <tr
                    key={booking.sessionId}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {booking.studentName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-800 truncate">
                            {booking.studentName}
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            Mentor: {booking.mentorName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-700">
                        {booking.sessionTitle}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Calendar size={12} /> {booking.sessionDate} at{" "}
                        {booking.startTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          handlPaymentSlipView(booking.paymentProofLink)
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                      >
                        <Eye size={14} /> View Slip
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          booking.PaymentStatus === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {booking.PaymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {booking.PaymentStatus === "PENDING" ? (
                        <button
                          onClick={() => setApprove(booking.sessionId)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-md shadow-emerald-100 whitespace-nowrap"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs italic font-medium">
                          Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedBookings.length === 0 && bookings.length === 0 ? (
            <>
              <div className="p-4 flex flex-col items-center justify-center gap-4">
                {
                  Array.from({ length: 8 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-10 w-full" />
                  ))
                }

              </div>
            </>
          ) : filteredAndSortedBookings.length === 0 &&(
            <div className="p-20 text-center">
              <p className="text-slate-400 font-medium">
                No bookings found. Try adjusting your search or filter criteria.
              </p>
            </div>)
          }
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
                onClick={() => {
                  setSelectedImage(null);
                }}
                className="p-1 hover:bg-slate-100 rounded-full transition text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-2 bg-slate-50 flex justify-center min-h-[300px] relative">
              {isImageLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50">
                  <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-2 text-xs text-slate-500 font-medium">
                    Loading image...
                  </p>
                </div>
              )}
              <img
                src={selectedImage}
                alt="Bank Slip"
                className={`max-h-[70vh] rounded-lg shadow-sm object-contain transition-opacity duration-300 ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageLoading(false);
                  toast.error("Failed to load image");
                }}
              />
            </div>

            <div className="p-4 bg-white text-center">
              <button
                onClick={() => {
                  setSelectedImage(null);
                }}
                className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- APPROVE MODAL --- */}
      {approve > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Calendar size={18} className="text-emerald-600" />
                Approve Session & Set Link
              </h3>
              <button
                onClick={() => {
                  setApprove(0);
                }}
                className="p-1 hover:bg-slate-100 rounded-full transition text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 bg-slate-50">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Meeting Link (Zoom, Google Meet, etc.)
              </label>
              <input
                type="url"
                placeholder="https://meet.google.com/abc-defg-hij"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white transition shadow-sm"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
              <p className="mt-2 text-[11px] text-slate-500">
                The student will receive this link to join the session.
              </p>
            </div>

            <div className="p-4 bg-white flex gap-3">
              <Button
                onClick={() => {
                  setApprove(0);
                  setMeetingLink("");
                }}
                className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => {
                  // Validation: Check if it's a valid-ish URL
                  if (!meetingLink.startsWith("http")) {
                    toast.error(
                      "Please enter a valid URL starting with http:// or https://",
                    );
                    return;
                  }

                  // Call your update function
                  handleApprove(approve, meetingLink);

                  // Reset and close
                }}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
              >
                {isLoading ? "Processing..." : "Confirm Approval"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
