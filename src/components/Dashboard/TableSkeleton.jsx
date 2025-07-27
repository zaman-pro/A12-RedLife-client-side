const TableSkeleton = ({ rows = 3, columns = 10 }) => {
  return (
    <div className="animate-pulse rounded-lg shadow overflow-hidden">
      <table className="table w-full">
        <thead>
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i}>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="h-4 bg-gray-200 rounded w-full my-1" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
