import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

const DonationTable = ({ data, onDelete, onStatusChange, getLocation }) => {
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
          {data.map((req, idx) => (
            <tr key={req._id}>
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
              <td className="capitalize">
                {req.donationStatus === "inprogress" ? (
                  <select
                    className="select select-bordered select-sm"
                    value={req.donationStatus}
                    onChange={(e) => onStatusChange(req._id, e.target.value)}
                  >
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                  </select>
                ) : (
                  req.donationStatus
                )}
              </td>
              <td className="flex gap-1 flex-col items-center justify-center lg:flex-row">
                <button
                  className="btn btn-sm btn-info text-white"
                  onClick={() => navigate(`donation-request/${req._id}`)}
                >
                  <FaEye />
                </button>
                <button
                  className="btn btn-sm btn-warning text-white"
                  onClick={() => navigate(`edit-donation-request/${req._id}`)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() => onDelete(req._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationTable;
