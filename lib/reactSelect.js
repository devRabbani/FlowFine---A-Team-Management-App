export const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
]

// Custom STyle
export const customStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#c9e3e2',
    fontSize: '2rem',
    padding: '0.3rem',
    border: `2px solid ${isFocused ? '#617772' : '#e1edf2'}`,
    boxShadow: 'none',
  }),
  option: (style) => ({
    ...style,
    fontSize: '2rem',
  }),
  dropdownIndicator: (style) => ({
    ...style,
    color: '#617772',
  }),
  indicatorSeparator: (style) => ({
    ...style,
    backgroundColor: '#617772',
  }),
}

export const customStylesMulti = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#c9e3e2',
    fontSize: '2rem',
    padding: '0.3rem',
    border: `2px solid ${isFocused ? '#617772' : '#e1edf2'}`,
    boxShadow: 'none',
  }),
  option: (style) => ({
    ...style,
    fontSize: '2rem',
  }),
  dropdownIndicator: (style) => ({
    ...style,
    color: '#617772',
  }),
  clearIndicator: (style) => ({
    ...style,
    color: '#617772',
  }),
  indicatorSeparator: (style) => ({
    ...style,
    backgroundColor: '#617772',
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#617772',
    }
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: '#777777',
    },
  }),
}

// Custom Theme
export const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,

    primary25: '#bcebea',
    primary50: '#bcebea',
    primary: '#617772',
  },
})
