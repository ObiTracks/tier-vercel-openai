'use client'

import { useState, useEffect, useReducer, useRef } from "react";
import * as airtable from "@/lib/airtable";
import { UseCase } from "@/lib/airtable";
import ConfettiGenerator from "confetti-js";
import _ from 'lodash';


export function EmailNotify() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true); // to track if email is valid
  const canvasRef = useRef(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent the default form submission

    if (!validateEmail(email)) { // Validate email when form is submitted
      setIsValidEmail(false); // Set the isValidEmail to false if email is invalid
      return;
    }

    try {
      await airtable.addEmailToAirtable(email);
      localStorage.setItem('userEmail', email); // This line stores the email in local storage.
      setIsValidEmail(true);
      setShowSuccess(true);
    } catch (error) {
      console.error('There was a problem saving your email');
    }
  }

  const validateEmail = (email: string) => {
    // A simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    // setIsValidEmail(validateEmail(e.target.value));
  }

  useEffect(() => {
    if (showSuccess) {
      const confettiSettings = { target: canvasRef.current };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      const timeoutId = setTimeout(() => {
        confetti.clear();
      }, 5000);
      return () => {
        confetti.clear();
        clearTimeout(timeoutId);
      };
    }
  }, [showSuccess]);

  return (
    <div className={`flex flex-col items-center gap-[10px]`}>
      <h4 className="font-light m-0 text-sm">Get notified when we <span className="blue-gradient-text font-semibold">launch</span> 🚀</h4>
      <form onSubmit={handleSubmit} className={`flex overflow-hidden justify-between items-center select-none border ${isValidEmail ? 'border-blue-500' : 'border-red-500'} focus:border-white transition-all ease-in-out duration-300 rounded-md pr-[6px] min-w-[300px] h-12`}>
        <input
          type="email"
          placeholder="Get early access"
          onChange={handleEmailChange}
          className=" px-5 text-sm text-grey-800 font-light flex-grow bg-transparent border-none focus:border-none focus:ring-0 outline-none appearance-none focus:outline-none relative"
        />
        <button type="submit" className="transition-all ease-in-out duration-300 hover:bg-blue-700 text-md bg-blue-500 text-white px-3 rounded-md h-[80%] leading-none">
          ↵
        </button>
      </form>
      {showSuccess && <p className="text-green-500 mt-2">Thanks! We got your email 🎉</p>}
      <canvas ref={canvasRef} className={`fixed top-0 left-0 z-10 w-full h-full ${showSuccess ? 'visible' : 'invisible'}`} />
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

      const updatedVotes: number = await airtable.updateCount(useCaseText, newSelectionState ? "increment" : "decrement");
      setVotes(updatedVotes); // Setting the updated vote count.
    } catch (error) {
      console.error('There was an error sending the vote!', error);
    }
  };

  return (
    <div className={`overflow-hidden select-none transition-all ease-in-out duration-100 cursor-pointer border ${isSelected ? 'border-blue-500' : 'border-gray-600 hover:border-white'} rounded-md flex gap-2`}
      onClick={isDisabled ? undefined : handleVote}
    >
      <div className={`bg-gray-800 flex items-center gap-1 px-2 py-1 cursor-pointer`}>
        <span className="font-regular text-xs ">{isSelected ? "★" : "☆"} star</span>
        {votes >= 0 && <span className={`${isSelected ? 'bg-blue' : 'bg-gray-600 '} transition-all px-[0.3rem] text-sm text-center rounded-full`}>{votes}</span>}
      </div>
      <div className="text-xs text-grey-800 font-light px-2 py-1">{useCaseText}</div>
    </div>
  );
}

interface InputChipProps {
  uscaseListRef?: any;
  onSubmit: (inputValue: string) => void;
}

// export function InputChip({ uscaseListRef, onSubmit }: InputChipProps): JSX.Element {
//   const [inputValue, setInputValue] = useState<string>('');
//   const maxCharLimit = 255;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSubmit();
//     }
//   };

//   const handleSubmit = async () => {
//     onSubmit(inputValue);
//     setInputValue('');
//   };

