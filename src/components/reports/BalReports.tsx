// import axios from 'axios';
// import React, { Component } from 'react';

// interface Branch {
//     branch_id: any;
//     bname: any;
// }

// interface BalReportState {
//     from_date: string;
//     to_date: string;
//     allFee: any[];
//     selectedHead: string;
//     branches: Branch[];
//     selectBranch: string;
//     branch_id: string;
// }

// interface BalReportProps {}

// class BalReport extends Component<BalReportProps, BalReportState> {
//     constructor(props: BalReportProps) {
//         super(props);
//         this.state = {
//             from_date: '',
//             to_date: '',
//             allFee: [],
//             selectedHead: '',
//             branches: [],
//             selectBranch: '',
//             branch_id: '',
//         };
//     }

//     componentDidMount() {
//         this.FetchAllFh();
//         this.FetchAllBranch();
//     }

//     FetchAllFh = async () => {
//         try {
//             const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
//                 headers: { Authorization: localStorage.getItem('token') }
//             });
//             if (!data.found) {
//                 console.log(data.error);
//             } else {
//                 this.setState({ allFee: data.result });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     FetchAllBranch = async () => {
//         try {
//             const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/getBranch`, {
//                 headers: { Authorization: localStorage.getItem('token') }
//             });
//             if (!data) {
//                 console.log(data.error);
//             } else {
//                 this.setState({ branches: data.branches });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     handleGenerateBalanceReport = async () => {
//         try {
//             const { selectBranch } = this.state;
//             if (selectBranch !== '') {
//                 const data = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/getBalReport`, {
//                     branch_id: selectBranch,
//                 }, {
//                     headers: { Authorization: localStorage.getItem('token') }
//                 });

//                 const blob = new Blob([data.data.data], { type: "text/csv" });
//                 const csvURL = URL.createObjectURL(blob);
//                 const downloadLink = document.createElement("a");
//                 downloadLink.href = csvURL;
//                 downloadLink.download = "data.csv";
//                 downloadLink.click();
//                 URL.revokeObjectURL(csvURL);
//                 downloadLink.remove();
//             } else {
//                 alert("Select Dates First");
//             }
//         } catch (e) {
//             console.log(e);
//             alert('Something Bad happened!');
//         }
//     };

//     render() {
//         const { branches } = this.state;

//         return (
//             <>
//                 <div className="container">
//                     <div className="row justify-content-between">
//                         <h3 className="my-3">Generate Balance Fee Report</h3>
//                         <div className="col-md-3">
//                             <select
//                                 className="form-select"
//                                 name="heads"
//                                 onChange={(e) => this.setState({ selectBranch: e.target.value })}
//                                 value={this.state.selectBranch}
//                             >
//                                 <option value="">---Select Branch---</option>
//                                 {branches.length > 0 &&
//                                     branches.map((fee) => (
//                                         <option key={fee.branch_id} value={fee.branch_id}>
//                                             {fee.bname}
//                                         </option>
//                                     ))}
//                             </select>
//                         </div>
//                         <div className="col-md-3">
//                             <button
//                                 className="btn btn-primary"
//                                 onClick={this.handleGenerateBalanceReport}
//                             >
//                                 Generate Report
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default BalReport;

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Branch {
  branch_id: string;
  bname: string;
}

export default function BalanceReport() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const { data } = await axios.get<{ branches: Branch[] }>(
        `${import.meta.env.VITE_APP_BASE_URL}/getBranch`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setBranches(data.branches);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch branches",
      });
    }
  };

  const handleGenerateReport = async () => {
    if (!selectedBranch) {
      toast({
        variant: "destructive",
        title: "Warning",
        description: "Please select a branch first",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/getBalReport`,
        { branch_id: selectedBranch },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            responseType: "blob",
          },
        }
      );

      const blob = new Blob([response.data.data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `balance-report-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Report generated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate report",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Balance Fee Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.branch_id} value={branch.branch_id}>
                    {branch.bname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={"myBtn"}
            onClick={handleGenerateReport}
            className="min-w-[200px]"
          >
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
