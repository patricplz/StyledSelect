# 🌟 `StyledSelect` – Custom React Dropdown Component

A sleek, keyboard-accessible, and **highly customizable** select component built with React and Tailwind CSS. Includes optional **search**, **icons**, and custom **style per option**. Perfect for modals, forms, or dynamic interfaces.

---

## ✨ Props Overview

| Prop          | Type       | Required | Description |
|---------------|------------|----------|-------------|
| `options`     | `Array`    | ✅       | List of option objects: `{ label, value, style?, highlightStyle?, focusStyle? }`. |
| `value`       | `string`   | ✅       | Currently selected option’s `value`. |
| `onChange`    | `Function` | ✅       | Callback fired with selected option `{ label, value }`. |
| `className`   | `string`   | ❌       | Tailwind classes for styling the select when no specific option is selected. |
| `isSearchable`| `boolean`  | ❌       | Enables search input when set to `true`. |
| `placeholder` | `string`   | ❌       | Placeholder text when nothing is selected. |

---

## 💡 How It Works

### ✅ **Selection & Display**

- The selected option is shown using its `label`, which supports **JSX**, including icons.
- Each option can have:
  - `style` → base Tailwind classes for rendering
  - `highlightStyle` → applied when selected
  - `focusStyle` → applied when hovered or keyboard-focused
  - `hoverStyle` → applied when selected and hovered

🎨 Best Practice: Recommended Option Styling
For a clean, accessible, and aesthetically pleasing style, we recommend the following default styling for options:

style: 'bg-{color}-100 text-{color}-800 active:bg-{color}-400',

highlightStyle: 'bg-{color}-400',

focusStyle: 'bg-{color}-300',

hoverStyle: 'bg-{color}-500',

These classes ensure:

Good contrast and readability

Smooth hover, focus, and active transitions

A cohesive color palette using purple shades

Use this pattern as a baseline and adjust colors as needed to match your app’s theme.

### 🔍 **Search Feature (Optional)**

- If `isSearchable` is `true`, a text input replaces the label.
- It filters the options in real time by the plain text content of `label`.

### 🎯 **Keyboard Accessibility**

When focused:
- `ArrowUp` / `ArrowDown` navigates through options
- `Enter` / `Space` selects
- `Esc` closes
- `Tab` (with or without `Shift`) loops options

### 🧠 **Smart Highlighting**

- Remembers the last selected value and highlights it when reopened.
- Dynamically updates highlight as you search or navigate.

---

## 📦 Usage Example

```tsx
import StyledSelect from './StyledSelect';
import { UserIcon, BriefcaseIcon } from '@heroicons/react/solid';

const options = [
  {
    value: 'designer',
    label: (
      <div className="flex items-center">
        <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
        <span>UX Designer</span>
      </div>
    ),
    style: 'bg-pink-100 text-purple-800',
    highlightStyle: 'bg-pink-500',
    focusStyle: 'bg-pink-200',
  },
  // more options...
];

<StyledSelect
  options={options}
  value={selectedValue}
  onChange={(opt) => setSelectedValue(opt.value)}
  isSearchable={true}
  placeholder="Choose a role"
  className="bg-blue-100"
/>
🧩 Tips
You can add icons inside label with any component (e.g. Heroicons, SVG).

This component works well inside modals or popups.

Options are searchable even when labels are complex JSX.

🧱 Built With
React ⚛️

Tailwind CSS 💨

Heroicons 🎨 (optional)

📁 File Structure

components/
├── StyledSelect.jsx    # The custom dropdown component
├── Example1.jsx        # Usage example with modal and multiple selects

---

## 📦 Installation

To use `StyledSelect`, make sure your project includes the following dependencies:

### 1. **Tailwind CSS**

If Tailwind is not yet installed in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Then configure your tailwind.config.js and add Tailwind to your CSS:


js
// tailwind.config.js
content: [
  "./resources/**/*.blade.php",
  "./resources/**/*.js",
  "./resources/**/*.jsx",
  "./resources/**/*.ts",
  "./resources/**/*.tsx",
],
theme: {
  extend: {},
},
plugins: [],


css
/* resources/css/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;


2. Heroicons
This component uses Heroicons (optional, but recommended):

bash
npm install @heroicons/react
You can then use icons like this:

tsx
import { UserIcon } from "@heroicons/react/24/solid";
📝 Use /24/solid or /24/outline based on your design preference.


3. React + React DOM
Ensure you have React installed (most likely already present):

bash
npm install react react-dom


4. TypeScript (optional)
If you're using TypeScript:

bash
npm install -D typescript @types/react @types/react-dom


✅ All-in-One Command

bash
npm install react react-dom @heroicons/react
npm install -D tailwindcss postcss autoprefixer
