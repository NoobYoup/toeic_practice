import { useState, useEffect } from 'react';
import { getAllCategoryGrammar, deleteCategoryGrammar } from '@/services/categoryGrammar';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function CategoryGrammar() {
    const [categoryGrammar, setCategoryGrammar] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 10 });

    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    const fetchAllCategoryGrammar = async () => {
        setLoading(true);
        try {
            const res = await getAllCategoryGrammar(currentPage);
            setCategoryGrammar(res.data.data);
            setPagination((prev) => ({
                ...prev,
                total: res.data.pagination.total,
                limit: res.data.pagination.limit,
            }));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllCategoryGrammar();
    }, [currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleDeleteCategoryGrammar = async (id) => {
        try {
            const res = await deleteCategoryGrammar(id);
            toast.success(res.data.message);
            fetchAllCategoryGrammar();
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Danh sách danh mục ngữ pháp</h1>
                {user.permissions.includes('CATEGORY_GRAMMAR_CREATE') ? (
                    <div className="d-flex justify-content-end">
                        <Link to="create" className="btn btn-primary">
                            Thêm danh mục
                        </Link>
                    </div>
                ) : (
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" disabled>
                            Thêm danh mục
                        </button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên danh mục</th>
                                        <th>Mô tả</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày cập nhật</th>
                                        <th className="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.permissions.includes('CATEGORY_GRAMMAR_VIEW') &&
                                    categoryGrammar.length > 0 ? (
                                        categoryGrammar.map((categoryGrammar) => (
                                            <tr key={categoryGrammar.id_danh_muc}>
                                                <td>{categoryGrammar.id_danh_muc}</td>
                                                <td>{categoryGrammar.ten_danh_muc}</td>
                                                <td>{categoryGrammar.mo_ta}</td>
                                                <td>{new Date(categoryGrammar.thoi_gian_tao).toLocaleDateString()}</td>
                                                <td>
                                                    {new Date(categoryGrammar.thoi_gian_cap_nhat).toLocaleDateString()}
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group">
                                                        {user.permissions.includes('CATEGORY_GRAMMAR_DETAIL') ? (
                                                            <Link
                                                                to={`detail/${categoryGrammar.id_danh_muc}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-eye"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-eye"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('CATEGORY_GRAMMAR_UPDATE') ? (
                                                            <Link
                                                                to={`edit/${categoryGrammar.id_danh_muc}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('CATEGORY_GRAMMAR_DELETE') ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteCategoryGrammar(
                                                                        categoryGrammar.id_danh_muc,
                                                                    )
                                                                }
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger"
                                                            >
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-danger" disabled>
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={13} className="text-center text-muted">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <ReactPaginate
                                previousLabel={'Trước'}
                                nextLabel={'Sau'}
                                breakLabel={'...'}
                                onPageChange={handlePageClick}
                                pageCount={Math.ceil(pagination.total / pagination.limit)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                containerClassName={'pagination justify-content-center'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                activeClassName={'active'}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryGrammar;
