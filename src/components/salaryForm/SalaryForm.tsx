// // import axios from "axios";
// // import React, { Component } from "react";

// // class SalaryForm extends Component{
// //     constructor(props){
// //         super(props)
// //         this.state={
// //             facultyList:'',
// //             salaryComponents:{},
// //             da:0,
// //             hra:0,
// //             ta:0,
// //             pf:0,
// //             ptax:0,
// //             others_deductions : [],
// //             title:'',
// //             amout:0,
// //             faculty_id:'',
// //         }
// //     }

// //     componentDidMount=async()=>{
// //         this.fetchALLFaculty();
// //     }

// //     fetchALLFaculty=async()=>{
// //         const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFaculty`,{
// //             headers: { Authorization: localStorage.getItem('token')}
// //         });
// //         if (data.msg) console.log(data.msg);
// //         else {
// //             this.setState({facultyList:data.facultyList});
// //         }
     
// //     }

// //     handleFacultySelect=async(e)=>{
// //         this.setState({salaryComponents:{}});

// //         this.setState({faculty_id:e.target.value});

// //         const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/getSalaryData`,{
// //             faculty_id:e.target.value
// //         },{
// //             headers: { Authorization: localStorage.getItem('token')}
// //         });
// //         if (data.msg) console.log(data.msg);
// //         else {
// //             console.log(data)
// //             this.handleGetDeductions();
// //             this.setState({salaryComponents:data.data[0]});
// //             this.setState({pf:(Number(data.data[0].basic_earn)*Number(data.data[0].pf))/100});
// //             this.setState({ta:data.data[0].ta});
// //             this.setState({ptax:data.data[0].ptax});
// //             this.setState({da: (Number(data.data[0].basic_earn)*Number(data.data[0].da))/100})
// //             this.setState({hra: (Number(data.data[0].basic_earn)*Number(data.data[0].hra))/100})
// //         }
// //     }

// //     handleInputChange = async(e) => {

// //         const { name, value } = e.target;
    
// //         await this.setState((prevState) => ({
// //             salaryComponents: {
// //             ...prevState.salaryComponents,
// //             [name]: value,
// //           },
// //         }));

// //         const {salaryComponents} = this.state;

// //         if(name=='basic_earn'){
// //             this.setState({pf:(Number(salaryComponents.basic_earn)*Number(salaryComponents.pf))/100});
// //             this.setState({ta:salaryComponents.ta});
// //             this.setState({ptax:salaryComponents.ptax});
// //             this.setState({da: (Number(salaryComponents.basic_earn)*Number(salaryComponents.da))/100})
// //             this.setState({hra: (Number(salaryComponents.basic_earn)*Number(salaryComponents.hra))/100})
// //         }
// //       };

// //     handleSaveInformationCllick = async() =>{
// //         const {data} = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/salaryFormData`,{
// //             ...this.state.salaryComponents,
// //             da:this.state.da,
// //             hra:this.state.hra
// //         },{
// //             headers: { Authorization: localStorage.getItem('token')}
// //         });

// //         if(data.msg){
// //             alert(data.msg)
// //         }
// //     }

// //     handleAddMoreBtn = async() =>{
// //         const {title, amout,faculty_id} = this.state;

// //         if(title.trim()=='' || amout==0 || faculty_id===''){
// //             alert('Please Enter Title and amount or you have not selected faculty');
// //         }
// //         else{
// //             await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/addOtherDeductions`,{
// //                 title:title,
// //                 amout:amout,
// //                 id:faculty_id
// //             },{
// //                 headers: { Authorization: localStorage.getItem('token')}
// //             }).then(
// //                 response=>{
// //                     this.setState({title:'',amout:0})
// //                     this.handleGetDeductions();
// //                 }
// //             ).catch(
// //                 (e)=>{
// //                     alert('Something Went Wrong!')
// //                 }
// //             )
// //         }

// //     }
    
