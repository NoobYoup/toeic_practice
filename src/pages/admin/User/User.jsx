import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';
import { getAllUser, deleteUser, changeUserStatus } from '@/services/userService.jsx';

import classNames from 'classnames/bind';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [idSortOrder, setIdSortOrder] = useState('asc');
    const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 0 });

    useEffect(() => {
        const debouncedFetch = debounce(async (searchTerm, currentPage) => {
            setLoading(true);
            try {
                const res = await getAllUser(searchTerm, currentPage);

                setUsers(res.data.data);
                setPagination((prev) => ({ ...prev, total: res.data.pagination.total }));
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

    const handleChangeStatus = async (users) => {
        const newStatus = users.trang_thai === 'hoat_dong' ? 'khong_hoat_dong' : 'hoat_dong';

        const res = await changeUserStatus(users.id_nguoi_dung, newStatus);
        setUsers((prev) =>
            prev.map((u) => (u.id_nguoi_dung === users.id_nguoi_dung ? { ...u, trang_thai: newStatus } : u)),
        );
        toast.success(res.data.message);
    };

    const handlePageClick = (e) => {
        setPagination((prev) => ({ ...prev, page: e.selected + 1 }));
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
                                                        <div className="fw-bold">{user.ho_so.ho_ten}</div>
                                                    </div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span
                                                        className={`${cx('role-student')} badge rounded-pill px-3 py-2`}
                                                    >
                                                        {user.vai_tro === 'nguoi_dung'
                                                            ? 'Người dùng'
                                                            : user.vai_tro === 'admin'
                                                            ? 'Quản trị viên'
                                                            : ''}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleChangeStatus(user)}
                                                        className={`${cx(
                                                            user.trang_thai === 'hoat_dong'
                                                                ? 'user-status-active'
                                                                : 'user-status-inactive',
                                                        )} badge rounded-pill px-3 py-2 border-0`}
                                                    >
                                                        {user.trang_thai === 'hoat_dong'
                                                            ? 'Hoạt động'
                                                            : user.trang_thai === 'khong_hoat_dong'
                                                            ? 'Không hoạt động'
                                                            : ''}
                                                    </button>
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
                                            <td colSpan={7} className="text-center text-muted">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="d-flex justify-content-center">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Sau"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={Math.ceil(pagination.total / pagination.limit)}
                            previousLabel="Trước"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            activeClassName="active"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                        />
                    </div>

                    {/* <nav aria-label="Page navigation">
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
                    </nav> */}
                </div>
            </div>
        </>
    );
}

export default User;
