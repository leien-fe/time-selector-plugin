import TimeSelector from '../src/index.js'
const container = document.getElementById("time-selector");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const languageSelect = document.getElementById("language-select");

let timeSelector = null;

function initTimeSelector(language) {
    if (timeSelector) {
        timeSelector.off(); // 解绑旧的事件监听
        container.innerHTML = ''; // 清空容器内容
    }
    timeSelector = new TimeSelector(container, { language: language });

    // 监听选定后的时间段
    timeSelector.on("select", (selectedSlots) => {
        const arr = timeSelector.getAllSelectedSlots();
        console.log("Selected Time Slots:", { selectedSlots, arr });
    });

    timeSelector.on("clear", (selectedSlots) => {
        const arr = timeSelector.getAllSelectedSlots();
        console.log("clear Time Slots:", { selectedSlots, arr });
    });

    btn1.onclick = () => {
        timeSelector.reverseSelection();
    };

    btn2.onclick = () => {
        timeSelector.clearAllSelectedSlots();
    };

    btn3.onclick = () => {
        timeSelector.selectRow(0); // Select the first row (Monday)
    };

    btn4.onclick = () => {
        timeSelector.selectCol(0); // Select the first column (00:00-00:30)
    };

    btn5.onclick = () => {
        timeSelector.selectHalfDay(false); // Select the first half of the day (00:00-12:00)
    };

    btn6.onclick = () => {
        timeSelector.selectAll(); // Select all time slots
    };
}

// 初始加载时根据选择器值实例化
initTimeSelector(languageSelect.value);

// 监听语言选择器的变化
languageSelect.addEventListener("change", (e) => {
    initTimeSelector(e.target.value);
});

// 监听选定后的时间段
timeSelector.on("select", (selectedSlots) => {
    const arr = timeSelector.getAllSelectedSlots();
    console.log("Selected Time Slots:", { selectedSlots, arr });
});

timeSelector.on("clear", (selectedSlots) => {
    const arr = timeSelector.getAllSelectedSlots();
    console.log("clear Time Slots:", { selectedSlots, arr });

});

btn1.addEventListener("click", (e) => {
    timeSelector.reverseSelection();
})

btn2.addEventListener("click", (e) => {
    timeSelector.clearAllSelectedSlots();
})