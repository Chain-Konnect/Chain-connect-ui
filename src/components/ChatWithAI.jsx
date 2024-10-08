import React, { useState, useEffect } from 'react'
import { add, bookmark, chats, comment, fire, likes, nft } from '../assets'
import toast from 'react-hot-toast'
import { GoogleGenerativeAI } from '@google/generative-ai';
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

const ChatWithAI = () => {
    const genAI = new GoogleGenerativeAI(
        GEMINI_KEY
    );
    const [Chat, setChat] = useState([])
    const [huma, setHuman] = useState({
        message: "",
        author: "human"
    })


    const getResponseForGivenPrompt = async (inputValue) => {
        try {
            const prompt = "You are an AI model of chainConnect named Ruvvy, you are to provide bried responses to"
            // Add human message to the chat first
            setChat((prevChat) => [...prevChat, huma]);

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(`${prompt} ${inputValue}`);
            const response = await result.response;
            const text = await response.text();

            // Add bot response to the chat after human's message is added
            setChat((prevChat) => [...prevChat, { message: text, author: "bot" }]);

            // Clear human input
            setHuman((prevHuman) => ({ ...prevHuman, message: "" }));

            return text;
        } catch (error) {
            toast.error("Error occurred");
        }
    };



    const handleChange = (e) => {
        setHuman({ ...huma, message: e.target.value })
    }
    useEffect(() => {

    }, [Chat])

    return (
        <div className="flex-[0.8] bg-gray-200  p-4 font-poppins h-screen">
            <div className='flex justify-between'>
                <p>Chat with CC OpenAI</p>
                <div>

                </div>

            </div>
            <div className='flex flex-col justify-between h-full'>
                <div className='overflow-y-scroll h-full'>

                    {Chat?.map((e, i) => (
                        <div key={i}>
                            {e?.author == "human" ? <div className='flex flex-col items-end justify-end min-h-[50px]'>
                                <p>You</p>
                                <div className='  rounded-lg shadow-lg w-1/2 my-2 bg-white p-2 mr-1'>
                                    <p>{e?.message}</p>

                                </div>
                            </div>

                                : <div className='flex flex-col justify-start min-h-[50px]'>
                                    <p>AI</p>
                                    <div className='  rounded-lg shadow-lg w-1/2 my-2 bg-white p-2 mr-1'>
                                        <p>{e?.message}</p>

                                    </div>
                                </div>
                            }
                        </div>
                    ))}


                </div>
                <div className='my-4 w-full bg-white rounded-md px-3 flex justify-between items-center'>
                    <input type="text" name="" value={huma?.message} className='h-[70px] w-4/5 outline-none p-4 bg-none' id="" placeholder='Type here .................' onChange={(e) => handleChange(e)} />
                    <button className='bg-blue-600 h-[40px] px-4 text-white rounded-lg' onClick={() => {
                        getResponseForGivenPrompt(huma?.message)

                    }}>Send</button>
                </div>

            </div>


        </div>
    )
}

export default ChatWithAI
