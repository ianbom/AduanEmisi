"use client"

import { useState } from "react"
import { FileText, Shield, Heart, Trophy, Medal, Award } from "lucide-react"
// import Image from "next/image"

// TypeScript interfaces
interface LeaderboardUser {
  id: number
  name: string
  profile_url: string | null
  reports_count?: number
  missions_count?: number
  total_donation?: number
}

interface LeaderboardPageProps {
  // Data for the Top 3 Podiums
  top3Reporters: LeaderboardUser[]
  top3MissionVolunteers: LeaderboardUser[]
  top3Donors: LeaderboardUser[]

  // Data for the Top 10 Lists
  top10Reporters: LeaderboardUser[]
  top10MissionVolunteers: LeaderboardUser[]
  top10Donors: LeaderboardUser[]
}

// Mock data for demonstration
const mockProps: LeaderboardPageProps = {
  top3Reporters: [
    { id: 1, name: "Sari Wijaya", profile_url: "/placeholder.svg?height=80&width=80", reports_count: 58 },
    { id: 2, name: "Budi Santoso", profile_url: "/placeholder.svg?height=80&width=80", reports_count: 45 },
    { id: 3, name: "Maya Putri", profile_url: "/placeholder.svg?height=80&width=80", reports_count: 38 },
  ],
  top3MissionVolunteers: [
    { id: 4, name: "Ahmad Rahman", profile_url: "/placeholder.svg?height=80&width=80", missions_count: 12 },
    { id: 5, name: "Dewi Lestari", profile_url: "/placeholder.svg?height=80&width=80", missions_count: 10 },
    { id: 6, name: "Rizki Pratama", profile_url: "/placeholder.svg?height=80&width=80", missions_count: 8 },
  ],
  top3Donors: [
    { id: 7, name: "Indira Sari", profile_url: "/placeholder.svg?height=80&width=80", total_donation: 5000000 },
    { id: 8, name: "Fajar Nugroho", profile_url: "/placeholder.svg?height=80&width=80", total_donation: 3500000 },
    { id: 9, name: "Lia Permata", profile_url: "/placeholder.svg?height=80&width=80", total_donation: 2800000 },
  ],
  top10Reporters: [
    { id: 1, name: "Sari Wijaya", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 58 },
    { id: 2, name: "Budi Santoso", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 45 },
    { id: 3, name: "Maya Putri", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 38 },
    { id: 10, name: "Andi Wijaya", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 32 },
    { id: 11, name: "Nina Sari", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 28 },
    { id: 12, name: "Doni Pratama", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 25 },
    { id: 13, name: "Rini Lestari", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 22 },
    { id: 14, name: "Hadi Kusuma", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 19 },
    { id: 15, name: "Sinta Dewi", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 16 },
    { id: 16, name: "Yoga Pratama", profile_url: "/placeholder.svg?height=40&width=40", reports_count: 14 },
  ],
  top10MissionVolunteers: [
    { id: 4, name: "Ahmad Rahman", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 12 },
    { id: 5, name: "Dewi Lestari", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 10 },
    { id: 6, name: "Rizki Pratama", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 8 },
    { id: 17, name: "Lina Sari", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 7 },
    { id: 18, name: "Bayu Adi", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 6 },
    { id: 19, name: "Citra Dewi", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 5 },
    { id: 20, name: "Eko Susanto", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 5 },
    { id: 21, name: "Fitri Handayani", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 4 },
    { id: 22, name: "Gilang Ramadan", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 4 },
    { id: 23, name: "Hesti Pratiwi", profile_url: "/placeholder.svg?height=40&width=40", missions_count: 3 },
  ],
  top10Donors: [
    { id: 7, name: "Indira Sari", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 5000000 },
    { id: 8, name: "Fajar Nugroho", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 3500000 },
    { id: 9, name: "Lia Permata", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 2800000 },
    { id: 24, name: "Irwan Setiawan", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 2500000 },
    { id: 25, name: "Jihan Aulia", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 2200000 },
    { id: 26, name: "Krisna Wijaya", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 1800000 },
    { id: 27, name: "Laras Sari", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 1500000 },
    { id: 28, name: "Maulana Yusuf", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 1200000 },
    { id: 29, name: "Nadia Putri", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 1000000 },
    { id: 30, name: "Omar Faruq", profile_url: "/placeholder.svg?height=40&width=40", total_donation: 800000 },
  ],
}

