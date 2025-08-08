"use client";
import React, { useState } from "react";
import Dashboard from "./dashboard/page";
import Progress from "./progress/page";

export default function Page() {
	const [showProgress, setShowProgress] = useState(false);

	return <>{!showProgress ? <Dashboard onStartApplication={() => setShowProgress(true)} /> : <Progress />}</>;
}
