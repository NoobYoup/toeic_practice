import { Link } from 'react-router-dom';
import styles from './QuestionBank.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function QuestionBank() {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý Ngân Hàng Câu Hỏi</h2>
                <div>
                    <button className="btn btn-success me-2">
                        <i className="fas fa-file-excel me-2"></i>Import Excel
                    </button>
                    <Link to="/admin/question-bank/create-question" className="btn btn-primary">
                        <i className="fas fa-plus-circle me-2"></i>Thêm Câu Hỏi
                    </Link>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <div className={`${cx('card')} card text-white bg-primary`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Tổng số câu hỏi</h6>
                                    <h2 className="mb-0">756</h2>
                                </div>
                                <i className="fas fa-question-circle fa-3x opacity-50"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${cx('card')} card text-white bg-info`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Câu hỏi Listening</h6>
                                    <h2 className="mb-0">380</h2>
                                </div>
                                <i className="fas fa-headphones fa-3x opacity-50"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${cx('card')} card text-white bg-warning`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Câu hỏi Reading</h6>
                                    <h2 className="mb-0">376</h2>
                                </div>
                                <i className="fas fa-book-open fa-3x opacity-50"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Tìm kiếm và lọc câu hỏi</h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập từ khóa tìm kiếm..."
                                    />
                                    <button className="btn btn-outline-secondary" type="button">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select" id="questionType">
                                    <option value="">Tất cả loại câu hỏi</option>
                                    <option value="listening">Listening</option>
                                    <option value="reading">Reading</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select" id="questionPart">
                                    <option value="">Tất cả các phần</option>
                                    <option value="part1">Part 1</option>
                                    <option value="part2">Part 2</option>
                                    <option value="part3">Part 3</option>
                                    <option value="part4">Part 4</option>
                                    <option value="part5">Part 5</option>
                                    <option value="part6">Part 6</option>
                                    <option value="part7">Part 7</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className={cx('filter-tag')}>
                                Listening <span className="close">&times;</span>
                            </div>
                            <div className={cx('filter-tag')}>
                                Part 3 <span className="close">&times;</span>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary">Xóa tất cả bộ lọc</button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="selectAll" />
                                            </div>
                                        </th>
                                        <th>ID</th>
                                        <th>Loại</th>
                                        <th>Phần</th>
                                        <th>Nội dung câu hỏi</th>
                                        <th>Đáp án</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                            </div>
                                        </td>
                                        <td>Q001</td>
                                        <td>
                                            <span
                                                className={`${cx(
                                                    'badge',
                                                    'question-type-reading',
                                                )} rounded-pill px-3 py-2`}
                                            >
                                                Reading
                                            </span>
                                        </td>
                                        <td>Part 1</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                Look at the picture marked number 1 in your test book.
                                            </div>
                                        </td>
                                        <td>A) A woman is sitting at her desk.</td>
                                        <td>
                                            <Link
                                                to="/admin/question-bank/detail-question"
                                                className="btn btn-sm btn-outline-info me-1"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                            <Link
                                                to="/admin/question-bank/edit-question"
                                                className="btn btn-sm btn-outline-primary me-1"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button className="btn btn-sm btn-outline-danger">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                            </div>
                                        </td>
                                        <td>Q001</td>
                                        <td>
                                            <span
                                                className={`${cx(
                                                    'badge',
                                                    'question-type-listening',
                                                )} rounded-pill px-3 py-2`}
                                            >
                                                Listening
                                            </span>
                                        </td>
                                        <td>Part 1</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                Look at the picture marked number 1 in your test book.
                                            </div>
                                        </td>
                                        <td>A) A woman is sitting at her desk.</td>
                                        <td>
                                            <Link
                                                to="/admin/question-bank/detail-question"
                                                className="btn btn-sm btn-outline-info me-1"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                            <Link
                                                to="/admin/question-bank/edit-question"
                                                className="btn btn-sm btn-outline-primary me-1"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button className="btn btn-sm btn-outline-danger">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <nav aria-label="Question pagination" className="mt-4">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                                        Trước
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        Sau
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestionBank;
