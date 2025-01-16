// import axios from 'axios';
// import React, { Component } from 'react';

// interface PaymentDetailsProps {
//   onAddBankDetail: (payment: any) => void; // Callback function for adding bank details
//   handleisFeeChange: (value: any) => void; // Callback function for handling fee type change
//   handleNewAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback function for handling new amount input change
//   handleSaveTable: () => void;
//   isFee: string | number;
// }

// interface PaymentDetailsState {
//   allFee: { fh_id: number; head_name: string }[]; // Array of fee objects with id and name
//   payment: {
//     [key: string]: string | number; // Dynamic structure for payment state
//   };
// }

// class PaymentDetails extends Component<PaymentDetailsProps, PaymentDetailsState> {
//   constructor(props: PaymentDetailsProps) {
//     super(props);
//     this.state = {
//       allFee: [{
//         fh_id: 0,
//         head_name: ''
//       }], // Initialize with empty array
//       payment: {}, // Initialize with empty object
//     };
//   }

//   componentDidMount() {
//     this.FetchAllFh();
//   }

//   handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       payment: {
//         ...prevState.payment,
//         [name]: value,
//       },
//     }));
//   };

//   FetchAllFh = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
//         headers: { Authorization: localStorage.getItem('token') },
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

//   handleCLickAdd = () => {
//     console.log(this.state.payment);
//     const { onAddBankDetail } = this.props;
//     onAddBankDetail(this.state.payment);
//   };

//   render() {
//     const { allFee } = this.state;
//     const { isFee } = this.props;
    
//     return (
//       <>
//         <div className="col-lg-5 col-md-5 col-sm-12 mt-3">
//           <div className="card">
//             <h5 className="card-title p-2">Payment Details</h5>
//             <hr />

//             <div className="card-body">
//               <select
//                 className="form-select mb-3"
//                 aria-label="Default select example"
//                 name="feeHeads"
//                 onChange={(e) => this.props.handleisFeeChange(e.target.value)}
//               >
//                 <option selected>Select Payment Type</option>
//                 <option value={0}>Non Fee</option>
//                 <option value={1}>Fee</option>
//               </select>
//             </div>

//             {parseInt(isFee as string) === 0 ? (
//               <div className="card-body">
//                 <select
//                   className="form-select mb-3"
//                   aria-label="Default select example"
//                   name="feeHeads"
//                   onChange={this.handleInputChange}
//                 >
//                   <option selected>Select Fee Head</option>
//                   {allFee.length > 0 &&
//                     allFee.map((fee) => (
//                       <option key={fee.fh_id} value={fee.fh_id}>
//                         {fee.head_name}
//                       </option>
//                     ))}
//                 </select>

//                 <div className="form-floating mb-3">
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="floatingInput"
//                     name="quentity"
//                     onChange={this.handleInputChange}
//                   />
//                   <label htmlFor="floatingInput">Quentity</label>
//                 </div>

//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="floatingInput"
//                     name="amount"
//                     onChange={this.handleInputChange}
//                   />
//                   <label htmlFor="floatingInput">Amount</label>
//                 </div>

//                 <div className="d-flex justify-content-between">
//                   <button className="btn btn-primary" onClick={this.handleCLickAdd}>
//                     Add
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="card-body">
//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="floatingInput"
//                     name="new_amount"
//                     onChange={this.props.handleNewAmountChange}
//                   />
//                   <label htmlFor="floatingInput">Amount</label>
//                 </div>

//                 <div className="d-flex justify-content-between">
//                   <button className="btn btn-primary" onClick={this.props.handleSaveTable}>
//                     Collect Fee
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default PaymentDetails;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeeHead {
  fh_id: number;
  head_name: string;
}

interface Payment {
  [key: string]: string | number;
}

interface PaymentDetailsProps {
  onAddBankDetail: (payment: Payment) => void;
  handleisFeeChange: (value: string) => void;
  handleNewAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveTable: () => void;
  isFee: string | number;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  onAddBankDetail,
  handleisFeeChange,
  handleNewAmountChange,
  handleSaveTable,
  isFee,
}) => {
  const [allFee, setAllFee] = useState<FeeHead[]>([]);
  const [payment, setPayment] = useState<Payment>({});

  useEffect(() => {
    fetchAllFeeHeads();
  }, []);

  const fetchAllFeeHeads = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      if (data.found) {
        setAllFee(data.result);
      }
    } catch (error) {
      console.error('Error fetching fee heads:', error);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setPayment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    onAddBankDetail(payment);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="payment-type">Payment Type</Label>
          <Select onValueChange={handleisFeeChange}>
            <SelectTrigger id="payment-type">
              <SelectValue placeholder="Select Payment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Non Fee</SelectItem>
              <SelectItem value="1">Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {parseInt(isFee as string) === 0 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fee-head">Fee Head</Label>
              <Select onValueChange={(value) => handleInputChange('feeHeads', value)}>
                <SelectTrigger id="fee-head">
                  <SelectValue placeholder="Select Fee Head" />
                </SelectTrigger>
                <SelectContent>
                  {allFee.map((fee) => (
                    <SelectItem key={fee.fh_id} value={fee.fh_id.toString()}>
                      {fee.head_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                onChange={(e) => handleInputChange('quentity', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleAddClick}
            >
              Add Payment
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-amount">Amount</Label>
              <Input
                id="new-amount"
                type="number"
                placeholder="Enter amount"
                onChange={handleNewAmountChange}
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleSaveTable}
            >
              Collect Fee
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentDetails;