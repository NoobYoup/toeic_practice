import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { useState, useEffect, useRef } from 'react';
import { getAllPassage } from '@/services/passageService';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import ChoiceInput from './ChoiceInput';
import { useFieldArray } from 'react-hook-form';

function Part7QuestionForm({
    defaultValues = {},
    formData = {},
    setFormData,
    questions = [],
    onAddQuestion,
    onRemoveQuestion,
    mode = 'create',
    formatFileSize,
    loading,
}) {
    const [passageOptions, setPassageOptions] = useState([]);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...defaultValues,
            questions: defaultValues.questions || questions,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    // Đồng bộ state của react-hook-form với component cha
    useEffect(() => {
        if (mode === 'create' && typeof setFormData === 'function') {
            const subscription = watch((value) => {
                setFormData(value);
            });
            return () => subscription.unsubscribe();
        }
    }, [watch, setFormData, mode]);

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

    // Hàm thêm câu hỏi với giới hạn tối đa 5
    const handleAddQuestion = () => {
        if (fields.length >= 5) {
            toast.warning('Chỉ được thêm tối đa 5 câu hỏi', { toastId: 'max-questions' });
            return;
        }
        append({
            noi_dung: '',
            dap_an_dung: '',
            giai_thich: '',
            lua_chon: [
                { ky_tu_lua_chon: 'A', noi_dung: '' },
                { ky_tu_lua_chon: 'B', noi_dung: '' },
                { ky_tu_lua_chon: 'C', noi_dung: '' },
                { ky_tu_lua_chon: 'D', noi_dung: '' },
            ],
        });
    };

    const handleRemoveQuestion = (index) => {
        remove(index);
    };

    return (
        <div>
            <div className="row mb-3">
                {/* Hình ảnh (chỉ create) */}
                {mode === 'create' && (
                    <div className=" mb-3">
                        <label className="form-label">Hình ảnh (tối đa 3)</label>
                        <Controller
                            control={control}
                            name="hinh_anh"
                            render={({ field }) => (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="form-control mb-2"
                                        onChange={(e) => {
                                            const selected = Array.from(e.target.files);
                                            const prev = field.value || [];
                                            // tránh trùng tên và giới hạn 3 ảnh
                                            const combined = [...prev, ...selected]
                                                .filter(
                                                    (f, idx, arr) =>
                                                        arr.findIndex((x) => x.name === f.name && x.size === f.size) ===
                                                        idx,
                                                )
                                                .slice(0, 3);
                                            field.onChange(combined);
                                            // reset input value để có thể chọn lại file vừa xoá hoặc cùng tên
                                            e.target.value = null;
                                        }}
                                    />
                                    {field.value && field.value.length > 0 && (
                                        <div className="d-flex flex-column gap-2">
                                            {Array.from(field.value).map((file, idx) => (
                                                <div key={idx} className="p-2 border rounded bg-light">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <div className="flex-grow-1">
                                                            <p className="mb-0 fw-medium">{file.name}</p>
                                                            <small className="text-muted">
                                                                {formatFileSize(file.size)}
                                                            </small>
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt="Preview"
                                                                className="img-thumbnail mt-2"
                                                                style={{
                                                                    maxWidth: '160px',
                                                                    maxHeight: '160px',
                                                                    objectFit: 'contain',
                                                                }}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger ms-3"
                                                            onClick={() => {
                                                                const newFiles = Array.from(field.value).filter(
                                                                    (_, i) => i !== idx,
                                                                );
                                                                field.onChange(newFiles);
                                                            }}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                    </div>
                )}

                {/* Chọn đoạn văn (tùy chọn) */}
                {mode === 'create' && (
                    <div className="mb-3">
                        <label className="form-label">Đoạn văn</label>
                        <Controller
                            control={control}
                            name="id_doan_van"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={passageOptions}
                                    value={passageOptions.find((o) => String(o.value) === String(field.value)) || null}
                                    onChange={(opt) => {
                                        field.onChange(opt?.value);
                                        if (typeof setFormData === 'function') {
                                            setFormData({ ...formData, id_doan_van: opt?.value });
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                )}
            </div>

            {/* Đoạn văn (chỉ edit) */}
            {mode === 'edit' && (
                <div className="mb-3">
                    <label className="form-label">Đoạn văn</label>
                    <Controller
                        control={control}
                        name="id_doan_van"
                        render={({ field }) => (
                            <>
                                <Select
                                    {...field}
                                    options={mergedPassageOptions}
                                    value={mergedPassageOptions.find((o) => String(o.value) === String(field.value))}
                                    isDisabled
                                />
                                {defaultValues?.doan_van?.danh_sach_phuong_tien?.length > 0 && (
                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        {defaultValues.doan_van.danh_sach_phuong_tien
                                            .filter((pt) => pt.loai_phuong_tien === 'hinh_anh')
                                            .map((pt) => (
                                                <img
                                                    key={pt.id_phuong_tien}
                                                    src={pt.url_phuong_tien}
                                                    alt="Đoạn văn"
                                                    className="img-fluid rounded border"
                                                    style={{
                                                        maxWidth: '180px',
                                                        maxHeight: '180px',
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                            ))}
                                    </div>
                                )}
                            </>
                        )}
                    />
                </div>
            )}

            {/* ------------ DANH SÁCH CÂU HỎI ------------- */}
            {fields.map((q, idx) => (
                <div key={idx} className="border rounded p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">Câu {idx + 1}</h6>
                        {mode === 'create' && fields.length > 1 && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRemoveQuestion(idx)}
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

                    {['A', 'B', 'C', 'D'].map((opt, i) => (
                        <ChoiceInput
                            key={opt}
                            questionIdx={idx}
                            choiceIdx={i}
                            optionLetter={opt}
                            value={watch(`questions.${idx}.lua_chon.${i}.noi_dung`)}
                            isCorrect={watch(`questions.${idx}.dap_an_dung`) === opt}
                            onTextChange={(val) => setValue(`questions.${idx}.lua_chon.${i}.noi_dung`, val)}
                            onChooseCorrect={(letter) => setValue(`questions.${idx}.dap_an_dung`, letter)}
                        />
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

            {mode === 'create' && (
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleAddQuestion}
                    disabled={fields.length >= 5}
                >
                    Thêm câu hỏi
                </button>
            )}

            {/* <div className="text-end mt-3">
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? <span className="fa fa-spinner fa-spin me-2"></span> : null}
                    {mode === 'edit' ? 'Lưu thay đổi' : 'Thêm câu hỏi'}
                </button>
            </div> */}
        </div>
    );
}

export default Part7QuestionForm;
