const { captureCallEvent, returnMedicalData } = require("./src/router");
const { saveMedicalRecord, getPatientData } = require("./src/service/MedicalRecords");

saveMedicalRecord("Saman", "[{\"id\":1,\"illness\":\"Diabetes\",\"value\":\"120\",\"remarks\":[\"Reduce eating sweets\",\"Workout\"]},{\"id\":2,\"illness\":\"Pressure\",\"value\":\"90\",\"remarks\":[\"Reduce eating Fatty food\",\"Workout\"]}]", "0xb72B16b6E0eA101C55Cf12d4005058EB251aB458")
captureCallEvent();
