import React from "react";

export default function ApplicationTimeline() {
    return (
        <div className="p-3 m-4 bg-white shadow-xl rounded-md">
            <h1 className="flex- gap-40 text-lg font-semibold mb-5">
                Application Timeline
            </h1>
            <div className="flex gap-6">
                <div>
                    <img
                        src="./app.png"
                        alt="Application Icon"
                        className="w-10 h-10 object-cover rounded-md"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">
                        Application Submitted
                    </h2>
                    <p className="text-xs font-light text-gray-400">
                        october 22 2025
                    </p>
                    <p className="text-sm text-gray-500">
                        Your application has been successfully submitted. We're
                        excited to learn more about you!
                    </p>
                </div>
            </div>
            <div className="flex gap-6 mt-10">
                <div>
                    <img
                        src="./under.png"
                        alt="Application Icon"
                        className="w-10 h-10 object-cover rounded-md"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Under Review</h2>
                    <p className="text-xs font-light text-gray-400">
                        Current Stage
                    </p>
                    <p className="text-sm text-gray-500">
                        Our team is currently reviewing your application. This
                        may take a few days. Thank you for your patience.
                    </p>
                </div>
            </div>
            <div className="flex gap-2 mt-7">
                <div>
                    <img
                        src="./loa.png"
                        alt="Application Icon"
                        className="w-10 h-10 object-cover rounded-md"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-400">
                        Interview Stage
                    </h2>
                </div>
            </div>
            <div className="flex gap-2 mt-5">
                <div>
                    <img
                        src="./loa.png"
                        alt="Application Icon"
                        className="w-10 h-10 object-cover rounded-md"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-400">
                        Decision Made
                    </h2>
                </div>
            </div>
        </div>
    );
}
