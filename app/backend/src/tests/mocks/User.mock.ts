
const validUser = {
    email: 'admin@admin.com',
    password: '12345678',
}

const NotValidUserEmail = {
    email: '',
    password: '12345678',
  };

  const NotValidUserPassword = {
    email: 'admin@admin.com',
    password: '',
  };

  export default {
    validUser,
    NotValidUserEmail,
    NotValidUserPassword,
  }