import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface Transaction {
  bank_name: string;
  bank_branch: string;
  dd_number: string;
  dd_date: string;
  micr: string;
  dd_code: string;
  amount: number;
  receipt_id: string;
}

interface BankStatementPrintProps {
  formattedDate?: string; // Optional if you want to pass a formattedDate
}

const BankStatementPrint: React.FC<BankStatementPrintProps> = ({
  formattedDate,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statementDate, setStatementDate] = useState<string>("");
  const [selectedReport, setSelectedReport] = useState<string>("");

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);

  useEffect(() => {
    fetchDDData();
  }, [searchQuery]);

  const fetch_all_dd = async () => {
    try {
      if (statementDate !== "") {
        const data = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/printStatement`,
          {
            date: statementDate,
          },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        if (data.data.ddData) {
          setTransactions(data.data.ddData);
        } else {
          alert("No data available.");
        }
      } else {
        alert("Select date to print bank statement!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const fetchDDData = async () => {
    try {
      // const data = await axios.get(
      //   `${import.meta.env.VITE_APP_BASE_URL}/StatementDates`,
      //   {
      //     headers: { Authorization: localStorage.getItem("token") },
      //   }
      // );

      const searchParams = new URLSearchParams(window.location.search);
      const ID = searchParams.get("id");
      if (ID) {
        setStatementDate(ID);
        fetch_all_dd();
      } else {
        console.log("No data found.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong!");
    }
  };

  function numberToEnglish(n: number, customJoinCharacter?: string): string {
    const string = n.toString();
    let units: string[],
      tens: string[],
      scales: string[],
      start: number,
      end: number,
      chunks: string[],
      chunksLen: number,
      chunk: number,
      ints: number[],
      i: number,
      word: string,
      words: string[];

    const and = customJoinCharacter || "and";

    // Is number zero?
    if (parseInt(string) === 0) {
      return "zero";
    }

    // Array of units as words
    units = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    // Array of tens as words
    tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    // Array of scales as words
    scales = ["", "thousand", "lacs"];

    // Split user argument into 3 digit chunks from right to left
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    // Check if function has enough scale words to be able to stringify the user argument
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return "";
    }

    // Stringify each integer in each chunk
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);

      if (chunk) {
        // Split chunk into array of individual integers
        ints = chunks[i].split("").reverse().map(parseFloat);

        // If tens integer is 1, i.e., 10, then add 10 to units integer
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        // Add scale word if chunk is not zero and array item exists
        if ((word = scales[i])) {
          words.push(word);
        }

        // Add unit word if array item exists
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        // Add tens word if array item exists
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        // Add 'and' string after units or tens integer if:
        if (ints[0] || ints[1]) {
          // Chunk has a hundreds integer or chunk is the first of multiple chunks
          if (ints[2] || (!i && chunksLen)) {
            words.push(and);
          }
        }

        // Add hundreds word if array item exists
        if ((word = units[ints[2]])) {
          words.push(word + " hundred");
        }
      }
    }

    return words.reverse().join(" ");
  }

  let total = 0;
  let wordsFee;
  if (transactions.length > 0) {
    for (let i = 0; i < transactions.length; i++) {
      total += Number(transactions[i].amount);
    }
    wordsFee = numberToEnglish(total).toLocaleUpperCase();
  }

  return (
    <>
      <div
        className="bank-statement text-center d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        <div
          className="main-bank-statement text-center"
          style={{ width: "90%" }}
        >
          <div className="header-bank text-center">
            <h3>
              Vasantdada Patil Pratishthan's College of Engineering and Visual
              Arts
            </h3>
            <p>
              Vasantdada Patil Education Complex, Eastern Express Highway Near
              Everard Nagar, Chunabhatti, Sion, Mumbai, Maharashtra 400022
            </p>
            <p>Phone: 022 2084 7226</p>
            <h4>Bank Statement</h4>
          </div>

          <div className="m-5 p-3 d-flex justify-content-around border border-1 border-black">
            <h5>Bank: SHALINI SAHAKARI BANK LTD</h5>
            <h5>Branch: Mumbai</h5>
            <h5>A/C No: 100204180000819</h5>
          </div>

          <h4 className="text-end">Date: {statementDate}</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Bank Name</th>
                <th scope="col">Branch</th>
                <th scope="col">DD Number</th>
                <th scope="col">DD Date</th>
                <th scope="col">MICR Code</th>
                <th scope="col">Code</th>
                <th scope="col">Amount</th>
                <th scope="col">Receipt Number</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {transactions.length > 0 &&
                transactions.map((e, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{e.bank_name}</td>
                    <td>{e.bank_branch}</td>
                    <td>{e.dd_number}</td>
                    <td>{e.dd_date}</td>
                    <td>{e.micr}</td>
                    <td>{e.dd_code}</td>
                    <td>{e.amount}</td>
                    <td>{e.receipt_id}</td>
                  </tr>
                ))}
            </tbody>
            <tbody className="table-group-divider">
              <th colSpan={8}>Total</th>
              <td>{total}</td>
            </tbody>
            <tbody className="table-group-divider">
              <th colSpan={9}>{wordsFee}</th>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BankStatementPrint;
