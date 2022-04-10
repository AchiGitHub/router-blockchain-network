// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract MedicalRecords {
    struct MedicalInformation {
        string patientName;
        string patientDetailsJson;
    }

    mapping(address => MedicalInformation) public medicalRecords;

    function addPatient(
        string memory patientName,
        string memory patientDetailsJson,
        address callerAddress
    ) public {
        medicalRecords[callerAddress] = MedicalInformation(
            patientName,
            patientDetailsJson
        );
    }

    function getPatient(address patientAddress)
        public
        view
        returns (MedicalInformation memory)
    {
        return medicalRecords[patientAddress];
    }
}
