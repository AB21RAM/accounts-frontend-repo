// import React, { Component, FormEvent } from "react";
// import axios from "axios";

// // Define interfaces for state and props
// interface State {
//   feeHead: string;
//   feeName: string;
//   priority: string;
//   program: string;
//   amount: string;
//   tableData: Array<any>; // Assuming this will be an array of objects
//   allFee: Array<any>;    // Assuming this will be an array of objects
//   ay: string;
//   passing_year: string;
// }

// interface Props {}

// class MapFeeHeadsForm extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);

//     this.state = {
//       feeHead: "",
//       feeName: "",
//       priority: "",
//       program: "",
//       amount: "",
//       tableData: [],
//       allFee: [],
//       ay: "",
//       passing_year: "",
//     };
//   }

//   handleFormSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     const {
//       feeHead,
//       feeName,
//       program,
//       amount,
//       passing_year,
//       priority,
//       tableData,
//     } = this.state;

//     if (feeHead.trim() !== "" && amount.trim() !== "" && passing_year.trim() !== "") {
//       const newRow = {
//         feeHead: feeHead,
//         feeName: feeName,
//         program: program,
//         amount: amount,
//         passing_year: passing_year,
//         priority: priority,
//         ay: this.state.ay,
//       };

//       const emptyRowIndex = tableData.findIndex((row) => Object.keys(row).length === 0);

//       if (emptyRowIndex !== -1) {
//         const updatedTableData = [...tableData];
//         updatedTableData[emptyRowIndex] = newRow;
//         this.setState({ tableData: updatedTableData });
//       } else {
//         this.setState({ tableData: [...tableData, newRow] });
//       }

//       this.setState({ feeHead: "", amount: "", priority: "" });
//     } else {
//       window.alert("Please fill in all the fields.");
//     }
//   };

//   handleDeleteRow = (index: number) => {
//     const updatedTableData = [...this.state.tableData];
//     updatedTableData.splice(index, 1);
//     this.setState({ tableData: updatedTableData });
//   };

//   handleSaveTable = async () => {
//     const { tableData } = this.state;
//     for (const e of tableData) {
//       console.log(e);
//       const a = await this.addData(e.amount, e.feeHead, e.program, e.priority);
//       if (a) {
//         alert("Data Saved successfully");
//       } else {
//         alert("Something went wrong");
//       }
//     }
//     this.setState({ tableData: [] });
//   };

//   addData = async (amt: string, fhname: string, program: string, priority: string) => {
//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_APP_BASE_URL}/mapcattofeehead`,
//         {
//           fh_name: fhname,
//           amount: amt,
//           program: program,
//           passing_year: this.state.passing_year,
//           priority: priority,
//           ay: this.state.ay,
//         },
//         {
//           headers: { Authorization: localStorage.getItem("token") },
//         }
//       );

//       if (data.success === true) {
//         return true;
//       } else {
//         alert(data.error);
//         return false;
//       }
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   FetchAllFh = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
//         headers: { Authorization: localStorage.getItem("token") },
//       });

//       if (!data.found) {
//         console.log(data.error);
//       } else {
//         this.setState({ allFee: data.result });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   componentDidMount() {
//     this.FetchAllFh();
//   }

//   render() {
//     const { program, feeHead, ay, amount, passing_year, priority, tableData, allFee } = this.state;

//     return (
//       <div className="container mt-3">
//         <h3>Mapping fee Heads to Categories</h3>

//         <div>
//           <form className="row" onSubmit={this.handleFormSubmit}>
//             <div className="col-lg-5">
//               <select
//                 className="form-select mb-3 col-lg-4"
//                 id="program"
//                 value={program}
//                 onChange={(e) => this.setState({ program: e.target.value })}
//               >
//                 <option value="" disabled hidden>
//                   Is Applicable to DSA students?
//                 </option>
//                 <option value="1">Yes</option>
//                 <option value="0">No</option>
//               </select>
//             </div>

//             <div className="col-lg-5">
//               <select
//                 className="form-select mb-3 col-lg-4"
//                 id="feeHead"
//                 value={feeHead}
//                 onChange={(e) => {
//                   this.setState({ feeHead: e.target.value, feeName: e.target.options[e.target.selectedIndex].text });
//                 }}
//               >
//                 <option value="" disabled hidden>
//                   Select Fee Head
//                 </option>
//                 {allFee.length > 0 &&
//                   allFee.map((fee) => (
//                     <option key={fee.fh_id} value={fee.fh_id}>
//                       {fee.head_name}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             <div className="form-floating mb-3 col-lg-5">
//               <input
//                 className="form-control"
//                 type="text"
//                 id="ay"
//                 value={ay}
//                 placeholder="2019-20"
//                 onChange={(e) => this.setState({ ay: e.target.value })}
//               />
//               <label htmlFor="ay">Academic Year</label>
//             </div>

//             <div className="form-floating mb-3 col-lg-5">
//               <input
//                 className="form-control"
//                 type="number"
//                 id="amount"
//                 value={amount}
//                 placeholder="12345"
//                 onChange={(e) => this.setState({ amount: e.target.value })}
//               />
//               <label htmlFor="amount">Enter Amount:</label>
//             </div>

