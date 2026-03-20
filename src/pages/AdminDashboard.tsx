import { getAnalytics } from "@/lib/api";
import type { AnalyticsData } from "@/Types";
import { useAuth } from "@clerk/react";
import {
  Users,
  BookOpen,
  Clock,
  PlusCircle,
  TrendingUp,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const AdminDashboard = () => {
  const { getToken } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const colours = ["bg-green-500", "bg-blue-500", "bg-purple-500"];


  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      try {
        const data = await getAnalytics(token);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, [getToken]);

  const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
  );
  const stats = [
    {
      title: "Total Students",
      value: analyticsData ? analyticsData.totalStudents.toString() : "",
      icon: <Users className="text-green-600" />,
    },
    {
      title: "Active Mentors",
      value: analyticsData ? analyticsData.activeMentors.toString() : "",
      icon: <User className="text-blue-600" />,
    },
    {
      title: "Total Bookings",
      value: analyticsData ? analyticsData.totalBookings.toString() : "",
      icon: <BookOpen className="text-purple-600" />,
    },
    {
      title: "Pending Payments",
      value: analyticsData ? analyticsData.pendingPayments.toString() : "",
      icon: <Clock className="text-amber-600" />,
      trend: "Action Required",
    },
  ];

  return (
    <div className="flex w-full lg:w-7xl">
      <main className="flex flex-col w-full p-8">
        <header className="flex w-full justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Analytics Overview
            </h2>
            <p className="text-slate-500 text-sm">
              Welcome back, Admin. Here is what's happening today.
            </p>
          </div>
          <Link to={"/admin/subject"}>
            <button className="hidden lg:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <PlusCircle size={18} /> New Subject
            </button>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {(isLoading ? Array(4).fill({}) : stats).map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  {isLoading ? <Skeleton className="h-6 w-6" /> : stat.icon}
                </div>
                {!isLoading && stat.trend && stat.value != "0" && (
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${i === 3 ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"}`}
                  >
                    {stat.trend}
                  </span>
                )}
              </div>
              <h3 className="text-slate-500 text-sm font-medium">
                {isLoading ? (
                  <Skeleton className="h-4 w-44 mb-2" />
                ) : (
                  stat.title
                )}
              </h3>
              <div className="text-2xl font-bold text-slate-900">
                {isLoading ? <Skeleton className="h-8 w-16" /> : stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="font-bold text-slate-800">
                Recent Booking Requests
              </h3>
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
                {(!analyticsData
                  ? Array(5).fill({})
                  : analyticsData.recentBookings
                ).map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {isLoading ? (
                        <Skeleton className="h-4 w-24 mb-2" />
                      ) : (
                        booking.studentName
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {isLoading ? (
                        <Skeleton className="h-4 w-24 mb-2" />
                      ) : (
                        booking.subjectName
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isLoading ? (
                        <Skeleton className="h-4 w-24 mb-2" />
                      ) : (
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            booking.paymentStatus === "PENDING"
                              ? "bg-amber-100 text-amber-600"
                              : booking.paymentStatus === "APPROVED"
                                ? "bg-green-100 text-green-600"
                                : "bg-green-100 text-red-600"
                          }`}
                        >
                          {booking.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {isLoading ? (
                        <Skeleton className="h-4 w-16 mb-2" />
                      ) : (
                        <Link
                          to={`/admin/booking`}
                          className="text-blue-600 hover:underline"
                        >
                          <button className="text-blue-600 hover:underline font-medium">
                            Review
                          </button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4">Top Performing Subjects</h3>
            {
              analyticsData ? (
                <div className="flex items-center gap-4 mb-6 text-green-600">
              <TrendingUp size={32} />
              <div>
                <p className="text-2xl font-bold">84%</p>
                <p className="text-xs text-slate-500">
                  This Month Enrollments
                </p>
              </div>
            </div>
              ):(
                <Skeleton className="h-10 w-44 mb-4 mt-6" />
              )
            }
            <div className="space-y-4">
              {analyticsData
                ? analyticsData.topEnrollments.map((subject, i) => (
                    <ProgressItem
                      key={i}
                      label={subject.subjectName}
                      value={Math.round(
                        (subject.count / analyticsData.totalBookings) * 100,
                      )}
                      color={colours[i % colours.length]}
                    />
                  ))
                : Array(3)
                    .fill({})
                    .map((_, i) => (
                      <>
                        <Skeleton key={i} className="h-3 w-44 mb-1" />
                        <Skeleton key={i} className="h-3 w-full mb-3" />
                      </>
                    ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProgressItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-slate-600 font-medium">{label}</span>
      <span className="text-slate-400">{value}%</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full">
      <div
        className={`${color} h-2 rounded-full`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export default AdminDashboard;
