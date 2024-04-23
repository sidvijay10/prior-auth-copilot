// frontend/components/medical-record-upload/index.tsx
"use client";

import { useState } from "react";
import classNames from "classnames";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { useDashboard } from "@/context/dashboard-context";

export default function MedicalRecordUpload() {
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false); // Track the uploaded state
    const { setMedicalRecord } = useDashboard();

    const handleClick = () => {
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            setUploaded(true);  // Set uploaded to true after the timeout finishes
            setMedicalRecord({ url: "/assets/medical-record.pdf" });
        }, 3000);  // Display spinner for 3 seconds
    };

    return (
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border border-2",
                    uploaded ? " text-green-500 border-green-500" : uploading ? "cursor-not-allowed bg-blue-300" : "bg-blue-500 border-blue-500"
                )}
                onClick={!uploading && !uploaded ? handleClick : undefined}
                disabled={uploading || uploaded}
            >
                {uploading && <FaSpinner className="animate-spin mr-2" />}
                {!uploading && !uploaded && "Simulate Medical Record Upload"}
                {uploaded && <span className="flex flex-row items-center"><FaCheck className="text-green-500 mr-1" /> Medical Record Uploaded</span>}
            </button>
        </div>
    );
}
