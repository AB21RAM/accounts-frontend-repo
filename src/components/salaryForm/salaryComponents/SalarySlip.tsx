// import axios from "axios";
// import React, { Component } from "react";

// class SalarySlip extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             salarySlips:[],
//         }
//     }

//     componentDidMount=async()=>{
//         const searchParams = new URLSearchParams(window.location.search);
//         const myParamValue = searchParams.get('faculty_id');

//         if(myParamValue){
//             this.getSingleFacultyData(myParamValue);
//         }
//         else{
//             this.getAllFacultyData();
//         }
//     }

//     convertJsonToCsv=async(jsonData)=> {
//         const csvContent = [];

//         // Extract headers
//         const headers = Object.keys(jsonData[0]);
//         csvContent.push(headers.join(','));

//         // Extract data
//         jsonData.forEach(row => {
//           const values = headers.map(header => row[header]);
//           csvContent.push(values.join(','));
//         });

//         return csvContent.join('\n');
//       }

//       downloadCsv=async()=> {
//         const data = await this.convertJsonToCsv(this.state.salarySlips);
//         const blob = new Blob([data], { type: 'text/csv' });
//         const url = URL.createObjectURL(blob);

//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'data.csv';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);

//         // Release the object URL
//         URL.revokeObjectURL(url);
//       }

//     getSingleFacultyData=async(myParamValue)=>{
//         try{
//             const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/getSalarySlipsIndividual`,{id:myParamValue},{
//                 headers: { Authorization: localStorage.getItem('token')}
//             });
//             if (data){
//                 this.setState({salarySlips:data.data})
//             }
//         }
//         catch{
//             alert('Something Went Wrong!');
//         }
//     }

//     getAllFacultyData = async()=>{
//         try{
//             const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/getSalarySlips`,{},{
//                 headers: { Authorization: localStorage.getItem('token')}
//             });
//             if (data){
//                 this.setState({salarySlips:data.data})
//             }
//         }
//         catch{
//             alert('Something Went Wrong!');
//         }
//     }

//     render(){
//         const {salarySlips} = this.state;

//         let slips = [];

//         salarySlips.forEach(e=>{
//             slips.push(
//                 <div className="container mt-3 text-class">
//                 <h5 className="text-center"><strong>Vasantdada Patil Pratishthan's College of Engineering and Visual Arts</strong></h5>
//                 <h6 className="text-center">Eastern Express Highway Near Everad Nagar, Sion-Chunabhatti</h6>
//                 <table className="table table-sm w-100 text-class">
//                     <tr>
//                         <td>
//                             <strong>PaySlip :</strong> {e.pay_slip_id}
//                         </td>
//                         <td>
//                             <strong>PaySlip For the Month:</strong> {e.pay_slip_month}
//                         </td>
//                         <td>
//                             <strong>Branch:</strong> {e.branch}
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>
//                             <strong>EMP Code :</strong> {e.faculty_clg_id}
//                         </td>
//                         <td>
//                             <strong>Name:</strong> {e.name}
//                         </td>
//                         <td>
//                             <strong>Grade:</strong> {e.grade}
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>
//                             <strong>Department :</strong> {e.department}
//                         </td>
//                         <td>
//                             <strong>Designation:</strong> {e.designation}
//                         </td>
//                         <td>
//                             <strong>Division:</strong> {e.division}
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colSpan={2}>
//                             <strong>PF No:</strong> {e.pfno}
//                         </td>

//                         <td>
//                             <strong>Emp PAN No.:</strong> {e.panno}
//                         </td>
//                     </tr>
//                 </table>
//                 <hr />
//                 <table className="table table-sm w-100 text-class">
//                     <tr>
//                         <td>
//                             <strong>Days Paid :</strong> {e.days_paid}
//                         </td>
//                         <td>
//                             <strong>days Present:</strong> {e.days_present}
//                         </td>
//                         <td>
//                             <strong>W.Off/pd.Off:</strong> {e.w_off}/{e.pd_off}
//                         </td>
//                         <td>
//                             <strong>LWP/Absent :</strong>{e.lwp}/{e.absent}
//                         </td>
//                     </tr>
//                 </table>
//                 <hr />

