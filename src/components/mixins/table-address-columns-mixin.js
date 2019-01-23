/**
 * @usage
 * Include this mixin if your table displays address fields
 * @author Aldrin Marquez
 */
export default {
  data: () => {
    return {
      addressColumns: [
        {
          name: 'address',
          label: 'Address',
          field: row => (row.address && row.address.street_lot_blk !== null) ? row.address.street_lot_blk : '', // { return row.address !== null ? row.address.street_lot_blk : '' },
          align: 'left'
        },
        {
          name: 'brgy',
          label: 'Barangay',
          field: row => (row.address && row.address.brgy !== null && row.address.brgy.description !== null) ? row.address.brgy.description : '', // { return row.address !== null ? row.address.brgy.description : '' },
          align: 'left',
          hideonload: true
        },
        {
          name: 'city',
          label: 'City',
          field: row => (row.address && row.address.city !== null && row.address.city.description !== null) ? row.address.city.description : '', // { return row.address !== null ? row.address.city.description : '' },
          align: 'left'
        },
        {
          name: 'province',
          label: 'Province',
          field: row => (row.address && row.address.province !== null && row.address.province.description !== null) ? row.address.province.description : '', // { return row.address !== null ? row.address.province.description : '' },
          align: 'left'
        },
        {
          name: 'region',
          label: 'Region',
          field: row => (row.address && row.address.region !== null && row.address.region.description !== null) ? row.address.region.description : '', // { return row.address !== null ? row.address.region.description : '' },
          align: 'left',
          hideonload: true
        }
      ]
    }
  }
}
