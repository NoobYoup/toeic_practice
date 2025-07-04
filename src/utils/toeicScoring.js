import { listeningScoreTable, readingScoreTable } from './toeicScoreTable';

export function chamDiemToeic(questions, userAnswers) {
  let correctListening = 0;
  let correctReading = 0;
  const chiTiet = [];

  const questionMap = new Map(questions.map(q => [q.id_cau_hoi, q]));

  for (const ans of userAnswers) {
    const cauHoi = questionMap.get(ans.id_cau_hoi);
    if (!cauHoi) continue;

    const isCorrect = ans.lua_chon_da_chon === cauHoi.dap_an_dung;
    const loaiPhan = cauHoi.phan?.loai_phan || 'reading';

    if (isCorrect) {
      if (loaiPhan === 'listening') correctListening++;
      else correctReading++;
    }

    chiTiet.push({
      id_cau_hoi: ans.id_cau_hoi,
      lua_chon_da_chon: ans.lua_chon_da_chon,
      la_dung: isCorrect,
      da_tra_loi: !!ans.lua_chon_da_chon
    });
  }

  const totalListening = questions.filter(q => q.phan?.loai_phan === 'listening').length;
  const totalReading = questions.filter(q => q.phan?.loai_phan === 'reading').length;

  const percentListening = totalListening ? Math.round((correctListening / totalListening) * 100) : 0;
  const percentReading = totalReading ? Math.round((correctReading / totalReading) * 100) : 0;

  const diemNghe = listeningScoreTable[percentListening] || 5;
  const diemDoc = readingScoreTable[percentReading] || 5;

  return {
    diemNghe,
    diemDoc,
    tongDiem: diemNghe + diemDoc,
    chiTietCauTraLoi: chiTiet,
    correctListening,
    correctReading
  };
}
