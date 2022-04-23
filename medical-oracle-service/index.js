const { captureCallEvent, returnMedicalData } = require("./src/router");
const { saveMedicalRecord, getPatientData } = require("./src/service/MedicalRecords");

saveMedicalRecord("Saman", "[{\"id\":1,\"illness\":\"Diabetes\",\"value\":\"120\",\"remarks\":[\"Reduce eating sweets\",\"Workout\"]},{\"id\":2,\"illness\":\"Pressure\",\"value\":\"90\",\"remarks\":[\"Reduce eating Fatty food\",\"Workout\"]}]", "0x72d140D378B539Ce9D8D2E93365b6B860Ed27b30")
captureCallEvent();
