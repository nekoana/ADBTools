import { useEffect, useState } from "react";
import "./DeviceList.css";

function DeviceList({ devices, selectedDevice, onDeviceSelect }) {
  const handleDeviceSelect = (e) => {
    onDeviceSelect(e.target.value);
  };

  if (devices.length === 0) {
    return null;
  }

  return (
    <select
      value={selectedDevice}
      onChange={handleDeviceSelect}
      className="device-select"
    >
      {devices.map((device) => (
        <option key={device} value={device}>
          {device}
        </option>
      ))}
    </select>
  );
}

export default DeviceList;
