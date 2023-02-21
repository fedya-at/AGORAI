import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'fedya ',
    email: 'fedya@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Khalid',
    email: 'Khalid@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