//             <div className="form-floating mb-3 col-lg-5">
//               <input
//                 className="form-control"
//                 type="text"
//                 id="py"
//                 value={passing_year}
//                 placeholder="2019-20"
//                 onChange={(e) => this.setState({ passing_year: e.target.value })}
//               />
//               <label htmlFor="py">Enter Year of Admission:</label>
//             </div>

//             <div className="form-floating mb-3 col-lg-5">
//               <input
//                 className="form-control"
//                 type="number"
//                 id="priority"
//                 value={priority}
//                 onChange={(e) => this.setState({ priority: e.target.value })}
//               />
//               <label htmlFor="priority">Priority of Deduction:</label>
//             </div>

//             <div>
//               <button className="btn btn-primary" type="submit">
//                 Add Line
//               </button>
//             </div>
//           </form>

//           {tableData.length > 0 && (
//             <div>
//               <table className="m-3 table table-primary table-striped">
//                 <thead>
//                   <tr>
//                     <th>Fee Head</th>
//                     <th>AY</th>
//                     <th>Amount</th>
//                     <th>Priority of Deduction</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((data, index) => (
//                     <tr key={index}>
//                       <td>{data.feeName}</td>
//                       <td>{data.ay}</td>
//                       <td>{data.amount}</td>
//                       <td>{data.priority}</td>
//                       <td>
//                         <button className="btn btn-danger" onClick={() => this.handleDeleteRow(index)}>
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <button className="btn btn-primary" type="submit" onClick={this.handleSaveTable}>
//                 Save
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default MapFeeHeadsForm;




import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Select,   SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

interface FeeHead {
  fh_id: string;
  head_name: string;
}

interface TableRowData {
  feeHead: string;
  feeName: string;
  program: string;
  amount: string;
  ay: string;
  passing_year: string;
  priority: string;
}

const MapFeeHeadsForm: React.FC = () => {
  const [feeHead, setFeeHead] = useState<string>("");
  const [feeName, setFeeName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [ay, setAy] = useState<string>("");
  const [passingYear, setPassingYear] = useState<string>("");
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [allFee, setAllFee] = useState<FeeHead[]>([]);

  useEffect(() => {
    const fetchAllFh = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        if (data.found) {
          setAllFee(data.result);
        }
      } catch (error) {
        console.error("Error fetching fee heads", error);
      }
    };
    fetchAllFh();
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (feeHead && amount && passingYear) {
      const newRow: TableRowData = {
        feeHead,
        feeName,
        program,
        amount,
        passing_year: passingYear,
        priority,
        ay,
      };
      setTableData([...tableData, newRow]);
      clearFormFields();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const clearFormFields = () => {
    setFeeHead("");
    setFeeName("");
    setProgram("");
    setAmount("");
    setPassingYear("");
    setPriority("");
    setAy("");
  };

  const handleDeleteRow = (index: number) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveTable = async () => {
    for (const row of tableData) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/mapcattofeehead`,
          {
            fh_name: row.feeHead,
            amount: row.amount,
            program: row.program,
            passing_year: row.passing_year,
            priority: row.priority,
            ay: row.ay,
          },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        if (!data.success) {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Error saving data", error);
      }
    }
    alert("Data saved successfully.");
    setTableData([]);
  };

  return (
    <div className="container mt-6 space-y-6 bg-gray-100">
      <h3 className="text-2xl font-bold">Mapping Fee Heads to Categories</h3>

      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleFormSubmit}>
        <Select
          value={program}
          onValueChange={(value) => setProgram(value)}
          // placeholder="Is Applicable to DSA students?"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Yes</SelectItem>
            <SelectItem value="0">No</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={feeHead}
          onValueChange={(value) => {
            const selected = allFee.find((fee) => fee.fh_id === value);
            setFeeHead(value);
            setFeeName(selected?.head_name || "");
          }}
          // placeholder="Select Fee Head"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Fee Head" />
          </SelectTrigger>
          <SelectContent>
            {allFee.map((fee) => (
              <SelectItem key={fee.fh_id} value={fee.fh_id}>
                {fee.head_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          value={ay}
          placeholder="Academic Year"
          onChange={(e) => setAy(e.target.value)}
        />

        <Input
          type="number"
          value={amount}
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <Input
          type="text"
          value={passingYear}
          placeholder="Enter Year of Admission"
          onChange={(e) => setPassingYear(e.target.value)}
        />

        <Input
          type="number"
          value={priority}
          placeholder="Priority of Deduction"
          onChange={(e) => setPriority(e.target.value)}
        />

        <Button variant={"myBtn"} type="submit">Add Line</Button>
      </form>

      {tableData.length > 0 && (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fee Head</TableCell>
                <TableCell>AY</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.feeName}</TableCell>
                  <TableCell>{row.ay}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.priority}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDeleteRow(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button onClick={handleSaveTable} className="mt-4">
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default MapFeeHeadsForm;
