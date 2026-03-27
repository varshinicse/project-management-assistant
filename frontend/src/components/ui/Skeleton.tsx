import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    width,
    height,
    circle = false
}) => {
    const style: React.CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: circle ? '9999px' : undefined,
    };

    return (
        <div
            className={`animate-shimmer bg-slate-100 relative overflow-hidden rounded-md ${className}`}
            style={style}
        />
    );
};

export const CardSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft space-y-4">
        <div className="flex justify-between items-start">
            <Skeleton width={48} height={48} className="rounded-xl" />
            <Skeleton width={60} height={24} className="rounded-full" />
        </div>
        <div className="space-y-2">
            <Skeleton width="70%" height={24} />
            <Skeleton width="40%" height={16} />
        </div>
        <div className="pt-4 border-t border-slate-50 flex justify-between">
            <Skeleton width={40} height={16} />
            <Skeleton width={40} height={16} />
        </div>
    </div>
);

export const TableRowSkeleton = () => (
    <div className="flex items-center gap-4 py-4 px-4 border-b border-slate-50">
        <Skeleton width="30%" height={16} />
        <Skeleton width="20%" height={16} />
        <Skeleton width="15%" height={24} className="rounded-full" />
        <Skeleton width="25%" height={8} className="rounded-full" />
        <Skeleton width={20} height={20} circle />
    </div>
);

export const ChartSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft h-64 flex flex-col justify-end gap-3 px-8">
        <div className="flex justify-between items-end h-full gap-4">
            <Skeleton width="15%" height="40%" />
            <Skeleton width="15%" height="70%" />
            <Skeleton width="15%" height="50%" />
            <Skeleton width="15%" height="85%" />
            <Skeleton width="15%" height="60%" />
        </div>
    </div>
);

export default Skeleton;
