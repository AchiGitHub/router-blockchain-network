const { captureCallEvent, returnMedicalData } = require("./src/router");
const { saveMedicalRecord, getPatientData } = require("./src/service/MedicalRecords");

//add the initial data to the medical blockchain network
saveMedicalRecord("Jane Doe", "[{\"id\":1,\"illness\":\"Covid-19\",\"value\":\"12\",\"remarks\":[\"Rest\",\"Workout\"]},{\"id\":2,\"illness\":\"Pressure\",\"value\":\"90\",\"remarks\":[\"Reduce eating Fatty food\",\"Workout\"]}]", "0xB45882d6e03425d9CE5bfea01df2D7976330F220")
captureCallEvent();
