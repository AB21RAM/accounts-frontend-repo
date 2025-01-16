// import React, { Component } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// interface Receipt {
//   receipt_id: string;
//   stud_clg_id: string | undefined;
//   name: string | undefined;
//   bname: string | undefined;
//   program: string | undefined;
//   academic_year: string | undefined;
//   date_of_payment: string;
//   amount: number | undefined;
// }

// interface ReceiptTableProps {
//   recipts: Receipt[];
//   selectedFeeHead: string;
// }

// class ReceiptTable extends Component<ReceiptTableProps> {
//   render() {
//     const { recipts, selectedFeeHead } = this.props;

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {recipts && recipts.length > 0 ? (
//           recipts.map((receipt) => (
//             <Card key={receipt.receipt_id} className="shadow-md">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold">Receipt Details</CardTitle>
//                 <CardDescription className="text-sm text-muted">
//                   Receipt No: {receipt.receipt_id}
//                 </CardDescription>
//               </CardHeader>
//               <Separator />
//               <CardContent className="space-y-2">
//                 <p>
//                   <strong>College ID:</strong> {receipt.stud_clg_id?.toUpperCase() || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Name:</strong> {receipt.name?.toUpperCase() || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Branch:</strong> {receipt.bname?.toUpperCase() || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Program:</strong> {receipt.program?.toUpperCase() || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Academic Year:</strong> {receipt.academic_year || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {new Date(receipt.date_of_payment).toLocaleDateString("en-IN")}
//                 </p>
//                 <p>
//                   <strong>Amount:</strong> ₹{receipt.amount || "N/A"}
//                 </p>
//               </CardContent>
//               <Separator />
//               <CardFooter>
//                 <Button asChild className="w-full">
//                   <a
//                     href={`/receipt-print?id=${receipt.receipt_id}&fh_id=${selectedFeeHead}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Print Receipt
//                   </a>
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))
//         ) : (
//           <div className="col-span-full text-center">
//             <p className="text-lg font-medium text-black">
//               No Receipts Available for the Specified Date
//             </p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default ReceiptTable;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Printer, Calendar, User, BookOpen, Building2, GraduationCap, Receipt, IndianRupee } from "lucide-react";

interface Receipt {
  receipt_id: string;
  stud_clg_id: string | undefined;
  name: string | undefined;
  bname: string | undefined;
  program: string | undefined;
  academic_year: string | undefined;
  date_of_payment: string;
  amount: number | undefined;
}

interface ReceiptTableProps {
  recipts: Receipt[];
  selectedFeeHead: string;
}

const ReceiptTable = ({ recipts, selectedFeeHead }: ReceiptTableProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const formatAmount = (amount: number | undefined) => {
    return amount?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }) ?? "N/A";
  };

  if (!recipts?.length) {
    return (
      <Card className="w-full p-6 text-center bg-gray-50">
        <CardContent className="flex flex-col items-center gap-4">
          <Receipt className="w-12 h-12 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-600">No Receipts Found</h3>
          <p className="text-sm text-gray-500">No receipts available for the specified date range</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {recipts.map((receipt) => (
          <Card key={receipt.receipt_id} className="transition-all hover:shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">Receipt</CardTitle>
                <Badge variant="secondary">{receipt.receipt_id}</Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(receipt.date_of_payment)}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-3">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{receipt.name?.toUpperCase() || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{receipt.stud_clg_id?.toUpperCase() || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{receipt.bname?.toUpperCase() || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{receipt.program?.toUpperCase() || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold">{formatAmount(receipt.amount)}</span>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4">
              <Button asChild className="w-full gap-2 hover:bg-primary/90">
                <a
                  href={`/receipt-print?id=${receipt.receipt_id}&fh_id=${selectedFeeHead}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ReceiptTable;