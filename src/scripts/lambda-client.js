const dotenv = require("dotenv");

dotenv.config();

const {
  LambdaClient,
  InvokeCommand,
} = require("@aws-sdk/client-lambda");

const getLambdaClient = (() => {
  let lambdaClient = null;
  try {
    lambdaClient = new LambdaClient({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: process.env.USER_AWS_ACCESS_KEY,
        secretAccessKey: process.env.USER_AWS_SECRET_KEY,
      },
    });
  } catch (error) {
    throw new Error(`Failed to initialize Lambda client: ${error.message}`);
  }

  return () => {
    return lambdaClient;
  };
})();

const main = () => {
  const requestLambda = async (
    payload
  ) => {
    try {
      const lambdaClient =
        getLambdaClient();

      // const command = new InvokeCommand({
      //   FunctionName:
      //     "Chungju-Art-Museum-Message-Find",
      //   Payload: JSON.stringify({
      //     id: 23,
      //   }),
      // });

      const command = new InvokeCommand(
        {
          FunctionName:
            "Chungju-Art-Museum-Message-Create",
          Payload:
            JSON.stringify(payload),
        }
      );

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
