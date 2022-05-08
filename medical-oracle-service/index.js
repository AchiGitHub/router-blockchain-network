const { captureCallEvent, returnMedicalData } = require("./src/router");
const { saveMedicalRecord, getPatientData } = require("./src/service/MedicalRecords");

saveMedicalRecord("Saman", "[{\"id\":1,\"illness\":\"Diabetes\",\"value\":\"120\",\"remarks\":[\"Reduce eating sweets\",\"Workout\"]},{\"id\":2,\"illness\":\"Pressure\",\"value\":\"90\",\"remarks\":[\"Reduce eating Fatty food\",\"Workout\"]}]", "0xBa824255ECc5C6b504606B2Ec8b52E6a144AA7bd")
captureCallEvent();
