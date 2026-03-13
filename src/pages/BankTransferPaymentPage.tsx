// BankTransferPaymentPage.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn button
import { useNavigate, useParams } from "react-router";
import { PaymentEncryptor } from "@/lib/PaymentEncryptor";
import type { Session } from "@/Types";
import { makePayment } from "@/lib/api";
import { useAuth, useUser } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function BankTransferPaymentPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { code } = useParams(); // Get :code from path
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [sessionInfo] = useState<Session | null>(() => {
    if (!code) return null;
    return PaymentEncryptor.decrypt<Session>(code);
  });

  const router = useNavigate();

  if (!sessionInfo) return <div>Invalid Session</div>;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleConfirmPayment = async () => {
    if (file) {
      console.log("Confirming payment with file:", file.name);
      // Here you would implement your logic to upload the file
      // e.g., using a FormData object and a fetch request to your backend

      if (!user) return;
      const token = await getToken({ template: "skill-mentor-backend" });
      if (!token) return;

      try {
        if (isSignedIn && isLoaded) {
          setIsLoading(true);
          const res = await makePayment({
            file: file,
            id: sessionInfo.sessionId,
            token: token,
          });

          console.log(res);
          toast.success("Payment slip uploaded successfully.")
          router("/dashboard");
        }
      } catch (error) {
        toast.error("something went wrong try again later.")
        console.log(error);
      }finally{
        setIsLoading(false);
      }

    } else {
      console.warn("Please choose a file first.");
      alert("Please choose a file before confirming payment.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-[650px] bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Upload Bank Transfer Slip
        </h1>

        <div className="w-full space-y-4 mb-6 text-gray-800">
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Session with:</span>{" "}
            {sessionInfo.mentorName}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Session Date:</span>{" "}
            {sessionInfo.sessionDate}
          </p>
        </div>

        <div className="w-full mb-6">
          <label
            htmlFor="transferSlip"
            className="block text-sm font-semibold mb-2 text-gray-700"
          >
            Bank Transfer Slip
          </label>
          <div className="relative">
            <input
              type="file"
              id="transferSlip"
              className="sr-only peer" // Hide original input, still accessible
              onChange={handleFileChange}
              accept="image/*" // Restrict to images
            />
            <label
              htmlFor="transferSlip"
              className={`flex items-center justify-between w-full p-4 border-2 border-dashed rounded-lg cursor-pointer text-gray-600 transition hover:border-[#4bbeff] hover:bg-gray-50 peer-focus:ring-2 peer-focus:ring-[#4bbeff] peer-focus:ring-offset-2 ${
                file ? "bg-gray-50 border-[#4bbeff]" : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block px-4 py-1.5 text-xs font-semibold rounded-full ${
                    file
                      ? "bg-[#4bbeff] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Choose File
                </span>
                <span className="text-sm truncate">
                  {file ? file.name : "No file chosen"}
                </span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </label>
          </div>
        </div>

        <p className="text-sm text-center text-gray-600 mb-8 max-w-lg">
          Please upload a clear image of your bank transfer slip to confirm your
          payment.
        </p>

        <Button
          className="w-full bg-[#fbd581] text-gray-900 font-bold py-3 text-base shadow hover:bg-[#fcc85b] active:scale-[0.98]"
          disabled={!file}
          onClick={handleConfirmPayment}
        >
          {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Confirm Payment"
      )}
        </Button>
      </div>
    </div>
  );
}