//   return (
//     <div className={`overflow-hidden align-middle select-none border border-gray-600 transition-all ease-in-out duration-300 border-dashed rounded-md flex items-center pr-[3px] md:min-w-[400px]`}>
//       <input
//         type="text"
//         maxLength={maxCharLimit}
//         placeholder="How do you see yourself using AI on your codebase?"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//         className="text-xs text-grey-800 font-light px-2 py-1 flex-grow bg-transparent border-none outline-none appearance-none focus:ring-0 relative"
//       />
//       <button onClick={handleSubmit} className="transition-all ease-in-out duration-300 hover:bg-blue text-xs bg-gray-700 text-white py-[1px] px-2 rounded-md h-[90%]">
//         ↵
//       </button>
//     </div>
//   );
// }

export function InputChip({ uscaseListRef, onSubmit }: InputChipProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const maxCharLimit = 255;
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (value: string) => {
    value = value.toLowerCase()
    try {
      const fetchedRecords = await airtable.searchRecord(value);
      let fetchedSuggestions = fetchedRecords.map((record: any) => record.get('Usecase'));

      // Sort suggestions based on the index of the input value in each suggestion
      fetchedSuggestions = fetchedSuggestions.sort((a: any, b: any) => {
        const indexA = a.toLowerCase().indexOf(value.toLowerCase());
        const indexB = b.toLowerCase().indexOf(value.toLowerCase());

        if (indexA === -1) return 1; // a does not contain value, so place it at the end
        if (indexB === -1) return -1; // b does not contain value, so place it at the beginning

        return indexA - indexB; // Sort by the index of value in the suggestion
      }).slice(0, 3); // Take the top 3 suggestions

      setSuggestions(fetchedSuggestions);
    } catch (err) {
      console.error('Error fetching suggestions', err);
    }
  };


  const debouncedFetchSuggestions = _.debounce(fetchSuggestions, 400);

  useEffect(() => {
    if (inputValue) {
      debouncedFetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      debouncedFetchSuggestions.cancel();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && suggestions) {
      e.preventDefault(); // Prevents moving to the next focusable element
      setInputValue(suggestions[0]);
      setSuggestions([]); // Close the suggestion box
    }

    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    console.log("Input Value: ", inputValue)
    onSubmit(inputValue);
    setInputValue('');
  };

  const dropdownStyle = {
    top: inputRef.current ? inputRef.current.offsetHeight + 'px' : '100%',
    bottom: 'auto'
  };

  return (
    <div ref={containerRef} className={`relative align-middle select-none border border-gray-600 transition-all ease-in-out duration-300 border-dashed rounded-md flex items-center pr-[3px] md:min-w-[400px]`}>
      <input
        ref={inputRef}
        type="text"
        maxLength={maxCharLimit}
        placeholder="How do you see yourself using AI on your codebase?"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="text-xs text-grey-800 font-light px-2 py-1 flex-grow bg-transparent border-none outline-none appearance-none focus:ring-0 relative"
      />
      <button onClick={handleSubmit} className="transition-all ease-in-out duration-300 hover:bg-blue text-xs bg-gray-700 text-white py-[1px] px-2 rounded-md h-[90%]">
        ↵
      </button>
      {suggestions.length > 0 && (
        <ul ref={dropdownRef} className="suggestions-dropdown absolute flex flex-col z-10 w-full gap-1 rounded-md overflow-auto border border-gray-600 border-dashed bg-gray-800" style={dropdownStyle}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer px-2 py-1 text-xs text-grey-800 font-light flex items-center justify-between bg-grey"
              onClick={() => {
                setInputValue(suggestion)
                setSuggestions([]) // Hide suggestions once one is clicked
              }}
            >
              {suggestion}
              {index === 0 && <div className="ml-2 text-xs text-gray-600 rounded px-1">tab</div>}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
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

function reducer(state: InitialState, action: { type: string; payload: any; callback?: () => any }): InitialState {
  switch (action.type) {
    case 'ADD_SELECTION': {
      const existingSelectedUseCases = JSON.parse(localStorage.getItem('selectedUseCases') || '{}');
      const newSelectedUseCases = { ...existingSelectedUseCases, [action.payload]: true };
      localStorage.setItem('selectedUseCases', JSON.stringify(newSelectedUseCases));
      console.log(newSelectedUseCases)

      return { ...state, selectedUseCases: newSelectedUseCases, clicks: state.clicks + 1, selections: state.selections + 1 };
    }
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
  const [inputValue, setInputValue] = useState<string>('');
  const body = useRef<any>(null);

  useEffect(() => {
    // localStorage.removeItem('selectedUseCases');
    // localStorage.removeItem('useCases');
    async function fetchTopUseCases() {
      try {
        // Assume airtable.getTopPopularUsecases is previously defined
        const records = await airtable.getTopPopularUsecases(20);
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

  useEffect(() => {
    console.log("UseCases: ", useCases)
  }, [useCases])

  const handleSelectionChange = (useCaseText: string, isSelected: boolean) => {
    if (clicks < 10) {
      if (isSelected && state.selections >= 3) return;

      dispatch({ type: isSelected ? 'ADD_SELECTION' : 'REMOVE_SELECTION', payload: useCaseText });
    }
  };

  const handleUsecaseSubmit = async (inputValue: string) => {
    const trimmedInputValue = inputValue.trim();

    if (!trimmedInputValue) return;

    // Attempt to check if the use case already exists in the list
    const existingUsecase = useCases.find(
      (useCase) => useCase.useCaseText.toLowerCase().trim() === trimmedInputValue
    );

    try {
      if (existingUsecase) {
        console.log("Usecase found in list: ", existingUsecase);
        // dispatch({ type: 'ADD_SELECTION', payload: existingUsecase.useCaseText });

        // setUseCases((prevUseCases) => {
        //   const updatedUseCases = prevUseCases.map(useCase =>
        //     useCase.id === existingUsecase.id
        //       ? { ...useCase, votes: useCase.votes + 1 }
        //       : useCase
        //   );

        //   localStorage.setItem('useCases', JSON.stringify(updatedUseCases));
        //   return updatedUseCases;
        // });

        console.log("Selecting usecase")
        dispatch({ type: 'ADD_SELECTION', payload: existingUsecase.useCaseText });
        let _ = { ...existingUsecase, votes: existingUsecase.votes + 1 }

        // setUseCases((prevUseCases) => {
        //   const updatedUseCases = [...prevUseCases, _];
        //   localStorage.setItem('useCases', JSON.stringify(updatedUseCases));
        //   return updatedUseCases;
        // });
        console.log("Updating usecases state")
        setUseCases((prevUseCases) => {
          // localStorage.setItem('useCases', JSON.stringify(updatedUseCases));
          const updatedUseCases = prevUseCases.map((useCase) => {
            if (useCase.useCaseText === existingUsecase.useCaseText) {
              return {
                ...useCase,
                votes: useCase.votes + 1,
              };
            }
            return useCase;
          });
          localStorage.setItem('useCases', JSON.stringify(updatedUseCases));
          console.log("Updated usecases state: ", updatedUseCases)

          return updatedUseCases
        });

      } else {
        console.log("Usecase not found in list, searching and creating/upserting: ");

        const newUsecase: UseCase = await airtable.searchAndCreateUsecase(trimmedInputValue);

        if (!newUsecase) throw new Error("Failed to create use case");

        dispatch({ type: 'ADD_SELECTION', payload: newUsecase.useCaseText });

        setUseCases((prevUseCases) => {
          const updatedUseCases = [...prevUseCases, newUsecase];
          localStorage.setItem('useCases', JSON.stringify(updatedUseCases));
          return updatedUseCases;
        });
      }
    } catch (error) {
      console.error('Error processing use case', error);
    }
  };


  return (
    <div ref={body} className={`flex flex-wrap justify-center md:w-[1000px] gap-2 ${clicks > 10 ? "select-none" : " "} `} >
      {clicks >= 10 && (
        <p className={`text-center w-full`}>Whoa whoaaa!! You trying to fry our servers with all these clicks?!</p>
      )}
      <h1>{JSON.stringify(inputValue)}</h1>
      {isLoading ? (
        <div className="w-full h-10 bg-blue animate-pulse rounded-md"></div>
      ) : (
        useCases.map(useCase => (
          <UseCaseChip
            key={useCase.id}
            initialValue={useCase.votes}
            useCaseText={useCase.useCaseText.charAt(0).toUpperCase() + useCase.useCaseText.slice(1)}
            isSelected={!!selectedUseCases[useCase.useCaseText]}
            onSelectionChange={(isSelected) => handleSelectionChange(useCase.useCaseText, isSelected)}
            isDisabled={(state.clicks >= 10 && !selectedUseCases[useCase.useCaseText]) || (Object.keys(selectedUseCases).length >= 3 && !selectedUseCases[useCase.useCaseText])}
          />
        ))
      )}
      <InputChip uscaseListRef={body} onSubmit={handleUsecaseSubmit} />
    </div>
  );

}

