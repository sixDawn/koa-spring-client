const servers = {
  local: {
    mock: '//server.closertb.site/client',
    admin: 'http://localhost:4001',
  },
  production: {
    admin: '//server.closertb.site/client',
  },
};

const getServers = () => servers[process.env.NODE_ENV];

export default getServers;
