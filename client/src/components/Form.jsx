import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [activeTab, setActiveTab] = useState('configuration');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [customData, setCustomData] = useState([{ key: '', value: '' }]);
    const [token, setToken] = useState('');
    const [platform, setPlatform] = useState('');

    const handleCustomDataChange = (index, field, value) => {
        const newCustomData = [...customData];
        newCustomData[index][field] = value;
        setCustomData(newCustomData);
    };

    const addCustomDataField = () => {
        setCustomData([...customData, { key: '', value: '' }]);
    };

    const removeCustomDataField = (index) => {
        const newCustomData = customData.filter((_, i) => i !== index);
        setCustomData(newCustomData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customDataObject = customData.reduce((acc, { key, value }) => {
            if (key) acc[key] = value;
            return acc;
        }, {});
        const formData = {
            token,
            platform,
            payload: {
                title,
                message,
                customData: customDataObject
            }
        };
        try {
            const response = await axios.post('http://localhost:5000/api/v1/notifications/send-notification', formData);
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setActiveTab('configuration')}
                    className={`px-4 py-2 ${activeTab === 'configuration' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-l`}
                >
                    Configure <i className='bx bxs-bell-ring'></i>
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-4 py-2 ${activeTab === 'settings' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-r`}
                >
                    Settings <i className='bx bx-cog'></i>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'configuration' && (
                    <>
                        <div>
                            <label htmlFor="title" className="block mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title"
                                className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2">Message</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter the Message"
                                className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                            ></textarea>
                        </div>
                        <label className="block mb-2">Custom Data</label>
                        {customData.map((data, index) => (
                            <div key={index} className="flex space-x-2">
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        id={`key-${index}`}
                                        value={data.key}
                                        onChange={(e) => handleCustomDataChange(index, 'key', e.target.value)}
                                        placeholder="Key"
                                        className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        id={`value-${index}`}
                                        value={data.value}
                                        onChange={(e) => handleCustomDataChange(index, 'value', e.target.value)}
                                        placeholder="Value"
                                        className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <button type="button" onClick={() => removeCustomDataField(index)} className="text-red-500">
                                    <i className='bx bx-trash'></i>
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addCustomDataField} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Add Field <i className='bx bx-plus'></i>
                        </button>
                    </>
                )}
                {activeTab === 'settings' && (
                    <>
                        <div>
                            <label htmlFor="token" className="block mb-2">Token</label>
                            <input
                                type="text"
                                id="token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="Enter the Token"
                                className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="platform" className="block mb-2">Platform</label>
                            <select
                                id="platform"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                            >
                                <option value="" disabled>Select Platform</option>
                                <option value="android">Android</option>
                                <option value="ios">iOS</option>
                            </select>
                        </div>
                    </>
                )}
                <br />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Send <i className='bx bxl-telegram'></i>
                </button>
            </form>
        </div>
    );
};

export default Form;
