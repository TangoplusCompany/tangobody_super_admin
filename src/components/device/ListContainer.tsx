"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function DeviceListContainer() {
  
  return (
    <div className="flex flex-col gap-2">
      <div>

      </div>
      
      <div className="w-full overflow-x-auto">
        <Table className="w-full min-w-200"> 
          <TableHeader className="w-full">
            <TableRow className="grid grid-cols-[1fr_2fr_2fr_3fr_1fr_1fr] w-full items-center">
              <TableHead className="text-center ">이름</TableHead>
              <TableHead className="text-center ">설치 장소</TableHead>
              <TableHead className="text-center ">주소</TableHead>
              <TableHead className="text-center ">세부 주소</TableHead>
              <TableHead className="text-center ">등록 여부</TableHead>
              <TableHead className="text-center ">삭제 여부</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 20 }).map((_, index) => (
              <TableRow key={index} className="grid grid-cols-[1fr_2fr_2fr_3fr_1fr_1fr] w-full items-center">
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