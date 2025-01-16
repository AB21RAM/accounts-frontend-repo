// import axios from 'axios';
// import React, { Component } from 'react';

// interface State {
//   from_date: string;
//   to_date: string;
//   allFee: Array<any>; // Change this to any appropriate type if needed
//   selectedHead: string;
//   branches: Array<any>; // Change this to any appropriate type if needed
//   selectBranch: string;
//   branch_id: string;
//   stud_clg_id: string;
//   ay: string;
// }

// class StudentsReports extends Component<{}, State> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       from_date: '',
//       to_date: '',
//       allFee: [],
//       selectedHead: '',
//       branches: [],
//       selectBranch: '',
//       branch_id: '',
//       stud_clg_id: '',
//       ay: ''
//     };
//   }

//   handleGenerateHeadwiseReport = async () => {
//     try {
//       const { stud_clg_id, ay } = this.state;

//       if (stud_clg_id !== '' && ay !== '') {
//         const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/studentWiseReciept`, {
//           stud_clg_id,
//           ay
//         }, {
//           headers: { Authorization: localStorage.getItem('token') }
//         });

//         const blob = new Blob([response.data.data], { type: "text/csv" });
//         const csvURL = URL.createObjectURL(blob);
//         const downloadLink = document.createElement("a");
//         downloadLink.href = csvURL;
//         downloadLink.download = "data.csv";
//         downloadLink.click();
//         URL.revokeObjectURL(csvURL);
//         downloadLink.remove();
//       } else {
//         alert("Provide Proper Data");
//       }
//     } catch (err) {
//       console.log(err);
//       alert('Something Bad happened!');
//     }
//   };

//   render() {
//     const { allFee } = this.state;

//     return (
//       <>
//         <div className="container">
//           <div className="row justify-content-between">
//             <h3 className="my-3">Student Fee Report</h3>
//             <div className="col-md-3">
//               <input
//                 className="form-control"
//                 type="text"
//                 id="clgId"
//                 placeholder="College ID"
//                 onChange={(e) => this.setState({ stud_clg_id: e.target.value })}
//               />
//             </div>

//             <div className="col-md-3">
//               <select
//                 className="form-select"
//                 onChange={(e) => this.setState({ ay: e.target.value })}
//                 value={this.state.ay}
//               >
//                 <option value="">Select AY</option>
//                 <option value="2023-24">2023-24</option>
//                 <option value="2024-25">2024-25</option>
//               </select>
//             </div>

//             <div className="col-md-3">
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

// export default StudentsReports;


import { useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface StudentReport {
  stud_clg_id: string
  ay: string
}

export default function StudentReports() {
  const [formData, setFormData] = useState<StudentReport>({
    stud_clg_id: '',
    ay: ''
  })
  const { toast } = useToast()

  const handleGenerateReport = async () => {
    const { stud_clg_id, ay } = formData
    
    if (!stud_clg_id || !ay) {
      toast({
        variant: "destructive",
        title: "Missing Data",
        description: "Please provide College ID and Academic Year"
      })
      return
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/studentWiseReciept`,
        { stud_clg_id, ay },
        {
          headers: { 
            Authorization: localStorage.getItem('token'),
            responseType: 'blob'
          }
        }
      )

      const blob = new Blob([response.data.data], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `student-report-${stud_clg_id}-${ay}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Success",
        description: "Report generated successfully"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate report"
      })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Student Fee Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              placeholder="College ID"
              value={formData.stud_clg_id}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                stud_clg_id: e.target.value
              }))}
            />
          </div>
          <div className="flex-1">
            <Select 
              value={formData.ay}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                ay: value
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Academic Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2024-25">2024-25</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleGenerateReport}
            className="min-w-[200px]"
          >
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}