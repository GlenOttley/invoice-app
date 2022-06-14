import bcrypt from 'bcryptjs'
import IUser from '../interfaces/userInterface'

const users: IUser[] = [
  {
    _id: '61f5c55a8b500566a94331ae',
    name: 'Peninnah Arnold',
    email: 'peninnaharnold@mail.com',
    address: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    password: bcrypt.hashSync('123456', 10),
    image: 'assets/images/image-avatar.jpg',
    invoices: [
      'RT3080',
      'XM9141',
      'RG0314',
      'RT2080',
      'AA1449',
      'TY9141',
      'FV2353',
    ],
  },
  {
    _id: '61f5c55a8b500566a94331af',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    address: {
      street: '254 Front St',
      city: 'New York',
      postCode: '10038',
      country: 'US',
    },
    password: bcrypt.hashSync('123456', 10),
    image: 'assets/images/image-avatar.jpg',
    invoices: ['TY9141', 'FV2353'],
  },
]

export default users
