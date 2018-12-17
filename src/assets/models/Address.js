/* eslint-disable */
export const Address = ({
  addressable_id = null,
  addressable_type = null,
  country_id = null,
  country = Country(), // object
  region_id = null,
  region = Region(), // object
  province_id = null,
  province = null,
  city_id = null,
  city = City(),
  brgy_id = null,
  brgy = Barangay(),
  street_lot_blk = null
} = {}) => ({
  addressable_id,
  addressable_type,
  country_id,
  country,
  region_id,
  region,
  province_id,
  province,
  city_id,
  city,
  brgy_id,
  brgy,
  street_lot_blk
})
export const createAddress = (data) => {
  const country = createCountry(data.country)
  const region = createRegion(data.region)
  const province = createProvince(data.province)
  const city = createCity(data.city)
  const brgy = createBarangay(data.brgy)

  return Object.freeze(Address({
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

// export class Country {
//   constructor({
//     description = '',
//     id = null,
//     psgc_code = ''
//   } = {}) {
//     this.description = description
//     this.id = id
//     this.psgc_code = psgc_code
//   }
// }
export const Country = ({
  description = '',
  id = null,
  psgc_code = ''
} = {}) => ({
  description,
  id,
  psgc_code
})

export const createCountry = (data) => Object.freeze(Country(data))

export const Region = ({
  country_id = null,
  description = '',
  id = null,
  psgc_code = ''
} = {}) => ({
  country_id,
  description,
  id,
  psgc_code
})

// export const createRegion = (data) => Object.freeze(Region(data))

export const Province = ({
  region_id = null,
  description = '',
  id = null,
  psgc_code = ''
} = {}) => ({
  region_id,
  description,
  id,
  psgc_code
})

//export const createProvince = (data) => Object.freeze(Province(data))

export const City = ({
  province_id = null,
  region_id = null,
  description = '',
  id = null,
  psgc_code = ''
} = {}) => ({
  province_id,
  region_id,
  description,
  id,
  psgc_code
})

// export const createCity = (data) => Object.freeze(City(data))

export const Barangay = ({
  city_id = null,
  province_id = null,
  region_id = null,
  description = '',
  id = null,
  psgc_code = ''
} = {}) => ({
  city_id,
  province_id,
  region_id,
  description,
  id,
  psgc_code
})

// export const createBarangay = (data) => Object.freeze(Barangay(data))
