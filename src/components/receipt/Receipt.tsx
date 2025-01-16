// import React, { Component } from 'react';
// import axios from 'axios';
// import ReceiptTable from './recieptComponents/ReceiptTable';

// interface Fee {
//     fh_id: string;
//     head_name: string;
// }

// interface Receipt {
//     id: number;
// }

// interface ReceiptState {
//     studClgId: string;
//     receipts: any;
//     allFee: Fee[];
//     selectedFeeHead: string;
//     dateR: Date;
//     studentDetails?: any; // Define as needed
//     bankDetails?: any; // Define as needed
// }

// interface ReceiptProps {
//     // Define props that ReceiptTable expects if any, if not, it's fine.
// }

// class Receipt extends Component<ReceiptProps, ReceiptState> {
//     constructor(props: ReceiptProps) {
//         super(props);
//         this.state= {
//             studClgId: '',
//             receipts: [{ id: 1 }, { id: 2 }],
//             allFee: [],
//             selectedFeeHead: '',
//             dateR: new Date(),
//         };
//     }

//     componentDidMount() {
//         this.FetchAllFh();
//         this.handleApplyFilter(this.state.selectedFeeHead, this.state.dateR);
//     }

//     FetchAllFh = async () => {
//         try {
//             const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
//                 headers: { Authorization: localStorage.getItem('token') }
//             });
//             if (!data.found) console.log(data.error);
//             else {
//                 this.setState({ allFee: data.result });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     handleFeeHeadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         this.setState({ selectedFeeHead: e.target.value });
//     }

//     handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({ dateR: new Date(e.target.value) });
//     }

//     handleApplyFilter = async (fh_id: string, dateR: Date) => {
//         try {
//             const newDate = dateR.toLocaleDateString('en-CA');
//             const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/getGeneralReceipt`, { fh_id, dateR: newDate }, {
//                 headers: { Authorization: localStorage.getItem('token') }
//             });
//             this.setState({ receipts: data.receipts });
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     handleApplyFilterClick = async () => {
//         this.handleApplyFilter(this.state.selectedFeeHead, this.state.dateR);
//     }

//     render() {
//         const { allFee, receipts, selectedFeeHead, dateR } = this.state;

//         return (
//             <>
//                 <div className="container">
//                     <div className="row justify-content-between">
//                         <h3 className="my-3">Generate Fee Receipt</h3>
//                         <div className="col-md-3">
//                             <select
//                                 className="form-select mb-3"
//                                 aria-label="Default select example"
//                                 name="feeHeads"
//                                 onChange={this.handleFeeHeadChange}
//                                 value={selectedFeeHead}
//                             >
//                                 <option selected>Select Fee Head</option>
//                                 {allFee.length > 0 &&
//                                     allFee.map((fee) => (
//                                         <option key={fee.fh_id} value={fee.fh_id}>
//                                             {fee.head_name}
//                                         </option>
//                                     ))
//                                 }
//                             </select>
//                         </div>
//                         <div className="col-md-3">
//                             <input
//                                 type="date"
//                                 name="date_of_reciept"
//                                 onChange={this.handleDateChange}
//                                 value={dateR.toISOString().substr(0, 10)}
//                             />
//                         </div>
//                         <div className="col-md-3">
//                             <button className="btn btn-primary" onClick={this.handleApplyFilterClick}>
//                                 Apply Filter
//                             </button>
//                         </div>

//                         <div className="col-lg-12 col-md-12">
//                             <ReceiptTable recipts={receipts} selectedFeeHead={selectedFeeHead} />
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default Receipt;


import React, { Component } from "react";
import axios from "axios";
import ReceiptTable from "./recieptComponents/ReceiptTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Fee {
  fh_id: string;
  head_name: string;
}

interface Receipt {
  id: number;
}

interface ReceiptState {
  studClgId: string;
  receipts: any[];
  allFee: Fee[];
  selectedFeeHead: string;
  dateR: Date;
}

interface ReceiptProps {}

class Receipt extends Component<ReceiptProps, ReceiptState> {
  constructor(props: ReceiptProps) {
    super(props);
    this.state = {
      studClgId: "",
      receipts: [],
      allFee: [],
      selectedFeeHead: "",
      dateR: new Date(),
    };
  }

  componentDidMount() {
    this.FetchAllFh();
    this.handleApplyFilter(this.state.selectedFeeHead, this.state.dateR);
  }

  FetchAllFh = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      if (!data.found) console.error(data.error);
      else {
        this.setState({ allFee: data.result });
      }
      console.log(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  handleFeeHeadChange = (value: string) => {
    this.setState({ selectedFeeHead: value });
  };

  handleDateChange = (value: string) => {
    this.setState({ dateR: new Date(value) });
  };

  handleApplyFilter = async (fh_id: string, dateR: Date) => {
    try {
      const newDate = dateR.toLocaleDateString("en-CA");
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/getGeneralReceipt`,
        { fh_id, dateR: newDate },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      this.setState({ receipts: data.receipts });
      console.log(data.receipts);
    } catch (error) {
      console.error(error);
    }
  };

  handleApplyFilterClick = async () => {
    this.handleApplyFilter(this.state.selectedFeeHead, this.state.dateR);
  };

  render() {
    const { allFee, receipts, selectedFeeHead, dateR } = this.state;

    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Generate Fee Receipt</CardTitle>
          <CardDescription>Select filters to generate fee receipts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={this.handleFeeHeadChange} value={selectedFeeHead}>
              <SelectTrigger aria-label="Select Fee Head">
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
              type="date"
              value={dateR.toISOString().substr(0, 10)}
              onChange={(e) => this.handleDateChange(e.target.value)}
            />

            <Button onClick={this.handleApplyFilterClick} className="w-full">
              Apply Filter
            </Button>
          </div>

          <ReceiptTable recipts={receipts} selectedFeeHead={selectedFeeHead} />
        </CardContent>
      </Card>
    );
  }
}

export default Receipt;
