import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PaginationControls from "../../components/Dashboard/PaginationControls";
import PaymentForm from "./PaymentForm";
import Loading from "../../components/Shared/Loading/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const FundingPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const {
    data: funds = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["funds", currentPage, itemPerPage],
    queryFn: async () => {
      const { data: total } = await axiosPublic("/founds-counts");
      setTotalCount(total?.count || 0);

      const { data } = await axiosSecure("/funds", {
        params: {
          skip: (currentPage - 1) * itemPerPage,
          limit: itemPerPage,
        },
      });
      return data;
    },
  });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalCount / itemPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-8 mb-12">
      <h2 className="text-4xl font-bold text-center text-secondary">
        {isLoading
          ? "Donate for a Cause"
          : funds.length === 0
          ? "No donation yet"
          : "Donate for a Cause"}
      </h2>

      <div className="flex justify-center">
        {!showPaymentForm ? (
          <button
            onClick={() => setShowPaymentForm(true)}
            className="btn btn-secondary"
          >
            Give Fund
          </button>
        ) : (
          <div className="w-full max-w-xl">
            <Elements stripe={stripePromise}>
              <PaymentForm
                user={user}
                setShowPaymentForm={setShowPaymentForm}
                refetch={refetch}
              />
            </Elements>
          </div>
        )}
      </div>

      {/* Donation History (only show if there are any donations) */}
      {!isLoading && funds.length > 0 && (
        <div>
          <div className="divider before:bg-secondary after:bg-secondary text-xl font-bold">
            Donation History
          </div>

          <div className="py-6">
            <PaginationControls
              itemPerPage={itemPerPage}
              setItemPerPage={setItemPerPage}
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / itemPerPage)}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
            <table className="table w-full">
              <thead className="bg-secondary/5 text-secondary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {funds.map((fund, index) => (
                  <tr
                    key={fund._id}
                    className="hover:bg-secondary/5 transition"
                  >
                    <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                    <td>{fund.donorName || "Anonymous"}</td>
                    <td>${fund.fundAmount}</td>
                    <td>{format(new Date(fund.fundDate), "PPP")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Optional: show loading spinner if needed */}
      {isLoading && <Loading />}
    </div>
  );
};

export default FundingPage;
