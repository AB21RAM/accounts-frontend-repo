// import React, { Component } from 'react';

// interface BasicDetailsProps {
//   onFetchClick: () => void;
//   onStudClgIdChange: (studClgId: string) => void;
//   handleSelectAy: (ay: string) => void;
// }

// interface BasicDetailsState { }

// class BasicDetails extends Component<BasicDetailsProps, BasicDetailsState> {
//     handleInputChange = (e: any) => {
//         const { onStudClgIdChange } = this.props;
//         const studClgId = e.target.value;
//         onStudClgIdChange(studClgId);
//     };

//     render() {
//     return (
//       <>
      
//         <div className="col-lg-5 col-md-5 col-sm-12 mt-3">
//           <div className="card">
//             <h5 className="card-title p-2">Basic Details</h5>
//             <hr />
//             <div className="card-body">
//               <div className="form-floating mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="floatingInput"
//                   placeholder="VU1F000000"
//                   name="stud_clg_id"
//                   onChange={this.handleInputChange}
//                 />
//                 <label htmlFor="floatingInput">Student College ID</label>
//               </div>

//               <select className="form-select mb-3" onChange={(e)=>this.props.handleSelectAy(e.target.value)} aria-label="Default select example" name='ay'>
//                   <option selected>Select Academic Year</option>
//                   <option value="2023-24">2023-24</option>
//                   <option value="2024-25">2024-25</option>
//                   <option value="2025-26">2025-26</option>
//               </select>

//               <div className="d-flex justify-content-between">
//                 <button className="btn btn-primary" onClick={(e)=>this.props.onFetchClick()}>Fetch</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default BasicDetails;



import React from 'react';
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

interface BasicDetailsProps {
  onFetchClick: () => void;
  onStudClgIdChange: (studClgId: string) => void;
  handleSelectAy: (ay: string) => void;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({
  onFetchClick,
  onStudClgIdChange,
  handleSelectAy,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Basic Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="student-id">Student College ID</Label>
          <Input
            id="student-id"
            placeholder="VU1F000000"
            onChange={(e) => onStudClgIdChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="academic-year">Academic Year</Label>
          <Select onValueChange={handleSelectAy}>
            <SelectTrigger id="academic-year">
              <SelectValue placeholder="Select Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-24">2023-24</SelectItem>
              <SelectItem value="2024-25">2024-25</SelectItem>
              <SelectItem value="2025-26">2025-26</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full"
          onClick={onFetchClick}
        >
          Fetch Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default BasicDetails;