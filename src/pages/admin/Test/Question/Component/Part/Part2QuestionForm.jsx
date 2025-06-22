// Part2QuestionForm.jsx
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import classNames from 'classnames/bind';
import styles from '../CreateQuestionBank.module.scss';
import { getAllQuestion } from '@/services/questionService';

const cx = classNames.bind(styles);

function Part2QuestionForm({
    // các prop cho create mode cũ vẫn giữ nguyên để không phá vỡ chức năng tạo mới
    formData,
    setFormData,
    handleAudioChange,
    audioPreview,
    removeAudio,
    formatFileSize,
    // prop cho edit mode mới
    defaultValues = {},
    mode = 'create',
    onSubmit,
    loading,
}) {
    /* -------------------- Helpers an toàn cho create-mix props -------------------- */
    const safeFormatFileSize = (bytes) => {
        if (typeof formatFileSize === 'function') return formatFileSize(bytes);
        if (!bytes && bytes !== 0) return '';
        return `${(bytes / 1024).toFixed(1)} KB`;
    };

    const safeRemoveAudio = typeof removeAudio === 'function' ? removeAudio : () => {};
    const safeHandleAudioChange = typeof handleAudioChange === 'function' ? handleAudioChange : () => {};

    /* -------------------- Common select options (difficulty, status, part) -------------------- */
    const [difficultyOptions, setDifficultyOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [partOptions, setPartOptions] = useState([]);

    useEffect(() => {
        async function fetchOptions() {
            try {
                const res = await getAllQuestion(1, {});
                setDifficultyOptions(
                    (res.data.dsMucDoKho || []).map((item) => ({
                        value: item,
                        label: item === 'de' ? 'Dễ' : item === 'trung_binh' ? 'Trung bình' : item === 'kho' ? 'Khó' : item,
                    })),
                );
                setStatusOptions(
                    (res.data.dsTrangThai || []).map((item) => ({
                        value: item,
                        label: item === 'da_xuat_ban' ? 'Đã xuất bản' : item === 'luu_tru' ? 'Lưu trữ' : item,
                    })),
                );
                setPartOptions((res.data.dsPhan || []).map((item) => ({ value: item.id_phan, label: item.ten_phan })));
            } catch (e) {
                setDifficultyOptions([]);
                setStatusOptions([]);
                setPartOptions([]);
            }
        }
        fetchOptions();
    }, []);

    /* -------------------- REACT HOOK FORM for edit & create-unified -------------------- */
    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm({
        defaultValues: mode === 'edit' ? defaultValues : undefined,
    });

    // reset when defaultValues change in edit mode
    useEffect(() => {
        if (mode === 'edit') {
            reset({
                ...defaultValues,
                phan: String(defaultValues?.phan?.id_phan || ''),
              });
        }
    }, [mode, defaultValues, reset]);

    /* -------------------- Audio preview handling (edit mode) -------------------- */

    /* -------------------- Submit -------------------- */
    const submit = (values) => {
        // react-hook-form không biết file, nên phải lấy thủ công
        const audioFile = document.getElementById('questionAudio')?.files?.[0];
        onSubmit?.({ ...values, am_thanh: audioFile });
    };

    /* -------------------- RENDER -------------------- */
    if (mode === 'edit') {
        return (
            <form onSubmit={handleSubmit(submit)}>
                {/* Phần, Độ khó, Trạng thái */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Phần</label>
                        <Controller
                            control={control}
                            name="phan"
                            defaultValue={String(defaultValues.phan?.id_phan || '')}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={partOptions.map((o) => ({ ...o, value: String(o.value) }))}
                                    value={partOptions
                                        .map((o) => ({ ...o, value: String(o.value) }))
                                        .find((o) => o.value === String(field.value))}
                                    isDisabled
                                />
                            )}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Độ khó</label>
                        <Controller
                            control={control}
                            name="muc_do_kho"
                            defaultValue={defaultValues.muc_do_kho || ''}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={difficultyOptions}
                                    onChange={(val) => field.onChange(val?.value)}
                                    value={difficultyOptions.find((o) => o.value === field.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Trạng thái</label>
                        <Controller
                            control={control}
                            name="trang_thai"
                            defaultValue={defaultValues.trang_thai || ''}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={statusOptions}
                                    onChange={(val) => field.onChange(val?.value)}
                                    value={statusOptions.find((o) => o.value === field.value)}
                                />
                            )}
                        />
                    </div>
                </div>

                {audioPreview || defaultValues.am_thanh.url_phuong_tien && (
                    
                        <audio controls className="w-100" style={{ maxWidth: '400px' }}>
                            <source src={audioPreview || defaultValues.am_thanh.url_phuong_tien} />
                            Trình duyệt của bạn không hỗ trợ phát audio.
                        </audio>
                   
                )}

                {/* Nội dung câu hỏi */}
                <div className="mb-3">
                    <label className="form-label">Nội dung câu hỏi</label>
                    <Controller
                        control={control}
                        name="noi_dung"
                        defaultValue={defaultValues.noi_dung || ''}
                        render={({ field }) => (
                            <CKEditor
                                editor={ClassicEditor}
                                data={field.value}
                                onChange={(event, editor) => field.onChange(editor.getData())}
                            />
                        )}
                    />
                </div>

                {/* 3 lựa chọn */}
                {['A', 'B', 'C'].map((option, index) => (
                    <div className="mb-3" key={option}>
                        <input
                            type="radio"
                            className="form-check-input me-2"
                            id={`option${option}`}
                            {...register('dap_an_dung')}
                            value={option}
                            defaultChecked={defaultValues.dap_an_dung === option}
                        />
                        <label htmlFor={`option${option}`} className="form-label">
                            Lựa chọn {option}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            {...register(`lua_chon.${index}.noi_dung`)}
                            defaultValue={defaultValues.lua_chon?.[index]?.noi_dung || ''}
                        />
                    </div>
                ))}

                {/* Giải thích */}
                <div className="mb-3">
                    <label className="form-label">Giải thích (nếu có)</label>
                    <Controller
                        control={control}
                        name="giai_thich"
                        defaultValue={defaultValues.giai_thich || ''}
                        render={({ field }) => (
                            <CKEditor
                                editor={ClassicEditor}
                                data={field.value}
                                onChange={(event, editor) => field.onChange(editor.getData())}
                            />
                        )}
                    />
                </div>

                <div className="text-end">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading && <i className="fas fa-spinner fa-spin me-2"></i>}
                        {mode === 'edit' ? 'Lưu thay đổi' : 'Thêm câu hỏi'}
                    </button>
                </div>
            </form>
        );
    }

    /* -------------------- CREATE MODE (giữ nguyên logic cũ) -------------------- */
    return (
        <>
            <div className={cx('requirement-info')}>
                <h6>
                    <i className="fas fa-info-circle"></i> Yêu cầu Part 2:
                </h6>
                <ul className={cx('requirement-list')}>
                    <li>Bắt buộc có 1 file âm thanh (bao gồm cả câu hỏi và 3 đáp án A, B, C)</li>
                </ul>
            </div>
            {/* phần tạo mới giữ nguyên code cũ */}
            <div className="mb-3" id="audioSection">
                <label htmlFor="questionAudio" className="form-label">
                    Âm thanh (Bắt buộc cho part 2)
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="questionAudio"
                    accept="audio/*"
                    onChange={handleAudioChange}
                />
            </div>

            {audioPreview && (
                <div className="mb-3 p-3 border rounded bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div
                                className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: '32px', height: '32px' }}
                            >
                                <i className="fas fa-music text-success"></i>
                            </div>
                            <div>
                                <p className="mb-0 fw-medium">{formData?.audio?.name}</p>
                                <small className="text-muted">{formatFileSize(formData?.audio?.size)}</small>
                            </div>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={removeAudio}>
                            <i className="fas fa-trash-alt me-1"></i>Xóa
                        </button>
                    </div>
                    <div className="mt-3">
                        <audio controls className="w-100" style={{ maxWidth: '400px' }}>
                            <source src={audioPreview} />
                            Trình duyệt của bạn không hỗ trợ phát audio.
                        </audio>
                    </div>
                </div>
            )}

            <hr className="my-4" />
            {/* Nội dung câu hỏi create */}
            <div className="mb-3">
                <label htmlFor="questionContent" className="form-label">
                    Nội dung câu hỏi (hỏi đáp ngắn)
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData?.noi_dung}
                    onChange={(event, editor) => setFormData({ ...formData, noi_dung: editor.getData() })}
                    config={{ placeholder: 'Nhập câu hỏi hỏi đáp ngắn...' }}
                />
            </div>

            {['A', 'B', 'C'].map((option, index) => (
                <div className="mb-3" key={option}>
                    <input
                        type="radio"
                        className="form-check-input me-2"
                        id={`option${option}`}
                        name="answerOption"
                        value={option}
                        onChange={(e) => setFormData({ ...formData, dap_an_dung: e.target.value })}
                    />
                    <label htmlFor={`option${option}`} className="form-label">
                        Lựa chọn {option}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id={`option${option}`}
                        value={formData?.lua_chon?.[index]?.noi_dung}
                        onChange={(e) => {
                            const updatedOptions = [...formData.lua_chon];
                            updatedOptions[index].noi_dung = e.target.value;
                            setFormData({ ...formData, lua_chon: updatedOptions });
                        }}
                    />
                </div>
            ))}

            <hr className="my-4" />
            <div className="mb-3">
                <label htmlFor="questionExplanation" className="form-label">
                    Giải thích (nếu có)
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData?.giai_thich}
                    onChange={(event, editor) => setFormData({ ...formData, giai_thich: editor.getData() })}
                    config={{ placeholder: 'Nhập nội dung tại đây...' }}
                />
            </div>
        </>
    );
}

export default Part2QuestionForm;