//                 <table className="table table-sm w-100 text-class ex">
//                     <tr className="text-center">
//                         <th style={{border:'1px solid'}}>Earnings & Reimbursements</th>
//                         <th style={{border:'1px solid'}}>Deductions & Recoveries</th>
//                     </tr>
//                     <tr>
//                         <td style={{border:'1px solid'}}>
//                             <table className="table table-sm w-100 ">
//                                 <tr>
//                                     <td>Earned Basic</td>
//                                     <td className="text-end">{e.basic_earn}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>DA</td>
//                                     <td className="text-end">{e.da}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>HRA</td>
//                                     <td className="text-end">{e.hra}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>TA</td>
//                                     <td className="text-end">{e.ta}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Other Allowence</td>
//                                     <td className="text-end">{e.other_allow}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>AGP</td>
//                                     <td className="text-end">{e.agp}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>SPL_Allow</td>
//                                     <td className="text-end">{e.spl_allow}</td>
//                                 </tr>
//                             </table>
//                         </td>
//                         <td style={{border:'1px solid'}}>
//                             <table className="table table-sm w-100 ">
//                                 <tr>
//                                     <td>Prov. Fund</td>
//                                     <td className="text-end">{e.pf}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>P. Tax</td>
//                                     <td className="text-end">{e.ptax}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Income Tax</td>
//                                     <td className="text-end">{e.income_tax}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Loan Installments</td>
//                                     <td className="text-end">{e.loan_installment}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Other Deductions</td>
//                                     <td className="text-end">{e.other_deduction}</td>
//                                 </tr>

//                             </table>
//                         </td>

//                     </tr>
//                     <tr>
//                         <td className="text-end" style={{border:'1px solid'}}>Total Earnings: {e.total_earning}</td>
//                         <td className="text-end" style={{border:'1px solid'}}>Total Deduction: {e.total_deduction}<br/> Net Pay: {e.net_pay}</td>
//                     </tr>
//                 </table>
//                 <span>Bank A/C No.: {e.bank_account_no}</span>

//             </div>
//             )

//         })

//         return(
//             <>
//             <div className="container">
//                 <div className="btns d-flex w-100 justify-content-between">
//                     <button className="btn btn-primary mt-3" onClick={(e)=>this.downloadCsv(salarySlips)}>Download CSV</button>
//                     <button className="btn btn-primary mt-3">Print</button>
//                 </div>

//             </div>
//             {slips}
//             </>
//         )
//     }
// }

// export default SalarySlip;

// import axios from "axios";
// import React, { Component } from "react";

// interface SalarySlipData {
//     pay_slip_id: string;
//     pay_slip_month: string;
//     branch: string;
//     faculty_clg_id: string;
//     name: string;
//     grade: string;
//     department: string;
//     designation: string;
//     division: string;
//     pfno: string;
//     panno: string;
//     days_paid: number;
//     days_present: number;
//     w_off: number;
//     pd_off: number;
//     lwp: number;
//     absent: number;
//     basic_earn: number;
//     da: number;
//     hra: number;
//     ta: number;
//     other_allow: number;
//     agp: number;
//     spl_allow: number;
//     pf: number;
//     ptax: number;
//     income_tax: number;
//     loan_installment: number;
//     other_deduction: number;
//     total_earning: number;
//     total_deduction: number;
//     net_pay: number;
//     bank_account_no: string;
// }

// interface SalarySlipState {
//     salarySlips: SalarySlipData[];
// }

// interface ApiResponse {
//     data: SalarySlipData[];
// }

// class SalarySlip extends Component<{}, SalarySlipState> {
//     constructor(props: {}) {
//         super(props);
//         this.state = {
//             salarySlips: [],
//         };
//     }

