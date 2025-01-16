// import axios from 'axios';
// import React, { Component } from 'react';

// interface DDData {
//   dd_id: number;
//   bank_name: string;
//   bank_branch: string;
//   dd_number: string;
//   dd_date: string;
//   micr: string;
//   dd_code: string;
//   amount: number;
//   receipt_id: string;
// }

// interface StatementTableProps {
//   data: DDData[];
//   handleDDCheck: (value: string) => void;
//   handleAddToStatement: () => void;
// }

// interface StatementTableState {
//   // Define state types if needed
// }

// class StatementTable extends Component<StatementTableProps, StatementTableState> {
//   constructor(props: StatementTableProps) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     const { data, handleDDCheck, handleAddToStatement } = this.props;

//     const tableContent = data.map((element) => (
//       <tr key={element.dd_id}>
//         <td>
//           <input
//             type="checkbox"
//             value={element.dd_id}
//             onChange={(e) => handleDDCheck(e.target.value)}
//           />
//         </td>
//         <td>{element.bank_name}</td>
//         <td>{element.bank_branch}</td>
//         <td>{element.dd_number}</td>
//         <td>{new Date(element.dd_date).toLocaleDateString('en-IN')}</td>
//         <td>{element.micr}</td>
//         <td>{element.dd_code}</td>
//         <td>{element.amount}</td>
//         <td>{element.receipt_id}</td>
//       </tr>
//     ));

//     return (
//       <>
//         <button className="btn btn-primary" onClick={handleAddToStatement}>
//           Add to Statement
//         </button>
//         <table className="table table-bordered mt-3">
//           {data && (
//             <>
//               <thead>
//                 <tr>
//                   <th>Select</th>
//                   <th>Bank Name</th>
//                   <th>Branch Name</th>
//                   <th>DD Number</th>
//                   <th>DD Date</th>
//                   <th>MICR CODE</th>
//                   <th>DD CODE</th>
//                   <th>Amount</th>
//                   <th>Receipt Number</th>
//                 </tr>
//               </thead>
//               <tbody>{tableContent}</tbody>
//             </>
//           )}
//         </table>
//       </>
//     );
//   }
// }

// export default StatementTable;


import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

interface DDData {
  dd_id: number;
  bank_name: string;
  bank_branch: string;
  dd_number: string;
  dd_date: string;
  micr: string;
  dd_code: string;
  amount: number;
  receipt_id: string;
}

interface StatementTableProps {
  data: DDData[];
  handleDDCheck: (value: string) => void;
  handleAddToStatement: () => void;
}

const StatementTable: React.FC<StatementTableProps> = ({ data, handleDDCheck, handleAddToStatement }) => {
  return (
    <div className="p-4 space-y-4">
      <Button onClick={handleAddToStatement} variant={"myBtn"} className="text-white">
        Add to Statement
      </Button>
      <Table className="border border-gray-200">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableCell className="font-semibold">Select</TableCell>
            <TableCell className="font-semibold">Bank Name</TableCell>
            <TableCell className="font-semibold">Branch Name</TableCell>
            <TableCell className="font-semibold">DD Number</TableCell>
            <TableCell className="font-semibold">DD Date</TableCell>
            <TableCell className="font-semibold">MICR CODE</TableCell>
            <TableCell className="font-semibold">DD CODE</TableCell>
            <TableCell className="font-semibold">Amount</TableCell>
            <TableCell className="font-semibold">Receipt Number</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((element) => (
            <TableRow key={element.dd_id} className="hover:bg-gray-50">
              <TableCell>
                <Checkbox
                  value={element.dd_id.toString()}
                  onChange={(e: any) => handleDDCheck(e.target.value)}
                  className="accent-primary"
                />
              </TableCell>
              <TableCell>{element.bank_name}</TableCell>
              <TableCell>{element.bank_branch}</TableCell>
              <TableCell>{element.dd_number}</TableCell>
              <TableCell>{new Date(element.dd_date).toLocaleDateString('en-IN')}</TableCell>
              <TableCell>{element.micr}</TableCell>
              <TableCell>{element.dd_code}</TableCell>
              <TableCell>{element.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
              <TableCell>{element.receipt_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatementTable;
