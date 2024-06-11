const dotenv = require("dotenv");
dotenv.config();

const {
  LambdaClient,
  InvokeCommand,
} = require("@aws-sdk/client-lambda");

const getLambdaClient = (() => {
  let lambdaClient = new LambdaClient({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  return () => {
    return lambdaClient;
  };
})();

const main = () => {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      // const appLayout =
      //   document.querySelector("app-layout");
      // const button =
      //   appLayout.shadowRoot.querySelector(
      //     "button"
      //   );
      // button.addEventListener(
      //   "click",
      //   async () => {
      //     const lambdaClient = getLambdaClient();
      //     const command = new InvokeCommand({
      //       FunctionName:
      //         "Chungju-Art-Museum-Message-Find",
      //       Payload: JSON.stringify({
      //         // message: "Hello, JongHan!",
      //         id: 14,
      //       }),
      //     });
      //     try {
      //       const response =
      //         await lambdaClient.send(command);
      //       console.log(response);
      //     } catch (error) {
      //       console.error(error);
      //     }
      //   }
      // );
    }
  );
};

main();