//     componentDidMount = async (): Promise<void> => {
//         const searchParams = new URLSearchParams(window.location.search);
//         const myParamValue = searchParams.get('faculty_id');

//         if (myParamValue) {
//             await this.getSingleFacultyData(myParamValue);
//         } else {
//             await this.getAllFacultyData();
//         }
//     };

//     convertJsonToCsv = async (jsonData: SalarySlipData[]): Promise<string> => {
//         const csvContent: string[] = [];

//         if (jsonData.length === 0) return '';

//         // Extract headers
//         const headers = Object.keys(jsonData[0]);
//         csvContent.push(headers.join(','));

//         // Extract data
//         jsonData.forEach(row => {
//             const values = headers.map(header => row[header as keyof SalarySlipData]);
//             csvContent.push(values.join(','));
//         });

//         return csvContent.join('\n');
//     };

//     downloadCsv = async (): Promise<void> => {
//         const data = await this.convertJsonToCsv(this.state.salarySlips);
//         const blob = new Blob([data], { type: 'text/csv' });
//         const url = URL.createObjectURL(blob);

//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'salary_data.csv';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);

//         URL.revokeObjectURL(url);
//     };

//     getSingleFacultyData = async (facultyId: string): Promise<void> => {
//         try {
//             const { data } = await axios.post<ApiResponse>(
//                 `${import.meta.env.VITE_APP_BASE_URL}/getSalarySlipsIndividual`,
//                 { id: facultyId },
//                 {
//                     headers: { Authorization: localStorage.getItem('token') }
//                 }
//             );
//             if (data) {
//                 this.setState({ salarySlips: data.data });
//             }
//         } catch (error) {
//             alert('Something Went Wrong!');
//         }
//     };

//     getAllFacultyData = async (): Promise<void> => {
//         try {
//             const { data } = await axios.post<ApiResponse>(
//                 `${import.meta.env.VITE_APP_BASE_URL}/getSalarySlips`,
//                 {},
//                 {
//                     headers: { Authorization: localStorage.getItem('token') }
//                 }
//             );
//             if (data) {
//                 this.setState({ salarySlips: data.data });
//             }
//         } catch (error) {
//             alert('Something Went Wrong!');
//         }
//     };

//     render(): React.ReactNode {
//         const { salarySlips } = this.state;

//         const slips = salarySlips.map((e, index) => (
//             <div key={index} className="container mt-3 text-class">
//                 <h5 className="text-center">
//                     <strong>Vasantdada Patil Pratishthan's College of Engineering and Visual Arts</strong>
//                 </h5>
//                 <h6 className="text-center">Eastern Express Highway Near Everad Nagar, Sion-Chunabhatti</h6>
//                 <table className="table table-sm w-100 text-class">
//                     <tbody>
//                         <tr>
//                             <td>
//                                 <strong>PaySlip :</strong> {e.pay_slip_id}
//                             </td>
//                             <td>
//                                 <strong>PaySlip For the Month:</strong> {e.pay_slip_month}
//                             </td>
//                             <td>
//                                 <strong>Branch:</strong> {e.branch}
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <strong>EMP Code :</strong> {e.faculty_clg_id}
//                             </td>
//                             <td>
//                                 <strong>Name:</strong> {e.name}
//                             </td>
//                             <td>
//                                 <strong>Grade:</strong> {e.grade}
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <strong>Department :</strong> {e.department}
//                             </td>
//                             <td>
//                                 <strong>Designation:</strong> {e.designation}
//                             </td>
//                             <td>
//                                 <strong>Division:</strong> {e.division}
//                             </td>
//                         </tr>
//                         <tr>
//                             <td colSpan={2}>
//                                 <strong>PF No:</strong> {e.pfno}
//                             </td>
//                             <td>
//                                 <strong>Emp PAN No.:</strong> {e.panno}
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <hr />
//                 <table className="table table-sm w-100 text-class">
//                     <tbody>
//                         <tr>
//                             <td>
//                                 <strong>Days Paid :</strong> {e.days_paid}
//                             </td>
//                             <td>
//                                 <strong>days Present:</strong> {e.days_present}
//                             </td>
//                             <td>
//                                 <strong>W.Off/pd.Off:</strong> {e.w_off}/{e.pd_off}
//                             </td>
//                             <td>
//                                 <strong>LWP/Absent :</strong>{e.lwp}/{e.absent}
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <hr />

