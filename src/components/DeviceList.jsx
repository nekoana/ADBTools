import { useEffect, useState } from "react";
import "./DeviceList.css";

function DeviceList({ devices, onDeviceSelect }) {
  const [selectedDevice, setSelectedDevice] = useState("");

  useEffect(() => {
    if (devices.length > 0) {
      setSelectedDevice(devices[0]);
      onDeviceSelect(devices[0]);
    }
  }, [devices, onDeviceSelect]);

  const handleDeviceSelect = (e) => {
    setSelectedDevice(e.target.value);
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
