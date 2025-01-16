// import React, { useEffect, useState } from "react";
// import "./form.css";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// interface FeeHead {
//   fh_id: number;
//   head_name: string;
// }

// interface ReceiptData {
//   receipt_id: string;
//   date_of_payment: string;
//   stud_clg_id: string;
//   name: string;
//   program: string;
//   bname: string;
//   academic_year: string;
//   category: string;
//   fh_id: string | number | number[];
//   amount: number;
//   dd_no?: string;
//   check_number?: string;
//   check_date?: string;
//   bank_name?: string;
//   bank_branch?: string;
//   balance_amount?: number;
//   note?: string;
// }

// const ReceiptPrint: React.FC = () => {
//   const [data, setData] = useState<any>({});
//   const [fh_id, setFhId] = useState<string | number>("");
//   const [allFee, setAllFee] = useState<FeeHead[]>([]);

//   const location = useLocation();

//   useEffect(() => {
//     const queryPara = new URLSearchParams(window.location.search);
//     const id = queryPara.get('id');
//     const fh_id = queryPara.get('fh_id');

//     if (id) {
//       setFhId(fh_id || '');
//       fetchReceiptsById(id, fh_id);
//       fetchAllFeeHeads();
//     }
//   }, []);

//   const fetchReceiptsById = async (id: any, fh_id: any) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_APP_BASE_URL}/fetchReceiptsId`,
//         { id, fh_id },
//         {
//           headers: { Authorization: localStorage.getItem('token') }
//         }
//       );
//       setData(response.data.receipts[0]);
//     } catch (error) {
//       console.error("Error fetching receipt data", error);
//     }
//   };

//   const fetchAllFeeHeads = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
//         headers: { Authorization: localStorage.getItem('token') }
//       });
//       if (data.found) {
//         setAllFee(data.result);
//       } else {
//         console.error(data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching fee heads", error);
//     }
//   };

//   const numberToEnglish = (n: number, customJoinCharacter?: string) => {
//     const string = String(n);
//     const and = customJoinCharacter || "and";
//     const units = [
//       "",
//       "one",
//       "two",
//       "three",
//       "four",
//       "five",
//       "six",
//       "seven",
//       "eight",
//       "nine",
//       "ten",
//       "eleven",
//       "twelfth",
//       "thirteen",
//       "fourteen",
//       "fifteen",
//       "sixteen",
//       "seventeen",
//       "eighteen",
//       "nineteen",
//     ];
//     const tens = [
//       "",
//       "",
//       "twenty",
//       "thirty",
//       "forty",
//       "fifty",
//       "sixty",
//       "seventy",
//       "eighty",
//       "ninety",
//     ];
//     const scales = ["", "thousand", "lacs"];
//     let chunks = [];
//     let start = string.length;
//     while (start > 0) {
//       const end = start;
//       chunks.push(string.slice((start = Math.max(0, start - 3)), end));
//     }

//     const chunksLen = chunks.length;
//     if (chunksLen > scales.length) {
//       return "";
//     }

//     let words = [];
//     for (let i = 0; i < chunksLen; i++) {
//       const chunk = parseInt(chunks[i]);

//       if (chunk) {
//         const ints = chunks[i].split("").reverse().map(parseFloat);

//         if (ints[1] === 1) {
//           ints[0] += 10;
//         }

//         if (scales[i]) {
//           words.push(scales[i]);
//         }

//         if (units[ints[0]]) {
//           words.push(units[ints[0]]);
//         }

//         if (tens[ints[1]]) {
//           words.push(tens[ints[1]]);
//         }

//         if ((ints[0] || ints[1]) && (ints[2] || (!i && chunksLen))) {
//           words.push(and);
//         }

//         if (units[ints[2]]) {
//           words.push(units[ints[2]] + " hundred");
//         }
//       }
//     }
//     return words.reverse().join(" ");
//   };

//   const renderFeeDetails = () => {
//     const wordsFee = data ? numberToEnglish(data.amount) : "";
//     let feeDetails: JSX.Element[] = [];
//     if (fh_id === "" && data) {
//       const feeIds = typeof data.fh_id === "string" ? JSON.parse(data.fh_id) : [data.fh_id];
//       feeIds.forEach((e: any, i: any) => {
//         const headName = allFee.find((item) => item.fh_id === e)?.head_name || "";
//         feeDetails.push(
//           <tr key={i}>
//             <td>{i + 1}</td>
//             <td>{headName}</td>
//             <td>{e.amount}</td>
//           </tr>
//         );
//       });
//     } else {
//       const headName = allFee.find((item) => item.fh_id === data.fh_id)?.head_name || "";
//       feeDetails.push(
//         <tr>
//           <td>1</td>
//           <td>{headName}</td>
//           <td>{data.amount}</td>
//         </tr>
//       );
//     }
//     return feeDetails;
//   };

