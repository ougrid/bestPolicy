

// Liveness probe
const livenessProbe = (req, res) => {
    res.send('OK');
};

// Readiness probe
const readinessProbe = (req, res) => {
    res.send('OK');
};

// Startup Probe
const startupProbe = (req, res) => {
    res.send('OK');
};

module.exports = {
    startupProbe,
    readinessProbe,
    livenessProbe,

};