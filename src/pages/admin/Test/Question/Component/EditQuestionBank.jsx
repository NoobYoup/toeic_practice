import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDetailQuestion, editQuestion } from '@/services/questionService';
import { toast } from 'react-toastify';
import { QUESTION_PART } from '@/constants/question';
import Part1QuestionForm from './Part/Part1QuestionForm';
import Part2QuestionForm from './Part/Part2QuestionForm';
import Part3QuestionForm from './Part/Part3QuestionForm';
import Part4QuestionForm from './Part/Part4QuestionForm';
import Part5QuestionForm from './Part/Part5QuestionForm';
import Part6QuestionForm from './Part/Part6QuestionForm';
import Part7QuestionForm from './Part/Part7QuestionForm';

function EditQuestionBank() {
    const { id } = useParams();
    const [loadingFetch, setLoadingFetch] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [question, setQuestion] = useState(null);
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionDetail = async () => {
            setLoadingFetch(true);
            try {
                const res = await getDetailQuestion(id);
                console.log(res.data);
                setQuestion(res.data.data);
                setContent(res.data.data.noi_dung || '');
                console.log('id_phan =', res.data.data.phan.id_phan);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin câu hỏi:', error);
            }
            setLoadingFetch(false);
        };

        fetchQuestionDetail();
    }, [id]);

    if (loadingFetch) return <div className="text-center"><i className="fa-solid fa-spinner fa-spin fa-2x"></i></div>;
    if (!question) return <p>Không tìm thấy câu hỏi</p>;

    // 1. Xác định key part
    const partKey = QUESTION_PART[question.phan.id_phan];

    const FormByPart = {
        part1: Part1QuestionForm,
        part2: Part2QuestionForm,
        part3: Part3QuestionForm,
        part4: Part4QuestionForm,
        part5: Part5QuestionForm,
        part6: Part6QuestionForm,
        part7: Part7QuestionForm,
    }[partKey];


    if (!FormByPart) {
        return <p>Không có form phù hợp cho part {partKey}</p>;
    }

    const handleSubmit = async (values) => {
        setLoadingSubmit(true);
        try {
            const res = await editQuestion(id, { data: values });
            console.log(res.data);
            toast.success('Cập nhật câu hỏi thành công!');
            // navigate('/admin/question');
        } catch (error) {
            console.error('Lỗi khi cập nhật câu hỏi:', error);
            toast.error(error?.response?.data?.message || 'Đã xảy ra lỗi');
        }
        setLoadingSubmit(false);
    };



    return (
        <>
            <h1>Chỉnh sửa câu hỏi</h1>
            {/* <div className="card">
                <div className="card-body">
                    <FormByPart mode="edit" onSubmit={handleSubmit} defaultValues={question} />
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="questionType" className="form-label">
                                    Loại câu hỏi
                                </label>
                                <select className="form-select" id="questionType" required defaultValue="">
                                    <option value="" disabled>
                                        Chọn loại câu hỏi
                                    </option>
                                    <option value="listening">Listening</option>
                                    <option value="reading">Reading</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="questionPart" className="form-label">
                                    Phần
                                </label>
                                <select className="form-select" id="questionPart" required defaultValue>
                                    <option value="" disabled>
                                        Chọn phần
                                    </option>
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

                        <div className="mb-3">
                            <label htmlFor="questionContent" className="form-label">
                                Nội dung câu hỏi
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                                config={{
                                    placeholder: 'Nhập nội dung tại đây...',
                                }}
                            />
                        </div>

                        <div className="mb-3" id="imageUploadSection">
                            <label htmlFor="questionImage" className="form-label">
                                Hình ảnh (nếu có)
                            </label>
                            <input className="form-control" type="file" id="questionImage" accept="image/*" />
                        </div>

                        <div className="mb-3" id="audioSection">
                            <label htmlFor="questionAudio" className="form-label">
                                File âm thanh (cho câu hỏi Listening)
                            </label>
                            <input className="form-control" type="file" id="questionAudio" accept="audio/*" />
                        </div>

                        <hr className="my-4" />
                        <h5 className="mb-3">Các lựa chọn đáp án</h5>

                        <div className="row">
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label htmlFor="optionA" className="form-label">
                                        Lựa chọn A
                                    </label>
                                    <input type="text" className="form-control" id="optionA" required />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label htmlFor="optionB" className="form-label">
                                        Lựa chọn B
                                    </label>
                                    <input type="text" className="form-control" id="optionB" required />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label htmlFor="optionC" className="form-label">
                                        Lựa chọn C
                                    </label>
                                    <input type="text" className="form-control" id="optionC" required />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label htmlFor="optionD" className="form-label">
                                        Lựa chọn D
                                    </label>
                                    <input type="text" className="form-control" id="optionD" required />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Đáp án đúng</label>
                            <div className="btn-group w-100" role="group" aria-label="Correct answer options">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="correctAnswer"
                                    id="correctA"
                                    value="A"
                                    required
                                />
                                <label className="btn btn-outline-primary" htmlFor="correctA">
                                    A
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="correctAnswer"
                                    id="correctB"
                                    value="B"
                                />
                                <label className="btn btn-outline-primary" htmlFor="correctB">
                                    B
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="correctAnswer"
                                    id="correctC"
                                    value="C"
                                />
                                <label className="btn btn-outline-primary" htmlFor="correctC">
                                    C
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="correctAnswer"
                                    id="correctD"
                                    value="D"
                                />
                                <label className="btn btn-outline-primary" htmlFor="correctD">
                                    D
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="questionExplanation" className="form-label">
                                Giải thích (nếu có)
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                                config={{
                                    placeholder: 'Nhập nội dung tại đây...',
                                }}
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="questionLevel" className="form-label">
                                        Độ khó
                                    </label>
                                    <select className="form-select" id="questionLevel" required defaultValue>
                                        <option value="" disabled>
                                            Chọn độ khó
                                        </option>
                                        <option value="easy">Dễ</option>
                                        <option value="medium">Trung bình</option>
                                        <option value="hard">Khó</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="text-end">
                            <Link to="/admin/question-bank" type="button" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-success">
                                Thêm câu hỏi
                            </button>
                        </div>
                    </FormByPart>
                </div>
            </div> */}

            <FormByPart
                mode="edit"
                defaultValues={question}
                onSubmit={handleSubmit} // hàm updateQuestion đã viết
                loading={loadingSubmit}
            />
        </>
    );
}

export default EditQuestionBank;
