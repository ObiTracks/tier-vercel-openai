'use client'

import { useState } from "react";

interface EmailNotifyProps {}

export function EmailNotify(props: EmailNotifyProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      // assuming that you will send email to your API
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Email submitted successfully');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div className="mt-4 flex border-2 border-blue-500 rounded-md">
      <input type="email" placeholder="Leave your email" onChange={(e) => setEmail(e.target.value)} className="p-2 rounded-l-md" />
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-r-md">🚀</button>
    </div>
  );
}


interface UseCaseChipProps {
  initialValue: number;
  useCaseText: string;
}

export function UseCaseChip({ initialValue, useCaseText }: UseCaseChipProps) {
  const [votes, setVotes] = useState(initialValue);

  const handleVote = async () => {
    try {
      const response = await fetch('YOUR_GOOGLE_SHEET_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ useCaseText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setVotes(data.votes); // Assuming your API returns the updated vote count.
    } catch (error) {
      console.error('There was an error sending the vote!', error);
    }
  };

  return (
    <div className="border border-gray-400 rounded-md flex gap-2">
      <div className="bg-gray-200 flex items-center gap-1 px-2 py-1 cursor-pointer" onClick={handleVote}>
        <span>Star</span>
        {votes > 0 && <span className="bg-gray-300 px-1 rounded-full">{votes}</span>}
      </div>
      <div className="px-2 py-1">{useCaseText}</div>
    </div>
  );
}
