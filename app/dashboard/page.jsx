"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import StatsCards from "./components/StatsCards";
import LeadsTable from "./components/LeadsTable";
import LeadDrawer from "./components/LeadDrawer";
import AddLeadDrawer from "./components/AddLeadDrawer";
import UpcomingAppointments from "./components/UpcomingAppointments";
import LeadPipeline from "./components/LeadPipeline";

export default function Dashboard() {
  const router = useRouter();

  const [leads, setLeads] = useState([]);
  const [deletedLeads, setDeletedLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const [showAddLead, setShowAddLead] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [appointmentFilter, setAppointmentFilter] = useState("All");

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  /*
   * AUTHENTICATION CHECK
   */
  async function checkAuthentication() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);
    await fetchLeads();
  }

  /*
   * LOAD ACTIVE + DELETED LEADS
   */
  async function fetchLeads() {
    const { data, error } = await supabase
      .from("Leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("FETCH ERROR:", error);
      return;
    }

    const allLeads = data || [];

    // Active leads
    setLeads(
      allLeads.filter((lead) => !lead.deleted_at)
    );

    // Deleted leads
    setDeletedLeads(
      allLeads.filter((lead) => lead.deleted_at)
    );
  }

  /*
   * UPDATE STATUS
   */
  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from("Leads")
      .update({
        status: newStatus,
      })
      .eq("id", id);

    if (error) {
      console.error("STATUS ERROR:", error);
      return;
    }

    await fetchLeads();

    setSelectedLead((current) =>
      current
        ? {
            ...current,
            status: newStatus,
          }
        : null
    );
  }

  /*
   * SOFT DELETE LEAD
   */
  async function deleteLead(id) {
    if (!id) {
      console.error("DELETE ERROR: No lead ID provided.");
      return;
    }

    const leadToDelete = leads.find(
      (lead) => lead.id === id
    );

    const leadName = leadToDelete
      ? `${leadToDelete.first_name || ""} ${
          leadToDelete.last_name || ""
        }`.trim()
      : "this lead";

    const confirmed = window.confirm(
      `Are you sure you want to move ${
        leadName || "this lead"
      } to Deleted Leads?`
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("Leads")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("DELETE ERROR:", error);

      window.alert(
        "Unable to delete this lead. Please try again."
      );

      return;
    }

    setSelectedLead((current) =>
      current?.id === id ? null : current
    );

    await fetchLeads();
  }

  /*
   * RESTORE LEAD
   */
  async function restoreLead(id) {
    if (!id) {
      console.error("RESTORE ERROR: No lead ID provided.");
      return;
    }

    const leadToRestore = deletedLeads.find(
      (lead) => lead.id === id
    );

    const leadName = leadToRestore
      ? `${leadToRestore.first_name || ""} ${
          leadToRestore.last_name || ""
        }`.trim()
      : "this lead";

    const confirmed = window.confirm(
      `Restore ${
        leadName || "this lead"
      } back to your active leads?`
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("Leads")
      .update({
        deleted_at: null,
      })
      .eq("id", id);

    if (error) {
      console.error("RESTORE ERROR:", error);

      window.alert(
        "Unable to restore this lead. Please try again."
      );

      return;
    }

    await fetchLeads();
  }

  /*
   * LOGOUT
   */
  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("LOGOUT ERROR:", error);
      setLoggingOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  /*
   * FILTER ACTIVE LEADS
   */
  const filteredLeads = leads.filter((lead) => {
    const searchText = `
      ${lead.first_name || ""}
      ${lead.last_name || ""}
      ${lead.email || ""}
      ${lead.phone || ""}
    `.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    const matchesStatus =
      statusFilter === "All" ||
      (lead.status || "New Lead") === statusFilter;

    const matchesAppointment =
      appointmentFilter === "All" ||
      (appointmentFilter === "Scheduled" &&
        lead.appointment_type &&
        lead.appointment_type !== "No Appointment") ||
      (appointmentFilter === "None" &&
        (!lead.appointment_type ||
          lead.appointment_type === "No Appointment"));

    return (
      matchesSearch &&
      matchesStatus &&
      matchesAppointment
    );
  });

  /*
   * AUTHENTICATION LOADING
   */
  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">

          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-yellow-500" />

          <p className="text-sm text-gray-400">
            Checking authentication...
          </p>

        </div>
      </main>
    );
  }

  /*
   * DASHBOARD
   */
  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 flex items-start justify-between gap-6">

          <div>
            <h1 className="text-4xl font-bold">
              Dunia Lead Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
              Manage and follow up with your client inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* ADD NEW LEAD */}

            <button
              type="button"
              onClick={() => setShowAddLead(true)}
              className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
            >
              + Add New Lead
            </button>

            {/* SIGN OUT */}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loggingOut
                ? "Signing Out..."
                : "Sign Out"}
            </button>

          </div>

        </div>


        {/* UPCOMING APPOINTMENTS */}

        <section>
          <UpcomingAppointments
            leads={leads}
            openLead={setSelectedLead}
          />
        </section>


        {/* STATS */}

        <section className="mt-10">
          <StatsCards leads={leads} />
        </section>


        {/* PIPELINE */}

        <section className="mt-10">
          <LeadPipeline
            leads={filteredLeads}
            openLead={setSelectedLead}
            refreshLeads={fetchLeads}
          />
        </section>


        {/* SEARCH AND FILTERS */}

        <section className="mt-10">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Search Leads
            </h2>

            <input
              type="text"
              placeholder="Search name, email, or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none placeholder:text-gray-500 focus:border-yellow-600"
            />

            <div className="grid gap-4 md:grid-cols-2">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
              >

                <option value="All">
                  All
                </option>

                <option value="New Lead">
                  New Lead
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Follow-Up Needed">
                  Follow-Up Needed
                </option>

                <option value="Qualified">
                  Qualified
                </option>

                <option value="Closed">
                  Closed
                </option>

                <option value="Lost">
                  Lost
                </option>

              </select>


              <select
                value={appointmentFilter}
                onChange={(e) =>
                  setAppointmentFilter(e.target.value)
                }
                className="rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
              >

                <option value="All">
                  All Appointments
                </option>

                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="None">
                  No Appointment
                </option>

              </select>

            </div>

          </div>

        </section>


        {/* CLIENT LEADS */}

        <section className="mt-10">

          <LeadsTable
            leads={filteredLeads}
            deletedLeads={deletedLeads}
            updateStatus={updateStatus}
            setSelectedLead={setSelectedLead}
            deleteLead={deleteLead}
            restoreLead={restoreLead}
          />

        </section>


        {/* LEAD DRAWER */}

        <LeadDrawer
          lead={selectedLead}
          closeDrawer={() =>
            setSelectedLead(null)
          }
          updateStatus={updateStatus}
          refreshLeads={fetchLeads}
        />


        {/* ADD NEW LEAD DRAWER */}

        {showAddLead && (
          <AddLeadDrawer
            closeDrawer={() =>
              setShowAddLead(false)
            }
            refreshLeads={fetchLeads}
          />
        )}

      </div>


      {/* FOOTER */}

      <footer className="mt-16 border-t border-zinc-800 pt-6 text-center text-sm text-gray-500">
        © 2026 Dunia Arkoub · Designed by AGA CyberWorks
      </footer>

    </main>
  );
}