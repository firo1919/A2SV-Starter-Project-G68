'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CustomButton } from './custom-button';
import { Application, ApplicationStatus } from './types';
import { cn } from './utils';

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const getStatusClasses = (status: ApplicationStatus) => {
    switch (status) {
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'review-complete':
        return 'bg-green-100 text-green-800';
      case 'new':
        return 'bg-blue-100 text-blue-800';
      default:
        return '';
    }
  };

  const getButtonProps = (status: ApplicationStatus) => {
    switch (status) {
      case 'under-review':
        return { text: 'Continue Review', variant: 'purple' as const };
      case 'review-complete':
        return { text: 'View Details', variant: 'outline' as const };
      case 'new':
        return { text: 'Start Review', variant: 'purple' as const };
      default:
        return { text: 'View Details', variant: 'outline' as const };
    }
  };

  const buttonProps = getButtonProps(application.status);

  return (
    <Link href={`/reviews/${application.id}`} passHref>
      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={application.avatarUrl || '/placeholder.svg?height=48&width=48&text=Avatar'}
            alt={`${application.name}'s avatar`}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
            <p className="text-sm text-gray-600">Submitted: {application.submittedDate}</p>
          </div>
        </div>
        <div className="mb-6">
          <span
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
              getStatusClasses(application.status)
            )}
          >
            {application.status
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </span>
        </div>
        <CustomButton variant={buttonProps.variant} className="w-full mt-auto">
          {buttonProps.text}
        </CustomButton>
      </div>
    </Link>
  );
}
