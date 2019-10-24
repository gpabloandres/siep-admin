let opt = {};
let ingress = process.env.SIEP_API_GW_INGRESS || 'http://localhost:7777'
opt.NODE_ENV = '"production"';
opt.SIEP_API_GW_INGRESS = JSON.stringify(ingress);

module.exports = opt;
