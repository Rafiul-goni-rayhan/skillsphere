import { auth } from "@/lib/auth"; //
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, Avatar, Button } from "@heroui/react";

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">User Profile</h1>
      
      <Card className="p-8 border border-gray-100 shadow-xl bg-white rounded-3xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          <Avatar 
            src={user.image} 
            name={user.name}
            className="w-32 h-32 text-4xl font-bold bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg"
          />

          <div className="flex-grow space-y-4 text-center md:text-left">
            <div>
              <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Full Name</p>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Email Address</p>
              <p className="text-lg text-gray-700 font-medium">{user.email}</p>
            </div>

            <div className="my-4 border-t border-gray-100 w-full"></div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button color="primary" variant="shadow" className="font-bold rounded-xl px-8">
                Edit Profile
              </Button>
              <Button variant="bordered" className="font-bold rounded-xl border-gray-200">
                Settings
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* status card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="p-6 text-center border border-gray-50 shadow-sm rounded-2xl">
          <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-tighter">Account Status</p>
          <p className="text-xl font-black text-green-500 italic">Active Member</p>
        </Card>
      </div>
    </div>
  );
}