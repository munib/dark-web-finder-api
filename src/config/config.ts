export const config = () => ({
    email: {
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    },
  });
