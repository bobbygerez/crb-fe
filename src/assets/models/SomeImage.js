/* eslint-disable */
export const SomeImage = ({
  desc = '',
  id = null,
  imageable_id = null,
  imageable_type = null,
  is_primary = null,
  name = '',
  path = '',
  size = null
} = {}) => ({
  desc,
  id,
  imageable_id,
  imageable_type,
  is_primary,
  name,
  path,
  size
})

export const createSomeImage = (data) => Object.freeze(SomeImage(data))
