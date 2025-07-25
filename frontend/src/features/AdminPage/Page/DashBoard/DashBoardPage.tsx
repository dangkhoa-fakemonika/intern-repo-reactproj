import icon_box from '@/assets/images/icon_box.png';
import icon_treding from '@/assets/images/icon_treding.png';
import icon_user from '@/assets/images/icon_user.png';
import icon_sales from '@/assets/images/icon_sales.png'
import icon_order from '@/assets/images/icon_order.png';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import {overviewdata, usagedata} from "@/features/AdminPage/DefaultData/index"
import {DataTable} from '@/features/AdminPage/Page/DashBoard/Components/TableComponent'
export function DashBoardPage() {
  return (
    <div className="flex flex-col gap-y-4">
        <h1 className="title text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="card p-2 bg-admin-palette rounded-[10px]">
                <div className="card-header flex items-center space-x-3 mb-4">
                <div className="w-fit rounded-lg bg-blue-950 p-2 text-blue-500">
                    <img src={icon_box}
                    className='w-6 h-6 object-contain'/>
                </div>
                <p className="text-[16px] font-bold ">Total Products</p>
                </div>
                <div className="card-body bg-admin-template p-3 rounded-[5px]">
                <p className="text-2xl font-semibold text-white">
                    50,250
                </p>
                <span className="flex w-fit text-[12px] mt-2 items-center gap-x-2 rounded-full border border-blue-800 px-0.5 py-0.5 font-medium text-blue-800">
                    <img src={icon_treding}
                    className='w-5 h-5'/>
                    20%
                </span>
                </div>
            </div>
             <div className="card p-2 bg-admin-palette rounded-[10px]">
                <div className="card-header flex items-center space-x-3 mb-4">
                <div className="w-fit rounded-lg bg-blue-950 p-2 text-blue-500">
                    <img src={icon_user}
                    className='w-6 h-6 object-contain'/>
                </div>
                <p className="text-[16px] font-bold ">Total User</p>
                </div>
                <div className="card-body bg-admin-template p-3 rounded-[5px]">
                <p className="text-2xl font-semibold text-white">
                    30,220 
                </p>
                <span className="flex w-fit text-[12px] mt-2 items-center gap-x-2 rounded-full border border-blue-800 px-0.5 py-0.5 font-medium text-blue-800">
                    <img src={icon_treding} className='w-5 h-5'/>
                   15%
                </span>
                </div>
            </div>
             <div className="card p-2 bg-admin-palette rounded-[10px]">
                <div className="card-header flex items-center space-x-3 mb-4">
                <div className="w-fit rounded-lg bg-blue-950 p-2 text-blue-500">
                    <img src={icon_order}
                    className='w-6 h-6 object-contain'/>
                </div>
                <p className="text-[16px] font-bold ">Total Order</p>
                </div>
                <div className="card-body bg-admin-template p-3 rounded-[5px]">
                <p className="text-2xl font-semibold text-white">
                    2,908 
                </p>
                <span className="flex w-fit text-[12px] mt-2 items-center gap-x-2 rounded-full border border-blue-800 px-0.5 py-0.5 font-medium text-blue-800">
                    <img src={icon_treding} className='w-5 h-5'/>
                    10%
                </span>
                </div>
            </div>
             <div className="card p-2 bg-admin-palette rounded-[10px]">
                <div className="card-header flex items-center space-x-3 mb-4">
                <div className="w-fit rounded-lg bg-blue-950 p-2 text-blue-500">
                    <img src={icon_sales}
                    className='w-6 h-6 object-contain'/>
                </div>
                <p className="text-[16px] font-bold ">Sales</p>
                </div>
                <div className="card-body bg-admin-template p-3 rounded-[5px]">
                <p className="text-2xl font-semibold text-white">
                    30,150,000 VNĐ
                </p>
                <span className="flex w-fit text-[12px] mt-2 items-center gap-x-2 rounded-full border border-blue-800 px-0.5 py-0.5 font-medium text-blue-800">
                    <img src={icon_treding} className='w-5 h-5' />
                    30%
                </span>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="card bg-admin-palette p-3 rounded-[5px] col-span-1 md:col-span-2">
                <div className="card-header">
                    <p className='text-1xl mb-5 font-semibold'>Overview</p>
                </div>
                <div className="card-body p-0">
                     <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                            data={overviewdata}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                            </defs>

                            <Tooltip cursor={false} formatter={(value: number) => `$${value}`} />

                            <XAxis
                            dataKey="name"
                            stroke="#475569"
                            strokeWidth={0}
                            tickMargin={6}
                            />
                            <YAxis
                            dataKey="total"
                            stroke="#475569"
                            strokeWidth={0}
                            tickFormatter={(value: number) => `$${value}`}
                            tickMargin={6}
                            />
                            <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#2563eb"
                            fillOpacity={1}
                            fill="url(#colorTotal)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="card bg-admin-palette p-3 rounded-[5px] col-span-1">
                <div className="card-header">
                    <p className='text-1xl mb-5 font-semibold'>Usage</p>
                </div>
                <div className="card-body p-0 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={usagedata}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Mike" dataKey="A" stroke="#2563eb" fill="#475569" fillOpacity={0.6} />
                    </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
            <div className='grid grid-cols-1'>
                <div className="card bg-admin-palette p-3 rounded-[5px] col-span-1">
                <div className="card-header">
                    <p className='text-1xl mb-5 font-semibold'>Top Orders</p>
                </div>
                <div className="card-body p-0">
                    <DataTable/>
                </div>
            </div>
        </div>
    </div>
  )
}

