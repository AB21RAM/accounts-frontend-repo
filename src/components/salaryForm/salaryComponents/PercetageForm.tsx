// import axios from "axios";
// import React, { Component } from "react";

// interface PerFormState {
//     da: number;
//     hra: number;
//     pf: number;
//     ta: number;
//     ptax: number;
// }

// interface PercentageComponent {
//     name: string;
//     percentage: number;
// }

// interface FixedComponent {
//     name: string;
//     amount: number;
// }

// interface ApiResponse {
//     msg?: string;
//     data?: PercentageComponent[] | FixedComponent[];
// }

// class PerForm extends Component<{}, PerFormState> {
//     constructor(props: {}) {
//         super(props);
//         this.state = {
//             da: 0,
//             hra: 0,
//             pf: 0,
//             ta: 0,
//             ptax: 0
//         };
//     }

//     componentDidMount = async (): Promise<void> => {
//         await this.fetchAllPercenage();
//         await this.frtchAllFixedComponents();
//     };

//     fetchAllPercenage = async (): Promise<void> => {
//         const { data } = await axios.get<ApiResponse>(
//             `${import.meta.env.VITE_APP_BASE_URL}/fetchAllPercenatge`,
//             {
//                 headers: { Authorization: localStorage.getItem('token') }
//             }
//         );
        
//         if (data.msg) console.log(data.msg);
//         else if (data.data) {
//             const percentageData = data.data as PercentageComponent[];
//             percentageData.forEach(element => {
//                 if (element.name === 'DA') {
//                     this.setState({ da: element.percentage });
//                 }
//                 else if (element.name === 'HRA') {
//                     this.setState({ hra: element.percentage });
//                 }
//                 else {
//                     this.setState({ pf: element.percentage });
//                 }
//             });
//         }
//     };

//     frtchAllFixedComponents = async (): Promise<void> => {
//         const { data } = await axios.get<ApiResponse>(
//             `${import.meta.env.VITE_APP_BASE_URL}/frtchAllFixedComponents`,
//             {
//                 headers: { Authorization: localStorage.getItem('token') }
//             }
//         );
        
//         if (data.msg) console.log(data.msg);
//         else if (data.data) {
//             const fixedData = data.data as FixedComponent[];
//             fixedData.forEach(element => {
//                 if (element.name === 'TA') {
//                     this.setState({ ta: element.amount });
//                 }
//                 else {
//                     this.setState({ ptax: element.amount });
//                 }
//             });
//         }
//     };

//     handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
//         const { name, value } = e.target;
//         await this.setState({
//             [name]: parseFloat(value) || 0
//         } as Pick<PerFormState, keyof PerFormState>);
//     };

//     handleSaveInformationCllick = async (): Promise<void> => {
//         const { data } = await axios.post<ApiResponse>(
//             `${import.meta.env.VITE_APP_BASE_URL}/updatePercentage`,
//             {
//                 da: this.state.da,
//                 hra: this.state.hra,
//                 pf: this.state.pf
//             },
//             {
//                 headers: { Authorization: localStorage.getItem('token') }
//             }
//         );

//         if (data.msg) {
//             alert(data.msg);
//         }
//     };

//     handleSaveFixedInformationCllick = async (): Promise<void> => {
//         const { data } = await axios.post<ApiResponse>(
//             `${import.meta.env.VITE_APP_BASE_URL}/updateFixedComponents`,
//             {
//                 ta: this.state.ta,
//                 ptax: this.state.ptax
//             },
//             {
//                 headers: { Authorization: localStorage.getItem('token') }
//             }
//         );

//         if (data.msg) {
//             alert(data.msg);
//         }
//     };

//     render(): React.ReactNode {
//         const { da, hra, pf, ta, ptax } = this.state;

//         return (
//             <div className="container mt-3">
//                 <div className="card">
//                     <div className="card-body">
//                         <h5 className="card-title mb-3">Percentage Mapping</h5>
//                         <hr />

//                         <button 
//                             className="btn btn-primary mt-3" 
//                             onClick={() => this.handleSaveInformationCllick()}
//                         >
//                             Save Informations
//                         </button>

//                         <div className="row mt-3">
//                             <div className="col-lg-4 mt-3">
//                                 <div className="form-floating mb-3 w-100">
//                                     <input 
//                                         type="text" 
//                                         name="da" 
//                                         className="form-control" 
//                                         id="floatingInput" 
//                                         value={da} 
//                                         onChange={this.handleInputChange}
//                                     />
//                                     <label htmlFor="floatingInput">D.A.</label>
//                                 </div>
//                             </div>
//                             <div className="col-lg-4 mt-3">
//                                 <div className="form-floating mb-3 w-100">
//                                     <input 
//                                         type="text" 
//                                         name="hra" 
//                                         className="form-control" 
//                                         id="floatingInput" 
//                                         value={hra} 
//                                         onChange={this.handleInputChange}
//                                     />
//                                     <label htmlFor="floatingInput">H.R.A.</label>
//                                 </div>
//                             </div>
//                             <div className="col-lg-4 mt-3">
//                                 <div className="form-floating mb-3 w-100">
//                                     <input 
//                                         type="text" 
//                                         name="pf" 
//                                         className="form-control" 
//                                         id="floatingInput" 
//                                         value={pf} 
//                                         onChange={this.handleInputChange}
//                                     />
//                                     <label htmlFor="floatingInput">Prov. Fund</label>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>  

//                 <div className="card mt-3">
//                     <div className="card-body">
//                         <h5 className="card-title mb-3">Fixed Component Mapping</h5>
//                         <hr />

