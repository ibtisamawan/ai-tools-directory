const dns = require('dns');
dns.resolveSrv('_mongodb._tcp.aitool1.s2vetmr.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('DNS Resolve Error:', err);
    return;
  }
  console.log('Addresses:', addresses);
});
