"use client";

import {
  DndContext,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";

import {
  useState,
} from "react";

import {
  supabase
} from "@/lib/supabase";



function Column({ status, leads, openLead }) {

  const {
    setNodeRef
  } = useDroppable({
    id: status,
  });



  return (

    <div
      ref={setNodeRef}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 min-h-[300px]"
    >


      <h3 className="text-yellow-500 font-semibold mb-4">
        {status}
      </h3>



      <div className="space-y-3">


        {leads.length === 0 ? (

          <p className="text-gray-500 text-sm">
            No leads
          </p>


        ) : (


          leads.map((lead)=> (

            <LeadCard
              key={lead.id}
              lead={lead}
              openLead={openLead}
            />

          ))

        )}



      </div>



    </div>

  );
}






function LeadCard({ lead, openLead }) {


  return (

    <div
      onClick={() => openLead(lead)}
      draggable
      className="bg-zinc-800 hover:bg-zinc-700 rounded-xl p-3 cursor-pointer"
    >

      <p className="font-semibold">
        {lead.first_name} {lead.last_name}
      </p>


      <p className="text-sm text-gray-400">
        {lead.make_model || "No vehicle"}
      </p>


    </div>

  );

}








export default function LeadPipeline({
  leads,
  openLead,
  refreshLeads
}) {


  const [activeLead, setActiveLead] = useState(null);



  const columns = [
    "New Lead",
    "Contacted",
    "Follow-Up Needed",
    "Qualified",
    "Closed",
  ];






  async function updateLeadStatus(
    leadId,
    newStatus
  ) {


    const { error } = await supabase
      .from("Leads")
      .update({
        status: newStatus
      })
      .eq(
        "id",
        leadId
      );



    if(error){

      console.log(error);

    } else {

      refreshLeads();

    }

  }








  return (

    <DndContext

      onDragStart={(event)=>{

        const lead = leads.find(
          (l)=>l.id === event.active.id
        );

        setActiveLead(lead);

      }}



      onDragEnd={(event)=>{


        const {
          active,
          over
        } = event;



        if(!over) return;



        updateLeadStatus(
          active.id,
          over.id
        );


        setActiveLead(null);


      }}

    >



      <div className="mt-10">


        <h2 className="text-2xl font-semibold mb-6">
          Lead Pipeline
        </h2>





        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-5">


          {columns.map((status)=>{


            const columnLeads =
              leads.filter(
                (lead)=>
                  (lead.status || "New Lead")
                  === status
              );



            return (

              <Column

                key={status}

                status={status}

                leads={columnLeads}

                openLead={openLead}

              />

            );


          })}



        </div>


      </div>





      <DragOverlay>


        {activeLead && (

          <div className="bg-zinc-800 rounded-xl p-3">

            {activeLead.first_name} {activeLead.last_name}

          </div>

        )}


      </DragOverlay>



    </DndContext>

  );

}