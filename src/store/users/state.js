import {
  Address
} from 'assets/models/Address'

export default {
  newUserModal: false,
  user: {
    roles: [],
    address: new Address(),
    information: {
      birthdate: '',
      employee_id: '',
      civil_status_id: '',
      gender_id: ''
    },
    status: 0
  },
  users: [],
  roles: [],
  page: 1,
  perPage: 20,
  civilStatuses: [],
  genders: []
}
