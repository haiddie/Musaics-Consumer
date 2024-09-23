'use client';

import { selectPoll } from "@/app/Util/PollsUtil";
import { useEffect, useState } from "react";
import { MainContent, create_content } from "./api.modal";

const Polls = ({ data, element }: any) => {


  // Initialize the state with the data prop
  const [pollData, setPollData] = useState(data);
  const [selectedOption, setSelectedOption] = useState(null);
  const [disablePolls, setDisablePolls] = useState(false)

  const handleOptionClick = (optionId: any) => {
    if (disablePolls || data.user_selected_options.length > 0) {
      return
    }
    setSelectedOption(optionId);

    // Clone the current poll data
    const updatedPollData = { ...pollData };

    // Find the selected option and increment its total_count
    const updatedOptions = updatedPollData.options.map((option: any) => {
      if (option.id === optionId) {
        return {
          ...option,
          total_count: option.total_count + 1
        };
      }
      return option;
    });

    // Update user_selected_options array
    updatedPollData.options = updatedOptions;
    updatedPollData.user_selected_options = [...updatedPollData.user_selected_options, optionId];




    let body: any = {
      blocks: [{
        main_content: { polls: updatedPollData },
        type: element.type,
        id: parseInt(element.id)
      }],
      poll: true
    }

    selectPoll(body).then((res) => {



      // Set the new poll data state
      setPollData(updatedPollData);
      setDisablePolls(true);
    }, (err) => {
      console.log('err', err);
    })

  };





  const calculatePercentage = (numerator: number, total: number) => {
    if (total === 0) {
      // To avoid division by zero error, return 0 or handle it according to your requirements
      return 0;
    }
    const percentage = (numerator / total) * 100;
    return parseFloat(percentage.toFixed(1));
  }

  const renderOptions = () => {
    const totalVotes = pollData.options.reduce((acc: number, option: any) => acc + option.total_count, 0);

    return pollData?.options?.map((option: any, index: number) => (
      <div key={index} className="relative grid grid-cols-12 gap-x-1 sm:gap-3 items-center">
        <div
          onClick={() => handleOptionClick(option.id)}
          className={`relative my-2 border ${pollData?.user_selected_options?.length > 0 ? 'col-span-10' : 'col-span-12'} h-[50px] transform transition-transform duration-200 hover:scale-[1.05] z-20 border-gray-300 rounded-md cursor-pointer ${selectedOption === option.id ? 'bg-primary-100 text-white' : 'bg-gray-600'}`}
        >
          <div className={`absolute h-full font-bold rounded-md bg-violet-700`} style={{ width: `${(option.total_count / pollData?.user_selected_options?.length * 100)}%` }}>
          </div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 p-4" dangerouslySetInnerHTML={{ __html: option.name }} />
        </div>
        {pollData?.user_selected_options?.length > 0 && <div className="text-sm col-span-2">{calculatePercentage(option.total_count, totalVotes)}%</div>}
      </div>
    ));
  };

  return (
    <div className="polling-container  rounded-md shadow-md w-full">
      {element?.is_title && element.title && element.title !== "null" && (<div className="flex justify-center items-center"><span className='text-white text-center capitalize text-xl font-bold  px-[10px] py-[10px]' style={{ overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: element?.title }} /></div>)}
      <h2 className="text-lg font-bold mb-4" dangerouslySetInnerHTML={{ __html: pollData?.question }}></h2>
      <div className="options-container w-full">{renderOptions()}</div>
    </div>
  );
}

export default Polls;
