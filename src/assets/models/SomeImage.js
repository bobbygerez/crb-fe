/* eslint-disable */
export class SomeImage {
  constructor({
    desc = '',
    id = null,
    imageable_id = null,
    imageable_type = null,
    is_primary = null,
    name = '',
    path = '',
    size = null
  } = {}) {
    this.desc = desc
    this.id = id
    this.imageable_id = imageable_id
    this.imageable_type = imageable_type
    this.is_primary = is_primary
    this.name = name
    this.path = path
    this.size = size
  }
}

export function createSomeImage(data) {
  return Object.freeze(new SomeImage(data))
}
