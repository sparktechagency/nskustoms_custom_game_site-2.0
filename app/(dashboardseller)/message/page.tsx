import Message from "@/src/components/seller/Message";
import { IoIosSend } from "react-icons/io";

const Page = () => {
 return (
 <div>
  <div className="flex items-center">
    <IoIosSend size={26} className="text-[#AC2212]"/>
    <h1 className="text-white font-semibold">Message</h1>
  </div>
  <Message />
 </div>
 );
};

export default Page;