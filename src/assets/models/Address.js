/* eslint-disable */
export class Address {
  constructor({
    addressable_id = null,
    addressable_type = null,
    country_id = '',
    country = null, // object
    region_id = '',
    region = null, // object
    province_id = '',
    province = null,
    city_id = '',
    city = null,
    brgy_id = '',
    brgy = null,
    street_lot_blk = ''
  } = {}) {
    this.addressable_id = addressable_id
    this.addressable_type = addressable_type
    this.country_id = country_id
    this.country = country
    this.region_id = region_id
    this.region = region
    this.province_id = province_id
    this.province = province
    this.city_id = city_id
    this.city = city
    this.brgy_id = brgy_id
    this.brgy = brgy
    this.street_lot_blk = street_lot_blk
  }
}

export function createAddress(data) {
  const country = createCountry(data.country)
  const region = createRegion(data.region)
  const province = createProvince(data.province)
  const city = createCity(data.city)
  const brgy = createBarangay(data.brgy)

  return Object.freeze(new Address({
    addressable_id: data.addressable_id,
    addressable_type: data.addressable_type,
    country_id: data.country_id,
    country: country,
    region_id: data.region_id,
    region: region,
    province_id: data.province_id,
    province: province,
    city_id: data.city_id,
    city: city,
    brgy_id: data.brgy_id,
    brgy: brgy,
    street_lot_blk: data.street_lot_blk,
  }))
}

export class Country {
  constructor({
    description = '',
    id = null,
    psgc_code = ''
  } = {}) {
    this.description = description
    this.id = id
    this.psgc_code = psgc_code
  }
}

export function createCountry(data) {
  return Object.freeze(new Country(data))
}

export class Region {
  constructor({
    country_id = null,
    description = '',
    id = null,
    psgc_code = ''
  } = {}) {
    this.country_id = country_id
    this.description = description
    this.id = id
    this.psgc_code = psgc_code
  }
}

export function createRegion(data) {
  return Object.freeze(new Region(data))
}

export class Province {
  constructor({
    region_id = null,
    description = '',
    id = null,
    psgc_code = ''
  } = {}) {
    this.region_id = region_id
    this.description = description
    this.id = id
    this.psgc_code = psgc_code
  }
}

export function createProvince(data) {
  return Object.freeze(new Province(data))
}

export class City {
  constructor({
    province_id = null,
    region_id = null,
    description = '',
    id = null,
    psgc_code = ''
  } = {}) {
    this.province_id = province_id
    this.region_id = region_id
    this.description = description
    this.id = id
    this.psgc_code = psgc_code
  }
}

export function createCity(data) {
  return Object.freeze(new City(data))
}

export class Barangay {
  constructor({
    city_id = null,
    province_id = null,
    region_id = null,
    description = '',
    id = null,
    psgc_code = ''
  } = {}) {
    this.city_id = city_id
    this.province_id = province_id
    this.region_id = region_id
    this.description = description
    this.id = id
    this.psgc_code = psgc_code
  }
}

export function createBarangay(data) {
  return Object.freeze(new Barangay(data))
}
