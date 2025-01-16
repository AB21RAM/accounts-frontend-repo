import React, { Component } from 'react';

interface FeeTableProps {
    tableData: { feeHeads: string; amount: number; quentity: number }[];
    setTableData: (data: { feeHeads: string; amount: number; quentity: number }[]) => void;
    handleSaveTable: () => void;
}

interface FeeTableState {}

class Feetable extends Component<FeeTableProps, FeeTableState> {

    handleDeleteRow = (index: number) => {
        const { tableData, setTableData } = this.props;
        const updatedTableData = [...tableData];
        updatedTableData.splice(index, 1); // Remove the row at the specified index
        setTableData(updatedTableData);
    };
    
    render() {
        const { tableData, handleSaveTable } = this.props;

        return (
            <>
                <div>
                    <table className="m-3 table table-striped">
                        <thead>
                            <tr>
                                <th>Fee Head</th>
                                <th>Amount</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.feeHeads}</td>
                                    <td>{data.amount}</td>
                                    <td>{data.quentity}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.handleDeleteRow(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={handleSaveTable}
                    >
                        Collect Fee
                    </button>
                </div>
            </>
        );
    }
}

export default Feetable;
