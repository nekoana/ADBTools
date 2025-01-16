import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ADBShell from "@/shell/ADBShell";
import { Child } from "@tauri-apps/plugin-shell";
import { Cmd } from "@/model/Cmd";

type Event =
  | {
      type: "setExecuting";
      payload: boolean;
    }
  | {
      type: "setOutput";
      payload: string;
    };

function reducer(
  state: { isExecuting: boolean; output: string },
  action: Event,
) {
  switch (action.type) {
    case "setExecuting":
      let output = state.output;
      // Clear output when starting a new command
      if (action.payload) {
        output = "";
      }
      return { output: output, isExecuting: action.payload };
    case "setOutput":
      return { ...state, output: state.output + action.payload };
  }
}

function useExecute() {
  const pid = useRef<Child | null>(null);
  const [status, dispatch] = useReducer(reducer, {
    isExecuting: false,
    output: "",
  });

  const execute = useCallback((device: string | null, cmd: Cmd) => {
    ADBShell.kill(pid.current).then(() => {
      dispatch({ type: "setExecuting", payload: true });
      ADBShell.execute(
        cmd,
        device,
        (data) => {
          dispatch({ type: "setOutput", payload: data });
        },
        (data) => {
          dispatch({ type: "setOutput", payload: data });
        },
        () => {
          dispatch({ type: "setExecuting", payload: false });
        },
      ).then((child) => {
        pid.current = child;
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      ADBShell.kill(pid.current);
    };
  }, []);

  return { status, execute };
}

export default useExecute;
