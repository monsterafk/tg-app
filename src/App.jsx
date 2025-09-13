import { useEffect, useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      console.log(tg);
      setUsername(tg.initDataUnsafe?.user?.first_name || "Гость");
      setInitData(tg.initDataUnsafe);
      tg.expand();
    }
  }, []);

  const sendData = () => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.sendData(JSON.stringify({ action: "hello", user: username }));
      tg.close();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold">Привет, {username}!</h1>
        <p className="text-gray-600">Это твое Telegram Mini App 🚀</p>
        <button
          onClick={sendData}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
        >
          Отправить данные боту
        </button>
      </div>
    </div>
  );
}
