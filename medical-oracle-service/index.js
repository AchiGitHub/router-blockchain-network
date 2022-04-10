const { captureCallEvent, returnMedicalData } = require("./src/router");
const { saveMedicalRecord, getPatientData } = require("./src/service/MedicalRecords");

saveMedicalRecord("Saman", "[{\"id\":1,\"illness\":\"Diabetes\",\"value\":\"120\",\"remarks\":[\"Reduce eating sweets\",\"Workout\"]},{\"id\":2,\"illness\":\"Pressure\",\"value\":\"90\",\"remarks\":[\"Reduce eating Fatty food\",\"Workout\"]}]", "0x4Ed87F9F113888d0c6d25dd66A60FA30621D696d")
captureCallEvent();
