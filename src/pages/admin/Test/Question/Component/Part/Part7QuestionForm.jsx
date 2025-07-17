import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllPassage } from '@/services/passageService';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';

function Part7QuestionForm({
    defaultValues = {},
    setFormData,
    questions = [],
    onAddQuestion,
    onRemoveQuestion,
    mode = 'create',
    loading,
    onSubmit, // nhận prop onSubmit
}) {
    const [passageOptions, setPassageOptions] = useState([]);

    // Lấy danh sách đoạn văn cho Part 7
    useEffect(() => {
        async function fetchPassages() {
            try {
                const res = await getAllPassage(1); // điều chỉnh tham số tùy API
                const passages = res?.data?.data || res?.data?.passages || [];
                const options = passages.map((p) => ({
                    value: String(p.id_doan_van),
                    label: `[${p.id_doan_van}] ${p.tieu_de}`,
                }));
                setPassageOptions(options);
            } catch (err) {
                console.error('Không thể lấy danh sách đoạn văn:', err);
                setPassageOptions([]);
            }
        }
        fetchPassages();
    }, []);

    // --- Xử lý option đoạn văn hiện tại khi edit ---
    let mergedPassageOptions = passageOptions;
    if (mode === 'edit' && defaultValues?.doan_van) {
        const currentPassage = {
            value: String(defaultValues.doan_van.id_doan_van),
            label: `[${defaultValues.doan_van.id_doan_van}] ${defaultValues.doan_van.tieu_de}`,
        };
        if (!passageOptions.some((o) => o.value === currentPassage.value)) {
            mergedPassageOptions = [currentPassage, ...passageOptions];
        }
    }
    const difficultyOptions = [
        { value: 'de', label: 'Dễ' },
        { value: 'trung_binh', label: 'Trung bình' },
        { value: 'kho', label: 'Khó' },
    ];
    const statusOptions = [
        { value: 'da_xuat_ban', label: 'Đã xuất bản' },
        { value: 'luu_tru', label: 'Lưu trữ' },
        { value: 'ban_nhap', label: 'Bản nháp' },
    ];

    // --- Sử dụng react-hook-form cho edit mode ---
    const { control, handleSubmit } = useForm({
        defaultValues:
            mode === 'edit'
                ? {
                      id_doan_van: defaultValues?.doan_van?.id_doan_van || '',
                      muc_do_kho: defaultValues?.muc_do_kho || '',
                      trang_thai: defaultValues?.trang_thai || '',
                      questions: questions.map((q) => ({
                          noi_dung: q.noi_dung ?? '',
                          dap_an_dung: q.dap_an_dung || 'A',
                          giai_thich: q.giai_thich ?? '',
                          lua_chon: ['A', 'B', 'C', 'D'].map((letter, i) => ({
                              noi_dung: q.lua_chon?.[i]?.noi_dung ?? '',
                              ky_tu_lua_chon: letter,
                          })),
                      })),
                  }
                : {},
    });

    const defaultQuestion = {
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

    // Hàm thêm câu hỏi với giới hạn tối đa 5
    const handleAddQuestion = () => {
        if (questions.length >= 5) {
            toast.warning('Chỉ được thêm tối đa 5 câu hỏi', { toastId: 'max-questions' });
            return;
        }
        onAddQuestion(defaultQuestion);
    };

    return (
        <>
            {/* Passage selector */}
            {mode !== 'edit' && (
                <div className="col-md-4 mb-3">
                    <label className="form-label">Đoạn văn</label>
                    <Select
                        options={passageOptions}
                        value={
                            passageOptions.find((opt) => String(opt.value) === String(defaultValues?.id_doan_van)) ||
                            null
                        }
                        onChange={(selected) => {
                            if (setFormData) {
                                setFormData({ ...defaultValues, id_doan_van: selected.value });
                            }
                        }}
                    />
                </div>
            )}
            {mode === 'edit' && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Đoạn văn</label>
                            <Controller
                                control={control}
                                name="id_doan_van"
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={mergedPassageOptions}
                                        value={mergedPassageOptions.find(
                                            (o) => String(o.value) === String(field.value),
                                        )}
                                        isDisabled={true}
                                    />
                                )}
                            />
                            {/* Hiển thị hình ảnh đoạn văn nếu có
                        {defaultValues?.doan_van?.danh_sach_phuong_tien?.length > 0 && (
                            <div className="d-flex flex-wrap gap-2">
                                {defaultValues.doan_van.danh_sach_phuong_tien
                                    .filter((pt) => pt.loai_phuong_tien === 'hinh_anh')
                                    .map((pt) => (
                                        <img
                                            key={pt.id_phuong_tien}
                                            src={pt.url_phuong_tien}
                                            alt="Đoạn văn minh họa"
                                            className="img-fluid rounded border"
                                            style={{ maxWidth: '180px', maxHeight: '180px', objectFit: 'contain' }}
                                        />
                                    ))}
                            </div>
                        )} */}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Độ khó</label>
                            <Controller
                                control={control}
                                name="muc_do_kho"
                                render={({ field }) => (
                                    <Select
                                        options={difficultyOptions}
                                        value={difficultyOptions.find((o) => o.value === field.value) || null}
                                        onChange={(option) => field.onChange(option?.value)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Trạng thái</label>
                            <Controller
                                control={control}
                                name="trang_thai"
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={statusOptions}
                                        value={statusOptions.find((o) => o.value === field.value) || null}
                                        isDisabled={true}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {questions.map((q, idx) => (
                        <div key={idx} className="border rounded p-3 mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0">Câu {idx + 1}</h6>
                                {mode !== 'edit' && questions.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => onRemoveQuestion(idx)}
                                    >
                                        Xóa
                                    </button>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nội dung</label>
                                <Controller
                                    control={control}
                                    name={`questions.${idx}.noi_dung`}
                                    defaultValue={q.noi_dung}
                                    render={({ field }) => (
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={field.value}
                                            onChange={(_, ed) => field.onChange(ed.getData())}
                                        />
                                    )}
                                />
                            </div>
                            {/* Render 4 đáp án A-D bằng Controller */}
                            {['A', 'B', 'C', 'D'].map((option, index) => (
                                <div className="mb-3" key={option}>
                                    <Controller
                                        control={control}
                                        name={`questions.${idx}.dap_an_dung`}
                                        render={({ field }) => (
                                            <input
                                                type="radio"
                                                className="form-check-input me-2"
                                                id={`q${idx}-option${option}`}
                                                name={`answerOption${idx}`}
                                                value={option}
                                                checked={field.value === option}
                                                onChange={() => field.onChange(option)}
                                                disabled={mode === 'edit' && loading}
                                            />
                                        )}
                                    />
                                    <label htmlFor={`q${idx}-option${option}`} className="form-label">
                                        Lựa chọn {option}
                                    </label>
                                    <Controller
                                        control={control}
                                        name={`questions.${idx}.lua_chon.${index}.noi_dung`}
                                        defaultValue={q.lua_chon[index].noi_dung}
                                        render={({ field }) => (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id={`q${idx}-option${option}-input`}
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={mode === 'edit' && loading}
                                            />
                                        )}
                                    />
                                </div>
                            ))}
                            <div className="mb-3">
                                <label className="form-label">Giải thích</label>
                                <Controller
                                    control={control}
                                    name={`questions.${idx}.giai_thich`}
                                    defaultValue={q.giai_thich}
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
                    ))}

                    {mode !== 'edit' && (
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={handleAddQuestion}
                            disabled={questions.length >= 5}
                        >
                            Thêm câu hỏi
                        </button>
                    )}
                    {/* Nút lưu thay đổi khi ở chế độ edit */}
                    {mode === 'edit' && (
                        <div className="text-end">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? <span className="fa fa-spinner fa-spin me-2"></span> : null}
                                Lưu thay đổi
                            </button>
                        </div>
                    )}
                </form>
            )}
        </>
    );
}

export default Part7QuestionForm;
