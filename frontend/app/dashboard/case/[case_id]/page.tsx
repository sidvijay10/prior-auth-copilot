// app/dashboard/case/[case_id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CaseDetails = () => {
  const { case_id } = useParams(); // This retrieves the dynamic segment from the URL.
  const [caseData, setCaseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (case_id) {
      axios.get(`http://localhost:8000/cases/${case_id}`)
        .then(response => {
          setCaseData(response.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching case details:', err);
          setError('Case not found or an error occurred.');
          setIsLoading(false);
        });
    } else {
      setError('No case ID provided or invalid format.');
      setIsLoading(false);
    }
  }, [case_id]); // React only when case_id changes

  if (isLoading) {
    return <div>Loading case details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!caseData) {
    return <div>No case data available.</div>;
  }

  const createdAt = new Date(caseData.created_at).toLocaleString();

  return (
    <div>
      <h1>Case Details</h1>
      <p>Procedure Name: {caseData.procedure_name}</p>
      <p>CPT Codes: {caseData.cpt_codes.join(', ')}</p>
      {caseData.summary && <p>Summary: {caseData.summary}</p>}
      <p>Created At: {createdAt}</p>
      {caseData.steps && (
        <div>
          <h2>Steps:</h2>
          {caseData.steps.map((step, index) => (
            <div key={index}>
              <p>{step.question}</p>
              {/* Additional step details here */}
            </div>
          ))}
        </div>
      )}
      <p>Final Determination: {caseData.is_met ? 'Met' : 'Not Met'}</p>
    </div>
  );
};

export default CaseDetails;
