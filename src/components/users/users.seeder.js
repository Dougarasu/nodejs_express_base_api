export default [
  {
    type: 'admin',
    status: 'active',
    accessData: {
      email: 'admin@samplemail.com',
      password: 'password'
    },
    personalData: {
      firstName: 'Admin'
    }
  },
  {
    type: 'client',
    status: 'active',
    accessData: {
      email: 'user@samplemail.com',
      password: 'password'
    },
    personalData: {
      firstName: 'First Name',
      lastName: 'Last Name',
    }
  }
];
