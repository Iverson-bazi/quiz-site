// 刷题网页核心逻辑

// 状态管理
let currentQuestionIndex = 0;
let selectedAnswer = null;
let answeredCount = 0;
let correctCount = 0;
let isAnswered = false;
let autoTimer = null; // 回答正确后自动跳转下一题的定时器

// DOM 元素引用
const questionTypeEl = document.getElementById('question-type');
const questionTextEl = document.getElementById('question-text');
const optionsAreaEl = document.getElementById('options-area');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const resultAreaEl = document.getElementById('result-area');
const questionCountEl = document.getElementById('question-count');
const scoreDisplayEl = document.getElementById('score-display');
const totalQuestionsEl = document.getElementById('total-questions');
const answeredCountEl = document.getElementById('answered-count');
const correctCountEl = document.getElementById('correct-count');

// 题目类型名称
const TYPE_NAMES = {
    single: '单选题',
    multi: '不定项选择题',
    judge: '判断题'
};

// 是否为多选题
function isMulti(question) {
    return question.type === 'multi';
}

// 初始化
function init() {
    totalQuestionsEl.textContent = questions.length;
    loadQuestion();
}

// 加载题目
function loadQuestion() {
    clearTimeout(autoTimer); // 清理残留的自动跳转定时器
    const question = questions[currentQuestionIndex];
    isAnswered = false;
    selectedAnswer = isMulti(question) ? [] : null;
    submitBtn.disabled = true;
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    resultAreaEl.className = 'result-area';
    resultAreaEl.textContent = '';

    // 更新题目类型
    questionTypeEl.textContent = TYPE_NAMES[question.type] || '题目';

    // 更新题目内容（优先显示原始题号，其次使用顺序号）
    const number = question.number || currentQuestionIndex + 1;
    questionTextEl.textContent = `${number}. ${question.question}`;

    // 更新进度
    questionCountEl.textContent = `第 ${currentQuestionIndex + 1} / ${questions.length} 题`;

    // 渲染选项
    renderOptions(question);
}

// 渲染选项
function renderOptions(question) {
    optionsAreaEl.innerHTML = '';
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    question.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option';
        optionEl.dataset.index = index;

        const labelEl = document.createElement('span');
        labelEl.className = 'option-label';
        labelEl.textContent = labels[index];

        const textEl = document.createElement('span');
        textEl.textContent = option;

        optionEl.appendChild(labelEl);
        optionEl.appendChild(textEl);

        optionEl.addEventListener('click', () => {
            if (!isAnswered) {
                selectOption(index);
            }
        });

        optionsAreaEl.appendChild(optionEl);
    });
}

// 选择选项
function selectOption(index) {
    const question = questions[currentQuestionIndex];
    const allOptions = document.querySelectorAll('.option');

    if (isMulti(question)) {
        // 多选：点击切换选中状态
        if (selectedAnswer.includes(index)) {
            selectedAnswer = selectedAnswer.filter(i => i !== index);
            allOptions[index].classList.remove('selected');
        } else {
            selectedAnswer.push(index);
            allOptions[index].classList.add('selected');
        }
        submitBtn.disabled = selectedAnswer.length === 0;
    } else {
        // 单选/判断题：只允许选一个
        allOptions.forEach(opt => opt.classList.remove('selected'));
        allOptions[index].classList.add('selected');
        selectedAnswer = index;
        submitBtn.disabled = false;
    }
}

// 判断答案是否正确
function isAnswerCorrect(question, selected) {
    if (isMulti(question)) {
        // 多选：所选集合与答案集合完全一致
        if (selected.length !== question.answer.length) return false;
        const sortedSel = [...selected].sort((a, b) => a - b);
        const sortedAns = [...question.answer].sort((a, b) => a - b);
        return sortedSel.every((v, i) => v === sortedAns[i]);
    }
    return selected === question.answer;
}

// 提交答案
function submitAnswer() {
    const question = questions[currentQuestionIndex];
    if (isMulti(question) ? selectedAnswer.length === 0 : selectedAnswer === null) return;

    const allOptions = document.querySelectorAll('.option');
    isAnswered = true;
    answeredCount++;

    // 禁用所有选项
    allOptions.forEach(opt => opt.classList.add('disabled'));

    // 标记正确答案
    const correctIndices = isMulti(question) ? question.answer : [question.answer];
    correctIndices.forEach(i => {
        if (allOptions[i]) allOptions[i].classList.add('correct');
    });

    const isLast = currentQuestionIndex === questions.length - 1;
    submitBtn.style.display = 'none';

    if (isAnswerCorrect(question, selectedAnswer)) {
        // 回答正确
        correctCount++;
        resultAreaEl.className = 'result-area correct';
        resultAreaEl.textContent = '✅ 回答正确！';
        if (question.explanation) {
            resultAreaEl.textContent += `\n📖 ${question.explanation}`;
        }

        // 1 秒后自动跳转下一题；若是最后一题则进入完成界面
        autoTimer = setTimeout(() => {
            if (isLast) {
                showCompletion();
            } else {
                nextQuestion();
            }
        }, 1000);
    } else {
        // 回答错误：显示正确答案，不自动跳转
        const selectedIndices = isMulti(question) ? selectedAnswer : [selectedAnswer];
        const answerSet = new Set(correctIndices);
        selectedIndices.forEach(i => {
            if (!answerSet.has(i) && allOptions[i]) {
                allOptions[i].classList.add('wrong');
            }
        });

        let msg = `❌ 回答错误！\n📖 正确答案：${getAnswerText(question)}`;
        if (question.explanation) {
            msg += `\n📖 ${question.explanation}`;
        }
        if (isLast) {
            // 最后一题答错：附上完成统计
            const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
            msg += `\n\n🎉 练习完成！共 ${questions.length} 题，答对 ${correctCount} 题，正确率 ${percentage}%`;
        }
        resultAreaEl.className = 'result-area wrong';
        resultAreaEl.textContent = msg;

        if (isLast) {
            restartBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
        }
    }

    // 更新统计
    updateStats();
}

// 生成正确答案文本（如 "A、项目经理；B、产品经理"）
function getAnswerText(question) {
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const correctIndices = isMulti(question) ? question.answer : [question.answer];
    return correctIndices
        .map(i => `${labels[i]}、${question.options[i]}`)
        .join('；');
}

// 显示完成统计 + 重新答题按钮
function showCompletion() {
    const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    resultAreaEl.className = 'result-area finished';
    resultAreaEl.textContent = `🎉 练习完成！共 ${questions.length} 题，答对 ${correctCount} 题，正确率 ${percentage}%`;
    restartBtn.style.display = 'inline-block';
}

// 下一题
function nextQuestion() {
    clearTimeout(autoTimer);
    currentQuestionIndex++;
    submitBtn.style.display = 'inline-block';
    loadQuestion();
}

// 重新答题（回到第一题，可一直循环）
function restart() {
    clearTimeout(autoTimer);
    currentQuestionIndex = 0;
    answeredCount = 0;
    correctCount = 0;
    submitBtn.style.display = 'inline-block';
    updateStats();
    loadQuestion();
}

// 更新统计信息
function updateStats() {
    answeredCountEl.textContent = answeredCount;
    correctCountEl.textContent = correctCount;
    scoreDisplayEl.textContent = `得分：${correctCount}`;
}

// 事件绑定
submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restart);

// 启动
init();