// //     handleGetDeductions = async() =>{
// //         await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/getOtherDeductions`,{
// //             id:this.state.faculty_id
// //         },{
// //             headers: { Authorization: localStorage.getItem('token')}
// //         }).then(
// //             response=>{
// //                 console.log(response.data)
// //                 this.setState({others_deductions:response.data.data})
// //             }
// //         ).catch(
// //             (e)=>{
// //                 console.log(e)
// //                 alert('Something Went Wrong!')
// //             }
// //         )
// //     }

// //     handleDeleteClick = async(e) =>{
// //         await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/deleteOtherDeductions`,{
// //             id:e
// //         },{
// //             headers: { Authorization: localStorage.getItem('token')}
// //         }).then(
// //             response=>{
// //                 alert(
// //                     'Deleted!'
// //                 );
// //                 this.handleGetDeductions()
// //             }
// //         ).catch(
// //             (e)=>{
// //                 console.log(e)
// //                 alert('Something Went Wrong!')
// //             }
// //         )
// //     }

// //     render(){
// //       const {facultyList,salaryComponents,da,hra,pf,ta,ptax,others_deductions} = this.state;

// //         return(
// //             <div className="container mt-3">
// //                 <div class="card">
// //                     <div class="card-body">
// //                         <h5 class="card-title mb-3">Salary Form</h5>
// //                         <hr />

// //                         <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=>this.handleFacultySelect(e)}>
// //                             <option selected>Select Faculty</option>
// //                             {facultyList.length > 0 &&
// //                                 facultyList.map((fee) => {
// //                                     return (
// //                                         <option key={fee.faculty_id} value={fee.faculty_id}>
// //                                             {fee.name}
// //                                         </option>
// //                                     );
// //                             })}
// //                         </select>

// //                         <button className="btn btn-primary mt-3" onClick={(e)=>{this.handleSaveInformationCllick()}}>
// //                             Save Informations
// //                         </button>

// //                         <div className="row mt-3">
// //                             <hr />
// //                             <h5 className="">EMP Details</h5>
// //                             <hr />
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="grade" value={salaryComponents.grade} class="form-control" id="floatingInput" onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">Grade</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="depatment" class="form-control" id="floatingInput" value={salaryComponents.department} readOnly/>
// //                                     <label for="floatingInput">Depatment</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="pfno" class="form-control" id="floatingInput" value={salaryComponents.pfno} onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">PF No.</label>
// //                                 </div>
// //                             </div>

// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="division" class="form-control" id="floatingInput" value={salaryComponents.division} readOnly/>
// //                                     <label for="floatingInput">Devisoion</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="panno" value={salaryComponents.panno} class="form-control" id="floatingInput" onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">PAN No.</label>
// //                                 </div>
// //                             </div>

// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="bank_account_no" value={salaryComponents.bank_account_no} class="form-control" id="floatingInput" onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">Bank Account No</label>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div className="row mt-3">
// //                             <hr />
// //                             <h5 className="">Earnings</h5>
// //                             <hr />
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="basic_earn" value={salaryComponents.basic_earn} class="form-control" id="floatingInput" onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">Earned Basic</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="da" class="form-control" id="floatingInput" value={da} readOnly/>
// //                                     <label for="floatingInput">D.A.</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="hra" class="form-control" id="floatingInput" value={hra} readOnly/>
// //                                     <label for="floatingInput">H.R.A.</label>
// //                                 </div>
// //                             </div>

// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="ta" class="form-control" id="floatingInput" value={ta} readOnly/>
// //                                     <label for="floatingInput">TA</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="agp" value={salaryComponents.agp} class="form-control" id="floatingInput" onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">AGP</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="spl_allow" value={salaryComponents.spl_allow} class="form-control" id="floatingInput" onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">Spl_Pay Allow</label>
// //                                 </div>
// //                             </div>

// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="other_allow" value={salaryComponents.other_allow} class="form-control" id="floatingInput" onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">Other Allow</label>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div className="row mt-3">
// //                             <hr />
// //                             <h5 className="">Deductions</h5>
// //                             <hr />
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="pf" class="form-control" id="floatingInput" value={pf} readOnly/>
// //                                     <label for="floatingInput">Prov. Fund</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="ptax" class="form-control" id="floatingInput" value={ptax} readOnly/>
// //                                     <label for="floatingInput">P. Tax</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="income_tax" class="form-control" id="floatingInput" value={salaryComponents.income_tax} onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">Income Tax</label>
// //                                 </div>
// //                             </div>