//                         <button 
//                             className="btn btn-primary mt-3" 
//                             onClick={() => this.handleSaveFixedInformationCllick()}
//                         >
//                             Save Informations
//                         </button>

//                         <div className="row mt-3">
//                             <div className="col-lg-4 mt-3">
//                                 <div className="form-floating mb-3 w-100">
//                                     <input 
//                                         type="text" 
//                                         name="ta" 
//                                         className="form-control" 
//                                         id="floatingInput"
//                                         value={ta} 
//                                         onChange={this.handleInputChange}
//                                     />
//                                     <label htmlFor="floatingInput">T.A.</label>
//                                 </div>
//                             </div>
//                             <div className="col-lg-4 mt-3">
//                                 <div className="form-floating mb-3 w-100">
//                                     <input 
//                                         type="text" 
//                                         name="ptax" 
//                                         className="form-control" 
//                                         id="floatingInput" 
//                                         value={ptax} 
//                                         onChange={this.handleInputChange}
//                                     />
//                                     <label htmlFor="floatingInput">P. Tax</label>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>         
//             </div>               
//         );
//     }
// }

// export default PerForm;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface PercentageComponent {
  name: string;
  percentage: number;
}

interface FixedComponent {
  name: string;
  amount: number;
}

interface ApiResponse {
  msg?: string;
  data?: PercentageComponent[] | FixedComponent[];
}

interface FormState {
  da: number;
  hra: number;
  pf: number;
  ta: number;
  ptax: number;
}

const PercentageForm = () => {
  const [formData, setFormData] = useState<FormState>({
    da: 0,
    hra: 0,
    pf: 0,
    ta: 0,
    ptax: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await fetchAllFixedComponents();
      await fetchAllPercentage();
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.log(err);
    }
    setLoading(false);
  };

  const fetchAllPercentage = async () => {
    const { data } = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_APP_BASE_URL}/fetchAllPercenatge`,
      {
        headers: { Authorization: localStorage.getItem('token') }
      }
    );

    if (data.data) {
        console.log(data.data);
      const percentageData = data.data as PercentageComponent[];
      const newFormData = { ...formData };
      console.log(percentageData)

      
      percentageData.forEach(element => {
        console.log(element.name);
        if (element.name === 'DA') newFormData.da = element.percentage;
        else if (element.name === 'HRA') newFormData.hra = element.percentage;
        else newFormData.pf = element.percentage;
      });
      
      await setFormData(newFormData);
      console.log(newFormData);
    }
  };

  const fetchAllFixedComponents = async () => {
    const { data } = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_APP_BASE_URL}/frtchAllFixedComponents`,
      {
        headers: { Authorization: localStorage.getItem('token') }
      }
    );

    if (data.data) {
      const fixedData = data.data as FixedComponent[];
      const newFormData = { ...formData };
      
      fixedData.forEach(element => {
        if (element.name === 'TA') newFormData.ta = element.amount;
        else newFormData.ptax = element.amount;
      });
      
      setFormData(newFormData);
      console.log(newFormData);
    }
  };

  const handleInputChange = (name: keyof FormState, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSavePercentage = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { data } = await axios.post<ApiResponse>(
        `${import.meta.env.VITE_APP_BASE_URL}/updatePercentage`,
        {
          da: formData.da,
          hra: formData.hra,
          pf: formData.pf
        },
        {
          headers: { Authorization: localStorage.getItem('token') }
        }
      );

      if (data.msg) {
        setSuccess(data.msg);
      }
    } catch (err) {
      setError('Failed to save percentage data. Please try again.');
    }
    
    setLoading(false);
  };

  const handleSaveFixed = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { data } = await axios.post<ApiResponse>(
        `${import.meta.env.VITE_APP_BASE_URL}/updateFixedComponents`,
        {
          ta: formData.ta,
          ptax: formData.ptax
        },
        {
          headers: { Authorization: localStorage.getItem('token') }
        }
      );

      if (data.msg) {
        setSuccess(data.msg);
      }
    } catch (err) {
      setError('Failed to save fixed components. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Percentage Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="da">Dearness Allowance (DA)</Label>
              <Input
                id="da"
                type="number"
                value={formData.da}
                onChange={(e) => handleInputChange('da', e.target.value)}
                placeholder="Enter DA percentage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hra">House Rent Allowance (HRA)</Label>
              <Input
                id="hra"
                type="number"
                value={formData.hra}
                onChange={(e) => handleInputChange('hra', e.target.value)}
                placeholder="Enter HRA percentage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf">Provident Fund (PF)</Label>
              <Input
                id="pf"
                type="number"
                value={formData.pf}
                onChange={(e) => handleInputChange('pf', e.target.value)}
                placeholder="Enter PF percentage"
              />
            </div>
          </div>
          <Button 
            className="mt-6"
            variant={"myBtn"}
            onClick={handleSavePercentage}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Percentage Components
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fixed Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ta">Travel Allowance (TA)</Label>
              <Input
                id="ta"
                type="number"
                value={formData.ta}
                onChange={(e) => handleInputChange('ta', e.target.value)}
                placeholder="Enter TA amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ptax">Professional Tax</Label>
              <Input
                id="ptax"
                type="number"
                value={formData.ptax}
                onChange={(e) => handleInputChange('ptax', e.target.value)}
                placeholder="Enter Professional Tax amount"
              />
            </div>
          </div>
          <Button 
            className="mt-6"
            variant={"myBtn"}

            onClick={handleSaveFixed}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Fixed Components
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PercentageForm;