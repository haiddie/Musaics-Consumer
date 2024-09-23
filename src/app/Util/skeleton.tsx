export const renderSkeletons = (iterations: number, height: string, rounded: string = 'lg') => {
    const skeletonItems = [];

    for (let i = 0; i < iterations; i++) {
        skeletonItems.push(
            <div key={i} role="status" className={` w-full animate-pulse items-center mb-0.5`}>
                <div className={`h-[${height}px] mt-1 w-full  rounded-${rounded} bg-gray-700`}></div>
            </div>
        );
    }

    return skeletonItems;
};