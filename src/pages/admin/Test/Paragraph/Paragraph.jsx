import { Link } from 'react-router-dom';

import styles from './Paragraph.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Paragraph() {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý đoạn văn</h2>
                <div>
                    <Link to="create-paragraph" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm đoạn văn
                    </Link>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Tìm kiếm đoạn văn..." />
                                <button class="btn btn-outline-secondary" type="button">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-6 text-end">
                            <div class="btn-group">
                                <button type="button" class="btn btn-outline-secondary">
                                    <i class="fas fa-filter me-1"></i>Lọc
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            Tất cả
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            Đang hoạt động
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            Bản nháp
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="selectAll" />
                                        </div>
                                    </th>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>Nội dung</th>
                                    <th>Độ dài</th>
                                    <th>Câu hỏi liên quan</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" />
                                        </div>
                                    </td>
                                    <td>P002</td>
                                    <td>
                                        <strong>Meeting Schedule Change</strong>
                                    </td>
                                    <td>
                                        <div class="passage-excerpt">
                                            From: Sarah Johnson To: All Staff Subject: Important Meeting Rescheduled...
                                        </div>
                                    </td>
                                    <td>
                                        <span class="word-count">420 từ</span>
                                        <br />
                                        <small class="text-muted">Dài</small>
                                    </td>
                                    <td>
                                        <div class="related-questions">
                                            <span class="badge bg-info">7 câu hỏi</span>
                                            <br />
                                            <small class="text-muted">Q120-Q126</small>
                                        </div>
                                    </td>
                                    <td>
                                        <Link
                                            to="/admin/paragraph/detail-paragraph"
                                            class="btn btn-sm btn-outline-info me-1"
                                        >
                                            <i class="fas fa-eye"></i>
                                        </Link>
                                        <Link
                                            to="/admin/paragraph/edit-paragraph"
                                            class="btn btn-sm btn-outline-primary me-1"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </Link>
                                        <button class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <nav aria-label="Page navigation">
                        <ul class="pagination justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                    Trước
                                </a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    Sau
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Paragraph;
