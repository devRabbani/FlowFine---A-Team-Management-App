export const priorityOptions = [
  { value: '0', label: 'Low' },
  { value: '1', label: 'Normal' },
  { value: '2', label: 'High' },
]

export const sortOptions = [
  { value: 'updates', label: 'Updates' },
  { value: 'priority', label: 'Priority' },
  { value: 'deadline', label: 'Deadline' },
]

export const statusOptions = [
  { value: 'idle', label: 'Idle' },
  { value: 'working', label: 'Working' },
  { value: 'complete', label: 'Complete' },
  { value: 'archive', label: 'Archive' },
]

// Common STyles
export const commonStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#c9e3e2',
    fontSize: '1.8rem',
    padding: '0.1em',
    border: `0.2rem solid ${isFocused ? '#617772' : '#c9e3e2'}`,
    boxShadow: 'none',
  }),
  option: (style) => ({
    ...style,
    fontSize: '1.8rem',
  }),
  indicatorSeparator: (style) => ({
    ...style,
    backgroundColor: 'hsl(166, 10%, 62%)',
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

// Custom STyle for Group Selection
export const groupSelectStyle = {
  ...commonStyles,
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#c9e3e2',
    fontSize: '1.7rem',
    border: `0.2rem solid ${isFocused ? '#617772' : '#c9e3e2'}`,
    boxShadow: 'none',
  }),
  option: (style) => ({
    ...style,
    fontSize: '1.7rem',
  }),
}

// Custom STyle for sort Selection
export const sortSelectStyle = {
  ...commonStyles,
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#c9e3e2',
    fontSize: '1.6rem',
    border: `2px solid ${isFocused ? '#617772' : '#c9e3e2'}`,
    boxShadow: 'none',
    minHeight: 'auto',
  }),
  option: (style) => ({
    ...style,
    fontSize: '1.6rem',
  }),
  dropdownIndicator: (style) => ({
    ...style,
    padding: '0.1rem 0.5rem',
  }),
}

// Custom STyle for Group Selection
export const statusSelectStyle = {
  ...commonStyles,
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#c1e1e1',
    fontSize: '1.9rem',
    border: `2px solid ${isFocused ? '#617772' : '#c9e3e2'}`,
    boxShadow: 'none',
    height: '100%',
  }),
  option: (style) => ({
    ...style,
    fontSize: '1.9rem',
  }),
}

// Custom Theme
export const customTheme = (theme, data) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#bcebea',
      primary50: '#bcebea',
      primary: '#617772',
      neutral20: '#617772',
      neutral30: 'hsl(166, 10%, 62%)',
    },
  }
}
