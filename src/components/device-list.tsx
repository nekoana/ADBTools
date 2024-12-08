import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent } from "react";

function DeviceList({
  devices,
  selected,
  onSelected,
}: {
  devices: string[];
  selected: string;
  onSelected: (device: string) => void;
}) {
  const handleSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelected(e.target.value);
  };

  return (
    <Select
      isRequired
      value={selected}
      placeholder="Select a device"
      defaultSelectedKeys={[selected]}
      onChange={handleSelected}
    >
      {devices.map((device) => (
        <SelectItem key={device} value={device} className="overflow-hidden">
          {device}
        </SelectItem>
      ))}
    </Select>
  );
}

export default DeviceList;
