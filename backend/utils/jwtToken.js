const sendToken = (user, statusCode, message, res) => {
  const token = user.getJwtToken();
  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    message,
    data: { user, token },
  });
};

export default sendToken;
