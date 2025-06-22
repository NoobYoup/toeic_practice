import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { createQuestion, getAllQuestion } from '@/services/questionService';
import Part1QuestionForm from './Part/Part1QuestionForm';
import Part2QuestionForm from './Part/Part2QuestionForm';
import Part3QuestionForm from './Part/Part3QuestionForm';
import Part4QuestionForm from './Part/Part4QuestionForm';
import Part5QuestionForm from './Part/Part5QuestionForm';
import Part6QuestionForm from './Part/Part6QuestionForm';
import Part7QuestionForm from './Part/Part7QuestionForm';

import classNames from 'classnames/bind';
import styles from './CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function CreateQuestionBank() {
    const formRef = useRef(null);
    const navigate = useNavigate();

    // lưu meta (muc_do_kho, trang_thai) cho các part có allPartsData là mảng
    const [partMeta, setPartMeta] = useState({
        3: { muc_do_kho: 'trung_binh', trang_thai: 'da_xuat_ban' },
        4: { muc_do_kho: 'trung_binh', trang_thai: 'da_xuat_ban' },
        5: { muc_do_kho: 'trung_binh', trang_thai: 'da_xuat_ban' },
    });

    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);

    // Danh sách động lấy từ API
    const [dsPhan, setDsPhan] = useState([]);
    const [dsMucDoKho, setDsMucDoKho] = useState([]);
    const [dsTrangThai, setDsTrangThai] = useState([]);

    useEffect(() => {
        // Lấy danh sách các giá trị động từ API (dựa trên getAllQuestion)
        async function fetchOptions() {
            try {
                const res = await getAllQuestion(1, {});
                setDsPhan(res.data.dsPhan || []);
                setDsMucDoKho(
                    (res.data.dsMucDoKho || []).map((item) => ({
                        value: item,
                        label:
                            item === 'de' ? 'Dễ' : item === 'trung_binh' ? 'Trung bình' : item === 'kho' ? 'Khó' : item,
                    })),
                );
                setDsTrangThai(
                    (res.data.dsTrangThai || []).map((item) => ({
                        value: item,
                        label: item === 'da_xuat_ban' ? 'Đã xuất bản' : item === 'luu_tru' ? 'Lưu trữ' : item,
                    })),
                );
            } catch (err) {
                // fallback nếu lỗi
                setDsPhan([]);
                setDsMucDoKho([]);
                setDsTrangThai([]);
            }
        }
        fetchOptions();
    }, []);

    // fix lỗi part 3-7 khi chọn độ khó và trạng thái
    const getCurrentPartData = () => {
        if (currentPart === 1 || currentPart === 2) return formData;
        if (currentPart === 3 || currentPart === 4 || currentPart === 5) return partMeta[currentPart];
        return allPartsData[currentPart];
    };

    // khởi tạo dữ liệu từ part 1 -> 7
    const defaultPart6Questions = Array(4)
        .fill(0)
        .map(() => ({
            noi_dung: '',
            dap_an_dung: '',
            giai_thich: '',
            lua_chon: [
                { ky_tu_lua_chon: 'A', noi_dung: '' },
                { ky_tu_lua_chon: 'B', noi_dung: '' },
                { ky_tu_lua_chon: 'C', noi_dung: '' },
                { ky_tu_lua_chon: 'D', noi_dung: '' },
            ],
        }));

    // Câu hỏi mặc định cho Part 7
    const defaultPart7Question = {
        noi_dung: '',
        dap_an_dung: '',
        giai_thich: '',
        lua_chon: [
            { ky_tu_lua_chon: 'A', noi_dung: '' },
            { ky_tu_lua_chon: 'B', noi_dung: '' },
            { ky_tu_lua_chon: 'C', noi_dung: '' },
            { ky_tu_lua_chon: 'D', noi_dung: '' },
        ],
    };

    const initialAllPartsData = {
        1: {
            noi_dung: '',
            dap_an_dung: '',
            giai_thich: '',
            image: null,
            audio: null,
            passage: '',
            muc_do_kho: 'de',
            trang_thai: 'da_xuat_ban',
            nguon_goc: 'thu_cong',
            lua_chon: [
                { ky_tu_lua_chon: 'A', noi_dung: '' },
                { ky_tu_lua_chon: 'B', noi_dung: '' },
                { ky_tu_lua_chon: 'C', noi_dung: '' },
                { ky_tu_lua_chon: 'D', noi_dung: '' },
            ],
        },
        2: {
            noi_dung: '',
            dap_an_dung: '',
            giai_thich: '',
            audio: null,
            muc_do_kho: 'de',
            trang_thai: 'da_xuat_ban',
            nguon_goc: 'thu_cong',
            lua_chon: [
                { ky_tu_lua_chon: 'A', noi_dung: '' },
                { ky_tu_lua_chon: 'B', noi_dung: '' },
                { ky_tu_lua_chon: 'C', noi_dung: '' },
            ],
        },
        3: [
            {
                noi_dung: '',
                dap_an_dung: '',
                giai_thich: '',
                audio: null,
                audioPreview: null,
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
            {
                noi_dung: '',
                dap_an_dung: '',
                giai_thich: '',
                audio: null,
                audioPreview: null,
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
            {
                noi_dung: '',
                dap_an_dung: '',
                giai_thich: '',
                audio: null,
                audioPreview: null,
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
        ],
        4: [
            {
                noi_dung: '',
                dap_an_dung: '',
                giai_thich: '',
                audio: null,
                audioPreview: null,
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
            {
                noi_dung: '',
                dap_an_dung: '',
                giai_thich: '',
                audio: null,
                audioPreview: null,
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
            {
                noi_dung: '',
                dap_an_dung: '',
                giai_thich: '',
                audio: null,
                audioPreview: null,
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
        ],
        5: [
            {
                noi_dung: '',
                dap_an_dung: '',
                giai_thich: '',
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
        ],
        6: [
            {
                passage: '',
                dap_an_dung: '',
                giai_thich: '',
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
            {
                passage: '',
                dap_an_dung: '',
                giai_thich: '',
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
            {
                passage: '',
                dap_an_dung: '',
                giai_thich: '',
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
            {
                passage: '',
                dap_an_dung: '',
                giai_thich: '',
                lua_chon: [
                    { ky_tu_lua_chon: 'A', noi_dung: '' },
                    { ky_tu_lua_chon: 'B', noi_dung: '' },
                    { ky_tu_lua_chon: 'C', noi_dung: '' },
                    { ky_tu_lua_chon: 'D', noi_dung: '' },
                ],
            },
        ],
        7: {
            id_doan_van: '',
            questions: [defaultPart7Question],
        },
    };

    const [allPartsData, setAllPartsData] = useState(initialAllPartsData);

    // Đảm bảo Part 6/7 có cấu trúc chuẩn
    useEffect(() => {
        setAllPartsData((prev) => {
            // Normalize Part 6
            if (Array.isArray(prev[6])) {
                // Chuyển từ mảng -> object chuẩn
                return { ...prev, 6: { id_doan_van: '', questions: prev[6] } };
            }
            if (!Array.isArray(prev[6].questions) || prev[6].questions.length !== 4) {
                return { ...prev, 6: { ...prev[6], questions: defaultPart6Questions } };
            }
            // Normalize Part 7
            let updated = prev;
            if (Array.isArray(prev[7])) {
                updated = { ...updated, 7: { id_doan_van: '', questions: prev[7] } };
            }
            if (!Array.isArray(updated[7].questions) || updated[7].questions.length === 0) {
                updated = { ...updated, 7: { ...updated[7], questions: [defaultPart7Question] } };
            }
            return updated;
        });
    }, []);

    const [currentPart, setCurrentPart] = useState(1);

    const formData = allPartsData[currentPart];
    const setFormData = (newData) => setAllPartsData((prev) => ({ ...prev, [currentPart]: newData }));

    // Tạo option cho react-select từ dsPhan
    const partOptions = dsPhan.map((item) => ({ value: item.id_phan, label: item.ten_phan }));

    // Xử lý upload ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedImage(file);

        if (currentPart === 3) {
            // store only on first question
            setAllPartsData((prev) => ({
                ...prev,
                3: prev[3].map((q, idx) => (idx === 0 ? { ...q, image: file } : q)),
            }));
        } else {
            setFormData({ ...formData, image: file });
        }

        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
    };

    // Xử lý upload audio
    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedAudio(file);

        const url = URL.createObjectURL(file);
        setAudioPreview(url);

        if (currentPart === 3 || currentPart === 4) {
            setAllPartsData((prev) => ({
                ...prev,
                [currentPart]: prev[currentPart].map((q, idx) => (idx === 0 ? { ...q, audio: file } : q)),
            }));
        } else {
            setFormData({ ...formData, audio: file });
        }
    };

    // Xóa ảnh
    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);

        if (currentPart === 3) {
            setAllPartsData((prev) => ({
                ...prev,
                3: prev[3].map((q, idx) => (idx === 0 ? { ...q, image: null } : q)),
            }));
        } else {
            setFormData({ ...formData, image: null });
        }

        const input = document.getElementById('questionImage');
        if (input) input.value = '';
    };

    // Xóa audio
    const removeAudio = () => {
        setSelectedAudio(null);
        if (audioPreview) URL.revokeObjectURL(audioPreview);
        setAudioPreview(null);

        if (currentPart === 3 || currentPart === 4) {
            setAllPartsData((prev) => ({
                ...prev,
                [currentPart]: prev[currentPart].map((q, idx) => (idx === 0 ? { ...q, audio: null } : q)),
            }));
        } else {
            setFormData({ ...formData, audio: null });
        }

        const input = document.getElementById('questionAudio');
        if (input) input.value = '';
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Render form theo part
    const renderQuestionForm = () => {
        switch (currentPart) {
            case 1:
                return (
                    <Part1QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        handleImageChange={handleImageChange}
                        imagePreview={imagePreview}
                        removeImage={removeImage}
                        formatFileSize={formatFileSize}
                        handleAudioChange={handleAudioChange}
                        audioPreview={audioPreview}
                        removeAudio={removeAudio}
                    />
                );
            case 2:
                return (
                    <Part2QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        handleAudioChange={handleAudioChange}
                        audioPreview={audioPreview}
                        removeAudio={removeAudio}
                        formatFileSize={formatFileSize}
                    />
                );
            case 3:
                return (
                    <Part3QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        questions={allPartsData[3]}
                        onChangeQuestion={handlePart3Change}
                        handleImageChange={handleImageChange}
                        imagePreview={imagePreview}
                        removeImage={removeImage}
                        formatFileSize={formatFileSize}
                        handleAudioChange={handleAudioChange}
                        audioPreview={audioPreview}
                        removeAudio={removeAudio}
                        audio={selectedAudio}
                    />
                );
            case 4:
                return (
                    <Part4QuestionForm
                        questions={allPartsData[4]}
                        onChangeQuestion={handlePart4Change}
                        handleAudioChange={handleAudioChange}
                        audioPreview={audioPreview}
                        removeAudio={removeAudio}
                        formatFileSize={formatFileSize}
                    />
                );
            case 5:
                return <Part5QuestionForm questions={allPartsData[5]} onChangeQuestion={handlePart5Change} />;
            case 6:
                return (
                    <Part6QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        questions={Array.isArray(allPartsData[6]) ? allPartsData[6] : allPartsData[6].questions}
                        onChangeQuestion={handlePart6Change}
                        onResetQuestions={() =>
                            setAllPartsData((prev) => ({
                                ...prev,
                                6: { ...prev[6], questions: defaultPart6Questions },
                            }))
                        }
                    />
                );
            case 7:
                return (
                    <Part7QuestionForm
                        formData={formData}
                        setFormData={setFormData}
                        questions={formData.questions || []}
                        onChangeQuestion={handlePart7Change}
                        onAddQuestion={addPart7Question}
                        onRemoveQuestion={removePart7Question}
                    />
                );
            // Thêm case cho Part 3, 4, 5 nếu cần
            default:
                return null;
        }
    };

    // Part 3 specific change handlers
    const handlePart3Change = (index, field, value) => {
        setAllPartsData((prev) => ({
            ...prev,
            3: prev[3].map((q, i) => (i === index ? { ...q, [field]: value } : q)),
        }));
    };

    const handlePart4Change = (index, field, value) => {
        setAllPartsData((prev) => ({
            ...prev,
            4: prev[4].map((q, i) => (i === index ? { ...q, [field]: value } : q)),
        }));
    };

    const handlePart5Change = (index, field, value) => {
        setAllPartsData((prev) => ({
            ...prev,
            5: prev[5].map((q, i) => (i === index ? { ...q, [field]: value } : q)),
        }));
    };

    const handlePart6Change = (index, field, value) => {
        setAllPartsData((prev) => {
            if (Array.isArray(prev[6])) {
                // chưa convert, làm việc trực tiếp trên mảng
                const newArr = prev[6].map((q, i) => (i === index ? { ...q, [field]: value } : q));
                return { ...prev, 6: newArr };
            }
            const newQuestions = prev[6].questions.map((q, i) => (i === index ? { ...q, [field]: value } : q));
            return { ...prev, 6: { ...prev[6], questions: newQuestions } };
        });
    };

    const handlePart7Change = (index, field, value) => {
        setAllPartsData((prev) => {
            const newQuestions = prev[7].questions.map((q, i) => (i === index ? { ...q, [field]: value } : q));
            return { ...prev, 7: { ...prev[7], questions: newQuestions } };
        });
    };

    const addPart7Question = (template) => {
        setAllPartsData((prev) => ({
            ...prev,
            7: { ...prev[7], questions: [...prev[7].questions, template] },
        }));
    };

    const removePart7Question = (idx) => {
        setAllPartsData((prev) => ({
            ...prev,
            7: { ...prev[7], questions: prev[7].questions.filter((_, i) => i !== idx) },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let dataToSend = { id_phan: currentPart };
            let hinh_anh = selectedImage;
            let am_thanh = selectedAudio;
            if (currentPart === 3) {
                const arr = allPartsData[3];

                if (Array.isArray(arr) && arr.length > 0) {
                    if (arr[0].image) hinh_anh = arr[0].image;
                    if (arr[0].audio) am_thanh = arr[0].audio;
                }

                const noi_dung = arr.map((q) => q.noi_dung);
                const dap_an_dung = arr.map((q) => q.dap_an_dung);
                const giai_thich = arr.map((q) => q.giai_thich);
                const lua_chon = arr.map((q) => q.lua_chon);

                dataToSend = {
                    id_phan: 3,
                    noi_dung,
                    dap_an_dung,
                    giai_thich,
                    muc_do_kho: 'trung_binh',
                    trang_thai: 'da_xuat_ban',
                    lua_chon,
                };
            } else if (currentPart === 4) {
                const arr = allPartsData[4];
                if (arr[0].audio) am_thanh = arr[0].audio;
                const noi_dung = arr.map((q) => q.noi_dung);
                const dap_an_dung = arr.map((q) => q.dap_an_dung);
                const giai_thich = arr.map((q) => q.giai_thich);
                const lua_chon = arr.map((q) => q.lua_chon);

                dataToSend = {
                    id_phan: 4,
                    noi_dung,
                    dap_an_dung,
                    giai_thich,
                    muc_do_kho: 'trung_binh',
                    trang_thai: 'da_xuat_ban',
                    lua_chon,
                };
            } else if (currentPart === 5) {
                const q = allPartsData[5][0]; // Lấy câu đầu tiên (giống Part 1)
                const { noi_dung, dap_an_dung, giai_thich, lua_chon } = q;
                dataToSend = {
                    id_phan: 5,
                    noi_dung,
                    dap_an_dung,
                    giai_thich,
                    muc_do_kho: 'trung_binh',
                    trang_thai: 'da_xuat_ban',
                    lua_chon,
                };
            } else if (currentPart === 6) {
                const part6 = allPartsData[6];
                const { id_doan_van, questions } = part6;
                const noi_dung = questions.map((q) => q.noi_dung);
                const dap_an_dung = questions.map((q) => q.dap_an_dung);
                const giai_thich = questions.map((q) => q.giai_thich);
                const lua_chon = questions.map((q) => q.lua_chon);

                dataToSend = {
                    id_phan: 6,
                    id_doan_van,
                    noi_dung,
                    dap_an_dung,
                    giai_thich,
                    muc_do_kho: 'trung_binh',
                    trang_thai: 'da_xuat_ban',
                    lua_chon,
                };
            } else if (currentPart === 7) {
                const part7 = allPartsData[7];
                const { id_doan_van, questions } = part7;
                const noi_dung = questions.map((q) => q.noi_dung);
                const dap_an_dung = questions.map((q) => q.dap_an_dung);
                const giai_thich = questions.map((q) => q.giai_thich);
                const lua_chon = questions.map((q) => q.lua_chon);

                dataToSend = {
                    id_phan: 7,
                    id_doan_van,
                    noi_dung,
                    dap_an_dung,
                    giai_thich,
                    muc_do_kho: 'trung_binh',
                    trang_thai: 'da_xuat_ban',
                    lua_chon,
                };
            } else {
                dataToSend = { id_phan: currentPart, ...formData };
            }
            await createQuestion({ hinh_anh, am_thanh, data: dataToSend });
            // navigate('/admin/test/question');
            toast.success('Câu hỏi đã được tạo thành công!');
            // Reset native form inputs (file fields, unchecked radios, etc.)
            if (formRef.current) {
                formRef.current.reset();
            }
            // Reset form
            setAllPartsData(initialAllPartsData);
            setCurrentPart(currentPart);
            setSelectedImage(null);
            setSelectedAudio(null);
            setImagePreview(null);
            setAudioPreview(null);
        } catch (error) {
            console.error('Lỗi khi tạo câu hỏi:', error);
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };

    return (
        <>
            <h1>Thêm câu hỏi mới</h1>
            <div className="card">
                <div className="card-body">
                    <form ref={formRef} onSubmit={handleSubmit} className="question-form">
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="questionPart" className="form-label">
                                    Phần
                                </label>
                                <Select
                                    options={partOptions}
                                    value={partOptions.find((option) => option.value === currentPart)}
                                    onChange={(selected) => setCurrentPart(selected.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="questionDifficulty" className="form-label">
                                    Độ khó
                                </label>
                                <Select
                                    options={dsMucDoKho}
                                    value={dsMucDoKho.find(
                                        (option) => option.value === getCurrentPartData()?.muc_do_kho,
                                    )}
                                    onChange={(selected) => {
                                        if (currentPart === 1 || currentPart === 2) {
                                            setFormData({ ...formData, muc_do_kho: selected.value });
                                        } else if (currentPart === 3 || currentPart === 4 || currentPart === 5) {
                                            setPartMeta((prev) => ({
                                                ...prev,
                                                [currentPart]: { ...prev[currentPart], muc_do_kho: selected.value },
                                            }));
                                        } else {
                                            setAllPartsData((prev) => ({
                                                ...prev,
                                                [currentPart]: { ...prev[currentPart], muc_do_kho: selected.value },
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="questionStatus" className="form-label">
                                    Trạng thái
                                </label>
                                <Select
                                    options={dsTrangThai}
                                    value={dsTrangThai.find(
                                        (option) => option.value === getCurrentPartData()?.trang_thai,
                                    )}
                                    onChange={(selected) => {
                                        if (currentPart === 1 || currentPart === 2) {
                                            setFormData({ ...formData, trang_thai: selected.value });
                                        } else if (currentPart === 3 || currentPart === 4 || currentPart === 5) {
                                            setPartMeta((prev) => ({
                                                ...prev,
                                                [currentPart]: { ...prev[currentPart], trang_thai: selected.value },
                                            }));
                                        } else {
                                            setAllPartsData((prev) => ({
                                                ...prev,
                                                [currentPart]: { ...prev[currentPart], trang_thai: selected.value },
                                            }));
                                        }
                                    }}
                                    // isDisabled={!dsTrangThai.length}
                                />
                            </div>
                        </div>

                        {renderQuestionForm()}

                        <div className="text-end">
                            <Link to="/admin/test/question" type="button" className="btn btn-secondary me-2">
                                Hủy
                            </Link>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                                Thêm câu hỏi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateQuestionBank;
