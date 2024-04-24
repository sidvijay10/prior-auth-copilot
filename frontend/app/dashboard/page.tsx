// frontend/app/dashboard/page.tsx
"use client";

import React from 'react';
import axios from 'axios';
import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/dashboard-context";

export const revalidate = 0;

export default function DashboardRoot() {
    const router = useRouter();
    const { medicalRecord, guidelinesFile } = useDashboard();

    const handleContinue = async () => {
        if (medicalRecord && guidelinesFile) {
            try {
                const response = await axios.post('http://localhost:8000/cases');
                const caseId = response.data.id;
                router.push(`/dashboard/case/${caseId}`);
            } catch (error) {
                console.error('Failed to create case:', error);
                // Optionally handle the error, e.g., show an error message to the user
            }
        } else {
            console.log("Both files need to be uploaded before continuing.");
            // Optionally handle the situation, e.g., inform the user to upload both files
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen">
            <div className="w-full flex flex-row gap-2 items-center">
                <MedicalRecordUpload />
                <GuidelinesUpload />
            </div>
            {medicalRecord && guidelinesFile && (
                <div className="w-full py-4 flex flex-row justify-center">
                    <button
                        className="bg-green-600 font-medium text-white py-2 px-4 rounded"
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}


