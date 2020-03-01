export const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.contactNumber) {
    errors.contactNumber = 'Required'
  } else if (values.contactNumber < 0) {
    errors.contactNumber = 'Must be positive number'
  } else if (values.contactNumber < 8) {
    errors.contactNumber = 'Must be 8 numbers or more'
  } else if (isNaN(parseInt(values.contactNumber))) {
    errors.contactNumber = 'Must be number'
  }

  if (!values.address) {
    errors.address = 'Required'
  } else if (values.address.length < 10) {
    errors.address = 'Must be 10 characters or more'
  }

  if (!values.gender) {
    errors.gender = 'Required'
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Required'
  }

  if (!values.areasOfRecommendation) {
    errors.areasOfRecommendation = 'Required'
  } else if (values.areasOfRecommendation.length <= 1) {
    errors.areasOfRecommendation = 'At least choose 2'
  }
  return errors
}
