import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


export default function CenterListContainer() {
  return (
  <div className="flex flex-col gap-2 w-full">
    <div>전체 센터가 표시될 곳</div>
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-200"> 
        <TableHeader className="w-full">
          <TableRow className="grid grid-cols-[1fr_1fr_2fr_3fr_3fr_1fr] w-full items-center">
            <TableHead className="text-center">센터ID</TableHead>
            <TableHead className="text-center">이름</TableHead>
            <TableHead className="text-center">전화번호</TableHead>
            <TableHead className="text-center">주소</TableHead>
            <TableHead className="text-center">세부주소</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {Array.from({ length: 20 }).map((_, index) => (
            <TableRow 
              key={index} 
              className="grid grid-cols-[1fr_1fr_2fr_3fr_3fr_1fr] w-full items-center"
            >
              <TableCell className="text-center whitespace-nowrap py-2">
                <p>asd</p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap py-2">
                <p>asd</p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap py-2">
                <p>123</p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap py-2 text-ellipsis overflow-hidden">
                <p>456</p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap py-2 text-ellipsis overflow-hidden">
                <p>512</p>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap py-2">
                <div className="flex items-center gap-2 justify-end cursor-pointer">
                  {/* 버튼 등이 들어갈 자리 */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
}