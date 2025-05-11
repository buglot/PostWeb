import { useEffect, useRef } from "react";


export default function useWebSocket(onMessage: (message: string) => void) {
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL + `?token=`+localStorage.getItem("token");
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      ws.current?.send("hello from client");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      console.log("Message from server:", event.data);
      onMessage(event.data)
    };

    ws.current.onerror = (error: Event) => {
      console.log("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = (msg: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
    }
  };

  return { sendMessage };
}

