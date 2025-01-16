// import React, { Component } from 'react';
// import BasicDetails from './collectComponents/basicDetails';
// import StudentDetails from './collectComponents/studentDetails';
// import BankDetails from './collectComponents/bankDetails';
// import PaymentDetails from './collectComponents/paymentDetails';
// import axios from 'axios';
// import Feetable from './collectComponents/feeTable';

// interface CollectFeeState {
//   isFee: number;
//   new_amount: number;
//   ay: string;
//   amount: string;
//   studClgId: string;
//   fetchedData: any;
//   feeStructure: any;
//   // studentDetails: {
//   //   name: string;
//   //   branch: string;
//   //   program: string;
//   //   category: string;
//   //   total_fee: number;
//   //   scholership: number;
//   //   payable: number;
//   // };
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
//   bankDetails: {
//     mop: string;
//     bankName: string;
//     bankBranch: string;
//     checkDate: string;
//     micr: string;
//     code: string;
//     utr: string;
//     receiptDate: string;
//   };
//   bankDetailsArray: any[];
// }

// class CollectFee extends Component<{}, CollectFeeState> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       isFee: 0,
//       new_amount: 0,
//       ay: '',
//       amount: '',
//       studClgId: '',
//       fetchedData: '',
//       feeStructure: '',
//       studentDetails: {
//         name: '',
//         branch: '',
//         program: '',
//         category: '',
//         total_fee: 0,
//         scholership: 0,
//         payable: 0,
//         amt_afterscholership: 0,
//         total_paid: 0,
//       },
//       bankDetails: {
//         mop: '',
//         bankName: '',
//         bankBranch: '',
//         checkDate: '',
//         micr: '',
//         code: '',
//         utr: '',
//         receiptDate: '',
//       },
//       bankDetailsArray: [],
//     };
//   }

//   handleFetchClick = () => {
//     axios
//       .post(
//         `${import.meta.env.VITE_APP_BASE_URL}/getFeeStructure`,
//         {
//           clgId: this.state.studClgId,
//           ay: this.state.ay,
//         },
//         {
//           headers: { Authorization: localStorage.getItem('token') },
//         }
//       )
//       .then((res) => {
//         this.setState({ studentDetails: res.data.details });
//       })
//       .catch((e) => {
//         alert(e.response.data.msg);
//       });
//   };

//   handleStudClgIdChange = (studClgId: string) => {
//     this.setState({ studClgId });
//   };

//   handleBankDetailsChange = (name: string, value: string) => {
//     this.setState((prevState) => ({
//       bankDetails: {
//         ...prevState.bankDetails,
//         [name]: value,
//       },
//     }));
//   };

//   handleAddPayment = (e: any) => {
//     this.setState((prevState) => ({
//       bankDetailsArray: [...prevState.bankDetailsArray, e],
//     }));
//   };

//   handleUpdateArray = (d: any[]) => {
//     this.setState({
//       bankDetailsArray: d,
//     });
//   };

//   handleSaveTable = () => {
//     axios
//       .post(
//         `${import.meta.env.VITE_APP_BASE_URL}/collectFee`,
//         {
//           clgId: this.state.studClgId,
//           ay: this.state.ay,
//           bankDetails: this.state.bankDetails,
//           payment: this.state.bankDetailsArray,
//           payable: this.state.studentDetails.payable,
//           isFee: this.state.isFee,
//           amount: this.state.new_amount,
//           total_paid: 0,
//         },
//         {
//           headers: { Authorization: localStorage.getItem('token') },
//         }
//       )
//       .then((res) => {
//         alert(res.data.msg);
//       })
//       .catch((e) => {
//         alert(e.response.data.msg);
//       });
//   };

//   handleSelectAy = (e: string) => {
//     this.setState({
//       ay: e,
//     });
//   };

//   handleIsFeeChange = (e: any) => {
//     this.setState({ isFee: e });
//   };

//   handleNewAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ new_amount: parseFloat(e.target.value) });
//   };

