'use client'

import { useState, useEffect, useReducer, useRef } from "react";
import * as airtable from "@/lib/airtable";
import { UseCase } from "@/lib/airtable";
import ConfettiGenerator from "confetti-js";
import _ from 'lodash';
import { clsx } from "clsx";
import { ProjectXIconOutline } from "@/res/icons/ProjectXIconOutline";



export function EmailNotify() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true); // to track if email is valid
  const [isFocused, setIsFocused] = useState(false); // New State Variable

  const handleSubmit = async (e: any) => {
    e.persist();
    e.preventDefault(); // prevent the default form submission

    const storedEmail = localStorage.getItem('userEmail');

    if (storedEmail === email) {
      console.log("We already got your email!")
      return;
    }

    // Send POST request to API route
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    }).then((res) => res.json()).then((data) => {
      console.log("Email sent successfully: ", email, data)
    }).catch((err) => {
      console.log("Error sending email")
    });


    if (!validateEmail(email)) { // Validate email when form is submitted
      setIsValidEmail(false); // Set the isValidEmail to false if email is invalid
      return;
    }

    try {
      await airtable.addEmailToAirtable(email);
      localStorage.setItem('userEmail', email); // This line stores the email in local storage.
      setIsValidEmail(true);
      setShowSuccess(true);
      return false
    } catch (error) {
      console.error('There was a problem saving your email');
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (showSuccess) {
      const timeoutId = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccess]);

  return (
    <div className={`relative flex flex-col items-center gap-[10px]`}>
      <h4 className="font-light m-0 text-md sm:text-md">Get notified when we <span className="blue-gradient-text font-semibold">launch</span> 🚀</h4>

      <div className="relative">
        <form
          onSubmit={handleSubmit}
          className={`flex overflow-hidden justify-between items-center select-none 
                     border ${isFocused ? 'border-blue-500' : (isValidEmail ? 'border-gray-500' : 'border-red-500')} 
                     ${showSuccess && 'border-green'} 
                     transition-all ease-in-out duration-300 rounded-md pr-[6px] min-w-[300px] h-12`}
        >
          <input
            type="email"
            placeholder="Get early access"
            onChange={handleEmailChange}
            onFocus={() => setIsFocused(true)} // set isFocused to true when input is focused
            onBlur={() => setIsFocused(false)} // set isFocused to false when input loses focus
            className=" focus:text-white px-5 text-sm text-grey-800 font-light flex-grow bg-transparent border-none focus:border-none focus:ring-0 outline-none appearance-none focus:outline-none relative"
          />
          <button type="submit" className="transition-all ease-in-out duration-300 text-md bg-blue text-white px-3 rounded-md h-[80%] leading-none">
            ↵
          </button>
        </form>
      </div>

      {showSuccess && <p className="text-green-500 mt-2">Thanks! We got your email 🎉</p>}
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

      const updatedUsecase: UseCase = await airtable.updateCount(useCaseText, newSelectionState ? "increment" : "decrement");
      setVotes(updatedUsecase.votes); // Setting the updated vote count.
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


export function TallyCount({ count }: { count?: number }) {
  return (
    <div className={`overflow-hidden flex flex-row  border border-slate-7 rounded-md`}>
      <div className={`bg-slate-3 flex flex-row w-fit items-center gap-1 px-2 py-0 cursor-pointer border-r-[1px] border-slate-7`}>
        <ProjectXIconOutline className={clsx(
          "h-4 w-4 p-0 m-0",
        )}
        />
        <span className="font-regular text-xs">Usecases ▲▼</span>

      </div>
      <span className={`px-2 flex items-center text-2xs text-center `}>{count! > 0 ? count : "◉"}</span>
      {/* <div className="text-xs text-grey-800 font-light px-2 py-1">{useCaseText}</div> */}
    </div>
  )
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
        placeholder="What's your usecase?"
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

let selectedUseCases: any = undefined;
if (typeof window !== 'undefined') {
  selectedUseCases = JSON.parse(localStorage.getItem('selectedUseCases') || '{}');
}

// Correcting the Error here, using selectedUseCases directly
const initialState: InitialState = {
  selectedUseCases,
  clicks: 0,
  selections: selectedUseCases && Object.keys(selectedUseCases).filter(key => selectedUseCases[key]).length,
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
    case 'SET_COUNT':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function UseCaseList(): JSX.Element {
  const [useCases, setUseCases] = useState<UseCase[]>(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('useCases') || '[]'));
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedUseCases, clicks, selections, isLoading } = state;
  const [inputValue, setInputValue] = useState<string>('');
  const [countdown, setCountdown] = useState(10);

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
    if (clicks >= 10) {
      const countdownRef = useRef(countdown); // Set up ref

      const intervalId = setInterval(() => {
        if (countdownRef.current > 0) setCountdown(prev => {
          countdownRef.current = prev - 1; // Update ref value on each iteration
          return countdownRef.current;
        });

        if (countdownRef.current === 0) {
          clearInterval(intervalId);
          dispatch({ type: 'SET_COUNT', payload: 0 });
        }
      }, 1000);
      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }
  }, [clicks]);


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
    const existingUsecase: any = await airtable.searchRecord(
      trimmedInputValue
    ).then(records => {
      console.log(records[0])
      if (records.length === 0) return null;
      return {
        id: records[0].id,
        useCaseText: records[0].get('Usecase'),
        votes: records[0].get('Votes'),
      }
    }); // returns an array of 0 or more records

    try {
      if (existingUsecase) {
        // console.log("Existing usecase found ", existingUsecase);

        // Parse the selected use cases from local storage or default to an empty object
        const selectedUseCases = JSON.parse(localStorage.getItem('selectedUseCases') || '{}');

        // Check if the updatedUsecase.useCaseText exists in the selectedUseCases object
        if (selectedUseCases[existingUsecase.useCaseText]) {
          return;
        }

        const updatedUsecase: UseCase = await airtable.updateCount(trimmedInputValue, "increment");
        console.log(updatedUsecase.votes)

        dispatch({ type: 'ADD_SELECTION', payload: updatedUsecase.useCaseText });


        // setUseCases((prevUseCases) => {
        //   const updatedUseCases = [...prevUseCases, _];
        //   localStorage.setItem('useCases', JSON.stringify(updatedUseCases));
        //   return updatedUseCases;
        // });
        console.log("Updating usecases state")
        console.log(updatedUsecase)
        const updatedUscasesList = useCases.map(item => {
          return item.useCaseText === updatedUsecase.useCaseText ? updatedUsecase : item;
        });

        if (typeof window !== 'undefined') {
          localStorage.setItem('useCases', JSON.stringify(updatedUscasesList));
        }



        setUseCases(updatedUscasesList);
        console.log("Hello")

      } else {
        console.log("Usecase not found in list, searching and creating/upserting: ");

        const newUsecase: UseCase = await airtable.searchAndCreateUsecase(trimmedInputValue);

        if (!newUsecase) throw new Error("Failed to create use case");

        dispatch({ type: 'ADD_SELECTION', payload: newUsecase.useCaseText });

        setUseCases((prevUseCases: UseCase[]) => {
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
        <p className={`text-center text-sm text-blue w-full`}>Whoa whoa!! You trying to fry our servers with all these clicks?! Slow down for </p>
      )}
      {isLoading ? (
        <div className="w-full h-10 bg-blue animate-pulse rounded-md"></div>
      ) : (
        useCases.map(useCase => (
          <UseCaseChip
            key={useCase.id + useCase.votes}
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

