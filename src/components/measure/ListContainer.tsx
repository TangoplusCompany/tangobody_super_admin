"use client"


import { ICenterDetail } from "@/app/types/center";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { IDeviceDetail } from "@/app/types/device";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { ChevronsUpDown, Command, Check } from "lucide-react";
import { Button } from "../ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "../ui/popover";


const dummyCenters : ICenterDetail[] = [
  {center_sn: 1, admin_sn: 1, center_name: "2FA 테스트 센터", center_address:"첨단벤처소로37번길", center_address_detail: "7", center_phone: "01041579173"},
  {center_sn: 2, admin_sn: 2, center_name: "탱고플러스 영업센터", center_address:"첨단벤처소로37번길", center_address_detail: "7", center_phone: "01041579173"},
  {center_sn: 3, admin_sn: 3, center_name: "XS 필라테스", center_address:"첨단중앙로 22길", center_address_detail: "14-3", center_phone: "01000000000"},
]
const dummyDevices : IDeviceDetail[] = [
  { sn: 1, center_sn: 3, device_name: "측정기 A", install_location: "전시실", install_address_1: "", install_address_2: "",reg_date: "2025-12-12 16:30:22", used: 1, reg_status: 1, device_status: 1 },
  { sn: 2, center_sn: 2 , device_name: "측정기 B", install_location: "전시실B", install_address_1: "", install_address_2: "", reg_date: "2026-04-29 14:29:58", used: 1, reg_status: 1, device_status: 1 },
  { sn: 3, center_sn: 1 , device_name: "센서 X", install_location: "바닐라", install_address_1: "", install_address_2: "", reg_date: "2026-05-02 08:47:55", used: 1, reg_status: 1, device_status: 1 },
]
export default function MeasureListContainer() {
  // 리스트 불러오기
  const [selectedCenter, setSelectedCenter] = useState<ICenterDetail>()
  const [selectedDevice, setSelectedDevice] = useState<IDeviceDetail>()
  const [openDeviceList, setOpenDeviceList] = useState(false)

  const filteredDevices = dummyDevices.filter(
    (device) => device.center_sn == selectedCenter?.center_sn
  )
  const handleCenterChange = (changeSn : string) => {
    setSelectedCenter(dummyCenters.find((center)=>center.center_sn === parseInt(changeSn)))
    setSelectedDevice(undefined)
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">센터 선택</label>
        <Select value={selectedCenter?.center_name} onValueChange={handleCenterChange}>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="센터를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {dummyCenters.map((center) => (
              <SelectItem key={center.center_sn} value={`${center.center_sn}`}>
                {center.center_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">장치 검색 (SN)</label>
        <Popover open={openDeviceList} onOpenChange={setOpenDeviceList}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openDeviceList}
              className="w-[250px] justify-between font-normal"
              disabled={!selectedCenter} // 센터를 먼저 선택해야 활성화
            >
              {selectedDevice
                ? filteredDevices.find((d) => d.sn === selectedDevice.sn)?.sn
                : "장치 SN을 입력/선택"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-62.5 p-0">
            <Command>
              <CommandInput placeholder="SN 검색..." />
              <CommandList>
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                <CommandGroup>
                  {filteredDevices.map((device) => (
                    <CommandItem
                      key={device.sn}
                      value={`${device.sn}`}
                      onSelect={(currentValue) => {
                        // setSelectedDevice(currentValue === `${selectedDevice?.device_name}` ? "" : currentValue)
                        setOpenDeviceList(false) // 선택 후 닫기
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedDevice?.sn === device.sn ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {device.sn} ({device.device_name})
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      
      <div className="flex w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center ">이름</TableHead>
              <TableHead className="text-center ">전화 번호</TableHead>
              <TableHead className="text-center ">측정기기</TableHead>
              <TableHead className="text-center ">측정일</TableHead>
              <TableHead className="text-center ">측정일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 20 }).map((_, index) => (
              <TableRow key={index} className="">
                <TableCell className="text-center font-medium whitespace-nowrap py-2">
                  <p>asd</p>
                </TableCell>
                <TableCell className="text-center whitespace-nowrap py-2">
                  <p>asd</p>
                </TableCell>
                <TableCell className="text-center whitespace-nowrap py-2">
                  <p>123</p>
                </TableCell>
                <TableCell className="text-center whitespace-nowrap py-2">
                  <p>456</p>
                </TableCell>
                <TableCell className="text-center whitespace-nowrap py-2">
                  <p>512</p>
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <div className="flex items-center gap-2 justify-end cursor-pointer">
                    
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}