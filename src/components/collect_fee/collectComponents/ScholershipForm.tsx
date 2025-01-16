import React, { Component } from 'react';

interface ScholarshipFormProps {
  onAmountChange: (value: string) => void; // Callback function for handling amount change
  handleAllowClick: () => void; // Callback function for the update button
}

interface ScholarshipFormState {}

class ScholarshipForm extends Component<ScholarshipFormProps, ScholarshipFormState> {
  constructor(props: ScholarshipFormProps) {
    super(props);
    this.state = {};
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onAmountChange } = this.props;
    const studClgId = e.target.value;
    onAmountChange(studClgId);
  };

  render() {
    return (
      <>
        <div className="col-lg-5 col-md-5 col-sm-12 mt-3">
          <div className="card">
            <h5 className="card-title p-2">Scholarship Details</h5>
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
                <label htmlFor="floatingInput">Amount</label>
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={this.props.handleAllowClick}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ScholarshipForm;
