"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Rsvp } from "@/config/rsvp";
import { signOut } from "./actions";

interface DashboardClientProps {
  rsvps: Rsvp[];
  email: string;
  initials: string;
}

const ATTENDING_LABEL: Record<string, string> = {
  attending: "Hadir",
  not_attending: "Tidak Hadir",
};

const GUEST_TYPE_LABEL: Record<string, string> = {
  family: "Keluarga",
  friend: "Teman",
};

const SESSION_LABEL: Record<string, string> = {
  "/family": "Sesi 1 · Keluarga",
  "/sesi2": "Sesi 2 · Teman",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DashboardClient({ rsvps, email, initials }: DashboardClientProps) {
  const [attendance, setAttendance] = useState("all");
  const [session, setSession] = useState("all");
  const [guestType, setGuestType] = useState("all");
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const attending = rsvps.filter((r) => r.attendance_status === "attending");
    const declined = rsvps.filter((r) => r.attendance_status === "not_attending");
    const totalGuests = attending.reduce((sum, r) => sum + (r.attendee_count ?? 0), 0);
    return {
      total: rsvps.length,
      attending: attending.length,
      declined: declined.length,
      totalGuests,
    };
  }, [rsvps]);

  const attendanceBreakdown = useMemo(() => {
    const total = Math.max(rsvps.length, 1);
    return {
      attendingPct: Math.round((stats.attending / total) * 100),
      declinedPct: Math.round((stats.declined / total) * 100),
    };
  }, [rsvps.length, stats.attending, stats.declined]);

  const sessionBreakdown = useMemo(() => {
    const family = rsvps.filter((r) => r.invitation_path === "/family").length;
    const sesi2 = rsvps.filter((r) => r.invitation_path === "/sesi2").length;
    const total = Math.max(rsvps.length, 1);
    return {
      family,
      sesi2,
      familyPct: Math.round((family / total) * 100),
      sesi2Pct: Math.round((sesi2 / total) * 100),
    };
  }, [rsvps]);

  const guestTypeBreakdown = useMemo(() => {
    const family = rsvps.filter((r) => r.guest_type === "family").length;
    const friend = rsvps.filter((r) => r.guest_type === "friend").length;
    const total = Math.max(rsvps.length, 1);
    return {
      family,
      friend,
      familyPct: Math.round((family / total) * 100),
      friendPct: Math.round((friend / total) * 100),
    };
  }, [rsvps]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rsvps.filter((r) => {
      if (attendance !== "all" && r.attendance_status !== attendance) return false;
      if (session !== "all" && r.invitation_path !== session) return false;
      if (guestType !== "all" && r.guest_type !== guestType) return false;
      if (q) {
        const hay = `${r.guest_name} ${r.message ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rsvps, attendance, session, guestType, query]);

  const donutSegments = [
    { label: "Hadir", value: stats.attending, pct: attendanceBreakdown.attendingPct, color: "#3f9d6b" },
    { label: "Tidak Hadir", value: stats.declined, pct: attendanceBreakdown.declinedPct, color: "#c1454f" },
  ];
  const donutCircumference = 2 * Math.PI * 42;
  const donutDash = donutCircumference * (stats.total > 0 ? stats.attending / stats.total : 0);

  return (
    <main className="cms-dashboard">
      <div className="cms-container">
        <header className="cms-header">
          <div className="cms-brand">
            <h1>Agnesia &amp; Adji</h1>
            <span>Daftar Tamu</span>
          </div>
          <div className="cms-user-chip">
            <span className="cms-avatar" aria-hidden="true">{initials}</span>
            <span>{email}</span>
            <form action={signOut}>
              <button className="cms-logout" type="submit">Keluar</button>
            </form>
          </div>
        </header>

        <p className="cms-section-title">Ringkasan Kehadiran</p>
        <p className="cms-section-sub">Konfirmasi terkumpul dari seluruh sesi perayaan.</p>

        <section className="cms-stats" aria-label="Statistik kehadiran">
          <div className="cms-stat-card total">
            <div className="cms-stat-label">Total RSVP</div>
            <div className="cms-stat-value">{stats.total}</div>
            <div className="cms-stat-note">semua konfirmasi</div>
          </div>
          <div className="cms-stat-card attending">
            <div className="cms-stat-label">Hadir</div>
            <div className="cms-stat-value">{stats.attending}</div>
            <div className="cms-stat-note">{attendanceBreakdown.attendingPct}% dari total</div>
          </div>
          <div className="cms-stat-card declined">
            <div className="cms-stat-label">Tidak Hadir</div>
            <div className="cms-stat-value">{stats.declined}</div>
            <div className="cms-stat-note">{attendanceBreakdown.declinedPct}% dari total</div>
          </div>
          <div className="cms-stat-card guests">
            <div className="cms-stat-label">Total Tamu</div>
            <div className="cms-stat-value">{stats.totalGuests}</div>
            <div className="cms-stat-note">termasuk anggota keluarga</div>
          </div>
        </section>

        <section className="cms-charts" aria-label="Grafik kehadiran">
          <div className="cms-chart-card">
            <h3 className="cms-chart-title">Perbandingan Kehadiran</h3>
            <div className="cms-donut">
              <svg viewBox="0 0 100 100" className="cms-donut-svg" aria-label={`${stats.attending} dari ${stats.total} hadir`}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f0e6d6" strokeWidth="12" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#3f9d6b"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${donutDash} ${donutCircumference}`}
                  transform="rotate(-90 50 50)"
                />
                <text x="50" y="54" textAnchor="middle" className="cms-donut-center">
                  {stats.total > 0 ? `${attendanceBreakdown.attendingPct}%` : "—"}
                </text>
              </svg>
              <div className="cms-legend">
                {donutSegments.map((seg) => (
                  <div className="cms-legend-row" key={seg.label}>
                    <span className="cms-legend-dot" style={{ background: seg.color }} />
                    <span>{seg.label}: {seg.value} ({seg.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cms-chart-card">
            <h3 className="cms-chart-title">Berdasarkan Sesi</h3>
            <div className="cms-bar-row">
              <span className="cms-bar-label">Sesi 1 · Keluarga</span>
              <div className="cms-bar-track"><div className="cms-bar-fill navy" style={{ width: `${sessionBreakdown.familyPct}%` }} /></div>
              <span className="cms-bar-value">{sessionBreakdown.family} · {sessionBreakdown.familyPct}%</span>
            </div>
            <div className="cms-bar-row">
              <span className="cms-bar-label">Sesi 2 · Teman</span>
              <div className="cms-bar-track"><div className="cms-bar-fill" style={{ width: `${sessionBreakdown.sesi2Pct}%` }} /></div>
              <span className="cms-bar-value">{sessionBreakdown.sesi2} · {sessionBreakdown.sesi2Pct}%</span>
            </div>
          </div>

          <div className="cms-chart-card">
            <h3 className="cms-chart-title">Berdasarkan Tipe Tamu</h3>
            <div className="cms-bar-row">
              <span className="cms-bar-label">Keluarga</span>
              <div className="cms-bar-track"><div className="cms-bar-fill navy" style={{ width: `${guestTypeBreakdown.familyPct}%` }} /></div>
              <span className="cms-bar-value">{guestTypeBreakdown.family} · {guestTypeBreakdown.familyPct}%</span>
            </div>
            <div className="cms-bar-row">
              <span className="cms-bar-label">Teman</span>
              <div className="cms-bar-track"><div className="cms-bar-fill" style={{ width: `${guestTypeBreakdown.friendPct}%` }} /></div>
              <span className="cms-bar-value">{guestTypeBreakdown.friend} · {guestTypeBreakdown.friendPct}%</span>
            </div>
          </div>
        </section>

        <p className="cms-section-title">Daftar Tamu</p>
        <p className="cms-section-sub">{filtered.length} dari {rsvps.length} konfirmasi ditampilkan.</p>

        <div className="cms-filters" role="search">
          <input
            className="cms-search"
            type="search"
            placeholder="Cari nama atau ucapan…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Cari nama atau ucapan"
          />
          <select className="cms-filter-select" value={attendance} onChange={(e) => setAttendance(e.target.value)} aria-label="Saring kehadiran">
            <option value="all">Semua Kehadiran</option>
            <option value="attending">Hadir</option>
            <option value="not_attending">Tidak Hadir</option>
          </select>
          <select className="cms-filter-select" value={session} onChange={(e) => setSession(e.target.value)} aria-label="Saring sesi">
            <option value="all">Semua Sesi</option>
            <option value="/family">Sesi 1 · Keluarga</option>
            <option value="/sesi2">Sesi 2 · Teman</option>
          </select>
          <select className="cms-filter-select" value={guestType} onChange={(e) => setGuestType(e.target.value)} aria-label="Saring tipe tamu">
            <option value="all">Semua Tipe</option>
            <option value="family">Keluarga</option>
            <option value="friend">Teman</option>
          </select>
        </div>

        <div className="cms-table-card">
          <div className="cms-table-wrap">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Kehadiran</th>
                  <th>Jumlah</th>
                  <th>Sesi</th>
                  <th>Tipe</th>
                  <th>Ucapan</th>
                  <th>Diterima</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="cms-empty">Belum ada konfirmasi 🌸</div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id}>
                      <td><strong>{r.guest_name}</strong></td>
                      <td>
                        <span className={`cms-pill ${r.attendance_status}`}>
                          {ATTENDING_LABEL[r.attendance_status] ?? r.attendance_status}
                        </span>
                      </td>
                      <td>{r.attendance_status === "attending" ? `${r.attendee_count} orang` : "—"}</td>
                      <td>{SESSION_LABEL[r.invitation_path] ?? r.invitation_path}</td>
                      <td>
                        <span className={`cms-pill ${r.guest_type}`}>
                          {GUEST_TYPE_LABEL[r.guest_type] ?? r.guest_type}
                        </span>
                      </td>
                      <td>
                        <div className="cms-message-cell">{r.message ?? "—"}</div>
                      </td>
                      <td>{formatDateTime(r.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="cms-footer-note">
          <Image src="/assets/shared/navy-pink-floral-bouquet.png" alt="" width={24} height={24} style={{ display: "inline-block", verticalAlign: "middle", marginRight: 8 }} />
          Dibuat dengan cinta untuk Agnesia &amp; Adji
        </p>
      </div>
    </main>
  );
}
