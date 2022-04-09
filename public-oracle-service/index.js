const { getData, captureCallEvent, captureAcknowledgeData } = require("./src/public-chain/ethereum");

getData();

captureCallEvent(1);

captureAcknowledgeData();