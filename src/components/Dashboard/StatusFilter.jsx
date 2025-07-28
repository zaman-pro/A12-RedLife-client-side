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
    donationPublic: [
      { value: "", label: "None" },
      { value: "asc", label: "Ascending" },
      { value: "desc", label: "Descending" },
    ],
  };

  // Get the appropriate options based on filterType
  const options = statusOptions[filterType] || [];

  return (
    <div className="flex items-center gap-2">
      <label className="font-medium">
        Filter by{filterType !== "donationPublic" && " Status"}:
      </label>
      <select
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        className="select focus:outline-none select-sm w-44"
      >
        {filterType !== "donationPublic" && <option value="">All</option>}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
