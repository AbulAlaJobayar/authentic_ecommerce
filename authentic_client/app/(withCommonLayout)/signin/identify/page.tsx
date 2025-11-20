import React from 'react';
import IdentifyForm from './identifyForm';

const IdentifyPage = () => {
    return (
        <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-8xl">
                <IdentifyForm />
            </div>
        </div>
    );
};

export default IdentifyPage;