//   render() {
//     const { studentDetails, bankDetails, bankDetailsArray } = this.state;
//     return (
//       <>
//         <div className="container">
//           <div className="row justify-content-between">
//             <BasicDetails
//               handleSelectAy={(e) => this.handleSelectAy(e)}
//               onFetchClick={this.handleFetchClick}
//               // onFetchFeeStructureClick={(studClgId) =>
//               //   this.handleFetchClick(studClgId)
//               // }
//               onStudClgIdChange={this.handleStudClgIdChange}
//             />
//             <StudentDetails studentDetails={studentDetails} />

//             <BankDetails onBankDetailsChange={this.handleBankDetailsChange} />
//             <div className="d-flex justify-content-between">
//               <PaymentDetails
//                 onAddBankDetail={this.handleAddPayment}
//                 handleisFeeChange={this.handleIsFeeChange}
//                 isFee={this.state.isFee}
//                 handleNewAmountChange={this.handleNewAmountChange}
//                 handleSaveTable={this.handleSaveTable}
//               />
//               {bankDetailsArray.length > 0 ? (
//                 <div className="col-lg-5">
//                   <Feetable
//                     tableData={bankDetailsArray}
//                     setTableData={this.handleUpdateArray}
//                     handleSaveTable={this.handleSaveTable}
//                   />
//                 </div>
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default CollectFee;

import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Import previously refactored components
import BasicDetails from "./collectComponents/basicDetails";
import StudentDetails from "./collectComponents/studentDetails";
import BankDetails from "./collectComponents/bankDetails";
import PaymentDetails from "./collectComponents/paymentDetails";
import FeeTable from "./collectComponents/feeTable";

interface StudentDetails {
  name: string;
  branch: string;
  program: string;
  category: string;
  total_fee: number;
  scholership: number;
  amt_afterscholership: number;
  total_paid: number;
  payable: number;
}

interface BankDetails {
  mop: string;
  bankName: string;
  bankBranch: string;
  checkDate: string;
  micr: string;
  code: string;
  utr: string;
  receiptDate: string;
}

const CollectFee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isFee, setIsFee] = useState(0);
  const [newAmount, setNewAmount] = useState(0);
  const [academicYear, setAcademicYear] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    name: "",
    branch: "",
    program: "",
    category: "",
    total_fee: 0,
    scholership: 0,
    amt_afterscholership: 0,
    total_paid: 0,
    payable: 0,
  });
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    mop: "",
    bankName: "",
    bankBranch: "",
    checkDate: "",
    micr: "",
    code: "",
    utr: "",
    receiptDate: "",
  });
  const [bankDetailsArray, setBankDetailsArray] = useState<any[]>([]);

  const handleFetchClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/getFeeStructure`,
        {
          clgId: studentId,
          ay: academicYear,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setStudentDetails(data.details);
      setSuccess("Student details fetched successfully");
    } catch (error: any) {
      setError(error.response?.data?.msg || "Failed to fetch student details");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTable = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/collectFee`,
        {
          clgId: studentId,
          ay: academicYear,
          bankDetails,
          payment: bankDetailsArray,
          payable: studentDetails.payable,
          isFee,
          amount: newAmount,
          total_paid: 0,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setSuccess(data.msg);
    } catch (error: any) {
      setError(error.response?.data?.msg || "Failed to save fee details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicDetails
          handleSelectAy={setAcademicYear}
          onFetchClick={handleFetchClick}
          onStudClgIdChange={setStudentId}
        />

        <StudentDetails studentDetails={studentDetails} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BankDetails
          onBankDetailsChange={(name, value) => {
            setBankDetails((prev) => ({ ...prev, [name]: value }));
          }}
        />

        <div className="space-y-6">
          <PaymentDetails
            onAddBankDetail={(payment) => {
              setBankDetailsArray((prev) => [...prev, payment]);
            }}
            handleisFeeChange={(value) => setIsFee(parseInt(value))}
            isFee={isFee}
            handleNewAmountChange={(e) =>
              setNewAmount(parseFloat(e.target.value))
            }
            handleSaveTable={handleSaveTable}
          />

          {bankDetailsArray.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Fee Details</CardTitle>
              </CardHeader>
              <CardContent>
                <FeeTable
                  tableData={bankDetailsArray}
                  setTableData={setBankDetailsArray}
                  handleSaveTable={handleSaveTable}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[300px]">
            <CardContent className="flex items-center justify-center p-6">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Processing...</span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CollectFee;
