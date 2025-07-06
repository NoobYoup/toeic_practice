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
                setQuestion(res.data.data);
                setContent(res.data.data.noi_dung || '');
            } catch (error) {
                console.error('Lỗi khi lấy thông tin câu hỏi:', error);
                toast.error(error.response?.data?.message);
            }
            setLoadingFetch(false);
        };

        fetchQuestionDetail();
    }, [id]);

    if (loadingFetch)
        return (
            <div className="text-center">
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            </div>
        );
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
            toast.success(res.data.message);
            // navigate(`/admin/test/question/detail-question/${id}`);
        } catch (error) {
            console.error('Lỗi khi cập nhật câu hỏi:', error);
            toast.error(error?.response?.data?.message || 'Đã xảy ra lỗi');
        }
        setLoadingSubmit(false);
    };

    return (
        <>
            <h1>Chỉnh sửa câu hỏi</h1>
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
