import {
  MdFilledSelect,
  MdOutlinedSelect,
  MdSelectOption,
} from "@/wrapper/select";

function DeviceList({
  devices,
  selected,
  onSelected,
}: {
  devices: string[];
  selected: string;
  onSelected: (device: string) => void;
}) {
  const handleSelected = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    onSelected(target.value);
  };

  return (
    <MdFilledSelect
      required
      clampMenuWidth={true}
      value={selected}
      className="w-full overflow-hidden"
      onChange={handleSelected}
    >
      {devices.map((device) => (
        <MdSelectOption key={device} value={device} className="overflow-hidden">
          <div slot="headline">{device}</div>
        </MdSelectOption>
      ))}
    </MdFilledSelect>
  );
}

export default DeviceList;
