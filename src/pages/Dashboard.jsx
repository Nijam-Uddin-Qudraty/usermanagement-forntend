// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageCount, setPageCount] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalActive, setTotalActive] = useState(0);
//   const [totalStaff, setTotalStaff] = useState(0
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchUsers(currentPage);
//   }, [currentPage]);

//   const fetchUsers = async (page = 1) => {
//     try {
//       const res = await axios.get(
//         `http://127.0.0.1:8000/dashboard/users/?page=${page}`,
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       setUsers(res.data.results || res.data);
//       if (res.data.count && res.data.results)
//         setPageCount(Math.ceil(res.data.count / 100));

//       // ✅ Get totals from backend
//       setTotalUsers(res.data.total_users || 0);
//       setTotalActive(res.data.total_active || 0);
//       setTotalStaff(res.data.total_staff || 0);
//     } catch (err) {
//       console.error("Error fetching users", err);
//     }
//   };

//   const handleView = (user) => {
//     setSelectedUser({ ...user });
//     setShowViewModal(true);
//   };

//   const handleDelete = (user) => {
//     setSelectedUser(user);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(
//         `http://127.0.0.1:8000/dashboard/users/${selectedUser.id}/`,
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       setUsers(users.filter((u) => u.id !== selectedUser.id));
//       setShowDeleteModal(false);
//     } catch (err) {
//       console.error("Error deleting user", err);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://127.0.0.1:8000/dashboard/users/${selectedUser.id}/`,
//         selectedUser,
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       setShowViewModal(false);
//       fetchUsers();
//     } catch (err) {
//       console.error("Error updating user", err);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       {/* ===== AdminLTE Stat Cards ===== */}
//       <div className="row mb-4">
//         <div className="col-lg-4 col-12 mb-3">
//           <div className="small-box bg-info">
//             <div className="inner">
//               <h3>{totalUsers}</h3>
//               <p>Total Users</p>
//             </div>
//             <div className="icon">
//               <i className="fas fa-users"></i>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-4 col-12 mb-3">
//           <div className="small-box bg-success">
//             <div className="inner">
//               <h3>{totalActive}</h3>
//               <p>Active Users</p>
//             </div>
//             <div className="icon">
//               <i className="fas fa-user-check"></i>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-4 col-12 mb-3">
//           <div className="small-box bg-warning text-white">
//             <div className="inner">
//               <h3>{totalStaff}</h3>
//               <p>Staff Users</p>
//             </div>
//             <div className="icon">
//               <i className="fas fa-user-tie"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===== Pagination Section ===== */}
//       <div className="d-flex justify-content-center mt-3 flex-wrap gap-1">
//         <button
//           className="btn btn-outline-secondary"
//           onClick={() => setCurrentPage(1)}
//           disabled={currentPage === 1}
//         >
//           First
//         </button>

//         <button
//           className="btn btn-secondary"
//           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>

//         {Array.from(
//           { length: Math.min(8, pageCount) },
//           (_, i) => currentPage - 4 + i + 1
//         )
//           .filter((p) => p > 0 && p <= pageCount)
//           .map((p) => (
//             <button
//               key={p}
//               className={`btn ${
//                 p === currentPage ? "btn-primary" : "btn-light"
//               } mx-1`}
//               onClick={() => setCurrentPage(p)}
//             >
//               {p}
//             </button>
//           ))}

//         <button
//           className="btn btn-secondary"
//           onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
//           disabled={currentPage === pageCount}
//         >
//           Next
//         </button>

//         <button
//           className="btn btn-outline-secondary"
//           onClick={() => setCurrentPage(pageCount)}
//           disabled={currentPage === pageCount}
//         >
//           Last
//         </button>
//       </div>

//       {/* ===== Modals (unchanged) ===== */}
//       {showViewModal && (
//         <div className="modal-overlay">
//           <div className="modal-card card">
//             <div className="card-header bg-primary text-white">
//               <h3>User Details</h3>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleUpdate}>
//                 <label>Username</label>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   value={selectedUser.username}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, username: e.target.value })
//                   }
//                 />

