import React from 'react';

function Confirmationbox({ toggleModal, onDelete, confirmationMessage, showModal }: any) {
    return (
        <>
            {showModal && (
                <div className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="sm:max-w-lg sm:w-full m-3 bg-gray-900 border border-gray-900  shadow-sm rounded-xl">
                        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-700">
                            <h3 className="font-bold text-white">Confirmation</h3>
                            <button
                                type="button"
                                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-900"
                                onClick={toggleModal}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4">
                            <p className="mt-1 text-white">
                                {confirmationMessage}
                            </p>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-700">
                            <button
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                                onClick={toggleModal}
                            >
                                Close
                            </button>
                            <button
                                onClick={onDelete}
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-100 text-white hover:bg-primary-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Confirmationbox;