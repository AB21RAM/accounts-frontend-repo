// import axios from 'axios';
// import React, { Component } from 'react';

// interface State {
//   from_date: string;
//   to_date: string;
//   allFee: { fh_id: number; head_name: string }[];
//   selectedHead: string;
//   branches: { branch_id: number; bname: string }[];
//   selectBranch: string;
//   branch_id: string;
// }

// class Report extends Component<{}, State> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       from_date: '',
//       to_date: '',
//       allFee: [],
//       selectedHead: '',
//       branches: [],
//       selectBranch: '',
//       branch_id: ''
//     };
//   }

//   componentDidMount() {
//     this.FetchAllFh();
//     this.FetchAllBranch();
//     // this.handleApplyFilter(this.state.selectedFeeHead, this.state.dateR);
//   }

//   FetchAllFh = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
//         headers: { Authorization: localStorage.getItem('token') }
//       });
//       if (!data.found) console.log(data.error);
//       else {
//         this.setState({ allFee: data.result });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   FetchAllBranch = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/getBranch`, {
//         headers: { Authorization: localStorage.getItem('token') }
//       });
//       if (!data) console.log(data.error);
//       else {
//         this.setState({ branches: data.branches });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   handleFromChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     this.setState({ from_date: value });
//   };

//   handleToChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     this.setState({ to_date: value });
//   };

//   handleGenerateHeadwiseReport = async () => {
//     try {
//       const { from_date, to_date, selectedHead, branch_id } = this.state;

//       if (from_date !== '' && to_date !== '') {
//         const response = await axios.post(
//           `${import.meta.env.VITE_APP_BASE_URL}/getHeadwiseReport`,
//           {
//             selectedHead,
//             from_date,
//             to_date,
//             branch_id
//           },
//           {
//             headers: { Authorization: localStorage.getItem('token') }
//           }
//         );

//         const blob = new Blob([response.data.data], { type: 'text/csv' });
//         const csvURL = URL.createObjectURL(blob);
//         const downloadLink = document.createElement('a');
//         downloadLink.href = csvURL;
//         downloadLink.download = 'data.csv';
//         downloadLink.click();
//         URL.revokeObjectURL(csvURL);
//         downloadLink.remove();
//       } else {
//         alert('Select Dates First');
//       }
//     } catch (err) {
//       console.log(err);
//       alert('Something Bad happened!');
//     }
//   };

//   handleGenerateBalanceReport = async () => {
//     try {
//       const { selectBranch } = this.state;
//       if (selectBranch !== '') {
//         const response = await axios.post(
//           `${import.meta.env.VITE_APP_BASE_URL}/getBalReport`,
//           { branch_id: selectBranch },
//           {
//             headers: { Authorization: localStorage.getItem('token') }
//           }
//         );

//         const blob = new Blob([response.data.data], { type: 'text/csv' });
//         const csvURL = URL.createObjectURL(blob);
//         const downloadLink = document.createElement('a');
//         downloadLink.href = csvURL;
//         downloadLink.download = 'data.csv';
//         downloadLink.click();
//         URL.revokeObjectURL(csvURL);
//         downloadLink.remove();
//       } else {
//         alert('Select Dates First');
//       }
//     } catch (e) {
//       console.log(e);
//       alert('Something Bad happened!');
//     }
//   };

//   render() {
//     const { allFee, branches } = this.state;
//     return (
//       <>
//         <div className="container">
//           <div className="row justify-content-between">
//             <h3 className="my-3">Generate Fee Report</h3>
//             <div className="col-lg-6">
//               <select
//                 className="form-select"
//                 onChange={(e: any) => this.setState({ selectedHead: e.target.value })}
//               >
//                 /*removed the defaultValue from option tag*/
//                 <option value="">
//                   ALL Fee Heads
//                 </option>
//                 {allFee.length > 0 &&
//                   allFee.map((fee) => (
//                     <option key={fee.fh_id} value={fee.fh_id}>
//                       {fee.head_name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//             <div className="col-lg-6">
//               <select
//                 className="form-select"
//                 onChange={(e) => this.setState({ branch_id: e.target.value })}
//               >
//                 <option value="">---Select Branch---</option>
//                 {branches.length > 0 &&
//                   branches.map((fee) => (
//                     <option key={fee.branch_id} value={fee.branch_id}>
//                       {fee.bname}
//                     </option>
//                   ))}
//               </select>
//             </div>
//             <div className="col-lg-6 mt-3">
//               <h6>
//                 From Date:{' '}
//                 <input
//                   className="form-control"
//                   type="date"
//                   name="from_date"
//                   onChange={this.handleFromChange}
//                 />
//               </h6>
//             </div>
//             <div className="col-lg-6 mt-3">
//               <h6>
//                 To Date:{' '}
//                 <input
//                   className="form-control"
//                   type="date"
//                   name="to_date"
//                   onChange={this.handleToChange}
//                 />
//               </h6>
//             </div>
//             <div className="col-md-3 mt-3">
//               <button className="btn btn-primary" onClick={this.handleGenerateHeadwiseReport}>
//                 Generate Report
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default Report;



import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download } from "lucide-react";

interface FeeHead {
  fh_id: number;
  head_name: string;
}

interface Branch {
  branch_id: number;
  bname: string;
}

const Report = () => {
  const [dates, setDates] = useState({
    from_date: "",
    to_date: "",
  });
  const [allFee, setAllFee] = useState<FeeHead[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedHead, setSelectedHead] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");

  useEffect(() => {
    fetchAllFeeHeads();
    fetchAllBranches();
  }, []);

  const fetchAllFeeHeads = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      if (data.found) setAllFee(data.result);
    } catch (error) {
      console.error("Error fetching fee heads:", error);
    }
  };

  const fetchAllBranches = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/getBranch`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      if (data) setBranches(data.branches);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      if (!dates.from_date || !dates.to_date) {
        throw new Error("Please select date range");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/getHeadwiseReport`,
        {
          selectedHead,
          from_date: dates.from_date,
          to_date: dates.to_date,
          branch_id: selectedBranch
        },
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      );

      const blob = new Blob([response.data.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `fee_report_${format(new Date(), "dd-MM-yyyy")}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Fee Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fee Head</label>
              <Select value={selectedHead} onValueChange={setSelectedHead}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Fee Head" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fee Heads</SelectItem>
                  {allFee.map((fee) => (
                    <SelectItem key={fee.fh_id} value={String(fee.fh_id)}>
                      {fee.head_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Branch</label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch.branch_id} value={String(branch.branch_id)}>
                      {branch.bname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">From Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dates.from_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dates.from_date ? format(new Date(dates.from_date), "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dates.from_date ? new Date(dates.from_date) : undefined}
                    onSelect={(date) => setDates(prev => ({ ...prev, from_date: date?.toISOString() ?? "" }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dates.to_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dates.to_date ? format(new Date(dates.to_date), "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dates.to_date ? new Date(dates.to_date) : undefined}
                    onSelect={(date) => setDates(prev => ({ ...prev, to_date: date?.toISOString() ?? "" }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button 
            variant={"myBtn"}
            onClick={handleGenerateReport} 
            className="w-full md:w-auto"
            disabled={!dates.from_date || !dates.to_date}
          >
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;