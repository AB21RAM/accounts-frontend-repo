import React, { Component } from 'react';
import BasicDetails from './collectComponents/basicDetails';
import StudentDetails from './collectComponents/studentDetails';
import ScholershipForm from './collectComponents/ScholershipForm';
import axios from 'axios';

interface studentDetails {
    name: string;
    branch: string;
    program: string;
    category: string;
    total_fee: number;
    scholership: number;
    amt_afterscholership: number;
    total_paid: number;
    payable: number;
  };

interface BankDetails {
    mop: string;
    bankName: string;
    bankBranch: string;
    checkDate: string;
    micr: string;
    code: string;
    utr: string;
    receiptDate: string;
}

interface State {
    ay: string;
    amount: string;
    studClgId: string;
    fetchedData: string;
    feeStructure: string;
    studentDetails: studentDetails;
    bankDetails: BankDetails;
    bankDetailsArray: any[]; // Adjust the type if needed
}

class ScholershipFee extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            ay: '',
            amount: '',
            studClgId: '',
            fetchedData: '',
            feeStructure: '',
            studentDetails: {
                name: '', // Fetch the actual name from your data source
                branch: '', // Fetch the actual branch from your data source
                program: '', // Fetch the actual program from your data source
                category: '', // Fetch the actual category from your data source
                total_fee: 0, // Fetch the actual category from your data source
                scholership: 0, // Fetch the actual category from your data source
                payable: 0, // Fetch the actual category from your data source
                amt_afterscholership: 0,
                total_paid: 0,
            },
            bankDetails: {
                mop: '',
                bankName: '',
                bankBranch: '',
                checkDate: '',
                micr: '',
                code: '',
                utr: '',
                receiptDate: '',
            },
            bankDetailsArray: [],
        };
    }

    handleFetchClick = () => {
        axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/getFeeStructure`,
            {
                clgId: this.state.studClgId,
                ay: this.state.ay,
            },
            {
                headers: { Authorization: localStorage.getItem('token') },
            }
        )
        .then((res) => {
            this.setState({ studentDetails: res.data.details });
        })
        .catch((e) => {
            alert(e.response.data.msg);
        });
    };

    handleStudClgIdChange = (studClgId: string) => {
        this.setState({ studClgId });
    };

    handleAllowClick = () => {
        axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/allowScholership`,
            {
                stud_clg_id: this.state.studClgId,
                ay: this.state.ay,
                amount: this.state.amount,
            },
            {
                headers: { Authorization: localStorage.getItem('token') },
            }
        )
        .then((res) => {
            alert(res.data.msg);
        })
        .catch((e) => {
            alert(e.response.data.msg);
        });
    };

    handleSelectAy = (e: string) => {
        this.setState({ ay: e });
    };

    handleAmountChange = (e: string) => {
        this.setState({ amount: e });
    };

    render() {
        const { studentDetails } = this.state;
        return (
            <>
                <div className="container">
                    <div className="row justify-content-between">
                        <BasicDetails
                            handleSelectAy={this.handleSelectAy}
                            onFetchClick={this.handleFetchClick}
                            onStudClgIdChange={this.handleStudClgIdChange}
                        />
                        <StudentDetails studentDetails={studentDetails} />
                        <ScholershipForm
                            onAmountChange={this.handleAmountChange}
                            handleAllowClick={this.handleAllowClick}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default ScholershipFee;