//                 <table className="table table-sm w-100 text-class ex">
//                     <tbody>
//                         <tr className="text-center">
//                             <th style={{border:'1px solid'}}>Earnings & Reimbursements</th>
//                             <th style={{border:'1px solid'}}>Deductions & Recoveries</th>
//                         </tr>
//                         <tr>
//                             <td style={{border:'1px solid'}}>
//                                 <table className="table table-sm w-100">
//                                     <tbody>
//                                         <tr>
//                                             <td>Earned Basic</td>
//                                             <td className="text-end">{e.basic_earn}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>DA</td>
//                                             <td className="text-end">{e.da}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>HRA</td>
//                                             <td className="text-end">{e.hra}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>TA</td>
//                                             <td className="text-end">{e.ta}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Other Allowence</td>
//                                             <td className="text-end">{e.other_allow}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>AGP</td>
//                                             <td className="text-end">{e.agp}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>SPL_Allow</td>
//                                             <td className="text-end">{e.spl_allow}</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </td>
//                             <td style={{border:'1px solid'}}>
//                                 <table className="table table-sm w-100">
//                                     <tbody>
//                                         <tr>
//                                             <td>Prov. Fund</td>
//                                             <td className="text-end">{e.pf}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>P. Tax</td>
//                                             <td className="text-end">{e.ptax}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Income Tax</td>
//                                             <td className="text-end">{e.income_tax}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Loan Installments</td>
//                                             <td className="text-end">{e.loan_installment}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Other Deductions</td>
//                                             <td className="text-end">{e.other_deduction}</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="text-end" style={{border:'1px solid'}}>
//                                 Total Earnings: {e.total_earning}
//                             </td>
//                             <td className="text-end" style={{border:'1px solid'}}>
//                                 Total Deduction: {e.total_deduction}<br/> Net Pay: {e.net_pay}
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <span>Bank A/C No.: {e.bank_account_no}</span>
//             </div>
//         ));

//         return (
//             <>
//                 <div className="container">
//                     <div className="btns d-flex w-100 justify-content-between">
//                         <button className="btn btn-primary mt-3" onClick={this.downloadCsv}>
//                             Download CSV
//                         </button>
//                         <button className="btn btn-primary mt-3">Print</button>
//                     </div>
//                 </div>
//                 {slips}
//             </>
//         );
//     }
// }

// export default SalarySlip;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Printer } from "lucide-react";

interface SalarySlipData {
  pay_slip_id: string;
  pay_slip_month: string;
  branch: string;
  faculty_clg_id: string;
  name: string;
  grade: string;
  department: string;
  designation: string;
  division: string;
  pfno: string;
  panno: string;
  days_paid: number;
  days_present: number;
  w_off: number;
  pd_off: number;
  lwp: number;
  absent: number;
  basic_earn: number;
  da: number;
  hra: number;
  ta: number;
  other_allow: number;
  agp: number;
  spl_allow: number;
  pf: number;
  ptax: number;
  income_tax: number;
  loan_installment: number;
  other_deduction: number;
  total_earning: number;
  total_deduction: number;
  net_pay: number;
  bank_account_no: string;
}