// //                             <div className="col-lg-4 mt-3">
// //                                 <div class="form-floating mb-3 w-100">
// //                                     <input type="text" name="loan_installment" class="form-control" id="floatingInput" value={salaryComponents.loan_installment} onChange={(e)=>this.handleInputChange(e)}/>
// //                                     <label for="floatingInput">Loan Installments</label>
// //                                 </div>
// //                             </div>
                            

// //                             <div className="col-lg-4 mt-3">
// //                                 <div className="form-floating mb-3 w-100">
// //                                     <input type="text" name="title" className="form-control" id="floatingInput" value={this.state.title} onChange={(e)=>{this.setState({title:e.target.value})}} />
// //                                     <label htmlFor="floatingInput">Title</label>
// //                                 </div>
// //                             </div>
// //                             <div className="col-lg-4 mt-3">
// //                                 <div className="form-floating mb-3 w-100">
// //                                     <input type="text" name="other_deduction" className="form-control" id="floatingInput" value={this.state.amout} onChange={(e)=>{this.setState({amout:e.target.value})}}/>
// //                                     <label htmlFor="floatingInput">Amount</label>
// //                                 </div>
// //                             </div>

// //                             <div className="col-lg-4 mt-3">
// //                                 <div className="form-floating mb-3 w-100">
// //                                     <button className="btn btn-primary" onClick={()=>{this.handleAddMoreBtn()}}>Add more</button>
// //                             </div>
// //                             </div>

