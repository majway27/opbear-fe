export const environment = {
  production: true,
  
  obamplify: {
    Auth: {
      identityPoolId: 'us-west-2:6b2f41f5-fa34-4150-803d-f01bb21ba108',
      region: 'us-west-2',
      userPoolId: 'us-west-2_0ow0b3Izn',
      userPoolWebClientId: 'da2jpetir7aq6untoo53afmdo'
    },
    API: {
        endpoints: [
          {
            name: "setupApi",
            endpoint: "https://lrbxtju5w5.execute-api.us-west-2.amazonaws.com/v1",
            region: "us-west-2"
          }
        ]
    }
  },
  
  region: 'us-west-2',
  identityPoolId: 'us-west-2:6b2f41f5-fa34-4150-803d-f01bb21ba108',
  userPoolId: 'us-west-2_0ow0b3Izn',
  clientId: 'da2jpetir7aq6untoo53afmdo',
  setup_api_url: 'https://lrbxtju5w5.execute-api.us-west-2.amazonaws.com/v1/setup'
  
};
