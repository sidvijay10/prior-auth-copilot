// frontend/components/guidelines-upload/index.tsx
"use client";

import { useState } from "react";
import classNames from "classnames";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { useDashboard } from "@/context/dashboard-context";
import { toast, ToastContainer } from 'react-toastify';

export default function GuidelinesUpload() {
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const { medicalRecord, setGuidelinesFile } = useDashboard();

    const handleClick = () => {
        if (!medicalRecord) {
            // If the medical record is not uploaded, display a toast message and do not proceed.
            toast.error("Please upload the Medical Record first.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: "colored",
                style: { width: "auto", padding: "10px" }
            });
            return;
        }
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            setUploaded(true);
            setGuidelinesFile({ url: "/assets/guidelines.pdf" });
        }, 3000);
    };

    return (
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <ToastContainer />
            <button
                className={classNames(
                    "text-grey-600 font-medium py-2 px-4 rounded border border-2",
                    uploaded ? "border-green-500 text-green-500" : uploading ? "cursor-not-allowed bg-orange-300" : "bg-orange-500 border-orange-500"
                )}
                onClick={!uploading && !uploaded ? handleClick : undefined}
                disabled={uploading || uploaded}
            >
                {uploading && <FaSpinner className="animate-spin mr-2" />}
                {!uploading && !uploaded && "Simulate Guidelines Upload"}
                {uploaded && <span className="flex flex-row items-center"><FaCheck className="text-green-500 mr-1" />Guidelines File Uploaded</span>}
            </button>
        </div>
    );
}

