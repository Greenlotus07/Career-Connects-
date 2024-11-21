import React, { useEffect, useRef } from 'react';
import { PieChart, Wallet, Rocket, Users, LineChart, Coins } from 'lucide-react';

const tokenomicsData = [
  { name: 'Marketing and Community', percentage: 30, icon: Users, color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-600' },
  { name: 'Development', percentage: 20, icon: Rocket, color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Liquidity', percentage: 30, icon: LineChart, color: 'bg-indigo-500', gradient: 'from-indigo-500 to-indigo-600' },
  { name: 'Holder Rewards', percentage: 10, icon: Wallet, color: 'bg-violet-500', gradient: 'from-violet-500 to-violet-600' },
  { name: 'Start-Up Fund', percentage: 10, icon: Coins, color: 'bg-fuchsia-500', gradient: 'from-fuchsia-500 to-fuchsia-600' }
];

export default function Tokenomics() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target as HTMLDivElement;
            bar.style.width = bar.dataset.width || '0%';
            bar.style.opacity = '1';
          }
        });
      },
      { threshold: 0.2 }
    );

    barsRef.current.forEach((bar) => {
      if (bar) observerRef.current?.observe(bar);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="tokenomics">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-12">
          <PieChart className="w-8 h-8 text-purple-600 animate-pulse" />
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Tokenomics
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-2xl font-semibold text-gray-800 mb-2">Total Supply</p>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full inline-block">
              <span className="text-xl font-mono">1,000,000,000,000 CPUP</span>
            </div>
          </div>

          <div className="grid gap-6">
            {tokenomicsData.map((item, index) => (
              <div 
                key={item.name}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-3">
                  <div className={`bg-gradient-to-r ${item.gradient} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-800">{item.name}</h3>
                  <span className="ml-auto text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {item.percentage}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    ref={el => barsRef.current[index] = el}
                    className={`h-full bg-gradient-to-r ${item.gradient} transition-all duration-1000 ease-out opacity-0`}
                    style={{ width: '0%' }}
                    data-width={`${item.percentage}%`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our tokenomics are designed to ensure long-term sustainability and growth, 
              with a strong focus on community rewards and project development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}