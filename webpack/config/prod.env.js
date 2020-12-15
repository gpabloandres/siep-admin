let opt = {};
let ingress = process.env.SIEP_API_GW_INGRESS || 'http://200.5.228.118:7777'
opt.NODE_ENV = '"production"';
opt.SIEP_API_GW_INGRESS = JSON.stringify(ingress);

module.exports = opt;
