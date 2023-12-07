import app from './config/express';

const main = () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`Running in http://localhost:${port}`);
  } catch (error) {
    console.log(error);
  }
};

main();
