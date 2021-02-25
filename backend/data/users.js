import bcypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Rin Hab',
    email: 'rin@example.com',
    password: bcypt.hashSync('123456', 10),
  },
  {
    name: 'Vas Strel',
    email: 'vaas@example.com',
    password: bcypt.hashSync('123456', 10),
  },
]

export default users