export default function LeaderboardPage(props: LeaderboardPageProps = mockProps) {
  const [activeTab, setActiveTab] = useState<"reports" | "missions" | "donations">("reports")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-500" />
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />
      case 3:
        return <Award className="w-8 h-8 text-amber-600" />
      default:
        return <span className="text-2xl font-bold text-emerald-600">#{rank}</span>
    }
  }

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
    }
  }

  const getPodiumCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-500"
      case 2:
        return "bg-gradient-to-br from-gray-300 to-gray-500 border-gray-400"
      case 3:
        return "bg-gradient-to-br from-amber-500 to-amber-700 border-amber-600"
      default:
        return "bg-white border-gray-200"
    }
  }

  const PodiumCard = ({
    user,
    rank,
    metric,
    category,
  }: {
    user: LeaderboardUser
    rank: number
    metric: string
    category: "reports" | "missions" | "donations"
  }) => (
    <div
      className={`relative p-6 rounded-xl shadow-lg border-2 transform hover:scale-105 transition-all duration-300 ${getPodiumCardStyle(rank)}`}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">{getRankEmoji(rank)}</div>
        <div className="relative mb-4">
          {/* <Image
            src={user.profile_url || "/placeholder.svg?height=80&width=80&query=avatar"}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full mx-auto border-4 border-white shadow-lg"
          /> */}
        </div>
        <h3 className="font-bold text-lg text-white mb-2">{user.name}</h3>
        <p className="text-white/90 font-semibold">{metric}</p>
      </div>
    </div>
  )

  const LeaderboardRow = ({
    user,
    rank,
    category,
  }: {
    user: LeaderboardUser
    rank: number
    category: "reports" | "missions" | "donations"
  }) => {
    let metric = ""
    switch (category) {
      case "reports":
        metric = `${user.reports_count} Laporan`
        break
      case "missions":
        metric = `${user.missions_count} Misi`
        break
      case "donations":
        metric = formatCurrency(user.total_donation || 0)
        break
    }

    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10">{getRankIcon(rank)}</div>
          {/* <Image
            src={user.profile_url || "/placeholder.svg?height=40&width=40&query=avatar"}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full border-2 border-emerald-200"
          /> */}
          <div>
            <h4 className="font-semibold text-gray-900">{user.name}</h4>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-emerald-600">{metric}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">🌍 Pahlawan Bumi</h1>
          <p className="text-xl text-emerald-600 max-w-2xl mx-auto">
            Apresiasi untuk para kontributor paling berpengaruh di SobatBumi.
          </p>
        </div>

        {/* Section 1: Podium Pahlawan */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">🏆 Podium Pahlawan</h2>

          {/* Top 3 Reporters */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-emerald-600 mr-2" />
              <h3 className="text-2xl font-semibold text-emerald-700">Top 3 Pengguna dengan Laporan Terbanyak</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {props.top3Reporters.map((user, index) => (
                <PodiumCard
                  key={user.id}
                  user={user}
                  rank={index + 1}
                  metric={`${user.reports_count} Laporan Terverifikasi`}
                  category="reports"
                />
              ))}
            </div>
          </div>

          {/* Top 3 Mission Volunteers */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-emerald-600 mr-2" />
              <h3 className="text-2xl font-semibold text-emerald-700">Top 3 Pengguna dengan Misi Terbanyak</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {props.top3MissionVolunteers.map((user, index) => (
                <PodiumCard
                  key={user.id}
                  user={user}
                  rank={index + 1}
                  metric={`${user.missions_count} Misi Diikuti`}
                  category="missions"
                />
              ))}
            </div>
          </div>

          {/* Top 3 Donors */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-emerald-600 mr-2" />
              <h3 className="text-2xl font-semibold text-emerald-700">Top 3 Pengguna dengan Donasi Terbanyak</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {props.top3Donors.map((user, index) => (
                <PodiumCard
                  key={user.id}
                  user={user}
                  rank={index + 1}
                  metric={`${formatCurrency(user.total_donation || 0)} Terkumpul`}
                  category="donations"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Daftar Peringkat */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">📊 Daftar Peringkat</h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex items-center px-6 py-3 font-semibold transition-colors duration-200 border-b-2 ${
                activeTab === "reports"
                  ? "text-emerald-600 border-emerald-600"
                  : "text-gray-500 border-transparent hover:text-emerald-500"
              }`}
            >
              <FileText className="w-5 h-5 mr-2" />
              Laporan Terbanyak
            </button>
            <button
              onClick={() => setActiveTab("missions")}
              className={`flex items-center px-6 py-3 font-semibold transition-colors duration-200 border-b-2 ${
                activeTab === "missions"
                  ? "text-emerald-600 border-emerald-600"
                  : "text-gray-500 border-transparent hover:text-emerald-500"
              }`}
            >
              <Shield className="w-5 h-5 mr-2" />
              Misi Terbanyak
            </button>
            <button
              onClick={() => setActiveTab("donations")}
              className={`flex items-center px-6 py-3 font-semibold transition-colors duration-200 border-b-2 ${
                activeTab === "donations"
                  ? "text-emerald-600 border-emerald-600"
                  : "text-gray-500 border-transparent hover:text-emerald-500"
              }`}
            >
              <Heart className="w-5 h-5 mr-2" />
              Donasi Terbanyak
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === "reports" && (
              <div>
                {props.top10Reporters.map((user, index) => (
                  <LeaderboardRow key={user.id} user={user} rank={index + 1} category="reports" />
                ))}
              </div>
            )}
            {activeTab === "missions" && (
              <div>
                {props.top10MissionVolunteers.map((user, index) => (
                  <LeaderboardRow key={user.id} user={user} rank={index + 1} category="missions" />
                ))}
              </div>
            )}
            {activeTab === "donations" && (
              <div>
                {props.top10Donors.map((user, index) => (
                  <LeaderboardRow key={user.id} user={user} rank={index + 1} category="donations" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
