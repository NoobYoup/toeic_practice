import { Link } from 'react-router-dom';
import './User.scss';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { getAllUser, deleteUser } from '@/services/userService.jsx';

function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [idSortOrder, setIdSortOrder] = useState('asc');

    useEffect(() => {
        const debouncedFetch = debounce(async (searchTerm, currentPage) => {
            setLoading(true);
            try {
                const res = await getAllUser(searchTerm, currentPage);
                setUsers(res.data.data);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log('Lỗi gọi API', error);
            }
            setLoading(false);
        }, 200);

        debouncedFetch(search, page);

        return () => {
            debouncedFetch.cancel();
        };
    }, [search, page]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter((user) => user.id_nguoi_dung !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const sortByStatus = () => {
        const sorted = [...users].sort((a, b) => {
            const statusA = a.trang_thai || '';
            const statusB = b.trang_thai || '';
            if (sortOrder === 'asc') {
                return statusA.localeCompare(statusB);
            } else {
                return statusB.localeCompare(statusA);
            }
        });
        setUsers(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortById = () => {
        const sorted = [...users].sort((a, b) => {
            if (idSortOrder === 'asc') {
                return a.id_nguoi_dung - b.id_nguoi_dung;
            } else {
                return b.id_nguoi_dung - a.id_nguoi_dung;
            }
        });
        setUsers(sorted);
        setIdSortOrder(idSortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý Người Dùng</h2>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm người dùng..."
                                    id="userSearch"
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <button className="btn btn-outline-secondary" type="button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center">
                            <i className="fas fa-spinner fa-spin fa-2x"></i>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Thông tin</th>
                                        <th>Email</th>
                                        <th>Vai trò</th>
                                        <th onClick={sortByStatus} style={{ cursor: 'pointer' }}>
                                            Trạng thái <i className="fa-solid fa-sort"></i>
                                        </th>

                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.id_nguoi_dung}>
                                                <td>
                                                    <span>{user.id_nguoi_dung}</span>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="fw-bold">{user.HoSoNguoiDung.ho_ten}</div>
                                                    </div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span className="">{user.vai_tro}</span>
                                                </td>
                                                <td>
                                                    <span className="">{user.trang_thai}</span>
                                                </td>

                                                <td>
                                                    <div className="btn-group">
                                                        <Link
                                                            className="btn btn-sm btn-outline-primary"
                                                            to={`/admin/user/detail-user/${user.id_nguoi_dung}`}
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </Link>
                                                        <Link
                                                            className="btn btn-sm btn-outline-warning"
                                                            to={`/admin/user/edit-user/${user.id_nguoi_dung}`}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDelete(user.id_nguoi_dung)}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                Không có người dùng nào.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(page - 1)}>
                                    Trước
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, i) => (
                                <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setPage(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(page + 1)}>
                                    Sau
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default User;