//   const renderPaymentDetails = () => {
//     const date_of_payment = new Date(data?.date_of_payment).toLocaleDateString('en-IN');
//     const date_of_check = new Date(data?.check_date || "").toLocaleDateString("el-GR");
//     return (
//       <p>
//         Received{" "}
//         <b style={{ fontWeight: "bold" }}>{numberToEnglish(data?.amount || 0).toUpperCase()}</b> by{" "}
//         {data.dd_no ? (
//           <>
//             Draft No.: <span className="st_draft">{data.dd_no}</span> drawn on {date_of_check}
//             <span className="st_bank"> {data.bank_name}, {data.bank_branch}</span>
//           </>
//         ) : data.check_number ? (
//           <>
//             Cheque No.: <span className="st_draft">{data.check_number}</span> drawn on {date_of_check}
//             <span className="st_bank"> {data.bank_name}, {data.bank_branch}</span>
//           </>
//         ) : data.trancation_number ? (
//           <>
//             <span className="st_draft">the transaction id of {data.trancation_number} Via</span>
//             {data.trancation_number[0] === "V" ? <> payment gateway.</> : <> NEFT on {data.trancation_number}.</>}
//           </>
//         ) : (
//           <span className="st_draft">the Cash on</span>
//         )}
//         <br />
//         <span style={{ fontWeight: "bold" }}>Balance: {data.balance_amount}</span>
//         <br />
//         <span style={{ fontWeight: "bold" }}>Note: ({data.note})</span>
//       </p>
//     );
//   };

//   return (
//     <>
//       {data && (
//         <div className="container" style={{ fontSize: "12px" }}>
//           <center>
//             <button
//               onClick={(e: any) => {
//                 e.target.style.display = "none";
//                 window.print();
//               }}
//             >
//               Print
//             </button>
//           </center>
//           <img src="/images/header.png" style={{ width: "100%" }} alt="Header" />
//           <br />
//           <div className="header">
//             <br />
//             <div className="header-row">
//               <h5 style={{ fontWeight: "bold" }}>Receipt No: {data.receipt_id}</h5>
//               <h5 style={{ fontWeight: "bold" }}>Receipt</h5>
//               <h5 style={{ fontWeight: "bold" }}>Date: {new Date(data.date_of_payment).toLocaleDateString('en-IN')}</h5>
//             </div>
//           </div>
//           <div className="main" style={{ flexDirection: "column", gap: "0.5rem" }}>
//             <div className="fee-para">
//               <p>
//                 College ID: {data.stud_clg_id} <br />
//                 Name: {data.name} <br />
//                 Course: {data.program} {data.bname} A.Y. of {data.academic_year} <br />
//                 <span style={{ fontWeight: "bold" }}>Category: ({data.category})</span>
//               </p>
//             </div>
//             <div className="tab">
//               <table
//                 className="receipt"
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   padding: "2px",
//                 }}
//               >
//                 <tbody>
//                   <tr className="table-head">
//                     <td>Sr.</td>
//                     <td style={{ width: "70%" }}>Particulars</td>
//                     <td>Amount</td>
//                   </tr>
//                   {renderFeeDetails()}
//                   <tr>
//                     <td colSpan={2} className="words">
//                       Total Amount Paid
//                     </td>
//                     <td className="words" style={{ fontWeight: "bold" }}>
//                       {String(data.amount).toLocaleUpperCase()}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <br />
//               {renderPaymentDetails()}
//               <p>
//                 This receipt is computer generated; no signature is required.
//               </p>
//               <p>DD payment is subject to realization.</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ReceiptPrint;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, Receipt, IndianRupee } from "lucide-react";

interface FeeHead {
  fh_id: number;
  head_name: string;
}

interface ReceiptData {
  receipt_id: string;
  date_of_payment: string;
  stud_clg_id: string;
  name: string;
  program: string;
  bname: string;
  academic_year: string;
  category: string;
  fh_id: string | number | number[];
  amount: number;
  dd_no?: string;
  check_number?: string;
  check_date?: string;
  bank_name?: string;
  bank_branch?: string;
  balance_amount?: number;
  note?: string;
  trancation_number?: string;
}

