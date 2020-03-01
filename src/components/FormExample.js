import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import BounceLoader from 'react-spinners/BounceLoader'
import { CSVLink } from 'react-csv'

import Field from '../components/Field'
import { camelize } from '../utils/camelize'
import { validate } from '../utils/validatation'

var INITIALVALUES = {}

const FormExample = () => {
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: { ...INITIALVALUES },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  useEffect(() => {
    fetchFields()
  }, [])

  const fetchFields = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:3001/fields')
    const fieldsJSON = await response.json()
    INITIALVALUES = fieldsJSON.reduce((obj, field) => {
      obj[camelize(field.name)] = ''
      return obj
    }, {})
    setFields(fieldsJSON)
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <BounceLoader css={{ margin: '0 auto', marginTop: '50px' }} size={100} color="#009688" loading={loading} />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {fields.map((field, idx) => (
            <div key={idx} title={field.description}>
              <Field
                type={field.type}
                id={field.name}
                name={field.name}
                options={field.options}
                onChange={formik.handleChange}
                value={formik.values[camelize(field.name)]}
              />
              {formik.errors[camelize(field.name)] ? (
                <p className="error">{formik.errors[camelize(field.name)]}</p>
              ) : null}
            </div>
          ))}
          <button type="submit">
            <CSVLink data={[formik.values]} filename="submission.csv" target="_blank">
              Submit
            </CSVLink>
          </button>
        </form>
      )}
    </>
  )
}

export default FormExample
