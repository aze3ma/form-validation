import React from 'react'

import { camelize } from '../utils/camelize'

const Input = ({ name, type, id, value, options = [], required = false, ...rest }) => {
  switch (type) {
    case 'long-text':
      return (
        <>
          <label htmlFor={camelize(name)}>{name}</label>
          <textarea name={camelize(name)} id={camelize(id)} value={value} {...rest} />
        </>
      )
    case 'dropdown':
      return (
        <select className="dropdown" name={camelize(name)} id={camelize(id)} {...rest}>
          <option value="">Select...</option>
          {options.map((option, idx) => (
            <option value={camelize(option)} key={idx}>
              {option}
            </option>
          ))}
        </select>
      )
    case 'multi-select':
      return (
        <>
          <label>{name}</label>
          <div className="multi-select">
            {options.map((option, idx) => (
              <div className="multi-select__field" key={idx}>
                <input type="checkbox" id={camelize(option)} name={camelize(name)} value={camelize(option)} {...rest} />
                <label htmlFor={camelize(option)}>{option}</label>
              </div>
            ))}
          </div>
        </>
      )
    default:
      return (
        <div>
          <label htmlFor={camelize(name)}>{name}</label>
          <input type={type} name={camelize(name)} value={value} id={camelize(id)} {...rest} />
        </div>
      )
  }
}

export default Input
