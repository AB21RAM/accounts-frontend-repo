// import axios from 'axios';
// import React, { Component } from 'react';

// // interface StatementDate {
// //   dates: string; // Assuming dates is a string type
// // }

// interface StatementPrintState {
//   statemetDates: any;
//   statementData: any[];
//   selectedDate: string;
// }

// class StatementPrint extends Component<{}, StatementPrintState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       statemetDates: [],
//       statementData: [],
//       selectedDate: ''
//     };
//   }

//   componentDidMount = async (): Promise<void> => {
//     await this.fetchDDData();
//   };

//   fetchDDData = async (): Promise<void> => {
//     try {
//       const response = await axios.get<{ dates: string[] }>(
//         `${import.meta.env.VITE_APP_BASE_URL}/StatementDates`,
//         {
//           headers: { Authorization: localStorage.getItem('token') },
//         }
//       );
//       if (response.data.dates) {
//         this.setState({ statemetDates: response.data.dates });
//       } else {
//         console.log('no data');
//       }
//     } catch (error) {
//       alert('Something Went Wrong!');
//     }
//   };

//   handleDateSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
//     this.setState({
//       selectedDate: e.target.value,
//     });
//   };

//   handleApplyFilter = (): void => {
//     window.open(`/printStatement?id=${this.state.selectedDate}`, '_blank');
//   };

//   render(): React.ReactNode {
//     const { statemetDates } = this.state;
//     return (
//       <>
//         <div className="container">
//           <h3 className="mt-3 mb-3">Generate Bank Statement</h3>
//           <select
//             className="form-select mb-3"
//             aria-label="Default select example"
//             name="feeHeads"
//             onChange={this.handleDateSelect}
//           >
//             <option value="" disabled selected>
//               Available Statements
//             </option>
//             {statemetDates.length > 0 &&
//               statemetDates.map((e: any, i: any) => (
//                 <option key={i} value={i}>
//                   {new Date(e.dates).toLocaleDateString('en-IN')}
//                 </option>
//               ))}
//           </select>

//           <button
//             className="btn btn-primary"
//             onClick={this.handleApplyFilter}
//           >
//             Apply Filter
//           </button>
//         </div>
//       </>
//     );
//   }
// }

// export default StatementPrint;

import axios from "axios";
import React, { Component } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface StatementPrintState {
  statementDates: { dates: string }[];
  selectedDate: string;
}

class StatementPrint extends Component<{}, StatementPrintState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      statementDates: [],
      selectedDate: "",
    };
  }

  componentDidMount = async (): Promise<void> => {
    await this.fetchStatementDates();
  };

  fetchStatementDates = async (): Promise<void> => {
    try {
      const response = await axios.get<{ dates: { dates: string }[] }>(
        `${import.meta.env.VITE_APP_BASE_URL}/StatementDates`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      if (response.data.dates) {
        this.setState({ statementDates: response.data.dates });
        console.log(response.data.dates);
      } else {
        console.error("No data received");
      }
    } catch (error) {
      console.error("Error fetching statement dates:", error);
      alert("Something went wrong while fetching statement dates.");
    }
  };

  handleDateSelect = (value: string): void => {
    console.log(value);
    this.setState({ selectedDate: value });
  };

  handleApplyFilter = (): void => {
    const { selectedDate } = this.state;
    if (selectedDate) {
      window.open(`/printStatement?id=${selectedDate}`, "_blank");
    } else {
      alert("Please select a date before applying the filter.");
    }
  };

  render(): React.ReactNode {
    const { statementDates, selectedDate } = this.state;

    return (
      <Card className="p-6 max-w-md mx-auto mt-10">
        <h3 className="text-xl font-bold mb-4">Generate Bank Statement</h3>
        <div className="mb-6">
          <Select
            value={selectedDate}
            // placeholder="Available Statements"
            onValueChange={this.handleDateSelect}
          >
            <SelectTrigger aria-label="Select a date">
              <SelectValue placeholder="Select a date" />
            </SelectTrigger>
            <SelectContent>
              {statementDates.map((date, index) => (
                <SelectItem key={index} value={date.dates}>
                  {new Date(date.dates).toLocaleDateString("en-IN")}
                  {/* {new Date(date)} */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={this.handleApplyFilter}
          variant={"myBtn"}
          className="w-full text-white"
        >
          Apply Filter
        </Button>
      </Card>
    );
  }
}

export default StatementPrint;
