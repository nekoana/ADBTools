import { useEffect, useReducer } from "react";
import ADBShell from "@/shell/ADBShell";

function useDevices(refreshInterval?: number) {
  const [devices, dispatch] = useReducer(
    (state: string[], action: { type: string; payload: string[] }) => {
      if (action.type === "setDevices") {
        const newDevices = action.payload;
        if (
          state.length !== newDevices.length ||
          !state.every((device, index) => device === newDevices[index])
        ) {
          return newDevices;
        }
      }
      return state;
    },
    [],
  );

  const fetchDevices = async () => {
    const newDevices = await ADBShell.devices();
    dispatch({ type: "setDevices", payload: newDevices });
  };

  useEffect(() => {
    fetchDevices();
    if (refreshInterval) {
      const interval = setInterval(fetchDevices, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return devices;
}

export default useDevices;
