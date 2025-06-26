# Time Selector Plugin

[简体中文](README_zh-CN.md) | English

## Introduction

Time Selector Plugin is a lightweight, customizable time slot selector designed for scenarios where users need to select specific date and time ranges. It provides intuitive drag-and-drop selection, supports multiple languages, and can be easily integrated into any web project.

![Time Selector Demo](https://github.com/leien-fe/time-selector-plugin/blob/main/public/Kapture%202025-06-26%20at%2017.12.50.gif?raw=true)

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