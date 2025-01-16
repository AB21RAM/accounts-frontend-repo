// import { useState, FormEvent } from "react";
// import axios from "axios";

// interface ApiResponse {
//   success?: boolean;
//   error?: string;
// }

// const AddFeeHeadForm: React.FC = () => {
//   const [feehead, setFeehead] = useState<string>("");
//   const [message, setMessage] = useState<string>("");

//   const handleAddFeeHead = async (e: FormEvent) => {
//     e.preventDefault();
//     if (feehead) {
//       await addData();
//     } else {
//       alert("Please enter a Fee Head");
//     }
//   };

//   const addData = async () => {
//     try {
//       const { data }: { data: ApiResponse } = await axios.post(
//         `${import.meta.env.VITE_APP_BASE_URL}/addFeeHead`,
//         { name: feehead },
//         {
//           headers: { Authorization: localStorage.getItem("token") }
//         }
//       );
//       if (data.success) {
//         alert(`Fee Head ${feehead} added successfully!`);
//         setFeehead("");
//       } else {
//         console.error(data.error);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mt-3 mb-3">
//       <h3>Add Fee Heads</h3>
//       <form onSubmit={handleAddFeeHead}>
//         <div className="form-floating mb-3 col-lg-4">
//           <input
//             className="form-control"
//             id="feehead"
//             type="text"
//             name="feehead"
//             placeholder="Tuition Fees"
//             value={feehead}
//             onChange={(e) => setFeehead(e.target.value)}
//           />
//           <label htmlFor="feehead">Fee Head</label>
//         </div>
//         <div className="buttonContainer">
//           <button type="submit" className="btn btn-primary">
//             Add Fee Head
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddFeeHeadForm;



import { useState, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

interface ApiResponse {
  success?: boolean;
  error?: string;
}

const AddFeeHeadForm: React.FC = () => {
  const [feehead, setFeehead] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAddFeeHead = async (e: FormEvent) => {
    e.preventDefault();

    if (!feehead.trim()) {
      setError("Please enter a Fee Head.");
      setMessage(null);
      return;
    }

    setError(null);
    await addData();
  };

  const addData = async () => {
    try {
      setIsSubmitting(true);
      const { data }: { data: ApiResponse } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/addFeeHead`,
        { name: feehead },
        {
          headers: { Authorization: localStorage.getItem("token") || "" },
        }
      );

      if (data.success) {
        setMessage(`Fee Head "${feehead}" added successfully!`);
        setFeehead("");
      } else {
        setError(data.error || "An unexpected error occurred.");
      }
    } catch (err) {
      setError("Failed to add Fee Head. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex mt-12 items-start justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h3 className="text-lg font-semibold">Add Fee Head</h3>
          <p className="text-sm text-gray-600">Enter a new fee head to add it to the system.</p>
        </CardHeader>
        <form onSubmit={handleAddFeeHead}>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <span>{error}</span>
              </Alert>
            )}
            {message && (
              <Alert className="mb-4">
                <span>{message}</span>
              </Alert>
            )}
            <div className="space-y-4">
              <div>
                <Label htmlFor="feehead" className="mb-2 block text-sm font-medium">
                  Fee Head
                </Label>
                <Input
                  id="feehead"
                  type="text"
                  placeholder="E.g., Tuition Fees"
                  value={feehead}
                  onChange={(e) => setFeehead(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant={"myBtn"} type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Fee Head"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddFeeHeadForm;