const ReceiptPrint: React.FC = () => {
  const [data, setData] = useState<ReceiptData | null>(null);
  const [fh_id, setFhId] = useState<string | number>("");
  const [allFee, setAllFee] = useState<FeeHead[]>([]);

  useEffect(() => {
    const queryPara = new URLSearchParams(window.location.search);
    const id = queryPara.get('id');
    const fh_id = queryPara.get('fh_id');
    if (id) {
      setFhId(fh_id || '');
      fetchReceiptsById(id, fh_id);
      fetchAllFeeHeads();
    }
  }, []);

  const fetchReceiptsById = async (id: string, fh_id: string | null) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fetchReceiptsId`,
        { id, fh_id },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setData(response.data.receipts[0]);
    } catch (error) {
      console.error("Error fetching receipt data", error);
    }
  };

  const fetchAllFeeHeads = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`,
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      if (data.found) setAllFee(data.result);
    } catch (error) {
      console.error("Error fetching fee heads", error);
    }
  };

  const numberToEnglish = (n: number): string => {
    const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", 
                  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const scales = ["", "thousand", "lacs"];

    if (n === 0) return "zero";
    
    const chunks = String(n).split('').reverse().join('')
      .match(/.{1,3}/g)?.reverse()
      .map(chunk => chunk.split('').reverse().join('')) || [];

    const words = chunks.map((chunk, i) => {
      const num = parseInt(chunk);
      if (!num) return '';
      
      const [ones, tensDigit, hundreds] = chunk.split('').reverse().map(Number);
      let result = [];
      
      if (hundreds) result.push(`${units[hundreds]} hundred`);
      if (tensDigit === 1) result.push(units[ones + 10]);
      else {
        if (tensDigit) result.push(tens[tensDigit]);
        if (ones) result.push(units[ones]);
      }
      
      if (num && scales[i]) result.push(scales[i]);
      return result.join(' ');
    }).filter(Boolean);

    return words.join(' and ');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!data) return null;

  const renderPaymentDetails = () => {
    const paymentDate = new Date(data.date_of_payment).toLocaleDateString('en-IN');
    const checkDate = data.check_date ? new Date(data.check_date).toLocaleDateString('en-IN') : '';

    if (data.dd_no) {
      return `Draft No.: ${data.dd_no} drawn on ${checkDate} ${data.bank_name}, ${data.bank_branch}`;
    }
    if (data.check_number) {
      return `Cheque No.: ${data.check_number} drawn on ${checkDate} ${data.bank_name}, ${data.bank_branch}`;
    }
    if (data.trancation_number) {
      return `Transaction ID: ${data.trancation_number} ${data.trancation_number[0] === 'V' ? 'via payment gateway' : `via NEFT`}`;
    }
    return "Cash payment";
  };

  return (
    <div className="min-h-screen bg-white p-8 print:p-0">
      <Button variant={"myBtn"} onClick={() => window.print()} className="flex mb-4 print:hidden">
        <Printer className="w-4 h-4 mr-2" />
        Print Receipt
      </Button>

      <div className="w-full landscape-receipt">
        <img src="/images/header.png" alt="Header" className="w-full mb-6" />
        
        <div className="grid grid-cols-3 text-center mb-6 text-sm">
          <div className="font-bold">Receipt No: {data.receipt_id}</div>
          <div className="font-bold uppercase">Receipt</div>
          <div className="font-bold">
            Date: {new Date(data.date_of_payment).toLocaleDateString('en-IN')}
          </div>
        </div>

        <div className="mb-6 text-sm">
          <p>College ID: {data.stud_clg_id}</p>
          <p>Name: {data.name}</p>
          <p>Course: {data.program} {data.bname} A.Y. of {data.academic_year}</p>
          <p className="font-bold">Category: ({data.category})</p>
        </div>

        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Sr.</TableHead>
              <TableHead>Particulars</TableHead>
              <TableHead className="w-32 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(typeof data.fh_id === 'string' ? JSON.parse(data.fh_id) : [data.fh_id]).map((feeId: number, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{allFee.find(fee => fee.fh_id === feeId)?.head_name || ''}</TableCell>
                <TableCell className="text-right">{data.amount}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} className="font-bold">Total Amount Paid</TableCell>
              <TableCell className="text-right font-bold">{data.amount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-6 space-y-4 text-sm">
          <p>
            Received {numberToEnglish(data.amount).toUpperCase()} by{" "}
            {data.dd_no ? `Draft No.: ${data.dd_no}` :
             data.check_number ? `Cheque No.: ${data.check_number}` :
             data.trancation_number ? `Transaction ID: ${data.trancation_number}` :
             "the Cash"} on
          </p>
          
          {data.balance_amount !== undefined && (
            <p>Balance: {data.balance_amount}</p>
          )}
          
          {data.note && <p>Note: ({data.note})</p>}

          <div className="mt-8 text-xs">
            <p>This receipt is computer generated; no signature is required</p>
            <p>DD payment is subject to realization</p>
          </div>
        </div>
      </div>

      {/* <style jsx global>{`
        @media print {
          @page {
            size: landscape;
          }
          .landscape-receipt {
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 1rem;
          }
        }
      `}</style> */}
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-gray-50 p-8 print:p-0 print:bg-white">
  //     <div className="max-w-4xl mx-auto">
  //       <Button onClick={handlePrint} className="mb-8 gap-2 print:hidden">
  //         <Printer className="w-4 h-4" />
  //         Print Receipt
  //       </Button>

  //       <Card className="bg-white shadow-lg print:shadow-none">
  //         <CardContent className="p-6">
  //           <div className="flex justify-between items-start mb-6">
  //             <img src="/images/header.png" alt="Header" className="h-20 object-contain" />
  //             <div className="text-right">
  //               <Badge variant="outline" className="mb-2">{data.receipt_id}</Badge>
  //               <p className="text-sm text-gray-500">
  //                 {new Date(data.date_of_payment).toLocaleDateString('en-IN')}
  //               </p>
  //             </div>
  //           </div>

  //           <div className="grid gap-4 mb-6">
  //             <div className="grid grid-cols-2 gap-4">
  //               <div>
  //                 <p className="text-sm font-medium">College ID</p>
  //                 <p className="text-gray-600">{data.stud_clg_id}</p>
  //               </div>
  //               <div>
  //                 <p className="text-sm font-medium">Name</p>
  //                 <p className="text-gray-600">{data.name}</p>
  //               </div>
  //               <div>
  //                 <p className="text-sm font-medium">Course</p>
  //                 <p className="text-gray-600">{`${data.program} ${data.bname}`}</p>
  //               </div>
  //               <div>
  //                 <p className="text-sm font-medium">Academic Year</p>
  //                 <p className="text-gray-600">{data.academic_year}</p>
  //               </div>
  //             </div>
              
  //             <Badge className="w-fit">{data.category}</Badge>
  //           </div>

  //           <Separator className="my-6" />

  //           <Table>
  //             <TableHeader>
  //               <TableRow>
  //                 <TableHead>Sr.</TableHead>
  //                 <TableHead>Particulars</TableHead>
  //                 <TableHead className="text-right">Amount</TableHead>
  //               </TableRow>
  //             </TableHeader>
  //             <TableBody>
  //               {(typeof data.fh_id === 'string' ? JSON.parse(data.fh_id) : [data.fh_id]).map((feeId: number, index: number) => (
  //                 <TableRow key={index}>
  //                   <TableCell>{index + 1}</TableCell>
  //                   <TableCell>{allFee.find(fee => fee.fh_id === feeId)?.head_name || ''}</TableCell>
  //                   <TableCell className="text-right">{data.amount}</TableCell>
  //                 </TableRow>
  //               ))}
  //               <TableRow>
  //                 <TableCell colSpan={2} className="font-medium">Total Amount Paid</TableCell>
  //                 <TableCell className="text-right font-bold">
  //                   ₹{data.amount.toLocaleString('en-IN')}
  //                 </TableCell>
  //               </TableRow>
  //             </TableBody>
  //           </Table>

  //           <div className="mt-6 space-y-4">
  //             <p className="text-sm">
  //               Amount in words: <span className="font-medium">{numberToEnglish(data.amount).toUpperCase()}</span>
  //             </p>
              
  //             <p className="text-sm">{renderPaymentDetails()}</p>
              
  //             {data.balance_amount !== undefined && (
  //               <p className="text-sm">Balance Amount: ₹{data.balance_amount.toLocaleString('en-IN')}</p>
  //             )}
              
  //             {data.note && (
  //               <p className="text-sm text-gray-600">Note: {data.note}</p>
  //             )}

  //             <Separator className="my-4" />
              
  //             <div className="text-xs text-gray-500 space-y-1">
  //               <p>This receipt is computer generated; no signature is required.</p>
  //               <p>DD payment is subject to realization.</p>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </div>
  // );
};

export default ReceiptPrint;