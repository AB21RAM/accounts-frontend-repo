// import axios from 'axios';
// import React, { Component } from 'react';
// // import StatementTable from './StatementTanle/StatementTable';
// import StatementTable from './StatementTanle/StatementTable';

// // interface DDData {
// //     dd_id: string;
// //     bank_name: string;
// //     bank_branch: string;
// //     dd_number: string;
// //     dd_date: string;
// //     micr: string;
// //     dd_code: string;
// //     amount: number;
// //     receipt_id: string;
// // }

// interface DDData {
//     dd_id: number;
//     bank_name: string;
//     bank_branch: string;
//     dd_number: string;
//     dd_date: string;
//     micr: string;
//     dd_code: string;
//     amount: number;
//     receipt_id: string;
// }

// interface BankStatementState {
//     ddData: DDData[];
//     selectedDD: string[];
// }

// interface ApiResponse {
//     ddData?: DDData[];
//     msg?: string;
// }

// class BankStatement extends Component<{}, BankStatementState> {
//     constructor(props: {}) {
//         super(props);
//         this.state = {
//             ddData: [],
//             selectedDD: [],
//         };
//     }

//     componentDidMount = async (): Promise<void> => {
//         await this.fetchDDData();
//     };

//     fetchDDData = async (): Promise<void> => {
//         try {
//             const response = await axios.get<ApiResponse>(
//                 `${import.meta.env.VITE_APP_BASE_URL}/fetchDDData`,
//                 {
//                     headers: { Authorization: localStorage.getItem('token') }
//                 }
//             );
            
//             if (response.data.ddData) {
//                 this.setState({ ddData: response.data.ddData });
//             } else {
//                 console.log('no data');
//             }
//         } catch (error) {
//             alert('Something Went Wrong!');
//         }
//     };

//     handleDDCheck = async (e: string): Promise<void> => {
//         if (this.state.selectedDD.includes(e)) {
//             const newArray = this.state.selectedDD.filter(item => item !== e);
//             this.setState({ selectedDD: newArray });
//         } else {
//             this.setState((prevState) => ({
//                 selectedDD: [...prevState.selectedDD, e]
//             }));
//         }
//     };

//     handleAddToStatement = async (): Promise<void> => {
//         try {
//             if (this.state.selectedDD.length > 0) {
//                 const response = await axios.post<ApiResponse>(
//                     `${import.meta.env.VITE_APP_BASE_URL}/AddStatement`,
//                     {
//                         ddIds: this.state.selectedDD
//                     },
//                     {
//                         headers: { Authorization: localStorage.getItem('token') }
//                     }
//                 );

//                 if (response.data.msg) {
//                     alert(response.data.msg);
//                     window.location.reload();
//                 } else {
//                     console.log('no data');
//                 }
//             } else {
//                 alert('Select DD to Generate Bank Statement!');
//             }
//         } catch (error) {
//             alert('Something Went Wrong!');
//         }
//     };

//     render(): React.ReactNode {
//         return (
//             <>
//                 <div className="container">
//                     <h3 className="mt-3 mb-3">Generate Bank Statement</h3>
//                     <StatementTable
//                         data={this.state.ddData}
//                         handleDDCheck={(e) => this.handleDDCheck(e)}
//                         handleAddToStatement={() => this.handleAddToStatement()}
//                     />
//                 </div>
//             </>
//         );
//     }
// }

// export default BankStatement;



import axios from 'axios';
import React, { Component } from 'react';
// import StatementTable from '@/components/ui/StatementTable';
import StatementTable from './StatementTanle/StatementTable';

interface DDData {
    dd_id: number;
    bank_name: string;
    bank_branch: string;
    dd_number: string;
    dd_date: string;
    micr: string;
    dd_code: string;
    amount: number;
    receipt_id: string;
}

interface BankStatementState {
    ddData: DDData[];
    selectedDD: string[];
}

interface ApiResponse {
    ddData?: DDData[];
    msg?: string;
}

class BankStatement extends Component<{}, BankStatementState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            ddData: [],
            selectedDD: [],
        };
    }

    componentDidMount = async (): Promise<void> => {
        await this.fetchDDData();
    };

    fetchDDData = async (): Promise<void> => {
        try {
            const response = await axios.get<ApiResponse>(
                `${import.meta.env.VITE_APP_BASE_URL}/fetchDDData`,
                {
                    headers: { Authorization: localStorage.getItem('token') || '' }
                }
            );

            if (response.data.ddData) {
                this.setState({ ddData: response.data.ddData });
            } else {
                console.log('No data received.');
            }
        } catch (error) {
            alert('Something went wrong while fetching DD data.');
        }
    };

    handleDDCheck = async (ddId: string): Promise<void> => {
        this.setState((prevState) => {
            const selectedDD = prevState.selectedDD.includes(ddId)
                ? prevState.selectedDD.filter((item) => item !== ddId)
                : [...prevState.selectedDD, ddId];

            return { selectedDD };
        });
    };

    handleAddToStatement = async (): Promise<void> => {
        try {
            if (this.state.selectedDD.length > 0) {
                const response = await axios.post<ApiResponse>(
                    `${import.meta.env.VITE_APP_BASE_URL}/AddStatement`,
                    {
                        ddIds: this.state.selectedDD
                    },
                    {
                        headers: { Authorization: localStorage.getItem('token') || '' }
                    }
                );

                if (response.data.msg) {
                    alert(response.data.msg);
                    window.location.reload();
                } else {
                    console.log('No response message received.');
                }
            } else {
                alert('Please select at least one DD to generate the bank statement.');
            }
        } catch (error) {
            alert('Something went wrong while adding to the statement.');
        }
    };

    render(): React.ReactNode {
        return (
            <div className="container mx-auto p-4">
                <h3 className="text-lg font-semibold mb-4">Generate Bank Statement</h3>
                <StatementTable
                    data={this.state.ddData}
                    handleDDCheck={this.handleDDCheck}
                    handleAddToStatement={this.handleAddToStatement}
                />
            </div>
        );
    }
}

export default BankStatement;
