import { useEffect } from "react";

function Welcome({ onFinish }) {

  useEffect(() => {
    setTimeout(() => {
      onFinish();
    }, 2000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
      <h1 className="text-white text-4xl font-bold animate-bounce">
        Expense Tracker
      </h1>
    </div>
  );
}

export default Welcome;