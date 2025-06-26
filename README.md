# Time Selector Plugin

## 简介

Time Selector Plugin 是一个轻量级、可定制的时间段选择器，适用于需要用户选择特定日期和时间范围的场景。它提供直观的拖拽选择功能，支持多种语言，并可轻松集成到任何Web项目中。

## 特性

*   **直观的拖拽选择**：用户可以通过鼠标拖拽或触摸操作轻松选择时间段。
*   **多语言支持**：内置中文和英文，并支持自定义语言配置。
*   **灵活的API**：提供丰富的API，用于获取、设置、清除和反选时间段。
*   **事件监听**：支持 `select` 和 `clear` 事件，方便集成业务逻辑。
*   **轻量级**：无额外依赖，易于集成。

## 安装

### 通过npm安装

```bash
npm install time-selector-plugin
```

### 通过CDN引入

```html
<script src="https://unpkg.com/time-selector-plugin/dist/time-selector-plugin.umd.js"></script>
```

## 使用方法

### HTML结构

```html
<div id="time-selector"></div>
```

### JavaScript初始化

```javascript
import TimeSelector from 'time-selector-plugin';

const container = document.getElementById("time-selector");
const timeSelector = new TimeSelector(container, {
    language: 'zh-CN' // 或 'en-US'，默认为 'zh-CN'
});
```

### 配置选项

| 选项     | 类型     | 默认值   | 描述                               |
| -------- | -------- | -------- | ---------------------------------- |
| `language` | `string` | `'zh-CN'` | 设置插件的显示语言，可选 `'zh-CN'` 或 `'en-US'`。 |

### 事件监听

插件支持 `select` 和 `clear` 事件。

```javascript
timeSelector.on("select", (selectedSlots) => {
    console.log("选中的时间段:", selectedSlots);
    // selectedSlots 格式示例: [{ day: 0, time: 16 }, { day: 0, time: 17 }]
});

timeSelector.on("clear", () => {
    console.log("时间段已清空");
});
```

### API参考

| 方法                 | 描述                                     |
| -------------------- | ---------------------------------------- |
| `reverseSelection()` | 反选当前所有已选中的时间段。             |
| `getAllSelectedSlots()` | 获取所有已选中的时间段。返回一个数组，每个元素包含 `day` (星期索引，0-6) 和 `time` (时间索引，0-47，表示半小时)。 |
| `clearAllSelectedSlots()` | 清空所有已选中的时间段。                 |
| `selectRow(rowIndex)` | 选中或取消选中指定行（星期）。`rowIndex` 为 0-6。 |
| `selectCol(colIndex)` | 选中或取消选中指定列（半小时）。`colIndex` 为 0-47。 |
| `selectHalfDay(after)` | 选中或取消选中上半天（00:00-12:00）或下半天（12:00-24:00）。`after` 为 `true` 表示下半天，`false` 表示上半天。 |
| `selectAll()`        | 选中或取消选中所有时间段。               |
| `on(event, handler)` | 注册事件监听器。                         |
| `off()`              | 移除所有事件监听器。                     |

## 贡献

欢迎贡献！如果您有任何建议或发现bug，请提交issue或pull request。

## 许可证

该项目采用 MIT 许可证。

---

# Time Selector Plugin (English Version)

## Introduction

Time Selector Plugin is a lightweight, customizable time slot selector designed for scenarios where users need to select specific date and time ranges. It provides intuitive drag-and-drop selection, supports multiple languages, and can be easily integrated into any web project.

## Features

*   **Intuitive Drag-and-Drop Selection**: Users can easily select time slots by dragging with a mouse or touch gestures.
*   **Multi-language Support**: Built-in Chinese and English, with support for custom language configurations.
*   **Flexible API**: Provides a rich set of APIs for getting, setting, clearing, and inverting time slot selections.
*   **Event Listening**: Supports `select` and `clear` events for easy integration with business logic.
*   **Lightweight**: No external dependencies, easy to integrate.

## Installation

### Via npm

```bash
npm install time-selector-plugin
```

### Via CDN

```html
<script src="https://unpkg.com/time-selector-plugin/dist/time-selector-plugin.umd.js"></script>
```

## Usage

### HTML Structure

```html
<div id="time-selector"></div>
```

### JavaScript Initialization

```javascript
import TimeSelector from 'time-selector-plugin';

const container = document.getElementById("time-selector");
const timeSelector = new TimeSelector(container, {
    language: 'en-US' // or 'zh-CN', defaults to 'zh-CN'
});
```

### Configuration Options

| Option     | Type     | Default Value | Description                               |
| -------- | -------- | -------- | ----------------------------------------- |
| `language` | `string` | `'zh-CN'` | Sets the display language of the plugin, can be `'zh-CN'` or `'en-US'`. |

### Event Listening

The plugin supports `select` and `clear` events.

```javascript
timeSelector.on("select", (selectedSlots) => {
    console.log("Selected Time Slots:", selectedSlots);
    // selectedSlots format example: [{ day: 0, time: 16 }, { day: 0, time: 17 }]
});

timeSelector.on("clear", () => {
    console.log("Time slots cleared");
});
```

### API Reference

| Method                 | Description                                     |
| -------------------- | ----------------------------------------------- |
| `reverseSelection()` | Inverts the selection of all currently selected time slots. |
| `getAllSelectedSlots()` | Retrieves all selected time slots. Returns an array, where each element contains `day` (day index, 0-6) and `time` (time index, 0-47, representing half-hour intervals). |
| `clearAllSelectedSlots()` | Clears all selected time slots.                 |
| `selectRow(rowIndex)` | Selects or deselects a specific row (day). `rowIndex` is 0-6. |
| `selectCol(colIndex)` | Selects or deselects a specific column (half-hour interval). `colIndex` is 0-47. |
| `selectHalfDay(after)` | Selects or deselects the first half of the day (00:00-12:00) or the second half (12:00-24:00). `after` is `true` for the second half, `false` for the first half. |
| `selectAll()`        | Selects or deselects all time slots.            |
| `on(event, handler)` | Registers an event listener.                    |
| `off()`              | Removes all event listeners.                    |

## Contributing

Contributions are welcome! If you have any suggestions or find bugs, please submit an issue or pull request.

## License

This project is licensed under the MIT License.