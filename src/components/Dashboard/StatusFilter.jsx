const StatusFilter = ({ filter, onChange, filterType }) => {
  // Define all possible status options
  const statusOptions = {
    user: [
      { value: "active", label: "Active" },
      { value: "blocked", label: "Blocked" },
    ],
    donation: [
      { value: "pending", label: "Pending" },
      { value: "inprogress", label: "In Progress" },
      { value: "done", label: "Done" },
      { value: "canceled", label: "Canceled" },
    ],
    blog: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
  };

  // Get the appropriate options based on filterType
  const options = statusOptions[filterType] || [];

  return (
    <div className="flex items-center gap-2">
      <label className="font-medium">Filter by Status:</label>
      <select
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        className="select focus:outline-none select-sm w-44"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
