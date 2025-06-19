import { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classNames from 'classnames/bind';
import styles from '../CreateQuestionBank.module.scss';
import { getAllQuestion } from '@/services/questionService';

const cx = classNames.bind(styles);

function Part5QuestionForm({
    // Legacy (create mode) props
    questions,
    onChangeQuestion,

    // New props for edit mode
    defaultValues = {},
    mode = 'create',
    onSubmit,
    loading,
}) {
    /* ------------------------------------------------------------ */
    /* Common select options (edit mode)                             */
    /* ------------------------------------------------------------ */
    const [difficultyOptions, setDifficultyOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [partOptions, setPartOptions] = useState([]);

    useEffect(() => {
        if (mode !== 'edit') return;
        async function fetchOptions() {
            try {
                const res = await getAllQuestion(1, {});
                setDifficultyOptions(
                    (res.data?.dsMucDoKho || []).map((item) => ({
                        value: item,
                        label:
                            item === 'de' ? 'Dễ' : item === 'trung_binh' ? 'Trung bình' : item === 'kho' ? 'Khó' : item,
                    })),
                );
                setStatusOptions(
                    (res.data?.dsTrangThai || []).map((item) => ({
                        value: item,
                        label: item === 'da_xuat_ban' ? 'Đã xuất bản' : item === 'luu_tru' ? 'Lưu trữ' : item,
                    })),
                );
                setPartOptions((res.data?.dsPhan || []).map((item) => ({ value: item.id_phan, label: item.ten_phan })));
            } catch (e) {
                setDifficultyOptions([]);
                setStatusOptions([]);
                setPartOptions([]);
            }
        }
        fetchOptions();
    }, [mode]);

    /* ------------------------------------------------------------ */
    /* EDIT MODE IMPLEMENTATION                                     */
    /* ------------------------------------------------------------ */
    const { control, handleSubmit, register, watch, setValue, reset } = useForm({
        defaultValues,
    });

    // CHỈ reset khi ở edit mode
    useEffect(() => {
        if (mode === 'edit') {
            reset(defaultValues);
        }
    }, [mode, defaultValues, reset]);

    const submit = (values) => {
        onSubmit(values);
    };

    /* ------------------------------------------------------------ */
    /* RENDER                                                       */
    /* ------------------------------------------------------------ */
    // ----- EDIT MODE -----
    if (mode === 'edit') {
        return (
            <form onSubmit={handleSubmit(submit)}>
                {/* Phần chọn meta */}
                <div className="row mb-3">
                    {/* <div className="col-md-4">
                        <label className="form-label">Phần</label>
                        <Controller
                            control={control}
                            name="phan"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={partOptions}
                                    onChange={(val) => field.onChange(val?.value)}
                                    value={partOptions.find((o) => String(o.value) === String(field.value)) || null}
                                />
                            )}
                        />
                    </div> */}
                    <div className="col-md-4">
                        <label className="form-label">Độ khó</label>
                        <Controller
                            control={control}
                            name="muc_do_kho"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={difficultyOptions}
                                    onChange={(val) => field.onChange(val?.value)}
                                    value={difficultyOptions.find((o) => o.value === field.value) || null}
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
                                    options={statusOptions}
                                    onChange={(val) => field.onChange(val?.value)}
                                    value={statusOptions.find((o) => o.value === field.value) || null}
                                />
                            )}
                        />
                    </div>
                </div>

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

                {['A', 'B', 'C', 'D'].map((option, index) => (
                    <div className="mb-3" key={option}>
                        <input
                            type="radio"
                            className="form-check-input me-2"
                            value={option}
                            {...register('dap_an_dung')}
                        />
                        <label className="form-label">Lựa chọn {option}</label>
                        <input type="text" className="form-control" {...register(`lua_chon.${index}.noi_dung`)} />
                    </div>
                ))}
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
                        Cập nhật
                    </button>
                </div>
            </form>
        );
    }

    /* ------------------------------------------------------------ */
    /* CREATE MODE (legacy)                                         */
    /* ------------------------------------------------------------ */
    return (
        <>
            <div className={cx('requirement-info')}>
                <h6>
                    <i className="fas fa-info-circle"></i> Yêu cầu Part 5:
                </h6>
                <ul className={cx('requirement-list')}>
                    <li>Tùy chọn nhiều câu hỏi điền từ vào chỗ trống</li>
                    <li>4 lựa chọn A, B, C, D</li>
                </ul>
            </div>

            {questions?.map((q, idx) => (
                <div key={idx} className="border rounded p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">Câu {idx + 1}</h6>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={q.noi_dung}
                            onChange={(_, ed) => onChangeQuestion(idx, 'noi_dung', ed.getData())}
                        />
                    </div>

                    {['A', 'B', 'C', 'D'].map((option, index) => (
                        <div className="mb-3" key={option}>
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id={`q${idx}-option${option}`}
                                name={`answerOption${idx}`}
                                value={option}
                                checked={q.dap_an_dung === option}
                                onChange={(e) => onChangeQuestion(idx, 'dap_an_dung', e.target.value)}
                            />
                            <label htmlFor={`q${idx}-option${option}`} className="form-label">
                                Lựa chọn {option}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`q${idx}-option${option}-input`}
                                value={q.lua_chon[index].noi_dung}
                                onChange={(e) => {
                                    const updatedOptions = [...q.lua_chon];
                                    updatedOptions[index].noi_dung = e.target.value;
                                    onChangeQuestion(idx, 'lua_chon', updatedOptions);
                                }}
                            />
                        </div>
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

export default Part5QuestionForm;
//     return (
//         <>
//             <div className={cx('requirement-info')}>
//                 <h6>
//                     <i className="fas fa-info-circle"></i> Yêu cầu Part 5:
//                 </h6>
//                 <ul className={cx('requirement-list')}>
//                     <li>Tùy chọn nhiều câu hỏi điền từ vào chỗ trống</li>
//                     <li>4 lựa chọn A, B, C, D</li>
//                 </ul>
//             </div>

//             {questions.map((q, idx) => (
//                 <div key={idx} className="border rounded p-3 mb-4">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h6 className="mb-0">Câu {idx + 1}</h6>
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Nội dung</label>
//                         <CKEditor
//                             editor={ClassicEditor}
//                             data={q.noi_dung}
//                             onChange={(_, ed) => onChangeQuestion(idx, 'noi_dung', ed.getData())}
//                         />
//                     </div>

//                     {['A', 'B', 'C', 'D'].map((option, index) => (
//                         <div className="mb-3" key={option}>
//                             <input
//                                 type="radio"
//                                 className="form-check-input me-2"
//                                 id={`q${idx}-option${option}`}
//                                 name={`answerOption${idx}`}
//                                 value={option}
//                                 checked={q.dap_an_dung === option}
//                                 onChange={(e) => onChangeQuestion(idx, 'dap_an_dung', e.target.value)}
//                             />
//                             <label htmlFor={`q${idx}-option${option}`} className="form-label">
//                                 Lựa chọn {option}
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id={`q${idx}-option${option}-input`}
//                                 value={q.lua_chon[index].noi_dung}
//                                 onChange={(e) => {
//                                     const updatedOptions = [...q.lua_chon];
//                                     updatedOptions[index].noi_dung = e.target.value;
//                                     onChangeQuestion(idx, 'lua_chon', updatedOptions);
//                                 }}
//                             />
//                         </div>
//                     ))}

//                     <div className="mb-3">
//                         <label className="form-label">Giải thích</label>
//                         <CKEditor
//                             editor={ClassicEditor}
//                             data={q.giai_thich}
//                             onChange={(_, ed) => onChangeQuestion(idx, 'giai_thich', ed.getData())}
//                         />
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// }

// export default Part5QuestionForm;
