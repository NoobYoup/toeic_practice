import { useState, useEffect } from 'react';
import { getAllGrammar, deleteGrammar } from '@/services/grammarService';
import { getDetailUser } from '@/services/userService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ReactPaginate from 'react-paginate';

function Grammar() {
    const [creatorNames, setCreatorNames] = useState({});

    const [grammars, setGrammars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
    });

    const token = localStorage.getItem('admin_token');
    const user = jwtDecode(token);

    const fetchGrammars = async () => {
        setLoading(true);
        try {
            const res = await getAllGrammar(page);
            setGrammars(res.data.data);
            // Lấy danh sách id người tạo duy nhất
            const creatorIds = [...new Set(res.data.data.map((item) => item.nguoi_tao))];

            // Gọi API lấy tên cho từng id
            const nameResults = await Promise.all(
                creatorIds.map((id) =>
                    getDetailUser(id).then((res) => ({
                        id,
                        name: res.data.data.user.nguoi_dung.ten_dang_nhap,
                    })),
                ),
            );

            // Tạo map id → tên
            const nameMap = {};
            nameResults.forEach(({ id, name }) => {
                nameMap[id] = name;
            });
            setCreatorNames(nameMap);

            setPagination((prev) => ({
                ...prev,
                limit: res.data.data.limit,
                total: res.data.data.total,
            }));
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
        setLoading(false);
    };

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    const handleDeleteGrammar = async (id) => {
        try {
            const res = await deleteGrammar(id);
            toast.success(res.data.message);
            fetchGrammars();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchGrammars();
    }, [page]);

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Danh sách danh mục ngữ pháp</h1>
                {user.permissions.includes('GRAMMAR_CREATE') ? (
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
                                        <th>Tiêu đề</th>
                                        <th>Nội dung</th>
                                        <th>Ví dụ</th>
                                        <th>Ghi chú</th>
                                        <th>ID Danh mục</th>
                                        <th>Người tạo</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày cập nhật</th>
                                        <th className="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.permissions.includes('GRAMMAR_VIEW') && grammars && grammars.length > 0 ? (
                                        grammars.map((grammar) => (
                                            <tr key={grammar.id_tai_lieu}>
                                                <td>{grammar.id_tai_lieu}</td>
                                                <td>{grammar.tieu_de}</td>
                                                <td>
                                                    {grammar.noi_dung && grammar.noi_dung.length > 20
                                                        ? grammar.noi_dung.slice(0, 20) + '...'
                                                        : grammar.noi_dung}
                                                </td>
                                                <td>
                                                    {grammar.vi_du && grammar.vi_du.length > 20
                                                        ? grammar.vi_du.slice(0, 20) + '...'
                                                        : grammar.vi_du}
                                                </td>
                                                <td>
                                                    {grammar.ghi_chu && grammar.ghi_chu.length > 20
                                                        ? grammar.ghi_chu.slice(0, 20) + '...'
                                                        : grammar.ghi_chu}
                                                </td>
                                                <td>{grammar.id_danh_muc}</td>
                                                <td>{creatorNames[grammar.nguoi_tao] || '...'}</td>
                                                <td>{new Date(grammar.thoi_gian_tao).toLocaleDateString()}</td>
                                                <td>{new Date(grammar.thoi_gian_cap_nhat).toLocaleDateString()}</td>

                                                <td className="text-center">
                                                    <div className="btn-group">
                                                        {user.permissions.includes('GRAMMAR_DETAIL') ? (
                                                            <Link
                                                                to={`detail/${grammar.id_tai_lieu}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-eye"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-eye"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('GRAMMAR_UPDATE') ? (
                                                            <Link
                                                                to={`edit/${grammar.id_tai_lieu}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="btn btn-sm btn-outline-primary" disabled>
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                        )}

                                                        {user.permissions.includes('GRAMMAR_DELETE') ? (
                                                            <button
                                                                onClick={() => handleDeleteGrammar(grammar.id_tai_lieu)}
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
                            {pagination.total > 0 && (
                                <ReactPaginate
                                    previousLabel={'Trước'}
                                    nextLabel={'Sau'}
                                    breakLabel={'...'}
                                    forcePage={page - 1}
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
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Grammar;