const SalarySlip = () => {
  const [salarySlips, setSalarySlips] = useState<SalarySlipData[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const facultyId = searchParams.get("faculty_id");
    const Month = searchParams.get("month");

    if (facultyId) {
      getSingleFacultyData(facultyId, Month);
    } else {
      getAllFacultyData();
    }
  }, []);

  const convertJsonToCsv = async (
    jsonData: SalarySlipData[]
  ): Promise<string> => {
    const csvContent: string[] = [];

    if (jsonData.length === 0) return "";

    const headers = Object.keys(jsonData[0]);
    csvContent.push(headers.join(","));

    jsonData.forEach((row) => {
      const values = headers.map(
        (header) => row[header as keyof SalarySlipData]
      );
      csvContent.push(values.join(","));
    });

    return csvContent.join("\n");
  };

  const downloadCsv = async () => {
    const data = await convertJsonToCsv(salarySlips);
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "salary_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const getSingleFacultyData = async (facultyId: string, month: string) => {
    try {
      const { data } = await axios.post<{ data: SalarySlipData[] }>(
        `${import.meta.env.VITE_APP_BASE_URL}/getSalarySlipsIndividual`,
        { id: facultyId, month: month },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      if (data) {
        setSalarySlips(data.data);
        console.log(data.data);
      }
    } catch (error) {
      alert("Something Went Wrong!");
    }
  };

  const getAllFacultyData = async () => {
    try {
      const { data } = await axios.post<{ data: SalarySlipData[] }>(
        `${import.meta.env.VITE_APP_BASE_URL}/getSalarySlips`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      if (data) {
        setSalarySlips(data.data);
      }
    } catch (error) {
      alert("Something Went Wrong!");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Salary Slips</h2>
        <div className="space-x-4">
          <Button onClick={downloadCsv} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {salarySlips.map((slip, index) => (
        <Card key={index} className="mt-6">
          <CardHeader>
            <CardTitle className="text-center">
              Vasantdada Patil Pratishthan's College of Engineering and Visual
              Arts
            </CardTitle>
            <CardDescription className="text-center">
              Eastern Express Highway Near Everad Nagar, Sion-Chunabhatti
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">PaySlip ID</p>
                <p>{slip.pay_slip_id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Month</p>
                <p>{slip.pay_slip_month}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Branch</p>
                <p>{slip.branch}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Employee Code</p>
                <p>{slip.faculty_clg_id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Name</p>
                <p>{slip.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Grade</p>
                <p>{slip.grade}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Department</p>
                <p>{slip.department}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Designation</p>
                <p>{slip.designation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Division</p>
                <p>{slip.division}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={2}>Earnings & Reimbursements</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Basic Earned</TableCell>
                    <TableCell className="text-right">
                      {slip.basic_earn}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DA</TableCell>
                    <TableCell className="text-right">{slip.da}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HRA</TableCell>
                    <TableCell className="text-right">{slip.hra}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TA</TableCell>
                    <TableCell className="text-right">{slip.ta}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Other Allowance</TableCell>
                    <TableCell className="text-right">
                      {slip.other_allow}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>AGP</TableCell>
                    <TableCell className="text-right">{slip.agp}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Special Allowance</TableCell>
                    <TableCell className="text-right">
                      {slip.spl_allow}
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-medium">
                    <TableCell>Total Earnings</TableCell>
                    <TableCell className="text-right">
                      {slip.total_earning}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={2}>Deductions & Recoveries</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Provident Fund</TableCell>
                    <TableCell className="text-right">{slip.pf}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Professional Tax</TableCell>
                    <TableCell className="text-right">{slip.ptax}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Income Tax</TableCell>
                    <TableCell className="text-right">
                      {slip.income_tax}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Loan Installments</TableCell>
                    <TableCell className="text-right">
                      {slip.loan_installment}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Other Deductions</TableCell>
                    <TableCell className="text-right">
                      {slip.other_deduction}
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-medium">
                    <TableCell>Total Deductions</TableCell>
                    <TableCell className="text-right">
                      {slip.total_deduction}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Bank Account</p>
              <p>{slip.bank_account_no}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm font-medium">Net Pay</p>
              <p className="text-xl font-bold">₹{slip.net_pay}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SalarySlip;
