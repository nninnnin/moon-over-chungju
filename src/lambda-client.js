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
      accessKeyId:
        process.env.AWS_ACCESS_KEY,
      secretAccessKey:
        process.env.AWS_SECRET_KEY,
    },
  });

  return () => {
    return lambdaClient;
  };
})();

const main = () => {
  const lambdaClient =
    getLambdaClient();

  const requestLambda = async (
    payload
  ) => {
    // const command = new InvokeCommand({
    //   FunctionName:
    //     "Chungju-Art-Museum-Message-Find",
    //   Payload: JSON.stringify({
    //     id: 23,
    //   }),
    // });

    const command = new InvokeCommand({
      FunctionName:
        "Chungju-Art-Museum-Message-Create",
      Payload: JSON.stringify(payload),
    });

    try {
      const response =
        await lambdaClient.send(
          command
        );

      // Convert buffer to string
      const payloadString =
        new TextDecoder().decode(
          response.Payload
        );

      const parsedResponsePayload =
        JSON.parse(payloadString);

      return parsedResponsePayload;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  window.requestLambda = requestLambda;
};

export default main;
