"use client";

import { useMemo, useState } from "react";
import { Activity, CalendarDays, ClipboardList, FileText, Home, Package, Plus, Search, Settings, Stethoscope, Users, X } from "lucide-react";

const appointments = [
  { time: "09:00", patient: "Marta Tesfaye", doctor: "Dr. Samuel Bekele", type: "Follow-up", status: "Confirmed" },
  { time: "10:30", patient: "Abel Girma", doctor: "Dr. Hana Worku", type: "Cardiology", status: "Waiting" },
  { time: "11:15", patient: "Selamawit Tadesse", doctor: "Dr. Daniel Alemu", type: "Consultation", status: "Confirmed" },
  { time: "13:00", patient: "Nahom Kassa", doctor: "Dr. Samuel Bekele", type: "Review", status: "Confirmed" },
];

const patients = [
  ["PT-1042", "Marta Tesfaye", "32", "Female", "2026-09-03"],
  ["PT-1041", "Abel Girma", "48", "Male", "2026-09-03"],
  ["PT-1040", "Selamawit Tadesse", "27", "Female", "2026-09-02"],
  ["PT-1039", "Nahom Kassa", "61", "Male", "2026-09-02"],
];

export default function HomePage() {
  const [section, setSection] = useState("Overview");
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  const filteredPatients = useMemo(() => patients.filter((p) => p.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);

  function notify(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  }

  const nav = [
    ["Overview", Home], ["Patients", Users], ["Appointments", CalendarDays], ["Medical Records", FileText], ["Pharmacy", Package], ["Staff", Stethoscope], ["Reports", ClipboardList], ["Settings", Settings],
  ];

  return (
    <div className="shell">
      <aside className="side">
        <div className="brand">metori<span>ya</span></div>
        <div className="footer-note" style={{ color: "#91a5c2" }}>Hospital operations</div>
        <nav className="nav">{nav.map(([label, Icon]: any) => <button className={section === label ? "active" : ""} key={label} onClick={() => setSection(label)}><Icon size={17} style={{ verticalAlign: "-3px", marginRight: 9 }} />{label}</button>)}</nav>
        <div style={{ position: "absolute", bottom: 22, fontSize: 12, color: "#8ba0be" }}>Metoriya v1.0 • Demo</div>
      </aside>
      <main className="main">
        <header className="top">
          <div><div className="eyebrow">Wednesday, September 3</div><h1 className="title">{section}</h1><p className="subtitle">A clear view of today’s hospital operations.</p></div>
          <div className="row"><div className="avatar">YT</div></div>
        </header>

        {section === "Overview" && <>
          <section className="stats">
            <div className="card"><div className="stat-label">Total patients</div><div className="stat-value">1,248</div><div className="footer-note">+8.2% this month</div></div>
            <div className="card"><div className="stat-label">Appointments today</div><div className="stat-value">36</div><div className="footer-note">8 still waiting</div></div>
            <div className="card"><div className="stat-label">Active admissions</div><div className="stat-value">18</div><div className="footer-note">3 critical cases</div></div>
            <div className="card"><div className="stat-label">Pharmacy orders</div><div className="stat-value">24</div><div className="footer-note">6 ready for pickup</div></div>
          </section>
          <div className="layout">
            <section className="card">
              <div className="row"><div className="section-title">Today’s appointments</div><button onClick={() => notify("Appointment planner opened")}>View schedule</button></div>
              {appointments.map((a) => <div className="appointment" key={a.time}><div className="patient"><div className="mini"><CalendarDays size={17}/></div><div><strong>{a.patient}</strong><div className="footer-note">{a.doctor} • {a.type}</div></div></div><div style={{ textAlign: "right" }}><strong>{a.time}</strong><div><span className="tag">{a.status}</span></div></div></div>)}
            </section>
            <section className="card">
              <div className="section-title">Quick actions</div>
              <div className="actions"><button onClick={() => setShowPatientForm(true)}><span className="action-main"><Plus size={16}/> New patient</span><div className="footer-note">Register a patient</div></button><button onClick={() => notify("Appointment form opened")}><span className="action-main"><CalendarDays size={16}/> New appointment</span><div className="footer-note">Schedule a visit</div></button><button onClick={() => setSection("Medical Records")}><span className="action-main"><FileText size={16}/> Find record</span><div className="footer-note">Review medical history</div></button><button onClick={() => notify("Report generator opened")}><span className="action-main"><ClipboardList size={16}/> Generate report</span><div className="footer-note">Export activity</div></button></div>
              <div style={{ marginTop: 24 }}><div className="row"><span className="stat-label">Bed occupancy</span><strong>72%</strong></div><div className="progress" style={{ marginTop: 8 }}><div className="bar" style={{ width: "72%" }}/></div></div>
            </section>
          </div>
        </>}

        {section === "Patients" && <section className="card"><div className="row"><div className="section-title">Patient directory</div><button className="tag" onClick={() => setShowPatientForm(true)}>+ Add patient</button></div><div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}><Search size={18} color="#6b778c"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search patient, ID or date" style={{ width: "100%", border: "1px solid #e5eaf1", borderRadius: 10, padding: 11, outline: "none" }}/></div><table className="table"><thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Sex</th><th>Last visit</th></tr></thead><tbody>{filteredPatients.map((p) => <tr key={p[0]}>{p.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody></table></section>}

        {section !== "Overview" && section !== "Patients" && <section className="card"><div className="section-title">{section}</div><p className="subtitle">This module is part of the Metoriya hospital operations platform. The dashboard shell is ready for database-backed workflows, role permissions, and real records.</p><div className="actions" style={{ marginTop: 20 }}><button onClick={() => notify(`${section} workspace opened`)}><Activity size={18} className="action-main"/><div className="action-main" style={{ marginTop: 8 }}>Open workspace</div><div className="footer-note">Continue into this module</div></button><button onClick={() => notify("Demo data refreshed")}><ClipboardList size={18}/><div className="action-main" style={{ marginTop: 8 }}>Refresh demo data</div><div className="footer-note">Use sample records for review</div></button></div></section>}
      </main>

      {showPatientForm && <div style={{ position: "fixed", inset: 0, background: "rgba(9,18,31,.38)", display: "grid", placeItems: "center", padding: 20 }}><div className="card" style={{ width: "min(520px,100%)" }}><div className="row"><div className="section-title">Register patient</div><button onClick={() => setShowPatientForm(false)} style={{ border: 0, background: "transparent" }}><X/></button></div><div style={{ display: "grid", gap: 12 }}><input placeholder="Full name" style={{ padding: 12, border: "1px solid #e5eaf1", borderRadius: 10 }}/><input placeholder="Phone number" style={{ padding: 12, border: "1px solid #e5eaf1", borderRadius: 10 }}/><select style={{ padding: 12, border: "1px solid #e5eaf1", borderRadius: 10 }}><option>Female</option><option>Male</option><option>Other</option></select><button onClick={() => { setShowPatientForm(false); notify("Patient saved to demo registry"); }} style={{ padding: 12, border: 0, borderRadius: 10, background: "#2463eb", color: "#fff", fontWeight: 700 }}>Save patient</button></div></div></div>}
      {toast && <div style={{ position: "fixed", right: 24, bottom: 24, background: "#10233f", color: "white", padding: "12px 16px", borderRadius: 10, boxShadow: "0 10px 24px rgba(0,0,0,.15)" }}>{toast}</div>}
    </div>
  );
}
