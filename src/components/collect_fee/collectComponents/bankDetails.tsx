// import React, { Component } from 'react';

// interface BankDetailsProps {
//   onBankDetailsChange: (name: string, value: string) => void;
// }

// interface BankDetailsState {
// }

// class BankDetails extends Component<BankDetailsProps, BankDetailsState> {
//     handleInputChange = (e: any) => {
//         const { name, value } = e.target;
//         const { onBankDetailsChange } = this.props;

//         onBankDetailsChange(name, value);
//     };

//     render() {
//         return (
//             <>
//                 <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
//                     <div className="card">
//                         <h5 className="card-title p-2">Bank Details</h5>
//                         <hr />
//                         <div className="card-body">
//                             <div className="row justify-content-between">
//                                 <div className="col-lg-5">
//                                     <select className="form-select mb-3" onChange={this.handleInputChange} aria-label="Default select example" name='mop'>
//                                         <option selected>Mode Of Payment</option>
//                                         <option value="Cash">Cash</option>
//                                         <option value="DD">DD</option>
//                                         <option value="NEFT">NEFT</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-lg-5">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="floatingInput"
//                                             name="bankName"
//                                             onChange={this.handleInputChange}
//                                         />
//                                         <label htmlFor="floatingInput">Bank Name</label>
//                                     </div>
//                                 </div>

//                                 <div className="col-lg-5">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="floatingInput"
//                                             name="bankBranch"
//                                             onChange={this.handleInputChange}
//                                         />
//                                         <label htmlFor="floatingInput">Bank Branch</label>
//                                     </div>
//                                 </div>

//                                 <div className="col-lg-5">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             id="floatingInput"
//                                             name="checkDate"
//                                             onChange={this.handleInputChange}
//                                         />
//                                         <label htmlFor="floatingInput">DD Date</label>
//                                     </div>
//                                 </div>

//                                 <div className="col-lg-5">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="floatingInput"
//                                             name="ddno"
//                                             onChange={this.handleInputChange}
//                                         />
//                                         <label htmlFor="floatingInput">DD Number</label>
//                                     </div>
//                                 </div>


//                                 <div className="col-lg-5">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="floatingInput"
//                                             name="micr"
//                                             onChange={this.handleInputChange}
//                                         />
//                                         <label htmlFor="floatingInput">MICR Code</label>
//                                     </div>
//                                 </div>

//                                 <div className="col-lg-5">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="floatingInput"
//                                             name="code"
//                                             onChange={this.handleInputChange}
//                                         />
//                                         <label htmlFor="floatingInput">code</label>
//                                     </div>
//                                 </div>


//                                 <div className="col-lg-5">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="floatingInput"
//                                             name="utr"
//                                             onChange={this.handleInputChange}
//                                         />
//                                         <label htmlFor="floatingInput">UTR Number</label>
//                                     </div>
//                                 </div>

//                                 <div className="col-lg-5">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             id="floatingInput"
//                                             name="receiptDate"
//                                             onChange={this.handleInputChange}
//                                         />
//                                         <label htmlFor="floatingInput">Receipt Date</label>
//                                     </div>
//                                 </div>


//                             </div>


//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default BankDetails;


import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BankDetailsProps {
  onBankDetailsChange: (name: string, value: string) => void;
}

type PaymentMode = 'Cash' | 'DD' | 'NEFT';

const BankDetails: React.FC<BankDetailsProps> = ({ onBankDetailsChange }) => {
  const handleInputChange = (name: string, value: string) => {
    onBankDetailsChange(name, value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bank Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="mop">Mode of Payment</Label>
            <Select
              onValueChange={(value) => handleInputChange('mop', value)}
            >
              <SelectTrigger id="mop">
                <SelectValue placeholder="Select payment mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="DD">DD</SelectItem>
                <SelectItem value="NEFT">NEFT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              placeholder="Enter bank name"
              onChange={(e) => handleInputChange('bankName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankBranch">Bank Branch</Label>
            <Input
              id="bankBranch"
              placeholder="Enter bank branch"
              onChange={(e) => handleInputChange('bankBranch', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkDate">DD Date</Label>
            <Input
              id="checkDate"
              type="date"
              onChange={(e) => handleInputChange('checkDate', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ddno">DD Number</Label>
            <Input
              id="ddno"
              placeholder="Enter DD number"
              onChange={(e) => handleInputChange('ddno', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="micr">MICR Code</Label>
            <Input
              id="micr"
              placeholder="Enter MICR code"
              onChange={(e) => handleInputChange('micr', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              placeholder="Enter code"
              onChange={(e) => handleInputChange('code', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="utr">UTR Number</Label>
            <Input
              id="utr"
              placeholder="Enter UTR number"
              onChange={(e) => handleInputChange('utr', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiptDate">Receipt Date</Label>
            <Input
              id="receiptDate"
              type="date"
              onChange={(e) => handleInputChange('receiptDate', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankDetails;