const PASS_MARK = 60;
const MIN_ATTENDANCE = 75;

function getGradeLetter(average) {
    if (average >= 90) return "A+";
    if (average >= 80) return "B+";
    if (average >= 60) return "C";
    return "F";
}

function getFinalResult(average, attendance) {
    if (attendance < MIN_ATTENDANCE) {
        return "راسب بسبب الحضور";
    }

    if (average < PASS_MARK) {
        return "راسب بسبب الدرجات";
    }

    return "ناجح";
}

document.getElementById("analyzeBtn").addEventListener("click", function () {
    const grade1 = document.getElementById("grade1").value.trim();
    const grade2 = document.getElementById("grade2").value.trim();
    const grade3 = document.getElementById("grade3").value.trim();
    const grade4 = document.getElementById("grade4").value.trim();
    const att = document.getElementById("attendance").value.trim();

    const reportBox = document.getElementById("reportBox");

    if ([grade1, grade2, grade3, grade4, att].some(value => value === "")) {
        reportBox.style.display = "block";
        reportBox.textContent = "من فضلك أدخلي جميع البيانات.";
        return;
    }

    const grades = [
        Number(grade1),
        Number(grade2),
        Number(grade3),
        Number(grade4)
    ];

    const attendance = Number(att);

    if (grades.some(g => g < 0 || g > 100) ||
        attendance < 0 || attendance > 100) {
        reportBox.style.display = "block";
        reportBox.textContent = "الدرجات والحضور لازم يكونوا بين 0 و100.";
        return;
    }

    let total = 0;

    for (let i = 0; i < grades.length; i++) {
        total += grades[i];
    }

    const average = total / grades.length;
    const letter = getGradeLetter(average);
    const result = getFinalResult(average, attendance);

    reportBox.style.display = "block";
    reportBox.innerHTML = `
        <h4>تقرير الطالب:</h4>
        <p>إجمالي الدرجات: <strong>${total}</strong> من 400</p>
        <p>المتوسط: <strong>${average.toFixed(1)}%</strong></p>
        <p>التقدير: <strong>${letter}</strong></p>
        <p>الحالة: <strong>${result}</strong></p>
    `;
});