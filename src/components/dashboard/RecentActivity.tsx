import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';

export function RecentActivity() {
  const { t } = useTranslation();

  const activities = [
    {
      id: 1,
      user: 'Jean Dupont',
      action: 'machine.updated',
      target: 'Machine XYZ-2000',
      time: '2h ago',
    },
    {
      id: 2,
      user: 'Marie Martin',
      action: 'software.added',
      target: 'AutoCAD 2024',
      time: '4h ago',
    },
    {
      id: 3,
      user: 'Pierre Lambert',
      action: 'document.uploaded',
      target: 'Manuel_Maintenance.pdf',
      time: '5h ago',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">
          {t('dashboard.recentActivity.title')}
        </h3>
        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-900">
                          {activity.user}{' '}
                          <span className="font-medium text-gray-700">
                            {t(`activity.${activity.action}`, { target: activity.target })}
                          </span>
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        <time dateTime={activity.time}>{activity.time}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}