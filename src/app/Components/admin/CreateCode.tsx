import { createCode } from "@/redux/slices/adminSlice";
import { AppDispatch} from "@/redux/store";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch} from "react-redux";

const CreateCode = () => {
  const [code, setCode] = useState<string>("");
  const [finalcode, setFinalCode] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.trim() === "") {
      toast.error("Code cannot be empty");
      return;
    } else {
      await dispatch(createCode(code))
        .then((res) => {
            setFinalCode(res?.payload?.data?.code);
            setCode('')
          toast.success("Code generated");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        gap: "12vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 items-center pt-20"
      >
        <input
          type="text"
          className="px-2 py-2 border border-blue-700/60 rounded-lg w-[30vw]"
          placeholder="Enter Code"
          name="code"
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
        />
        <button
          type="submit"
          className="px-5 py-2 bg-first text-white text-sm cursor-pointer rounded-lg"
        >
          Create Code
        </button>
      </form>
      {finalcode && (
        <article className="flex flex-col items-center">
          <h3>Invite Code</h3>
          <div className="px-4 py-4 border border-green-600 rounded-lg">
            <p className="text-sm animate animate-accordion-up duration-100">
              code is: {finalcode}
            </p>
          </div>
        </article>
      )}
    </div>
  );
};

export default CreateCode;
