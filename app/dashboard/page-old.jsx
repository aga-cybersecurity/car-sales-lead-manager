"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);


  async function fetchLeads() {
    const { data, error } = await supabase
      .from("Leads")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      console.log(error);
    } else {
      setLeads(data);
    }
  }


  async function updateStatus(id, newStatus) {

    const { error } = await supabase
      .from("Leads")
      .update({
        status: newStatus,
      })
      .eq("id", id);


    if (error) {
      console.log(error);
    } else {
      fetchLeads();
    }
  }


  const totalLeads = leads.length;

  const newLeads = leads.filter(
  (lead) =>
    !lead.status ||
    lead.status === "New Lead"
).length;


const followUps = leads.filter(
  (lead) =>
    lead.status === "Follow-Up Needed"
).length;


const closedDeals = leads.filter(
  (lead) =>
    lead.status === "Closed"
).length;



  return (
    <main className="min-h-screen bg-black text-white p-10">


      <h1 className="text-4xl font-semibold mb-10">
        Dunia Lead Dashboard
      </h1>



      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6 mb-12">


        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Leads
          </p>

          <h2 className="text-4xl font-bold text-yellow-500">
            {totalLeads}
          </h2>
        </div>



        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <p className="text-gray-400">
            New Leads
          </p>

          <h2 className="text-4xl font-bold text-yellow-500">
            {newLeads}
          </h2>
        </div>



        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <p className="text-gray-400">
            Follow Ups
          </p>

          <h2 className="text-4xl font-bold text-yellow-500">
            {followUps}
          </h2>
        </div>



        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <p className="text-gray-400">
            Closed Deals
          </p>

          <h2 className="text-4xl font-bold text-yellow-500">
            {closedDeals}
          </h2>
        </div>


      </div>




      {/* LEADS */}


      <div className="space-y-6">


        {leads.map((lead) => (


          <div
            key={lead.id}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6"
          >


            <h2 className="text-2xl font-semibold">
              {lead.first_name} {lead.last_name}
            </h2>


            <p className="text-gray-400">
              📧 {lead.email}
            </p>


            <p className="text-gray-400">
              📞 {lead.phone}
            </p>



            <div className="mt-6 space-y-3">


              <p>
                🚗 Vehicle:
                <span className="text-yellow-500 ml-2">
                  {lead.year} {lead.make_model} {lead.trim}
                </span>
              </p>


              <p>
                💰 Budget:
                <span className="ml-2">
                  ${lead.budget_min || 0}
                  {" - "}
                  ${lead.budget_max || 0}
                </span>
              </p>



              <p>
                📝 Notes:
                <span className="ml-2">
                  {lead.notes || "No notes"}
                </span>
              </p>




              <div className="pt-4">

                <label className="block mb-2">
                  Status
                </label>


                <select
                  value={lead.status || "New"}
                  onChange={(e) =>
                    updateStatus(
                      lead.id,
                      e.target.value
                    )
                  }
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
                >

                  <option>
  New Lead
</option>

<option>
  Contacted
</option>

<option>
  Follow-Up Needed
</option>

<option>
  Qualified
</option>

<option>
  Closed
</option>

<option>
  Lost
</option>

                </select>


              </div>


            </div>


          </div>


        ))}


      </div>


    </main>
  );
}