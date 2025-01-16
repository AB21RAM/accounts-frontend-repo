// import React, { Component } from 'react';

// interface StudentDetailsProps {
//   studentDetails: {
//     name: string;
//     branch: string;
//     program: string;
//     category: string;
//     total_fee: number;
//     scholership: number;
//     amt_afterscholership: number;
//     total_paid: number;
//     payable: number;
//   };
// }

// interface StudentDetailsState {}

// class StudentDetails extends Component<StudentDetailsProps, StudentDetailsState> {
//   render() {
//     const {
//       name,
//       branch,
//       program,
//       category,
//       total_fee,
//       scholership,
//       amt_afterscholership,
//       total_paid,
//       payable,
//     } = this.props.studentDetails;

//     return (
//       <>
//         <div className="col-lg-5 col-md-5 col-sm-12 mt-3">
//           <div className="card">
//             <h5 className="card-title p-2">Student Details</h5>
//             <hr />
//             <div className="card-body d-flex flex-column">
//               <span><b>Name:</b> {name}</span>
//               <span><b>Branch:</b> {branch}</span>
//               <span><b>Program:</b> {program}</span>
//               <span><b>Category:</b> {category}</span>
//               <span><b>Total Fee:</b> {total_fee}</span>
//               <span><b>Scholarship:</b> {scholership}</span>
//               <span><b>Fee After Scholarship:</b> {amt_afterscholership}</span>
//               <span><b>Total Paid:</b> {total_paid}</span>
//               <span><b>Payable Amount:</b> {payable}</span>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default StudentDetails;


import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StudentDetailsProps {
  studentDetails: {
    name: string;
    branch: string;
    program: string;
    category: string;
    total_fee: number;
    scholership: number;
    amt_afterscholership: number;
    total_paid: number;
    payable: number;
  };
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ studentDetails }) => {
  const {
    name,
    branch,
    program,
    category,
    total_fee,
    scholership,
    amt_afterscholership,
    total_paid,
    payable,
  } = studentDetails;

  const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between py-2 border-b last:border-b-0">
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Student Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <DetailRow label="Name" value={name} />
        <DetailRow label="Branch" value={branch} />
        <DetailRow label="Program" value={program} />
        <DetailRow label="Category" value={category} />
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <DetailRow 
            label="Total Fee" 
            value={formatCurrency(total_fee)} 
          />
          <DetailRow 
            label="Scholarship" 
            value={formatCurrency(scholership)} 
          />
          <DetailRow 
            label="Fee After Scholarship" 
            value={formatCurrency(amt_afterscholership)} 
          />
          <DetailRow 
            label="Total Paid" 
            value={formatCurrency(total_paid)} 
          />
          <div className="mt-4 pt-4 border-t border-gray-200">
            <DetailRow 
              label="Payable Amount" 
              value={formatCurrency(payable)} 
          />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;