// //                             {others_deductions.length > 0 ?
// //                                 <table  class="table">
// //                                     <thead>
// //                                         <tr>
// //                                             <th>Title</th>
// //                                             <th>Amount</th>
// //                                             <th>Delete</th>
// //                                             {/* Add more column headers as needed */}
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {others_deductions.map((e, index) => (
// //                                             <tr key={index}>
// //                                                 <td>{e.title}</td>
// //                                                 <td>{e.amount}</td>
// //                                                 <td><button className="btn btn-danger" onClick={()=>this.handleDeleteClick(e.od_id)}>Delete</button></td>
// //                                                 {/* Add more columns with respective content */}
// //                                             </tr>
// //                                         ))}
// //                                     </tbody>
// //                                 </table>
// //                                     :
// //                                     <></>
// //                                 }


// //                         </div>

// //                     </div>
// //                 </div>           
// //             </div>               
// //         )
// //     }
// // }

// // export default SalaryForm;


// import axios from "axios";
// import React, { Component } from "react";

// interface Faculty {
//     faculty_id: string;
//     name: string;
// }

// interface SalaryComponent {
//     grade?: string;
//     department?: string;
//     pfno?: string;
//     division?: string;
//     panno?: string;
//     bank_account_no?: string;
//     basic_earn?: string;
//     agp?: string;
//     spl_allow?: string;
//     other_allow?: string;
//     income_tax?: string;
//     loan_installment?: string;
//     pf?: number;
//     ta?: number;
//     ptax?: number;
//     da?: number;
//     hra?: number;
// }

// interface OtherDeduction {
//     od_id: string;
//     title: string;
//     amount: string;
// }

// interface SalaryFormState {
//     facultyList: Faculty[];
//     salaryComponents: SalaryComponent;
//     da: number;
//     hra: number;
//     ta: number;
//     pf: number;
//     ptax: number;
//     others_deductions: OtherDeduction[];
//     title: string;
//     amout: number;
//     faculty_id: string;
// }

// class SalaryForm extends Component<{}, SalaryFormState> {
//     constructor(props: {}) {
//         super(props);
//         this.state = {
//             facultyList: [],
//             salaryComponents: {},
//             da: 0,
//             hra: 0,
//             ta: 0,
//             pf: 0,
//             ptax: 0,
//             others_deductions: [],
//             title: '',
//             amout: 0,
//             faculty_id: '',
//         };
//     }

//     componentDidMount = async (): Promise<void> => {
//         await this.fetchALLFaculty();
//     };

//     fetchALLFaculty = async (): Promise<void> => {
//         const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFaculty`, {
//             headers: { Authorization: localStorage.getItem('token') }
//         });
//         if (data.msg) console.log(data.msg);
//         else {
//             this.setState({ facultyList: data.facultyList });
//         }
//     };

//     handleFacultySelect = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
//         this.setState({ salaryComponents: {} });
//         this.setState({ faculty_id: e.target.value });

//         const { data } = await axios.post(
//             `${import.meta.env.VITE_APP_BASE_URL}/getSalaryData`,
//             {
//                 faculty_id: e.target.value
//             },
//             {
//                 headers: { Authorization: localStorage.getItem('token') }
//             }
//         );
        
//         if (data.msg) console.log(data.msg);
//         else {
//             console.log(data);
//             await this.handleGetDeductions();
//             this.setState({ salaryComponents: data.data[0] });
//             this.setState({
//                 pf: (Number(data.data[0].basic_earn) * Number(data.data[0].pf)) / 100,
//                 ta: data.data[0].ta,
//                 ptax: data.data[0].ptax,
//                 da: (Number(data.data[0].basic_earn) * Number(data.data[0].da)) / 100,
//                 hra: (Number(data.data[0].basic_earn) * Number(data.data[0].hra)) / 100
//             });
//         }
//     };

//     handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
//         const { name, value } = e.target;

//         await this.setState((prevState) => ({
//             salaryComponents: {
//                 ...prevState.salaryComponents,
//                 [name]: value,
//             },
//         }));

//         const { salaryComponents } = this.state;

//         if (name === 'basic_earn') {
//             this.setState({
//                 pf: (Number(salaryComponents.basic_earn) * Number(salaryComponents.pf)) / 100,
//                 ta: salaryComponents.ta!,
//                 ptax: salaryComponents.ptax!,
//                 da: (Number(salaryComponents.basic_earn) * Number(salaryComponents.da)) / 100,
//                 hra: (Number(salaryComponents.basic_earn) * Number(salaryComponents.hra)) / 100
//             });
//         }
//     };

//     handleSaveInformationCllick = async (): Promise<void> => {
//         const { data } = await axios.post(
//             `${import.meta.env.VITE_APP_BASE_URL}/salaryFormData`,
//             {
//                 ...this.state.salaryComponents,
//                 da: this.state.da,
//                 hra: this.state.hra
//             },
//             {
//                 headers: { Authorization: localStorage.getItem('token') }
//             }
//         );

//         if (data.msg) {
//             alert(data.msg);
//         }
//     };

//     handleAddMoreBtn = async (): Promise<void> => {
//         const { title, amout, faculty_id } = this.state;

//         if (title.trim() === '' || amout === 0 || faculty_id === '') {
//             alert('Please Enter Title and amount or you have not selected faculty');
//         } else {
//             try {
//                 await axios.post(
//                     `${import.meta.env.VITE_APP_BASE_URL}/addOtherDeductions`,
//                     {
//                         title: title,
//                         amout: amout,
//                         id: faculty_id
//                     },
//                     {
//                         headers: { Authorization: localStorage.getItem('token') }
//                     }
//                 );
//                 this.setState({ title: '', amout: 0 });
//                 await this.handleGetDeductions();
//             } catch (e) {
//                 alert('Something Went Wrong!');
//             }
//         }
//     };

//     handleGetDeductions = async (): Promise<void> => {
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_APP_BASE_URL}/getOtherDeductions`,
//                 {
//                     id: this.state.faculty_id
//                 },
//                 {
//                     headers: { Authorization: localStorage.getItem('token') }
//                 }
//             );
//             console.log(response.data);
//             this.setState({ others_deductions: response.data.data });
//         } catch (e) {
//             console.log(e);
//             alert('Something Went Wrong!');
//         }
//     };

//     handleDeleteClick = async (id: string): Promise<void> => {
//         try {
//             await axios.post(
//                 `${import.meta.env.VITE_APP_BASE_URL}/deleteOtherDeductions`,
//                 {
//                     id: id
//                 },
//                 {
//                     headers: { Authorization: localStorage.getItem('token') }
//                 }
//             );
//             alert('Deleted!');
//             await this.handleGetDeductions();
//         } catch (e) {
//             console.log(e);
//             alert('Something Went Wrong!');
//         }
//     };

//     render() {
//         const {
//             facultyList,
//             salaryComponents,
//             da,
//             hra,
//             pf,
//             ta,
//             ptax,
//             others_deductions
//         } = this.state;

//         return (
//             <div className="container mt-3">
//                 <div className="card">
//                     <div className="card-body">
//                         <h5 className="card-title mb-3">Salary Form</h5>
//                         <hr />

//                         <select 
//                             className="form-select" 
//                             id="floatingSelect" 
//                             aria-label="Floating label select example" 
//                             onChange={this.handleFacultySelect}
//                         >
//                             <option selected>Select Faculty</option>
//                             {facultyList.length > 0 &&
//                                 facultyList.map((fee) => (
//                                     <option key={fee.faculty_id} value={fee.faculty_id}>
//                                         {fee.name}
//                                     </option>
//                                 ))}
//                         </select>

//                         <button 
//                             className="btn btn-primary mt-3" 
//                             onClick={this.handleSaveInformationCllick}
//                         >
//                             Save Informations
//                         </button>

//                         <div className="row mt-3">
//                             <hr />
//                             <h5 className="">EMP Details</h5>
//                             <hr />
//                             <div className="col-lg-4 mt-3">
//                                 <div className="form-floating mb-3 w-100">
//                                     <input
//                                         type="text"
//                                         name="grade"
//                                         value={salaryComponents.grade || ''}
//                                         className="form-control"
//                                         id="floatingInput"
//                                         onChange={this.handleInputChange}
//                                     />
//                                     <label htmlFor="floatingInput">Grade</label>
//                                 </div>
//                             </div>
//                             {/* Rest of the form inputs follow the same pattern... */}
                            
//                             {others_deductions.length > 0 && (
//                                 <table className="table">
//                                     <thead>
//                                         <tr>
//                                             <th>Title</th>
//                                             <th>Amount</th>
//                                             <th>Delete</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {others_deductions.map((e, index) => (
//                                             <tr key={index}>
//                                                 <td>{e.title}</td>
//                                                 <td>{e.amount}</td>
//                                                 <td>
//                                                     <button 
//                                                         className="btn btn-danger" 
//                                                         onClick={() => this.handleDeleteClick(e.od_id)}
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default SalaryForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Spline, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

interface Faculty {
  faculty_id: string;
  name: string;
}

interface SalaryComponent {
  grade: string;
  department: string;
  pfno: string;
  division: string;
  panno: string;
  bank_account_no: string;
  basic_earn: number;
  agp: number;
  spl_allow: number;
  other_allow: number;
  income_tax: number;
  loan_installment: number;
  ta: number;
  ptax: number;
  pf: number;
  da: number;
  hra: number;
}

interface OtherDeduction {
  od_id: string;
  title: string;
  amount: string;
}

const SalaryForm: React.FC = () => {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('');
  const [salaryComponents, setSalaryComponents] = useState<Partial<SalaryComponent>>({});
  const [calculations, setCalculations] = useState({
    da: 0,
    hra: 0,
    ta: 0,
    prov_fund: 0,
    ptax: 0,
    // agp: 0,
    // spl_allow: 0, 
    // other_allow: 0,
  });

  const [newDeduction, setNewDeduction] = useState({
    title: '',
    amount: '',
  });

  const [otherDeductions, setOtherDeductions] = useState<OtherDeduction[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchAllFaculty();
  }, []);

  const fetchAllFaculty = async () => {
    try {

        console.log(localStorage.getItem('token'));
        // console.log(import.meta.VITE_APP_BASE_URL);
      const {data} = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFaculty`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
      });

    //   console.log(res.status);
    //   console.log(res.data);

      console.log(data);
      console.log(data.facultyList);

      if (data.facultyList) {
        setFacultyList(data.facultyList);
      }
    } catch (err) {
      setError('Failed to fetch faculty list');
      console.log(err);
    }
  };

  const handleFacultySelect = async (value: string) => {
    setSelectedFacultyId(value);
    setSalaryComponents({});

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/getSalaryData`,
        { faculty_id: value },
        { headers: { Authorization: localStorage.getItem('token') }}
      );

      if (data.data?.[0]) {
        const salaryData = data.data[0];
        setSalaryComponents(salaryData);
        updateCalculations(salaryData);
        fetchOtherDeductions(value);
      }
      console.log(data.data);
    } catch (err) {
      setError('Failed to fetch salary data');
      console.log(err);

    }
  };

  const updateCalculations = (data: SalaryComponent) => {
    const basicEarn = Number(data.basic_earn);
    // const agp = Number(data.agp);
    setCalculations({
        prov_fund: (basicEarn * Number(data.pf)) / 100,
        ta: Number(data.ta),
        ptax: Number(data.ptax),
        da: (basicEarn * Number(data.da)) / 100,
        hra: (basicEarn * Number(data.hra)) / 100,
        // agp: Number(data.agp),
        // spl_allow: Number(data.spl_allow),
        // other_allow: Number(data.other_allow),
    });
  };

  const handleInputChange = (name: string, value: string) => {
    const updatedComponents = { ...salaryComponents, [name]: value };
    setSalaryComponents(updatedComponents);

    if (name === 'basic_earn') {
      updateCalculations(updatedComponents as SalaryComponent);
    }
  };

  const handleSaveInformation = async () => {
    console.log({
        ...salaryComponents,
        da: calculations.da,
        hra: calculations.hra,
        ta: calculations.ta,
        prov_fund: calculations.prov_fund,
      //   ptax: calculations.ptax,
        // agp: calculations.agp,
        // spl_allow: calculations.spl_allow,    
        // other_allow: calculations.other_allow,
    })
    // try {
    //   const { data } = await axios.post(
    //     `${import.meta.env.VITE_APP_BASE_URL}/salaryFormData`,
    //     {
    //       ...salaryComponents,
    //       da: calculations.da,
    //       hra: calculations.hra,
    //       ta: calculations.ta,
    //     //   pf: calculations.pf,
    //     //   ptax: calculations.ptax,
    //       agp: calculations.agp,
    //       spl_allow: calculations.spl_allow,    
    //       other_allow: calculations.other_allow,
    //     },
    //     { headers: { Authorization: localStorage.getItem('token') }}
    //   );

    //   if (data.msg) {
    //     setError(data.msg);
    //   }
    // } catch (err) {
    //   setError('Failed to save salary information');
    //   console.log(err);

    // }
  };

  const fetchOtherDeductions = async (facultyId: string) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/getOtherDeductions`,
        { id: facultyId },
        { headers: { Authorization: localStorage.getItem('token') }}
      );
      setOtherDeductions(data.data || []);
    } catch (err) {
      setError('Failed to fetch deductions');
      console.log(err);

    }
  };

  const handleAddDeduction = async () => {
    if (!newDeduction.title.trim() || !newDeduction.amount || !selectedFacultyId) {
      setError('Please enter title and amount');
      return;
    }

    try {
        // console.log(first)
    //   await axios.post(
    //     `${import.meta.env.VITE_APP_BASE_URL}/addOtherDeductions`,
    //     {
    //       title: newDeduction.title,
    //       amout: newDeduction.amount,
    //       id: selectedFacultyId,
    //     },
    //     { headers: { Authorization: localStorage.getItem('token') }}
    //   );

      setNewDeduction({ title: '', amount: '' });
      console.log(newDeduction);
    //   fetchOtherDeductions(selectedFacultyId);
    console.log()
    } catch (err) {
      setError('Failed to add deduction');
      console.log(err);

    }
  };

  const handleDeleteDeduction = async (id: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/deleteOtherDeductions`,
        { id },
        { headers: { Authorization: localStorage.getItem('token') }}
      );
      fetchOtherDeductions(selectedFacultyId);
    } catch (err) {
      setError('Failed to delete deduction');
      console.log(err);
    }
  };

  return (
    <div className=" mx-auto px-4 py-6 space-y-6">
      <Card className=''>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold'>Salary Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <Select onValueChange={handleFacultySelect} value={selectedFacultyId}>
              <SelectTrigger className='text-base'>
                <SelectValue placeholder="Select Faculty" />
              </SelectTrigger>
              <SelectContent> 
                {facultyList.map((faculty) => (
                  <SelectItem key={faculty.faculty_id} value={faculty.faculty_id}>
                    {faculty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Employee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    placeholder='Grade'
                    value={salaryComponents.grade || ''}
                    // className='bg-[#D6D6D6]'
                    // variant={'onlyRead'}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder='Department'

                    variant={'onlyRead'}
                    value={salaryComponents.department || ''}
                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pfno">PF No.</Label>
                  <Input
                    id="pfno"
                    placeholder='PF Number'
                    value={salaryComponents.pfno || ''}
                    onChange={(e) => handleInputChange('pfno', e.target.value)}
                    // readOnly
                  />
                </div>                
                <div className="space-y-1">
                  <Label htmlFor="division">Division</Label>
                  <Input
                    id="division"
                    placeholder='Division'
                    value={salaryComponents.division || ''}
                    variant={'onlyRead'}
                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="panno">PAN No.</Label>
                  <Input
                    id="panno"
                    placeholder='PAN Number'
                    value={salaryComponents.panno || ''}
                    onChange={(e) => handleInputChange('panno', e.target.value)}
                    // readOnly
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="bank_account_no">Bank Account No.</Label>
                  <Input
                    id="bank_account_no"
                    placeholder='Bank Account Number'
                    value={salaryComponents.bank_account_no || ''}
                    onChange={(e) => handleInputChange('bank_account_no', e.target.value)}
                    // readOnly
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Earnings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="basic_earn">Earned Basic</Label>
                  <Input
                    id="basic_earn"
                    placeholder='Earned Basic'
                    value={salaryComponents.basic_earn || ''}
                    onChange={(e) => handleInputChange('basic_earn', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="da">D.A.</Label>
                  <Input
                    id="da"
                    placeholder='D.A.'
                    value={calculations.da}
                    variant={'onlyRead'}

                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="hra">H.R.A</Label>
                  <Input
                    id="hra"
                    placeholder='H.R.A'
                    value={calculations.hra}
                    variant={'onlyRead'}

                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="ta">T.A</Label>
                  <Input
                    id="ta"
                    placeholder='T.A'
                    value={calculations.ta}

                    variant={'onlyRead'}

                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="agp">A.G.P</Label>
                  <Input
                    id="agp"
                    placeholder='A.G.P'
                    value={salaryComponents.agp}
                    onChange={(e) => handleInputChange('agp', e.target.value)}
                    // readOnly
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="spl_allow">SPL_Allow</Label>
                  <Input
                    id="spl_allow"
                    placeholder='SPL_Allow'
                    value={salaryComponents.spl_allow}
                    onChange={(e) => handleInputChange('spl_allow', e.target.value)}
                    // readOnly
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="other_allow">Other Allow</Label>
                  <Input
                    id="other_allow"
                    placeholder='Other Allow'
                    value={salaryComponents.other_allow}
                    onChange={(e) => handleInputChange('other_allow', e.target.value)}
                    // readOnly
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Deductions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="prov_fund">Provident Fund</Label>
                  <Input
                    id="prov_fund"
                    placeholder='Provident Fund'
                    value={calculations.prov_fund}
                    variant={'onlyRead'}

                    readOnly
                    // onChange={(e) => setNewDeduction(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="p_tax">P. Tax</Label>
                  <Input
                    id="p_tax"
                    placeholder='P. Tax'
                    value={salaryComponents.ptax}
                    variant={'onlyRead'}

                    readOnly
                    // onChange={(e) => setNewDeduction(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="income_tax">Income Tax</Label>
                  <Input
                    id="income_tax"
                    placeholder='Income Tax'
                    value={salaryComponents.income_tax}
                    // readOnly
                    onChange={(e) => handleInputChange('income_tax', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="loan_installment">Loan Installment</Label>
                  <Input
                    id="loan_installment"
                    placeholder='Loan Installment'
                    value={salaryComponents.loan_installment}
                    // readOnly
                    onChange={(e) => handleInputChange('loan_installment', e.target.value)}
                  />
                </div>
                    {/* <div className="space-y-2">
                    <Label htmlFor="new-deduction-title">Title</Label>
                    <Input
                        id="new-deduction-title"
                        value={newDeduction.title}
                        onChange={(e) => setNewDeduction(prev => ({ ...prev, title: e.target.value }))}
                    />
                </div> */}
                
                
                {/* <div className="space-y-2">
                  <Label htmlFor="new-deduction-amount">Amount</Label>
                  <Input
                    id="new-deduction-amount"
                    value={newDeduction.amount}
                    onChange={(e) => setNewDeduction(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddDeduction}>Add Deduction</Button>
                </div>
              </div> */}

              {/* {otherDeductions.length > 0 && (
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {otherDeductions.map((deduction) => (
                        <TableRow key={deduction.od_id}>
                          <TableCell>{deduction.title}</TableCell>
                          <TableCell>{deduction.amount}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteDeduction(deduction.od_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )} */}
            </div>

            <h3 className="text-base font-semibold mb-1 mt-4">Add More Deductions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <div className="space-y-2">
                  <Label htmlFor="prov_fund">Provident Fund</Label>
                  <Input
                    id="prov_fund"
                    value={calculations.prov_fund}
                    readOnly
                    // onChange={(e) => setNewDeduction(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p_tax">P. Tax</Label>
                  <Input
                    id="p_tax"
                    value={salaryComponents.ptax}
                    readOnly
                    // onChange={(e) => setNewDeduction(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income_tax">Income Tax</Label>
                  <Input
                    id="income_tax"
                    value={salaryComponents.income_tax}
                    // readOnly
                    onChange={(e) => handleInputChange('income_tax', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan_installment">Loan Installment</Label>
                  <Input
                    id="loan_installment"
                    value={salaryComponents.loan_installment}
                    // readOnly
                    onChange={(e) => handleInputChange('loan_installment', e.target.value)}
                  />
                </div> */}
                <div className="space-y-1">
                    <Label htmlFor="new-deduction-title">Title</Label>
                    <Input
                        id="new-deduction-title"
                        placeholder='Deduction Title'
                        value={newDeduction.title}
                        onChange={(e) => setNewDeduction(prev => ({ ...prev, title: e.target.value }))}
                    />
                </div>
                
                <div className="space-y-1">
                    <Label htmlFor="new-deduction-amount">Amount</Label>
                    <Input
                        id="new-deduction-amount"
                        placeholder='Deduction Amount'
                        value={newDeduction.amount}
                        onChange={(e) => setNewDeduction(prev => ({ ...prev, amount: e.target.value }))}
                    />
                </div>

                <div className="flex items-end">
                  <Button  className='bg-[#647AFF]' onClick={handleAddDeduction}>Add Deduction</Button>
                </div>
              </div>

              {otherDeductions.length > 0 && (
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {otherDeductions.map((deduction) => (
                        <TableRow key={deduction.od_id}>
                          <TableCell>{deduction.title}</TableCell>
                          <TableCell>{deduction.amount}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteDeduction(deduction.od_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

          </div>
          
          <div className='flex py-12 items-center justify-center'>
            {/* <Button size={'lg'} className='text-base' onClick={handleSaveInformation}>Save Information</Button> */}
            <AlertDialog >
                <AlertDialogTrigger className='bg-[#647AFF] rounded-md text-white px-8 py-2'>Save Information</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to save this information?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Click Continue to proceed.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSaveInformation}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>

          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryForm;