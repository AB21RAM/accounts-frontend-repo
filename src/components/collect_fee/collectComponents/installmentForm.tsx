import React, { Component } from 'react';

interface InstallmentFormProps {
    onAmountChange: (amount: string) => void;
    handleAllowClick: () => void;
}

interface InstallmentFormState {

}

class InstallmentForm extends Component<InstallmentFormProps, InstallmentFormState> {
    constructor(props: InstallmentFormProps) {
        super(props);
        this.state = {

        }
    }

    handleInputChange = (e: any) => {
        const { onAmountChange } = this.props;
        const studClgId = e.target.value;
        onAmountChange(studClgId);
    };

    render(){
        return(
            <>
                 <div className="col-lg-5 col-md-5 col-sm-12 mt-3">
                    <div className="card">
                        <h5 className="card-title p-2">Installment Details</h5>
                        <hr />
                        <div className="card-body">
                        <div className="form-floating mb-3">
                            <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            name="amount"
                            onChange={this.handleInputChange}
                            />
                            <label htmlFor="floatingInput"></label>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" onClick={()=>this.props.handleAllowClick()}>Fetch</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default InstallmentForm;