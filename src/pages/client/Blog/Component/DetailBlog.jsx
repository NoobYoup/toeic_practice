import styles from './DetailBlog.module.scss';
import classNames from 'classnames/bind';
import { DEFAULT_AVATAR, DEFAULT_BACKGROUND } from '@/constants/default';

const cx = classNames.bind(styles);

function DetailBlog() {
    return (
        <>
            <header className={cx('blog-header')}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mx-auto text-center">
                            <a href="#" className={`${cx('category-badge')} mb-3 d-inline-block`}>
                                Chiến lược học tập
                            </a>
                            <h1 className="fw-bold">10 Chiến lược làm bài thi TOEIC hiệu quả cho người mới bắt đầu</h1>
                            <div className="d-flex align-items-center justify-content-center mt-3">
                                <img src={DEFAULT_AVATAR} alt="Author" className={`${cx('author-img')} me-2`} />
                                <span className="me-3">Nguyễn Minh Tuấn</span>
                                <span className="me-3">
                                    <i className="far fa-calendar me-1"></i> 05/05/2025
                                </span>
                                <span>
                                    <i className="far fa-clock me-1"></i> 8 phút đọc
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        <img src={DEFAULT_BACKGROUND} alt="TOEIC Test" className="img-fluid rounded shadow mb-4" />

                        <div className={cx('blog-content')}>
                            <p className={cx('lead')}>
                                Nếu bạn đang bắt đầu hành trình chinh phục TOEIC, việc hiểu rõ cấu trúc bài thi và có
                                chiến lược phù hợp sẽ giúp bạn tự tin hơn và đạt được điểm số như mong muốn. Bài viết
                                này sẽ chia sẻ 10 chiến lược hiệu quả giúp bạn làm bài thi TOEIC tốt hơn.
                            </p>

                            <h2 id="intro">Giới thiệu về bài thi TOEIC</h2>
                            <p>
                                Bài thi TOEIC (Test of English for International Communication) là một bài kiểm tra đánh
                                giá khả năng sử dụng tiếng Anh trong môi trường làm việc quốc tế. Bài thi gồm hai phần
                                chính: Listening Comprehension (100 câu) và Reading Comprehension (100 câu), với tổng
                                thời gian là 2 giờ.
                            </p>

                            <p>
                                Điểm số TOEIC được tính từ 10 đến 990 điểm và được nhiều doanh nghiệp, tổ chức sử dụng
                                để đánh giá năng lực tiếng Anh của ứng viên và nhân viên.
                            </p>

                            <h2 id="listening">Chiến lược cho phần Listening</h2>
                            <p>
                                Phần Listening chiếm một nửa bài thi và đòi hỏi khả năng tập trung cao độ. Dưới đây là
                                một số chiến lược giúp bạn làm tốt phần này:
                            </p>

                            <h3 id="part1">1. Part 1: Photographs - Tập trung vào hành động</h3>
                            <p>
                                Trong phần này, bạn sẽ nghe 4 mô tả về một bức ảnh và chọn mô tả đúng nhất. Hãy tập
                                trung vào:
                            </p>
                            <ul>
                                <li>Hành động đang diễn ra trong hình</li>
                                <li>Vị trí của người hoặc vật trong hình</li>
                                <li>Đừng bị phân tâm bởi những chi tiết không liên quan</li>
                            </ul>

                            <div className="bg-light p-4 rounded my-4">
                                <h5 className="fw-bold">Mẹo:</h5>
                                <p className="mb-0">
                                    Khi xem hình, hãy nhanh chóng nhận diện các chủ thể chính và dự đoán các mô tả có
                                    thể xuất hiện. Điều này sẽ giúp bạn chuẩn bị tâm lý tốt hơn khi nghe các lựa chọn.
                                </p>
                            </div>

                            <h3 id="part2">2. Part 2: Question-Response - Nắm bắt từ khóa</h3>
                            <p>
                                Bạn sẽ nghe một câu hỏi hoặc phát biểu và chọn phản hồi phù hợp nhất từ ba lựa chọn.
                                Chiến lược tốt nhất là:
                            </p>
                            <ul>
                                <li>Nhận diện loại câu hỏi (Wh-questions, Yes/No questions, v.v.)</li>
                                <li>Tập trung vào từ khóa trong câu hỏi</li>
                                <li>Loại trừ những câu trả lời không liên quan</li>
                            </ul>

                            <h3 id="part3-4">3. Part 3 & 4: Conversations and Talks - Ghi chú thông minh</h3>
                            <p>
                                Những phần này yêu cầu bạn nghe hội thoại (Part 3) hoặc bài nói chuyện (Part 4) và trả
                                lời nhiều câu hỏi. Hãy:
                            </p>
                            <ul>
                                <li>Ghi chú nhanh các thông tin quan trọng: ai, cái gì, ở đâu, khi nào, tại sao</li>
                                <li>Đặc biệt chú ý đến những con số, ngày tháng, tên riêng</li>
                                <li>Nhận diện mục đích của cuộc hội thoại hoặc bài nói chuyện</li>
                            </ul>

                            <img src={DEFAULT_BACKGROUND} alt="Ghi chú hiệu quả" className="img-fluid rounded shadow" />

                            <h2 id="reading">Chiến lược cho phần Reading</h2>
                            <p>
                                Phần Reading thường khó hơn đối với nhiều thí sinh vì áp lực thời gian. Dưới đây là các
                                chiến lược để làm tốt phần này:
                            </p>

                            <h3 id="part5">4. Part 5: Incomplete Sentences - Nắm vững ngữ pháp</h3>
                            <p>
                                Phần này kiểm tra kiến thức ngữ pháp và từ vựng qua các câu không hoàn chỉnh. Để làm
                                tốt:
                            </p>
                            <ul>
                                <li>Xác định loại từ cần điền (danh từ, động từ, tính từ, v.v.)</li>
                                <li>Chú ý đến thì của động từ và sự hòa hợp chủ-vị</li>
                                <li>Nắm vững cấu trúc câu và liên từ</li>
                            </ul>

                            <div className="bg-light p-4 rounded my-4">
                                <h5 className="fw-bold">Ví dụ:</h5>
                                <p>
                                    The marketing department _____ preparing a new campaign for the summer collection.
                                </p>
                                <p>(A) is</p>
                                <p>(B) are</p>
                                <p>(C) was</p>
                                <p>(D) were</p>
                                <p className="text-success fw-bold mb-0">
                                    Đáp án đúng: (A) is - vì "department" là danh từ số ít nên cần động từ số ít "is".
                                </p>
                            </div>

                            <h3 id="part6">5. Part 6: Text Completion - Hiểu ngữ cảnh</h3>
                            <p>Ở phần này, bạn sẽ điền vào chỗ trống trong một văn bản. Chiến lược hiệu quả là:</p>
                            <ul>
                                <li>Đọc toàn bộ đoạn văn để nắm bắt ngữ cảnh chung</li>
                                <li>Chú ý đến các từ kết nối và chỉ dẫn ngữ cảnh</li>
                                <li>Kiểm tra tính nhất quán của thì và ngữ pháp</li>
                            </ul>

                            <h3 id="part7">6. Part 7: Reading Comprehension - Kỹ thuật skimming và scanning</h3>
                            <p>Đây là phần khó nhất vì có nhiều bài đọc dài. Hãy áp dụng:</p>
                            <ul>
                                <li>Skimming: đọc lướt để nắm ý chính của đoạn văn</li>
                                <li>Scanning: tìm kiếm thông tin cụ thể để trả lời câu hỏi</li>
                                <li>Đọc câu hỏi trước, sau đó tìm thông tin trong bài đọc</li>
                            </ul>

                            <h2 id="time-management">7. Quản lý thời gian hiệu quả</h2>
                            <p>Thời gian là yếu tố quan trọng trong bài thi TOEIC. Để quản lý thời gian tốt:</p>
                            <ul>
                                <li>Listening (45 phút): Luôn tập trung, không để tư tưởng lang thang</li>
                                <li>
                                    Reading (75 phút): Phân bổ thời gian hợp lý
                                    <ul>
                                        <li>Part 5 (30 câu): khoảng 20 phút</li>
                                        <li>Part 6 (16 câu): khoảng 15 phút</li>
                                        <li>Part 7 (54 câu): khoảng 40 phút</li>
                                    </ul>
                                </li>
                                <li>Nếu gặp câu khó, hãy đánh dấu và quay lại sau</li>
                            </ul>

                            <h2 id="practice">8. Luyện tập có phương pháp</h2>
                            <p>Luyện tập là chìa khóa để cải thiện điểm số TOEIC:</p>
                            <ul>
                                <li>Làm đề thi thử theo thời gian thực</li>
                                <li>Phân tích lỗi sai để tránh lặp lại</li>
                                <li>Tập trung vào các dạng câu hỏi mình hay sai</li>
                                <li>Luyện nghe tiếng Anh hàng ngày (podcast, tin tức, v.v.)</li>
                            </ul>

                            <img src={DEFAULT_BACKGROUND} alt="Luyện tập TOEIC" className="img-fluid rounded shadow" />

                            <h2>9. Mở rộng vốn từ vựng chuyên ngành</h2>
                            <p>
                                TOEIC tập trung vào ngữ cảnh công việc và kinh doanh. Hãy tập trung học từ vựng theo chủ
                                đề:
                            </p>
                            <ul>
                                <li>Văn phòng và thiết bị văn phòng</li>
                                <li>Thư từ và email công việc</li>
                                <li>Du lịch và giao thông</li>
                                <li>Nhân sự và tuyển dụng</li>
                                <li>Marketing và quảng cáo</li>
                                <li>Tài chính và ngân hàng</li>
                            </ul>

                            <h2>10. Điều chỉnh tâm lý trước kỳ thi</h2>
                            <p>Tâm lý ổn định giúp bạn phát huy tối đa khả năng:</p>
                            <ul>
                                <li>Chuẩn bị đầy đủ dụng cụ thi cử trước ngày thi</li>
                                <li>Ngủ đủ giấc và ăn uống lành mạnh</li>
                                <li>Đến địa điểm thi sớm để tránh căng thẳng</li>
                                <li>Tập các bài tập thư giãn nếu cảm thấy lo lắng</li>
                            </ul>

                            <h2 id="conclusion">Kết luận</h2>
                            <p>
                                Bài thi TOEIC không chỉ kiểm tra kiến thức tiếng Anh mà còn đánh giá kỹ năng quản lý
                                thời gian và chiến lược làm bài của bạn. Với 10 chiến lược trên, hi vọng bạn sẽ tự tin
                                hơn và đạt được điểm số mong muốn.
                            </p>

                            <p>
                                Hãy nhớ rằng, việc cải thiện điểm TOEIC đòi hỏi thời gian và sự kiên trì. Đừng nản lòng
                                nếu không thấy tiến bộ ngay lập tức. Hãy tin tưởng vào quá trình học tập của mình và
                                tiếp tục cố gắng!
                            </p>
                        </div>

                        <div className="author-box">
                            <div className="d-flex">
                                <img src={DEFAULT_AVATAR} alt="Author" className={`${cx('author-img')} me-4`} />
                                <div>
                                    <h5 className="fw-bold">Nguyễn Minh Tuấn</h5>
                                    <p className="text-muted">
                                        Giảng viên tiếng Anh với hơn 10 năm kinh nghiệm giảng dạy TOEIC. Tốt nghiệp Thạc
                                        sĩ Ngôn ngữ Anh tại Đại học Oxford, UK.
                                    </p>
                                    <div className="d-flex">
                                        <a href="#" className="me-2 text-primary">
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                        <a href="#" className="me-2 text-primary">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#" className="me-2 text-primary">
                                            <i className="fab fa-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${cx('social-share')} mb-5`}>
                            <h5 className="fw-bold mb-3">Chia sẻ bài viết</h5>
                            <div className="d-flex">
                                <a href="#" className="bg-primary">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="bg-info">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="bg-success">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                                <a href="#" className="bg-danger">
                                    <i className="fab fa-pinterest"></i>
                                </a>
                                <a href="#" className="bg-secondary">
                                    <i className="fas fa-envelope"></i>
                                </a>
                            </div>
                        </div>

                        <div className={`${cx('comments')}`}>
                            <h4 className="fw-bold mb-4">Bình luận (4)</h4>

                            <div className={`${cx('comment')} mb-4`}>
                                <div className="d-flex">
                                    <img src={DEFAULT_AVATAR} alt="User" className={`${cx('author-img')} me-3`} />
                                    <div>
                                        <h6 className="fw-bold mb-1">Trần Thanh Hà</h6>
                                        <p className="text-muted small mb-2">05/05/2025 • 10:15</p>
                                        <p>
                                            Bài viết rất bổ ích! Tôi đã áp dụng chiến lược scanning trong phần Reading
                                            và thấy cải thiện rõ rệt về tốc độ làm bài. Cảm ơn tác giả!
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <a href="#" className="text-muted me-3">
                                                <i className="far fa-thumbs-up me-1"></i> Thích (12)
                                            </a>
                                            <a href="#" className="text-muted">
                                                <i className="far fa-comment me-1"></i> Phản hồi
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="comment mb-4">
                                <div className="d-flex">
                                    <img src={DEFAULT_AVATAR} alt="User" className={`${cx('author-img')} me-3`} />
                                    <div>
                                        <h6 className="fw-bold mb-1">Lê Minh Đức</h6>
                                        <p className="text-muted small mb-2">04/05/2025 • 16:23</p>
                                        <p>
                                            Tôi sắp thi TOEIC vào tháng tới và đang rất lo lắng về phần nghe. Có thể
                                            chia sẻ thêm về cách cải thiện kỹ năng nghe cho Part 3 và 4 được không ạ?
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <a href="#" className="text-muted me-3">
                                                <i className="far fa-thumbs-up me-1"></i> Thích (5)
                                            </a>
                                            <a href="#" className="text-muted">
                                                <i className="far fa-comment me-1"></i> Phản hồi
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 ms-5">
                                    <div className="d-flex">
                                        <img src={DEFAULT_AVATAR} alt="Author" className={`${cx('author-img')} me-3`} />
                                        <div>
                                            <h6 className="fw-bold mb-1">
                                                Nguyễn Minh Tuấn <span className="badge bg-primary">Tác giả</span>
                                            </h6>
                                            <p className="text-muted small mb-2">04/05/2025 • 19:45</p>
                                            <p>
                                                Chào bạn Đức, để cải thiện Part 3-4, tôi khuyên bạn nên luyện nghe nói
                                                từ podcast hoặc TED Talks thường xuyên. Thử luyện tập ghi chú nhanh các
                                                thông tin quan trọng và tập trung vào ý chính thay vì cố gắng hiểu từng
                                                từ. Chúc bạn may mắn!
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="text-muted me-3">
                                                    <i className="far fa-thumbs-up me-1"></i> Thích (3)
                                                </a>
                                                <a href="#" className="text-muted">
                                                    <i className="far fa-comment me-1"></i> Phản hồi
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className={`${cx('toc')}`}>
                            <h5 className="fw-bold mb-3">Mục lục</h5>
                            <ul>
                                <li>
                                    <a href="#intro">Giới thiệu</a>
                                </li>
                                <li>
                                    <a href="#listening">Chiến lược cho phần Listening</a>
                                    <ul>
                                        <li>
                                            <a href="#part1">Part 1: Photographs</a>
                                        </li>
                                        <li>
                                            <a href="#part2">Part 2: Question-Response</a>
                                        </li>
                                        <li>
                                            <a href="#part3-4">Part 3 & 4: Conversations and Talks</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#reading">Chiến lược cho phần Reading</a>
                                    <ul>
                                        <li>
                                            <a href="#part5">Part 5: Incomplete Sentences</a>
                                        </li>
                                        <li>
                                            <a href="#part6">Part 6: Text Completion</a>
                                        </li>
                                        <li>
                                            <a href="#part7">Part 7: Reading Comprehension</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#time-management">Quản lý thời gian</a>
                                </li>
                                <li>
                                    <a href="#practice">Luyện tập hiệu quả</a>
                                </li>
                                <li>
                                    <a href="#conclusion">Kết luận</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailBlog;
