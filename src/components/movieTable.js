export function MovieTable({ tableHeaders, movies }) {
  return (
    <div className="container">
      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {tableHeaders.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, i) => (
              <tr key={i}>
                {tableHeaders.map((header, i) => (
                  <td key={i}>{movie[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
