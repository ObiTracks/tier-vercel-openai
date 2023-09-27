'use client'

import { useState, useEffect, useReducer } from "react";
import * as voting from "@/lib/airtable";


interface EmailNotifyProps { }

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
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-r-md">↵</button>
    </div>
  );
}


interface UseCaseChipProps {
  initialValue: number;
  useCaseText: string;
  isSelected: boolean;
  onSelectionChange: (isSelected: boolean) => void;
  isDisabled?: boolean;
}

export function UseCaseChip({ initialValue, useCaseText, isSelected: initialIsSelected, onSelectionChange, isDisabled }: UseCaseChipProps) {
  const [votes, setVotes] = useState(initialValue);
  const [isSelected, setIsSelected] = useState(initialIsSelected); // Correcting this line

  const handleVote = async () => {
    try {
      const newSelectionState = !isSelected;
      // if trying to select while disabled, do not proceed
      if (isDisabled && !isSelected) return;
      setIsSelected(newSelectionState); // Toggle the selected state
      onSelectionChange(newSelectionState); // Notify parent about the selection change

      const updatedVotes: number = await voting.updateCount(useCaseText, newSelectionState ? "increment" : "decrement");
      setVotes(updatedVotes); // Setting the updated vote count.
    } catch (error) {
      console.error('There was an error sending the vote!', error);
    }
  };

  return (
    <div className={`overflow-hidden select-none transition-all ease-in-out duration-100 cursor-pointer border ${isSelected ? 'border-blue-500' : 'border-gray-600 hover:border-white'} rounded-md flex gap-2`}
      onClick={isDisabled ? undefined : handleVote}
    >
      <div className={`bg-gray-700 flex items-center gap-1 px-2 py-1 cursor-pointer`}>
        <span className="font-regular text-sm ">{isSelected ? "★" : "☆"} star</span>
        {votes >= 0 && <span className={`${isSelected ? 'bg-blue' : 'bg-gray-600 '} transition-all px-[0.3rem] text-sm text-center rounded-full`}>{votes}</span>}
      </div>
      <div className="text-xs text-grey-800 font-light px-2 py-1">{useCaseText}</div>
    </div>
  );
}

interface InputChipProps {
  onSubmit: (inputValue: string) => void;
}

export function InputChip({ onSubmit }: InputChipProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const maxCharLimit = 255;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={`overflow-hidden align-middle select-none border border-gray-600 hover:border-white transition-all ease-in-out duration-300 border-dashed rounded-md flex items-center pr-[3px] md:min-w-[400px]`}>
      <input
        type="text"
        maxLength={maxCharLimit}
        placeholder="How do you see yourself using AI on your codebase?"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="text-xs text-grey-800 font-light px-2 py-1 flex-grow bg-transparent border-none outline-none appearance-none focus:outline-none relative"
      />
      <button onClick={handleSubmit} className="transition-all ease-in-out duration-300 hover:bg-blue text-xs bg-gray-700 text-white py-[1px] px-2 rounded-md h-[90%]">
        ↵
      </button>
    </div>
  );
}


interface UseCase {
  id: string;
  useCaseText: string;
  votes: number;
}

interface InitialState {
  selectedUseCases: { [key: string]: boolean };
  clicks: number;
  selections: number;
  isLoading: boolean;
}

const selectedUseCases = JSON.parse(localStorage.getItem('selectedUseCases') || '{}');

// Correcting the Error here, using selectedUseCases directly
const initialState: InitialState = {
  selectedUseCases,
  clicks: 0,
  selections: Object.keys(selectedUseCases).filter(key => selectedUseCases[key]).length,
  isLoading: true,
};

function reducer(state: InitialState, action: { type: string; payload: any }): InitialState {
  switch (action.type) {
    case 'ADD_SELECTION':
      const newSelectedUseCases = { ...state.selectedUseCases, [action.payload]: true };
      localStorage.setItem('selectedUseCases', JSON.stringify(newSelectedUseCases));
      return { ...state, selectedUseCases: newSelectedUseCases, clicks: state.clicks + 1, selections: state.selections + 1 };
    case 'REMOVE_SELECTION':
      const { [action.payload]: _, ...remaining } = state.selectedUseCases;
      localStorage.setItem('selectedUseCases', JSON.stringify(remaining));
      return { ...state, selectedUseCases: remaining, clicks: state.clicks + 1, selections: state.selections - 1 };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function UseCaseList(): JSX.Element {
  const [useCases, setUseCases] = useState<UseCase[]>(JSON.parse(localStorage.getItem('useCases') || '[]'));
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedUseCases, clicks, selections, isLoading } = state;

  useEffect(() => {
    // localStorage.removeItem('selectedUseCases');
    // localStorage.removeItem('useCases');
    async function fetchTopUseCases() {
      try {
        // Assume voting.getTopPopularUsecases is previously defined
        const records = await voting.getTopPopularUsecases(10);
        // Assume UseCase is previously defined
        const mappedRecords: UseCase[] = records.map(record => ({
          id: record.getId(),
          useCaseText: record.get('Usecase'),
          votes: record.get('Votes'),
        }));
        setUseCases(mappedRecords);
        localStorage.setItem('useCases', JSON.stringify(mappedRecords));
      } catch (error) {
        console.error('Error fetching top use cases', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
    fetchTopUseCases();
  }, []);

  const handleSelectionChange = (useCaseText: string, isSelected: boolean) => {
    if (clicks < 10) {
      if (isSelected && state.selections >= 3) return;

      dispatch({ type: isSelected ? 'ADD_SELECTION' : 'REMOVE_SELECTION', payload: useCaseText });
    }
  };

  return (
    <div className={`flex flex-wrap justify-center md:w-[1000px] gap-2 ${clicks > 10 ? "select-none" : " "} `}>
      {isLoading ? (
        <div className="w-full h-10 bg-blue animate-pulse rounded-md"></div>
      ) : (
        useCases.map(useCase => (
          <UseCaseChip
            key={useCase.id}
            initialValue={useCase.votes}
            useCaseText={useCase.useCaseText}
            isSelected={!!selectedUseCases[useCase.useCaseText]}
            onSelectionChange={(isSelected) => handleSelectionChange(useCase.useCaseText, isSelected)}
            isDisabled={state.selections >= 3 && !selectedUseCases[useCase.useCaseText]}
          />
        ))
      )}
      <InputChip onSubmit={() => { }} />
    </div>
  );
}

