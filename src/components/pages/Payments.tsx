import React, { lazy, Suspense } from 'react';

const AsyncComponent = lazy(() => import('../DynamicComponent'))

export default function Payments (){

    return (
        <div className="ml-20 mt-20">
            <h1>This is Payments section (out of the current scope), Kindly move to cards section to view the app.</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <AsyncComponent />
            </Suspense>
        </div>
    )
}