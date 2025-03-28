import React, { useState, useMemo } from 'react';
import './DataTable.css';

// Mock data for the table
const MOCK_DATA = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    age: 28, 
    department: 'Engineering' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    age: 35, 
    department: 'Marketing' 
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    email: 'bob@example.com', 
    age: 42, 
    department: 'Sales' 
  },
  { 
    id: 4, 
    name: 'Alice Williams', 
    email: 'alice@example.com', 
    age: 31, 
    department: 'HR' 
  },
  { 
    id: 5, 
    name: 'Charlie Brown', 
    email: 'charlie@example.com', 
    age: 45, 
    department: 'Finance' 
  },
  { 
    id: 6, 
    name: 'Emma Wilson', 
    email: 'emma@example.com', 
    age: 29, 
    department: 'Engineering' 
  }
];

const DataTable = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle column sorting
  const handleSort = (column) => {
    // If clicking the same column, toggle direction
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filtered and sorted data
  const processedData = useMemo(() => {
    let result = [...MOCK_DATA];

    // Search filtering
    if (searchTerm) {
      result = result.filter(item => 
        Object.values(item).some(val => 
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sorting
    result.sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      if (a[sortColumn] < b[sortColumn]) return -1 * modifier;
      if (a[sortColumn] > b[sortColumn]) return 1 * modifier;
      return 0;
    });

    return result;
  }, [searchTerm, sortColumn, sortDirection]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedData.slice(startIndex, startIndex + itemsPerPage);
  }, [processedData, currentPage]);

  // Total pages calculation
  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  return (
    <div className="data-table-container">
      <div className="table-controls">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {['name', 'email', 'age', 'department'].map(column => (
              <th 
                key={column}
                onClick={() => handleSort(column)}
                className="sortable-header"
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
                {sortColumn === column && (
                  <span>
                    {sortDirection === 'asc' ? ' ▲' : ' ▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.age}</td>
              <td>{row.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;