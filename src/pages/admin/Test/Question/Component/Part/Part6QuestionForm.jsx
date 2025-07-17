// Part6QuestionForm.jsx
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import usePassageOptions from '@/utils/usePassageOptions';
import ChoiceInput from './ChoiceInput';
import PropTypes from 'prop-types';

function Part6QuestionForm({
    formData,
    setFormData,
    questions,
    onChangeQuestion,
    onResetQuestions,
    // New props for edit mode
    defaultValues = {},
    mode = 'create',
    onSubmit,
    loading,
}) {
    const passageOptions = usePassageOptions();
    // Thêm đoạn văn hiện tại vào passageOptions nếu chưa có (chỉ cho edit mode)
    const currentPassage = defaultValues?.doan_van
        ? { value: defaultValues.doan_van.id_doan_van, label: defaultValues.doan_van.tieu_de }
        : null;
    const mergedPassageOptions =
        currentPassage && !passageOptions.some((o) => o.value === currentPassage.value)
            ? [currentPassage, ...passageOptions]
            : passageOptions;
    // Xử lý trường hợp questions là 1 object đơn lẻ (edit mode)
    let normalizedQuestions = questions;
    if (!Array.isArray(questions)) {
        normalizedQuestions = [questions];
    }
    // Đảm bảo mỗi câu hỏi có đủ 4 đáp án
    normalizedQuestions = normalizedQuestions.map((q) => ({
        ...q,
        lua_chon: Array(4)
            .fill(0)
            .map((_, i) => ({
                noi_dung: q?.lua_chon?.[i]?.noi_dung || '',
                ky_tu_lua_chon: ['A', 'B', 'C', 'D'][i],
            })),
    }));

    // -------------------- EDIT MODE --------------------
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues:
            mode === 'edit'
                ? {
                      muc_do_kho: defaultValues?.muc_do_kho || '',
                      trang_thai: defaultValues?.trang_thai || '',
                      id_doan_van: defaultValues?.doan_van?.id_doan_van || '',

                      cau_hoi: normalizedQuestions.map((q) => ({
                          noi_dung: q.noi_dung ?? '',
                          dap_an_dung: q.dap_an_dung || 'A',
                          giai_thich: q.giai_thich ?? '',
                          lua_chon: ['A', 'B', 'C', 'D'].map((letter) => {
                              const found = (q.lua_chon || []).find((lc) => lc.ky_tu_lua_chon === letter);
                              return { noi_dung: found?.noi_dung ?? '', ky_tu_lua_chon: letter };
                          }),
                      })),
                  }
                : {},
    });

    const submit = (values) => {
        if (typeof onSubmit === 'function') onSubmit(values);
    };

    if (mode === 'edit') {
        return (
            <form onSubmit={handleSubmit(submit)}>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Đoạn văn</label>
                        <Controller
                            control={control}
                            name="id_doan_van"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={mergedPassageOptions}
                                    value={mergedPassageOptions.find((o) => String(o.value) === String(field.value))}
                                    onChange={(val) => field.onChange(val?.value)}
                                    isDisabled={true}
                                />
                            )}
                        />
                        {/* Hiển thị hình ảnh đoạn văn nếu có */}
                        {defaultValues?.doan_van?.danh_sach_phuong_tien?.length > 0 && (
                            <div className="mt-2">
                                {defaultValues.doan_van.danh_sach_phuong_tien
                                    .filter((pt) => pt.loai_phuong_tien === 'hinh_anh')
                                    .map((pt) => (
                                        <img
                                            key={pt.id_phuong_tien}
                                            src={pt.url_phuong_tien}
                                            alt="Đoạn văn minh họa"
                                            style={{
                                                maxWidth: 200,
                                                maxHeight: 200,
                                                objectFit: 'contain',
                                                marginRight: 8,
                                            }}
                                        />
                                    ))}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Độ khó</label>
                        <Controller
                            control={control}
                            name="muc_do_kho"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={[
                                        { value: 'de', label: 'Dễ' },
                                        { value: 'trung_binh', label: 'Trung bình' },
                                        { value: 'kho', label: 'Khó' },
                                    ]}
                                    value={[
                                        { value: 'de', label: 'Dễ' },
                                        { value: 'trung_binh', label: 'Trung bình' },
                                        { value: 'kho', label: 'Khó' },
                                    ].find((o) => o.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Trạng thái</label>
                        <Controller
                            control={control}
                            name="trang_thai"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={[
                                        { value: 'da_xuat_ban', label: 'Đã xuất bản' },
                                        { value: 'luu_tru', label: 'Lưu trữ' },
                                    ]}
                                    value={[
                                        { value: 'da_xuat_ban', label: 'Đã xuất bản' },
                                        { value: 'luu_tru', label: 'Lưu trữ' },
                                    ].find((o) => o.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    isDisabled={true}
                                />
                            )}
                        />
                    </div>
                </div>
                {/* Render các câu hỏi */}
                {normalizedQuestions.map((q, idx) => {
                    const currentDapAnDung = watch(`cau_hoi.${idx}.dap_an_dung`);
                    return (
                        <div key={idx} className="border rounded p-3 mb-4">
                            {/* <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0">Câu {idx + 1}</h6>
                            </div> */}
                            {/* Hiển thị nội dung câu hỏi nếu có
                            <Controller
                                control={control}
                                name={`cau_hoi.${idx}.noi_dung`}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <label className="form-label">Nội dung</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={field.value}
                                            onChange={(_, ed) => field.onChange(ed.getData())}
                                        />
                                    </div>
                                )}
                            /> */}
                            {/* Render 4 đáp án A-D bằng component con */}
                            {['A', 'B', 'C', 'D'].map((optionLetter, index) => (
                                <Controller
                                    key={optionLetter}
                                    control={control}
                                    name={`cau_hoi.${idx}.lua_chon.${index}.noi_dung`}
                                    render={({ field }) => (
                                        <ChoiceInput
                                            questionIdx={idx}
                                            choiceIdx={index}
                                            optionLetter={optionLetter}
                                            value={field.value}
                                            isCorrect={currentDapAnDung === optionLetter}
                                            onTextChange={field.onChange}
                                            onChooseCorrect={(letter) => setValue(`cau_hoi.${idx}.dap_an_dung`, letter)}
                                        />
                                    )}
                                />
                            ))}
                            <div className="mb-3">
                                <label className="form-label">Giải thích</label>
                                <Controller
                                    control={control}
                                    name={`cau_hoi.${idx}.giai_thich`}
                                    render={({ field }) => (
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={field.value}
                                            onChange={(_, ed) => field.onChange(ed.getData())}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    );
                })}
                <div className="text-end">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? <span className="fa fa-spinner fa-spin me-2"></span> : null}
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        );
    }

    // -------------------- CREATE MODE (legacy) --------------------
    // ... giữ nguyên giao diện cũ ...
    if (!Array.isArray(questions)) return null;

    return (
        <>
            <div className="col-md-4 mb-3">
                <label htmlFor="questionPart" className="form-label">
                    Đoạn văn
                </label>
                <Select
                    options={passageOptions}
                    value={
                        passageOptions.find((option) => String(option.value) === String(formData?.id_doan_van)) || null
                    }
                    onChange={(selected) => {
                        // lưu id_doan_van vào formData của cha
                        if (setFormData) {
                            setFormData({ ...formData, id_doan_van: selected.value });
                        }
                        // reset 4 câu hỏi nếu có hàm onResetQuestions
                        if (typeof onResetQuestions === 'function') {
                            onResetQuestions();
                        }
                    }}
                />
            </div>
            {questions.map((q, idx) => (
                <div key={idx} className="border rounded p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">Câu {idx + 1}</h6>
                    </div>
                    {/* Render 4 đáp án A-D bằng component con */}
                    {['A', 'B', 'C', 'D'].map((optionLetter, index) => (
                        <ChoiceInput
                            key={optionLetter}
                            questionIdx={idx}
                            choiceIdx={index}
                            optionLetter={optionLetter}
                            value={q.lua_chon[index].noi_dung}
                            isCorrect={q.dap_an_dung === optionLetter}
                            onTextChange={(val) => {
                                const updatedOptions = [...q.lua_chon];
                                updatedOptions[index].noi_dung = val;
                                onChangeQuestion(idx, 'lua_chon', updatedOptions);
                            }}
                            onChooseCorrect={(letter) => onChangeQuestion(idx, 'dap_an_dung', letter)}
                        />
                    ))}
                    <div className="mb-3">
                        <label className="form-label">Giải thích</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={q.giai_thich}
                            onChange={(_, ed) => onChangeQuestion(idx, 'giai_thich', ed.getData())}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}

// Memo để tránh re-render không cần thiết khi props không đổi
export default memo(Part6QuestionForm);

Part6QuestionForm.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    onChangeQuestion: PropTypes.func.isRequired,
    onResetQuestions: PropTypes.func,
    // Thêm các prop cho edit mode nếu cần
};
