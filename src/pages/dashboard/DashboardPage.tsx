import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Wrench, Box, FileText } from 'lucide-react';
import { StatCard } from '../../components/dashboard/StatCard';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { useAuth } from '../../hooks/useAuth';

export function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('dashboard.welcome', { name: user?.name })}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('dashboard.stats.machines')}
          value="24"
          icon={Wrench}
          trend="+2"
          trendLabel={t('dashboard.stats.thisWeek')}
        />
        <StatCard
          title={t('dashboard.stats.software')}
          value="18"
          icon={Box}
          trend="+3"
          trendLabel={t('dashboard.stats.thisWeek')}
        />
        <StatCard
          title={t('dashboard.stats.documents')}
          value="156"
          icon={FileText}
          trend="+12"
          trendLabel={t('dashboard.stats.thisWeek')}
        />
        <StatCard
          title={t('dashboard.stats.activities')}
          value="47"
          icon={Activity}
          trend="+8"
          trendLabel={t('dashboard.stats.today')}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity />
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {t('dashboard.quickActions.title')}
          </h3>
          {/* Quick actions will be added here */}
        </div>
      </div>
    </div>
  );
}