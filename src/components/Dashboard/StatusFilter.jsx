const StatusFilter = ({ filter, onChange, isUser }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="font-medium">Filter by Status:</label>
      <select
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        className="select focus:outline-none select-sm w-44"
      >
        <option value="">All</option>
        {isUser ? (
          <>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </>
        ) : (
          <>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </>
        )}
      </select>
    </div>
  );
};

export default StatusFilter;
