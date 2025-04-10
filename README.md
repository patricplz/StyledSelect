CustomSelect Component Documentation
Overview
The CustomSelect is a React component that provides a customizable dropdown list with an optional search feature. It allows users to select from a list of options, and it supports keyboard navigation, highlighting, and customizable styles. The component is ideal for creating accessible and dynamic select elements in your application.

Props
The CustomSelect component accepts the following props:

1. options (Array)
An array of option objects to populate the dropdown. Each object should contain:

  value: A unique identifier for the option.

  label: The display content for the option, which can be plain text or JSX (e.g., icons with text).

  style (Optional): A string that defines custom styles for each option.

  highlightStyle (Optional): A string that defines styles for the option when it is highlighted.

2. value (String)
The currently selected value in the dropdown. It should match one of the value properties from the options array.

3. onChange (Function)
A callback function that is called when the selected value changes. It receives the value of the selected option as an argument.

4. className (String)
An optional className that can be used to apply custom styles to the CustomSelect component.

5. isSearchable (Boolean)
A boolean that controls whether the search input is enabled. If true, the dropdown will display a search box to filter the options.

Functionality
Searchable Dropdown: When the isSearchable prop is true, users can type in the search box to filter options in the dropdown.

Keyboard Navigation: The dropdown supports arrow keys for navigation (up/down), Enter/Space to select an option, and Escape to close the dropdown. Tab navigation is also supported.

Highlighting: The highlighted option is visually indicated as users navigate through the dropdown.

Closing on Blur: The dropdown closes when it loses focus (e.g., when clicking outside of the component).

Notes
The CustomSelect component uses the getTextFromJSX utility function to extract text from JSX elements. This ensures that the search functionality works even when the options include JSX elements like icons or formatted text.

The onChange function should be used to update the state in the parent component with the selected value.

The dropdown will automatically close when an option is selected or when the Escape key is pressed.

