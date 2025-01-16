import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
// import axios from "axios";
import Navbar from "./Navbar";
import CollectFee from "../collect_fee/CollectFee";
import Receipt from "../receipt/Receipt";
import Report from "../reports/Report";
import AddFeeHeadForm from "../master/AddFeeHeadForm";
import MapFeeHeadsForm from "../master/MapFeeHeads";
import ReceiptPrint from "../receipt/Account-Print/ReceiptPrint";
import BankStatement from "../addOns/BankStatements";
import StatementPrint from "../addOns/StatementPrint";
import BankStatementPrint from "../addOns/StatementTanle/BankStatementPrint";
import MultipleInstallment from "../collect_fee/MultipleInstallment";
import ScholershipFee from "../collect_fee/ScholershipFee";
import Dashboard from "../dashboard/Dashboard";
import Login from "../login/login";
import SalaryForm from "../salaryForm/SalaryForm";
import PerForm from "../salaryForm/salaryComponents/PercetageForm";
import SalarySlip from "../salaryForm/salaryComponents/SalarySlip";
import GenerateSalarySlip from "../salaryForm/salaryComponents/GenerateSalarySlip";
// import ScholershipForm from "../collect_fee/ReceivedScholership";
import ReceivedScholership from "../collect_fee/ReceivedScholership";
// import ReceivedScholership from "../collect_fee/ReceivedScholership";
import BalReport from "../reports/BalReports";
import StudentsReports from "../reports/StudentsReports";

interface State {
  user: string, 
  attendance: string,
  absent: String,
}

class Base extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      user: "",
      attendance: "",
      absent: "",
    };
  }

  render() {
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();

    return (
      <div>
        <Navbar></Navbar>
        <div className="box-c">
        <Routes>
            <Route  path="/CollectFee" element={<CollectFee />} />
            <Route  path="/receipts" element={<Receipt />} />
            <Route  path="/report" element={<Report />} />
            <Route  path="/BalReport" element={<BalReport />} />
            <Route  path="/StudentsWiseReport" element={<StudentsReports />} />
            <Route  path="/addfeehead" element={<AddFeeHeadForm />} />
            <Route  path="/mapfeeheads" element={<MapFeeHeadsForm />} />
            <Route path="/receipt-print" element={<ReceiptPrint />} />
            <Route  path="/BankStatement" element={<BankStatement/>}/>
            <Route  path="/StatementPrint" element={<StatementPrint/>}/>
            <Route  path="/printStatement" element={<BankStatementPrint/>}/>
            <Route  path="/multipleInstallment" element={<MultipleInstallment/>}/>
            <Route  path="/allowScholership" element={<ScholershipFee/>}/>
            <Route  path="/" element={<Dashboard/>}/>
            <Route  path="/dashboard" element={<Dashboard/>}/>
            <Route  path="/SalaryForm" element={<SalaryForm/>}/>
            <Route  path="/salaryPercetageComponets" element={<PerForm/>}/>
            <Route  path="/SalarySlip" element={<SalarySlip/>}/>
            <Route  path="/SalarySlipMenu" element={<GenerateSalarySlip/>}/>
            <Route  path="/ReceivedScholership" element={<ReceivedScholership/>}/>
            <Route path="/*"
            element={
                <h5 className="container text-center mt-4">
                404! Page Not Found. Please Check That You have Proper
                authority To visit the page
                </h5>
            }
            />
        </Routes>
        </div>
      </div>
    );
  }
}

export default Base;
