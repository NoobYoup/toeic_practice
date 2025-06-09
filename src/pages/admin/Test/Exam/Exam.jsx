import { Link } from 'react-router-dom';
import styles from './Exam.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Exam() {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý đề thi</h2>
                <div>
                    <Link to="create-exam" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm đề thi
                    </Link>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Tìm kiếm đề thi..." />
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
                                    <th>#</th>
                                    <th>Tên đề thi</th>
                                    <th>Mô tả</th>
                                    <th>Điểm tối đa</th>
                                    <th>Thời gian (phút)</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>TOEIC Practice Test 1</td>
                                    <td>Bài thi TOEIC đầy đủ để luyện tập</td>
                                    <td>990</td>
                                    <td>120</td>
                                    <td>
                                        <span class={`${cx('exam-status-active')} badge rounded-pill px-3 py-2`}>
                                            Hoạt động
                                        </span>
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <Link to="edit-exam" class="btn btn-sm btn-outline-primary">
                                                <i class="fas fa-edit"></i>
                                            </Link>
                                            <button type="button" class="btn btn-sm btn-outline-danger">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Mini TOEIC Test</td>
                                    <td>Bài thi TOEIC rút gọn cho người mới</td>
                                    <td>495</td>
                                    <td>60</td>
                                    <td>
                                        <span class={`${cx('exam-status-draft')} badge rounded-pill px-3 py-2`}>
                                            Bản nháp
                                        </span>
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <Link to="edit-exam" class="btn btn-sm btn-outline-primary">
                                                <i class="fas fa-edit"></i>
                                            </Link>
                                            <button type="button" class="btn btn-sm btn-outline-danger">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
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

export default Exam;