//                 <label>Email</label>
//                 <input
//                   type="email"
//                   className="form-control mb-2"
//                   value={selectedUser.email}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, email: e.target.value })
//                   }
//                 />

//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   value={selectedUser.first_name || ""}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       first_name: e.target.value,
//                     })
//                   }
//                 />

//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   className="form-control mb-3"
//                   value={selectedUser.last_name || ""}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       last_name: e.target.value,
//                     })
//                   }
//                 />

//                 <div className="form-check mb-2">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={selectedUser.is_active}
//                     onChange={(e) =>
//                       setSelectedUser({
//                         ...selectedUser,
//                         is_active: e.target.checked,
//                       })
//                     }
//                   />
//                   <label className="form-check-label">Active</label>
//                 </div>

//                 <div className="form-check mb-3">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={selectedUser.is_staff}
//                     onChange={(e) =>
//                       setSelectedUser({
//                         ...selectedUser,
//                         is_staff: e.target.checked,
//                       })
//                     }
//                   />
//                   <label className="form-check-label">Staff</label>
//                 </div>

//                 <div className="d-flex justify-content-between">
//                   <button type="submit" className="btn btn-primary">
//                     Save Changes
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowViewModal(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===== Delete Modal ===== */}
//       {showDeleteModal && (
//         <div className="modal-overlay">
//           <div className="modal-card card text-center">
//             <div className="card-header bg-danger text-white">
//               <h3>Confirm Delete</h3>
//             </div>
//             <div className="card-body">
//               <p>
//                 Are you sure you want to delete{" "}
//                 <strong>{selectedUser.username}</strong>?
//               </p>
//               <div className="d-flex justify-content-center gap-2">
//                 <button className="btn btn-danger" onClick={confirmDelete}>
//                   Yes, Delete
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowDeleteModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===== Modal Styles ===== */}
//       <style>
//         {`
//           .modal-overlay {
//             position: fixed;
//             top: 0; left: 0;
//             width: 100%; height: 100%;
//             background: rgba(0,0,0,0.5);
//             display: flex; align-items: center; justify-content: center;
//             z-index: 2000;
//           }
//           .modal-card {
//             max-width: 500px;
//             width: 100%;
//             border-radius: 8px;
//             background: white;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  
  // Filter states
  const [filters, setFilters] = useState({
    username: '',
    email: '',
    is_active: '',
    is_staff: ''
  });

  const token = localStorage.getItem("token");

  // Define columns for the data table - REMOVED SORTABLE PROPERTY
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      width: '80px',
    },
    {
      name: 'Username',
      selector: row => row.username,
      minWidth: '150px',
    },
    {
      name: 'Email',
      selector: row => row.email,
      minWidth: '200px',
    },
    {
      name: 'First Name',
      selector: row => row.first_name || '-',
      minWidth: '150px',
    },
    {
      name: 'Last Name',
      selector: row => row.last_name || '-',
      minWidth: '150px',
    },
    {
      name: 'Active',
      selector: row => row.is_active,
      center: true,
      width: '100px',
      cell: row => (
        <span className={`badge ${row.is_active ? 'bg-success' : 'bg-danger'}`}>
          {row.is_active ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      name: 'Staff',
      selector: row => row.is_staff,
      center: true,
      width: '100px',
      cell: row => (
        <span className={`badge ${row.is_staff ? 'bg-warning' : 'bg-secondary'}`}>
          {row.is_staff ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      name: 'Last Login',
      selector: row => row.last_login,
      width: '150px',
      cell: row => (
        <span>
          {row.last_login ? new Date(row.last_login).toLocaleDateString() : 'Never'}
        </span>
      )
    },
    {
      name: 'Date Joined',
      selector: row => row.date_joined,
      width: '150px',
      cell: row => (
        <span>
          {new Date(row.date_joined).toLocaleDateString()}
        </span>
      )
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="btn-group">
          <button 
            className="btn btn-info btn-sm"
            onClick={() => handleView(row)}
            title="View/Edit User"
          >
            <i className="fas fa-edit"></i> View
          </button>
          <button 
            className="btn btn-danger btn-sm ml-1"
            onClick={() => handleDelete(row)}
            title="Delete User"
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '200px',
    },
  ];

  const buildQueryString = useCallback((page, limit, filterParams) => {
    let queryParams = [`page=${page}`, `page_size=${limit}`];
    
    // Add filter parameters - FIXED: using 'search' parameter for username globally
    if (filterParams.username) {
      queryParams.push(`search=${encodeURIComponent(filterParams.username)}`);
    }
    if (filterParams.email) {
      queryParams.push(`email=${encodeURIComponent(filterParams.email)}`);
    }
    if (filterParams.is_active !== '') {
      queryParams.push(`is_active=${filterParams.is_active}`);
    }
    if (filterParams.is_staff !== '') {
      queryParams.push(`is_staff=${filterParams.is_staff}`);
    }
    
    return queryParams.join('&');
  }, []);

  const fetchUsers = useCallback(async (page = 1, limit = perPage, filterParams = filters) => {
    setLoading(true);
    try {
      const queryString = buildQueryString(page, limit, filterParams);
      const url = `http://127.0.0.1:8000/dashboard/users/?${queryString}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Token ${token}` }
      });
      
      setUsers(res.data.results || res.data || []);
      
      // Set pagination info
      if (res.data.count !== undefined) {
        setTotalRows(res.data.count);
      } else if (Array.isArray(res.data)) {
        setTotalRows(res.data.length);
      } else {
        setTotalRows(0);
      }
      
      // Get totals from backend
      setTotalUsers(res.data.total_users || 0);
      setTotalActive(res.data.total_active || 0);
      setTotalStaff(res.data.total_staff || 0);
      
    } catch (err) {
      console.error("Error fetching users", err);
      setUsers([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  }, [token, perPage, buildQueryString, filters]);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, fetchUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    await fetchUsers(1, newPerPage);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchUsers(1, perPage, filters);
  };

  const resetFilters = () => {
    const resetFilters = {
      username: '',
      email: '',
      is_active: '',
      is_staff: ''
    };
    setFilters(resetFilters);
    setCurrentPage(1);
    fetchUsers(1, perPage, resetFilters);
  };

  const handleView = (user) => {
    setSelectedUser({ ...user });
    setShowViewModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/dashboard/users/${selectedUser.id}/`,
        { headers: { Authorization: `Token ${token}` } }
      );
      
      await fetchUsers(currentPage, perPage);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/dashboard/users/${selectedUser.id}/`,
        selectedUser,
        { headers: { Authorization: `Token ${token}` } }
      );
      setShowViewModal(false);
      await fetchUsers(currentPage, perPage);
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const customStyles = {
    table: {
      style: {
        width: '100%',
      },
    },
    head: {
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #dee2e6',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        padding: '12px 15px',
        backgroundColor: '#f8f9fa',
        '&:hover': {
          cursor: 'default',
        },
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        padding: '12px 15px',
      },
    },
  };

  const paginationComponentOptions = {
    noRowsPerPage: false,
    rowsPerPageText: 'Rows per page:',
    rangeSeparatorText: 'of',
    selectAllRowsItem: false,
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>User Management</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Users</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* ===== AdminLTE Stat Cards ===== */}
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{totalUsers}</h3>
                  <p>Total Users</p>
                </div>
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{totalActive}</h3>
                  <p>Active Users</p>
                </div>
                <div className="icon">
                  <i className="fas fa-user-check"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{totalStaff}</h3>
                  <p>Staff Users</p>
                </div>
                <div className="icon">
                  <i className="fas fa-user-tie"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-secondary">
                <div className="inner">
                  <h3>{totalRows}</h3>
                  <p>Current Results</p>
                </div>
                <div className="icon">
                  <i className="fas fa-database"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </div>

          {/* ===== Filters Section ===== */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-filter me-2"></i>Filters
              </h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search username..."
                      value={filters.username}
                      onChange={(e) => handleFilterChange('username', e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') applyFilters();
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search email..."
                      value={filters.email}
                      onChange={(e) => handleFilterChange('email', e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') applyFilters();
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label>Active Status</label>
                    <select
                      className="form-control"
                      value={filters.is_active}
                      onChange={(e) => handleFilterChange('is_active', e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label>Staff Status</label>
                    <select
                      className="form-control"
                      value={filters.is_staff}
                      onChange={(e) => handleFilterChange('is_staff', e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="true">Staff</option>
                      <option value="false">Non-Staff</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <div className="form-group w-100">
                    <label>&nbsp;</label>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-info btn-block"
                        onClick={applyFilters}
                      >
                        <i className="fas fa-search me-1"></i> Search
                      </button>
                      <button 
                        className="btn btn-default"
                        onClick={resetFilters}
                        title="Reset Filters"
                      >
                        <i className="fas fa-redo"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== React Data Table Component ===== */}
          <div className="card">
            <div className="card-header bg-primary">
              <h3 className="card-title">
                <i className="fas fa-table me-2"></i>Users Management
              </h3>
              <div className="card-tools">
                <span className="badge badge-light">
                  Total: {totalRows} users
                </span>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <DataTable
                  columns={columns}
                  data={users}
                  progressPending={loading}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handlePerRowsChange}
                  paginationDefaultPage={currentPage}
                  paginationRowsPerPageOptions={[10, 25, 50, 100]}
                  paginationComponentOptions={paginationComponentOptions}
                  customStyles={customStyles}
                  highlightOnHover
                  pointerOnHover
                  responsive
                  striped
                  noDataComponent={
                    <div className="text-center py-5">
                      <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                      <h5>No users found</h5>
                      <p className="text-muted">Try adjusting your filters or check back later.</p>
                    </div>
                  }
                  progressComponent={
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <p className="mt-2">Loading users...</p>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="card-footer clearfix">
              <div className="float-right">
                <small className="text-muted">
                  Showing {users.length} of {totalRows} users
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== View/Edit Modal ===== */}
      {showViewModal && (
        <div className="modal fade show" style={{display: 'block', paddingRight: '17px', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h4 className="modal-title">Edit User Details</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowViewModal(false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Username *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedUser?.username || ''}
                          onChange={(e) =>
                            setSelectedUser({ ...selectedUser, username: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          value={selectedUser?.email || ''}
                          onChange={(e) =>
                            setSelectedUser({ ...selectedUser, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedUser?.first_name || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              first_name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedUser?.last_name || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              last_name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="is_active"
                            checked={selectedUser?.is_active || false}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                is_active: e.target.checked,
                              })
                            }
                          />
                          <label className="custom-control-label" htmlFor="is_active">
                            Active User
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="is_staff"
                            checked={selectedUser?.is_staff || false}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                is_staff: e.target.checked,
                              })
                            }
                          />
                          <label className="custom-control-label" htmlFor="is_staff">
                            Staff Member
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save me-1"></i> Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => setShowViewModal(false)}
                    >
                      <i className="fas fa-times me-1"></i> Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Delete Modal ===== */}
      {showDeleteModal && (
        <div className="modal fade show" style={{display: 'block', paddingRight: '17px', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger">
                <h4 className="modal-title">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Confirm Delete
                </h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  This action cannot be undone!
                </div>
                <p className="lead">
                  Are you sure you want to delete user{" "}
                  <strong className="text-danger">"{selectedUser?.username}"</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  <i className="fas fa-trash me-1"></i> Yes, Delete
                </button>
                <button
                  className="btn btn-default"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <i className="fas fa-times me-1"></i> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;