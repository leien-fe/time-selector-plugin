export default class TimeSelector {
    innerContainer = null;
    classNameMap = {};
    eventHandlers = {
        select: [],
        clear: []
    };

    constructor(container, options = {}) {
        this.languages = {
            'zh-CN': {
                weekAndTime: '星期/时间',
                halfDay1: '00:00 - 12:00',
                halfDay2: '12:00 - 24:00',
                days: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
            },
            'en-US': {
                weekAndTime: 'Week/Time',
                halfDay1: '00:00 - 12:00',
                halfDay2: '12:00 - 24:00',
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            }
        };
        this.container = container;
        this.isSelecting = false;
        this.startCell = null;
        this.endCell = null;
        this.selectedTimeSlots = [];
        this.classPrefix = 'time-selector';
        this.classSuffix = `${Math.random().toString(36).substr(2, 6)}`;
        this.options = options;
        this.currentLanguage = options.language || 'zh-CN'; // 默认中文
        this.language = this.languages[this.currentLanguage];

        this.init();
    }

    init() {
        /** 创建 class */
        this.createClassMap();
        /** 创建样式表 */
        this.createStyleSheet();
        /** 创建子容器 */
        this.createInnerContainer();
        /** 创建时间表头 */
        this.createHeader();
        /** 创建时间选择网格 */
        this.createGrid();
        /** 绑定事件 */
        this.bindEvents();
    }

    createStyleSheet() {
        const style = document.createElement("style");
        style.textContent = `
    .${this.classNameMap.innerContainer} {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      user-select: none;
      overflow: hidden;
    }
    .${this.classNameMap.innerContainer} .${this.classNameMap.header},
    .${this.classNameMap.innerContainer} .row {
      display: flex;
      flex: 1;
    }
    .${this.classNameMap.secondHeader} {
        display: flex;
        flex-direction: column;
        flex: 1;
        cursor: pointer;
    }
    .${this.classNameMap.innerContainer} .cell {
      box-sizing: border-box;
      text-align: center;
      padding: 5px 0;
      font-size: 12px;
      position: relative;
    }
    .${this.classNameMap.innerContainer} .cell.empty {
      width: 80px;
    }
    .${this.classNameMap.innerContainer} .cell.time-header {
      width: calc((100% - 80px) / 48);
      font-size: 10px;
      white-space: nowrap;
      cursor: pointer;
    }
    .${this.classNameMap.innerContainer} .cell.day-header {
      width: 80px;
      background-color: #f8f8f8;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1px;
      cursor: pointer;
    }
    .${this.classNameMap.innerContainer} .cell-box {
        display: flex;
        flex: 1;
        padding: 0 1px 1px 0;
        cursor: cell;
    }
    .${this.classNameMap.innerContainer} .cell.time-cell {
      flex: 1;
      cursor: cell;
      background-color: #f0f0f0;
      border-radius: 2px;
      overflow: hidden;
      transition: background-color 0.1s;
    }
    .${this.classNameMap.innerContainer} .cell.time-cell:hover {
      background-color: #b2b0b0;
    }
    .${this.classNameMap.innerContainer} .cell.time-cell.selected {
      background-color: #007bff;
      color: white;
    }
    .${this.classNameMap.innerContainer} .cell.time-cell.temporary {
      background-color: #007bff91;
    }
    .${this.classNameMap.headerRow} {
      width: 100%;
      display: flex;
      flex: 1;
      margin-bottom: 1px;
    }
    .${this.classNameMap.innerContainer} .header-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      background-color: #f0f0f0;
    }
    .${this.classNameMap.innerContainer} .header-cell:first-child {
      margin-right: 1px;
    }
    .${this.classNameMap.innerContainer} .hour-header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      background-color: #f9f9f9;
      margin-left: 1px;
    }
    .${this.classNameMap.innerContainer} .day-header {
      background-color: #d9f7be;
    }
        `;
        document.head.appendChild(style);
    }

    createClassName(name) {
        return `${this.classPrefix}-${name}_${this.classSuffix}`;
    }

    createClassMap() {
        this.classNameMap = {
            innerContainer: this.createClassName("container"),
            header: this.createClassName("header"),
            secondHeader: this.createClassName("second-header"),
            headerRow: this.createClassName("header-row"),
        }
    }

    createInnerContainer() {
        const innerContainer = document.createElement("div");
        innerContainer.classList.add(this.classNameMap.innerContainer);
        this.innerContainer = innerContainer;
        this.container.appendChild(innerContainer);
    }

    createHeader() {

        const header = document.createElement("div");
        header.classList.add(this.classNameMap.header);

        // 第一行表头
        const headerRow1 = document.createElement("div");
        headerRow1.classList.add(this.classNameMap.headerRow);

        // 左上角单元格：星期/时间
        const headerCell1 = document.createElement("div");
        headerCell1.classList.add("cell", "day-header");
        headerCell1.textContent = this.language.weekAndTime;
        headerCell1.addEventListener("click", () => this.selectAll());
        header.appendChild(headerCell1);

        // 一级表头：00:00 - 12:00 和 12:00 - 24:00
        for (let i = 0; i < 2; i++) {
            const headerCell = document.createElement("div");
            headerCell.classList.add("cell", "header-cell");
            headerCell.setAttribute("colspan", 24); // 分两列：00:00 - 12:00, 12:00 - 24:00
            headerCell.textContent = i === 0 ? this.language.halfDay1 : this.language.halfDay2;
            headerCell.addEventListener("click", () => this.selectHalfDay(i === 1));
            headerRow1.appendChild(headerCell);
        }
        const headerCell2 = document.createElement("div");
        headerCell2.appendChild(headerRow1);

        // 第二行表头：小时从0到23
        const headerRow2 = document.createElement("div");
        headerRow2.classList.add(this.classNameMap.headerRow);

        // 填充24个小时的列头
        for (let i = 0; i < 24; i++) {
            const hourCell = document.createElement("div");
            hourCell.classList.add("cell", "hour-header");
            hourCell.textContent = i; // 显示小时 0 - 23
            hourCell.addEventListener("click", () => this.selectCol(i));
            headerRow2.appendChild(hourCell);
        }

        headerCell2.appendChild(headerRow2);
        header.appendChild(headerCell2);
        headerCell2.classList.add(this.classNameMap.secondHeader);
        this.innerContainer.appendChild(header);
    }

    createGrid() {
        this.language.days.forEach((day, rowIndex) => {
            const row = document.createElement("div");
            row.classList.add("row");

            // 星期列头
            const dayCell = document.createElement("div");
            dayCell.classList.add("cell", "day-header");
            dayCell.textContent = day;
            dayCell.dataset.row = rowIndex;
            dayCell.addEventListener("click", () => this.selectRow(rowIndex));
            row.appendChild(dayCell);

            // 24个小时的格子，每个小时有2个小格子（表示半小时）
            for (let hour = 0; hour < 24; hour++) {
                for (let halfHour = 0; halfHour < 2; halfHour++) {
                    const cell = document.createElement("div");
                    const cellBox = document.createElement("div");
                    cell.classList.add("cell", "time-cell");
                    cellBox.classList.add("cell-box");
                    cell.dataset.row = rowIndex;
                    cell.dataset.col = hour * 2 + halfHour; // 每小时拆成两个半小时
                    cell.dataset.selected = "false";
                    cellBox.appendChild(cell);
                    row.appendChild(cellBox);
                }
            }

            this.innerContainer.appendChild(row);
        });
    }

    bindEvents() {
        const startEvents = ["mousedown", "auxclick", "touchstart"];
        const endEvents = ["touchend", "mouseup"];
        startEvents.forEach((startEvent) => {
            this.innerContainer.addEventListener(startEvent, (e) => {
                if (!this.isSelecting && e.target.classList.contains("time-cell")) {
                    this.isSelecting = true;
                    this.startCell = e.target;
                    this.updateSelection(e.target);
                }
            });
        });


        this.innerContainer.addEventListener("mousemove", (e) => {
            if (this.isSelecting && e.target.classList.contains("time-cell")) {
                this.updateSelection(e.target);
            }
        });

        endEvents.forEach((endEvent) => {
            window.addEventListener(endEvent, () => {
                if (this.isSelecting) {
                    this.isSelecting = false;
                    this.finalizeSelection();
                    this.emit("select", this.selectedTimeSlots.slice()); // 抛出选中的时间段数据
                    this.selectedTimeSlots.length = 0; // 清空临时存储
                }
            });
        });
    }

    updateSelection(currentCell) {
        if (!this.startCell || !currentCell) return;

        this.endCell = currentCell;

        const startRow = parseInt(this.startCell.dataset.row);
        const startCol = parseInt(this.startCell.dataset.col);
        const endRow = parseInt(this.endCell.dataset.row);
        const endCol = parseInt(this.endCell.dataset.col);

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        this.innerContainer.querySelectorAll(".time-cell.temporary").forEach((cell) => {
            cell.classList.remove("temporary");
        });

        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                const cell = this.innerContainer.querySelector(`.time-cell[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    cell.classList.add("temporary");
                }
            }
        }
    }

    finalizeSelection() {
        const temporaryCells = this.innerContainer.querySelectorAll(".time-cell.temporary");
        temporaryCells.forEach((cell) => {
            const isSelected = !(cell.dataset.selected === 'false');
            cell.dataset.selected = isSelected ? "false" : "true";
            cell.classList.toggle("selected", !isSelected);
            cell.classList.remove("temporary");

            if (!isSelected) {
                this.selectedTimeSlots.push({
                    day: parseInt(cell.dataset.row),
                    time: parseInt(cell.dataset.col),
                });
            }
        });
    }

    selectRow(rowIndex) {
        const rowCells = this.innerContainer.querySelectorAll(`.time-cell[data-row="${rowIndex}"]`);
        const isRowSelected = Array.from(rowCells).every((cell) => cell.dataset.selected === "true");
        if (isRowSelected) this.selectedTimeSlots.length = 0;
        rowCells.forEach((cell) => {
            cell.dataset.selected = isRowSelected ? "false" : "true";
            cell.classList.toggle("selected", !isRowSelected);

            if (!isRowSelected) {
                this.selectedTimeSlots.push({
                    day: rowIndex,
                    time: parseInt(cell.dataset.col),
                });
            }
        });

        this.emit("select", this.selectedTimeSlots.slice());
    }

    selectCol(colIndex) {
        const colCells1 = this.container.querySelectorAll(`.time-cell[data-col="${colIndex * 2}"]`);
        const colCells2 = this.container.querySelectorAll(`.time-cell[data-col="${colIndex * 2 + 1}"]`);
        const colCells = Array.from(colCells1).concat(...colCells2);
        const isColSelected = colCells.every((cell) => cell.dataset.selected === "true");
        if (isColSelected) this.selectedTimeSlots.length = 0;

        colCells.forEach((cell) => {
            cell.dataset.selected = isColSelected ? "false" : "true";
            cell.classList.toggle("selected", !isColSelected);

            if (!isColSelected) {
                this.selectedTimeSlots.push({
                    day: parseInt(cell.dataset.row),
                    time: parseInt(cell.dataset.col),
                });
            }
        });

        this.emit("select", this.selectedTimeSlots.slice());
    }

    selectHalfDay(after = false) {
        const half = 12, start = 0, end = 24;
        const a = after ? half : start, b = after ? end : half;
        for (let i = a; i < b; i++) {
            this.selectCol(i);
        }
    }

    selectAll() {
        const cellsDom = this.container.querySelectorAll(".time-cell");
        const cells = Array.from(cellsDom);
        const isAllSelected = cells.every((cell) => cell.dataset.selected === "true");
        if (isAllSelected) this.selectedTimeSlots.length = 0;

        cells.forEach((cell) => {
            cell.dataset.selected = isAllSelected ? "false" : "true";
            cell.classList.toggle("selected", !isAllSelected);

            if (!isAllSelected) {
                this.selectedTimeSlots.push({
                    day: parseInt(cell.dataset.row),
                    time: parseInt(cell.dataset.col),
                });
            }
        });

        this.emit("select", this.selectedTimeSlots.slice());
    }

    reverseSelection() {
        const cellsDom = this.container.querySelectorAll(".time-cell");
        const cells = Array.from(cellsDom);
        this.selectedTimeSlots.length = 0;

        cells.forEach((cell) => {
            const isSelected = cell.dataset.selected === 'true';
            cell.dataset.selected = isSelected ? "false" : "true";
            cell.classList.toggle("selected", !isSelected);

            if (!isSelected) {
                this.selectedTimeSlots.push({
                    day: parseInt(cell.dataset.row),
                    time: parseInt(cell.dataset.col),
                });
            }
        });

        this.emit("select", this.selectedTimeSlots.slice());
    }

    getAllSelectedSlots() {
        const cells = this.innerContainer.querySelectorAll(`.time-cell[data-selected="true"]`);
        const selectedTimeSlots = [];
        cells.forEach((cell) => {
            selectedTimeSlots.push({
                day: parseInt(cell.dataset.row),
                time: parseInt(cell.dataset.col),
            });
        });
        return selectedTimeSlots;
    }

    clearAllSelectedSlots() {
        const cells = this.innerContainer.querySelectorAll(`.time-cell[data-selected="true"]`);
        cells.forEach((cell) => {
            cell.dataset.selected = "false";
            cell.classList.toggle("selected", false);
        });
        this.selectedTimeSlots.length = 0;
        this.emit("clear", this.selectedTimeSlots.slice());
    }

    on(event, handler) {
        if (!this.eventHandlers[event]) {
            throw Error(`Unsupported events.`);
        }
        this.eventHandlers[event].push(handler);
    }

    off() {
        this.eventHandlers.select.length = 0;
        this.eventHandlers.clear.length = 0;
    }

    emit(event, ...args) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].forEach((handler) => handler(...args));
        }
    }
}