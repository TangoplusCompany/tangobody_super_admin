import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function CoachListContainer() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        주관리자/부관리자 전체 조회
      </div>
      <div className="flex w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center ">계정 이메일</TableHead>
              <TableHead className="text-center ">이름</TableHead>
              <TableHead className="text-center ">전화번호</TableHead>
              <TableHead className="text-center ">가입일자</TableHead>
              <TableHead className="text-center ">권한</TableHead>
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