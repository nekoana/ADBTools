import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent } from "react";

function DeviceList({
  devices,
  onSelected,
}: {
  devices: string[];
  onSelected: (device: string) => void;
}) {
  const handleSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelected(e.target.value);
  };

  return (
    <Select isRequired placeholder="Select a device" onChange={handleSelected}>
      {devices.map((device) => (
        <SelectItem key={device} className="overflow-hidden">
          {device}
        </SelectItem>
      ))}
    </Select>
  );
}

export default DeviceList;
