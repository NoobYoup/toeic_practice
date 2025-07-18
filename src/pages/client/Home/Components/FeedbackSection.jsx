import { DEFAULT_AVATAR } from '@/constants/default';
import { getAllBlogPublic } from '@/services/blogService';
import { useEffect, useState } from 'react';

import styles from './FeedbackSection.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function FeedbackSection() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await getAllBlogPublic();
            console.log(res.data.data);
            setBlogs(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <section className={`${cx('testimonials')} py-5`}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Một số bài viết nổi bật</h2>
                    <p className="text-muted">
                        Bài viết được viết bởi các chuyên gia và người dùng trong lĩnh vực giáo dục và học tập
                    </p>
                </div>
                {loading && (
                    <div className="text-center py-5">
                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                    </div>
                )}

                {!loading &&
                    (blogs.length === 0 ? (
                        <div className="text-center">
                            <p className="text-muted">Không có bài viết nào</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {blogs.length > 4
                                ? blogs.slice(0, 4).map((blog) => (
                                      <div className="col-lg-4 col-md-6">
                                          <div className={`${cx('testimonial-card')} p-4 h-100`}>
                                              <div className="d-flex align-items-center mb-3">
                                                  <img
                                                      src={blog.nguoi_dung.ho_so.url_hinh_dai_dien || DEFAULT_AVATAR}
                                                      alt="User"
                                                      className="rounded-circle me-3"
                                                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                  />
                                                  <div>
                                                      <h6 className="mb-0 fw-bold">Nguyễn Văn A</h6>
                                                      <div className="text-warning">
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                      </div>
                                                  </div>
                                              </div>
                                              <p className="mb-2">
                                                  "Nhờ luyện tập trên TOEIC Master mà tôi đã tăng được 200 điểm chỉ sau
                                                  2 tháng. Đề thi thực sự rất sát với đề thi thật."
                                              </p>
                                              <div className="text-primary fw-bold">Điểm TOEIC: 850</div>
                                          </div>
                                      </div>
                                  ))
                                : blogs.map((blog) => (
                                      <div className="col-lg-4 col-md-6" key={blog.id_bai_viet}>
                                          <div
                                              className={`${cx(
                                                  'testimonial-card',
                                              )} p-4 h-100 d-flex flex-column justify-content-between`}
                                          >
                                              <div className="d-flex align-items-center mb-3">
                                                  <img
                                                      src={blog.nguoi_dung.ho_so.url_hinh_dai_dien || DEFAULT_AVATAR}
                                                      alt="User"
                                                      className="rounded-circle me-3"
                                                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                  />
                                                  <div>
                                                      <h6 className="mb-0 fw-bold">{blog.nguoi_dung.ho_so.ho_ten}</h6>
                                                      <p className="text-muted p-0 m-0">
                                                          {blog.nguoi_dung.ten_dang_nhap}
                                                      </p>
                                                  </div>
                                              </div>
                                              <p className="fw-bold"> {blog.tieu_de}</p>
                                              <p className="mb-2 text-truncate">{blog.noi_dung}</p>
                                              <div className="text-end text-muted">
                                                  <i className="fas fa-calendar-alt"></i>{' '}
                                                  {new Date(blog.thoi_gian_tao).toLocaleDateString('vi-VN', {
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                  })}
                                              </div>
                                              <Link
                                                  to={`/blog/detail-blog/${blog.id_bai_viet}`}
                                                  className="btn btn-primary w-100 "
                                              >
                                                  Xem chi tiết
                                              </Link>
                                          </div>
                                      </div>
                                  ))}
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default FeedbackSection;
