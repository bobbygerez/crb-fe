/* eslint-disable */
export class BusinessInfo {
  constructor({
    country_id = '',
    region_id = '',
    province_id = '',
    city_id = '',
    brgy_id = '',
    street_lot_blk = ''
  } = {}) {
    this.country_id = country_id
    this.region_id = region_id
    this.province_id = province_id
    this.city_id = city_id
    this.brgy_id = brgy_id
    this.street_lot_blk = street_lot_blk
  }
}

export function createBusinessInfo(data) {
  return Object.freeze(new BusinessInfo(data))
}
