import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

const DonationTable = ({
  data,
  onDelete,
  onStatusChange,
  getLocation,
  role,
  currentUserEmail, // 🆕 new prop to detect ownership
}) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="table w-full text-sm">
        <thead className="bg-base-200 text-base">
          <tr>
            <th>#</th>
            <th>Recipient</th>
            <th>Location</th>
            <th>Donor</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Blood</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((req, idx) => {
            const isOwner = req.requesterEmail === currentUserEmail;
            const canEditOrDelete = role === "admin" || isOwner;

            return (
              <tr
                key={req._id}
                className="hover:bg-base-300 transition-colors duration-300"
              >
                <td>{idx + 1}</td>
                <td>{req.recipientName}</td>
                <td>
                  {getLocation(req.recipientDistrict, req.recipientUpazila)}
                </td>
                <td>{req.donorName || "Pending"}</td>
                <td>{req.donorEmail || "Pending"}</td>
                <td>{new Date(req.donationDate).toLocaleDateString()}</td>
                <td>{req.donationTime}</td>
                <td>{req.bloodGroup}</td>

                {/* Status Control */}
                <td className="capitalize">
                  {role === "admin" || role === "volunteer" ? (
                    <select
                      className="select select-bordered select-sm"
                      value={req.donationStatus}
                      onChange={(e) => onStatusChange(req._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  ) : role === "donor" &&
                    req.donationStatus === "inprogress" ? (
                    <select
                      className="select select-bordered select-sm"
                      value={req.donationStatus}
                      onChange={(e) => onStatusChange(req._id, e.target.value)}
                    >
                      <option value="inprogress" disabled>
                        In Progress
                      </option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  ) : (
                    // req.donationStatus
                    <span
                      className={`badge w-full text-center ${
                        req.donationStatus === "pending"
                          ? "badge-warning"
                          : req.donationStatus === "inprogress"
                          ? "badge-info"
                          : req.donationStatus === "done"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {req.donationStatus}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="flex gap-1 flex-col items-center justify-center lg:flex-row">
                  {/* View */}
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() =>
                      navigate(`/dashboard/donation-request/${req._id}`)
                    }
                  >
                    <FaEye />
                  </button>

                  {/* Edit */}
                  {canEditOrDelete && (
                    <button
                      className="btn btn-sm btn-warning text-white"
                      onClick={() =>
                        navigate(`/dashboard/edit-donation-request/${req._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                  )}

                  {/* Delete */}
                  {canEditOrDelete && (
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => onDelete(req._id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DonationTable;
