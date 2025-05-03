import React from 'react';
import { Link } from 'react-router';
import { XCircle } from 'lucide-react';

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <XCircle size={80} className="text-red-600 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
      <p className="text-gray-700 mb-6">Your payment was not completed. You can try again later.</p>
      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentCancel;
